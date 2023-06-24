# @pawanpaudel93/single-file

Save a url single page html and screenshot using [puppeteer](https://github.com/puppeteer/puppeteer).

## Installation

Using npm,

```sh
npm install @pawanpaudel93/single-file
```

Using yarn,

```sh
yarn add @pawanpaudel93/single-file
```

And using pnpm,

```sh
yarn add @pawanpaudel93/single-file

```

## Build

```sh
yarn
yarn build
```

## Test

```sh
yarn test
```

## Usage

```ts
import {saveSingleFile} from "../src/index"
import {promises} from "fs"
import { findChrome } from 'find-chrome-bin'
import { BrowserFetcher } from 'puppeteer-core'
import { join } from 'path'
import { homedir } from 'os'

const main = async () => {
  const outputDirectory = "./output"
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
      outputDirectory: outputDirectory,
      saveScreenshot: true
  })
  const files = await promises.readdir(outputDirectory)
  console.log(files)
}

main()
```

## Acknowledgments

- This project is based on the [Original Repository](https://github.com/gildas-lormeau/single-file-cli) by [Gildas Lormeau](https://github.com/gildas-lormeau).

## Modifications

- Restructured the original code.
- Added screenshot & metadata saving functionality.
- Only used puppeteer as the backend and others are removed.
- Converted the original CLI version to library to be used by others.

These modifications were made to create a package that can be used by others in their code easily.

## License

- This project is based on the [Original Repository](https://github.com/gildas-lormeau/single-file-cli), which is licensed under the GNU Affero General Public License (AGPL). Any modifications made to the original code are also licensed under the AGPL.
