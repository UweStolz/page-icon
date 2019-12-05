#!/usr/bin/env node

import { Command, flags } from '@oclif/command';
import pageIcon from '../src';

export default class Pageicon extends Command {
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

    static flags = {
      buffer: flags.boolean({
        description: 'Only output the whole Buffer of the icon',
        char: 'b',
        required: false,
      }),
    }

    static description = 'Find the best icon for a web page'

    static examples = [
      '$ pageicon <url> [extension]',
      '$ pageicon https://www.wikipedia.com',
      '$ pageicon https://www.wikipedia.com .png',
    ]

    async run(): Promise<void> {
      const parsed = this.parse(Pageicon);
      const result = await pageIcon(parsed.args.url, parsed.args.extension);
      if (parsed.flags.buffer) {
        const buffer = result.data.toString('hex').match(/../g)?.join(' ');
        console.log(buffer);
      } else {
        console.log(result);
      }
    }
}

Pageicon.run()
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
  .catch(require('@oclif/errors/handle'));
