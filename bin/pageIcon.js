#!/usr/bin/env node

const program = require('commander');
const pageIcon = require('../src/index.js');

program
    .command('pageicon <url> [extension]')
    .description('')
    .action(async (url, extension) => {
        const result = await pageIcon.default(url, extension);
        console.log(result)
    })
    .parse(process.argv);