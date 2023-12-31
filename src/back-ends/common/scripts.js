/*
 * Copyright 2010-2020 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

/* global singlefile, XMLHttpRequest */

import fs from "fs";
import {resolve} from 'path';
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url))

const SCRIPTS = [
	"lib/single-file.js",
	"lib/single-file-bootstrap.js",
	"lib/single-file-hooks-frames.js"
];

function initSingleFile() {
	singlefile.init({
		fetch: (url, options) => {
			return new Promise(function (resolve, reject) {
				const xhrRequest = new XMLHttpRequest();
				xhrRequest.withCredentials = true;
				xhrRequest.responseType = "arraybuffer";
				xhrRequest.onerror = event => reject(new Error(event.detail));
				xhrRequest.onabort = () => reject(new Error("aborted"));
				xhrRequest.onreadystatechange = () => {
					if (xhrRequest.readyState == XMLHttpRequest.DONE) {
						resolve({
							arrayBuffer: async () => xhrRequest.response || new ArrayBuffer(),
							headers: { get: headerName => xhrRequest.getResponseHeader(headerName) },
							status: xhrRequest.status
						});
					}
				};
				xhrRequest.open("GET", url, true);
				if (options.headers) {
					for (const entry of Object.entries(options.headers)) {
						xhrRequest.setRequestHeader(entry[0], entry[1]);
					}
				}
				xhrRequest.send();
			});
		}
	});
}

export const get = async options => {
	let scripts = "let _singleFileDefine; if (typeof define !== 'undefined') { _singleFileDefine = define; define = null }";
	scripts += await readScriptFiles(SCRIPTS);
	scripts += await readScriptFiles(options && options.browserScripts ? options.browserScripts : [], "");
	if (options.browserStylesheets && options.browserStylesheets.length) {
		scripts += "addEventListener(\"load\",()=>{const styleElement=document.createElement(\"style\");styleElement.textContent=" + JSON.stringify(await readScriptFiles(options.browserStylesheets, "")) + ";document.body.appendChild(styleElement);});";
	}
	scripts += "if (_singleFileDefine) { define = _singleFileDefine; _singleFileDefine = null }";
	scripts += "(" + initSingleFile.toString() + ")();";
	return scripts;
};

export const getInfobarScript = () => {
	return readScriptFile("lib/single-file-infobar.js");
};

async function readScriptFiles(paths) {
	return (await Promise.all(paths.map(path => readScriptFile(path)))).join("");
}

function readScriptFile(path) {
	const resolvedPath = resolve(__dirname, path);
	return new Promise((resolve, reject) =>
		fs.readFile(resolvedPath, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data.toString() + "\n");
			}
		})
	);
}