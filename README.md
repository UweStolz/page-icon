[![Actions Status](https://github.com/UweStolz/page-icon/workflows/action/badge.svg)](https://github.com/UweStolz/page-icon/actions)


# Page Icon

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

```bash
pageIcon <URL> [extension]
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

Optionally the function takes one of the following extension `.jpg`, `.png` or `.ico`.

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

MIT
