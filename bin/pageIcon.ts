#!/usr/bin/env node

import { Command } from '@oclif/command';
import pageIcon from '../src';

class Pageicon extends Command {
    static args = [
      {
        name: 'url',
        description: 'URL to search the icon in',
        required: true,
      },
      {
        name: 'extension',
        description: 'Filetype to search for',
        required: false,
        options: ['.jpg', '.png', '.ico'],
      },
    ]

    static description = 'Find the best icon for a web page'

    static examples = [
      '$ pageicon <url> [extension]',
      '$ pageicon https://www.wikipedia.com',
      '$ pageicon https://www.wikipedia.com .png',
    ]

    async run(): Promise<void> {
      const { args } = this.parse(Pageicon);
      const result = await pageIcon(args.url, args.extension);
      console.log(result);
    }
}

Pageicon.run()
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
  .catch(require('@oclif/errors/handle'));
