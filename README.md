[![Actions Status](https://github.com/UweStolz/page-icon/workflows/publish/badge.svg)](https://github.com/UweStolz/page-icon/actions)
[![codecov](https://codecov.io/gh/UweStolz/page-icon-finder/branch/release/graph/badge.svg)](https://codecov.io/gh/UweStolz/page-icon-finder)


# Page Icon finder

A library to find the highest resolution website logo for a given url.

This a TypeScript implementation of the original page-icon library.

### Installation

```bash
yarn global add page-icon-finder
or
yarn add page-icon-finder
```

## Usage

### CLI

```
USAGE
  $ page-icon-finder <URL> [EXTENSION]

ARGUMENTS
  URL        URL to search the icon in
  EXTENSION  (.jpg|.png|.ico) Filetype to search for

OPTIONS
  -b, --buffer  Only output the whole Buffer of the icon

EXAMPLES
  $ pageicon <url> [extension]
  $ pageicon https://www.wikipedia.com
  $ pageicon https://www.wikipedia.com .png

```

### Programmatic

```typescript
import pageIcon from 'page-icon';

const URL = 'https://www.facebook.com/';
  try {
    const icon = await pageIcon(URL);
    console.log('ICON: ', icon);
  } catch (err) {
    console.error(err);
  }
```

### Option

Optionally the function takes one of the following extensions `.jpg`, `.png` or `.ico`.

#### Example Icon Object

```typescript
{ 
    source: 'https://www.facebook.com/images/fb_icon_325x325.png',
    name: 'www.facebook.com',
    data: <Buffer 89 50 4e ... >,
    size: 1919,
    ext: '.png',
    mime: 'image/png' 
}
```

## License

Original author: [Goh Jia Hao](<https://github.com/jiahaog>
)  
Forked from <https://github.com/jiahaog/page-icon>

[MIT](LICENSE.md)
