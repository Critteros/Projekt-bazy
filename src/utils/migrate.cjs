/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const tsNode = require('ts-node');
const tsPaths = require('tsconfig-paths');
const config = require('../../tsconfig.json');

config.compilerOptions.module = 'commonjs';

tsNode.register(config);
tsPaths.register({
  paths: config.compilerOptions.paths,
  baseUrl: '.',
});

// eslint-disable-next-line
// @ts-ignore
require('node-pg-migrate/bin/node-pg-migrate');
