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

export const defaultArgs = {
  acceptHeaders: {
    font: 'application/font-woff2;q=1.0,application/font-woff;q=0.9,*/*;q=0.8',
    image: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    stylesheet: 'text/css,*/*;q=0.1',
    script: '*/*',
    document: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  },
  backEnd: 'puppeteer', // Back-end to use (choices: "jsdom", "puppeteer", "webdriver-chromium", "webdriver-gecko", "puppeteer-firefox", "playwright-firefox", "playwright-chromium", "playwright-webkit")
  saveScreenshot: false, // Save screenshot or not
  blockMixedContent: false, // Block mixed contents
  browserServer: '', // Server to connect to (puppeteer only for now)
  browserHeadless: true, // Run the browser in headless mode (puppeteer, webdriver-gecko, webdriver-chromium)
  browserExecutablePath: '', // Path to chrome/chromium executable (puppeteer, webdriver-gecko, webdriver-chromium)
  browserWidth: 1280, // Width of the browser viewport in pixels
  browserHeight: 720, // Height of the browser viewport in pixels
  browserLoadMaxTime: 60000, // Maximum delay of time to wait for page loading in ms (puppeteer, webdriver-gecko, webdriver-chromium)
  browserWaitDelay: 0, // Time to wait before capturing the page in ms
  browserWaitUntil: 'networkidle0', // When to consider the page is loaded (puppeteer, webdriver-gecko, webdriver-chromium) (choices: "networkidle0", "networkidle2", "load", "domcontentloaded")
  browserWaitUntilFallback: true, // Retry with the next value of --browser-wait-until when a timeout error is thrown
  browserDebug: false, // Enable debug mode (puppeteer, webdriver-gecko, webdriver-chromium)
  browserArgs: '', // Arguments provided as a JSON array and passed to the browser (puppeteer, webdriver-gecko, webdriver-chromium)
  browserStartMinimized: false, // Minimize the browser (puppeteer)
  browserCookiesFile: '', // Path of the cookies file formatted as a JSON file or a Netscape text file (puppeteer, webdriver-gecko, webdriver-chromium, jsdom)
  browserIgnoreInsecureCerts: false, // Ignore HTTPs errors
  compressCSS: undefined, // Compress CSS stylesheets
  compressHTML: undefined, // Compress HTML content
  dumpContent: false, // Dump the content of the processed page in the console ('true' when running in Docker)
  filenameTemplate: '{page-title} ({date-iso} {time-locale}).html', // Template used to generate the output filename (see help page of the extension for more info)
  filenameConflictAction: 'uniquify', // Action when the filename is conflicting with an existing one on the filesystem. The possible values are "uniquify" (default), "overwrite", and "skip"
  filenameReplacementCharacter: '_', // The character used for replacing invalid characters in filenames
  filenameMaxLength: 192, // Specify the maximum length of the filename
  filenameMaxLengthUnit: 'bytes', // Specify the unit of the maximum length of the filename ('bytes' or 'chars')
  groupDuplicateImages: true, // Group duplicate images into CSS custom properties
  maxSizeDuplicateImages: 524288, // Maximum size in bytes of duplicate images stored as CSS custom properties
  httpProxyServer: '', // Proxy address (puppeteer)
  httpProxyUsername: '', // HTTP username (puppeteer)
  httpProxyPassword: '', // HTTP password (puppeteer)
  includeInfobar: false, // Include the infobar
  insertMetaCsp: true, // Include a <meta> tag with a CSP to avoid potential requests to the internet when viewing a page
  loadDeferredImages: true, // Load deferred (a.k.a. lazy-loaded) images (puppeteer, webdriver-gecko, webdriver-chromium)
  loadDeferredImagesDispatchScrollEvent: false, // Dispatch 'scroll' event when loading deferred images
  loadDeferredImagesMaxIdleTime: 1500, // Maximum delay of time to wait for deferred images in ms (puppeteer, webdriver-gecko, webdriver-chromium)
  loadDeferredImagesKeepZoomLevel: false, // Load deferred images by keeping the page zoomed out
  maxParallelWorkers: 8, // Maximum number of browsers launched in parallel when processing a list of URLs
  maxResourceSizeEnabled: false, // Enable removal of embedded resources exceeding a given size
  maxResourceSize: 10, // Maximum size of embedded resources in MB (images, stylesheets, scripts, and iframes)
  moveStylesInHead: false, // Move style elements outside the head element into the head element
  outputHtmlFilename: "index.html", // Custom filename for html file
  outputScreenshotFilename: "screenshot.png", // Custom filename for screenshot
  outputDirectory: '', // Path to where to save files (html, screenshot, and metadata), this path must exist
  removeHiddenElements: true, // Remove HTML elements that are not displayed
  removeUnusedStyles: true, // Remove unused CSS rules and unneeded declarations
  removeUnusedFonts: true, // Remove unused CSS font rules
  removeSavedDate: false, // Remove saved date metadata in HTML header
  removeFrames: false, // Remove frames (puppeteer, webdriver-gecko, webdriver-chromium)
  blockScripts: true, // Block scripts
  blockAudios: true, // Block audio elements
  blockVideos: true, // Block video elements
  removeAlternativeFonts: true, // Remove alternative fonts to the ones displayed
  removeAlternativeMedias: true, // Remove alternative CSS stylesheets
  removeAlternativeImages: true, // Remove images for alternative sizes of the screen
  saveOriginalUrls: false, // Save the original URLs in the embedded contents
  saveRawPage: false, // Save the original page without interpreting it into the browser (puppeteer, webdriver-gecko, webdriver-chromium)
  webDriverExecutablePath: '', // Path to Selenium WebDriver executable (webdriver-gecko, webdriver-chromium)
  userScriptEnabled: true, // Enable the event API allowing to execute scripts before the page is saved
  includeBOM: undefined, // Include the UTF-8 BOM into the HTML page
  crawlLinks: false, // Crawl and save pages found via inner links
  crawlInnerLinksOnly: true, // Crawl pages found via inner links only if they are hosted on the same domain
  crawlRemoveUrlFragment: true, // Remove URL fragments found in links
  crawlMaxDepth: 1, // Max depth when crawling pages found in internal and external links (0: infinite)
  crawlExternalLinksMaxDepth: 1, // Max depth when crawling pages found in external links (0: infinite)
  crawlReplaceUrls: false, // Replace URLs of saved pages with relative paths of saved pages on the filesystem
  backgroundSave: true, // Enable background saving
  crawlReplaceURLs: false, // Replace URLs of saved pages with relative paths of saved pages on the filesystem
  crawlRemoveURLFragment: true, // Remove URL fragments found in links
  insertMetaCSP: true, // Include a <meta> tag with a Content Security Policy (CSP) to avoid potential requests to the internet when viewing a page
  saveOriginalURLs: false, // Save the original URLs in the embedded contents
  httpHeaders: {}, // Extra HTTP headers
  browserCookies: [], // Ordered list of cookie parameters
  browserScripts: [], // Paths of scripts executed in the page before it is loaded
  browserStylesheets: [], // Paths of stylesheet files inserted into the page after it is loaded
  crawlRewriteRules: [], // Rewrite rules used to rewrite URLs of crawled pages
  emulateMediaFeatures: [] // Emulate media features
}