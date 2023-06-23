import {saveSingleFile} from "../src/index"
import {promises} from "fs"
import { findChrome } from 'find-chrome-bin'
import { assert, expect, test } from 'vitest'
import { BrowserFetcher } from 'puppeteer-core'
import { join } from 'path'
import { homedir } from 'os'

test('Single File', async() => {
    const outputDirectory = "./output"
    await promises.rm(outputDirectory, { recursive: true, force: true })
    await promises.mkdir(outputDirectory)
    const chromePath = join(homedir(), '.cache', 'puppeteer')
    const { executablePath } = await findChrome({
      download: {
        puppeteer: { BrowserFetcher },
        path: chromePath,
        revision: '1095492',
      },
    })
    await saveSingleFile({
        url: 'https://arweave.org/',
        browserExecutablePath: executablePath,
        output: `${outputDirectory}/index.html`,
        basePath: outputDirectory,
        saveScreenshot: true
    })
    const files = await promises.readdir(outputDirectory)
    await promises.rm(outputDirectory, { recursive: true, force: true })
    expect(files.length).toBe(3)
}, 60000)