#!/usr/bin/env node

const pageIcon = require('../src/index.js');

const args = process.argv.slice(2, 4);

const pageUrl = args[0];
const extension = args[1];

(async () => {
    const result = await pageIcon.default(pageUrl, extension);
    console.log(result)
})()
