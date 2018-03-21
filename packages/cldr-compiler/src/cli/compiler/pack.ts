import * as crypto from 'crypto';
import * as fs from 'fs';
import { join } from 'path';
import * as yargs from 'yargs';
import * as zlib from 'zlib';

import { availableLocales, getMain  } from '../../cldr';
import { EncoderMachine, Encoder } from '../../resource/machine';
import { ResourcePack } from '../../resource/pack';
import { getPackageInfo } from './util';
import { localeMap, checkLanguages, writeJSON } from './util';

import { ORIGIN } from '@phensley/cldr-schema';
import { Locale, LanguageResolver } from '@phensley/cldr-core';

/**
 * Encodes fields into a resource pack and returns the offset
 * to the field. Undefined fields get encoded as ''.
 */
export class PackEncoder implements Encoder {

  constructor(private pack: ResourcePack) { }

  encode(field: string | undefined): number {
    return this.pack.add(field === undefined ? '' : field);
  }
}

export const sha256 = (data: string | Buffer): string =>
  crypto.createHash('sha256').update(data).digest('hex');

/**
 * Generates static data that will be impored into the runtime.
 */
export const runPack = (argv: yargs.Arguments) => {
  let langs = Object.keys(localeMap).sort();
  if (argv.lang) {
    langs = checkLanguages(argv.lang.split(','));
  }

  const dest = argv.out;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  let path: string;
  const hashes: { [x: string]: string } = {};
  const pkghash = crypto.createHash('sha256');
  const pkg = getPackageInfo();
  langs.forEach(lang => {
    // Get the list of languages that should live together in this bundle.
    const locales = localeMap[lang]; // [lang].concat(regionsFor(lang));

    // Construct a pack that will contain all strings across all regions for this language.
    const pack = new ResourcePack(lang, pkg.version, pkg.cldrVersion);

    const encoder = new PackEncoder(pack);
    const machine = new EncoderMachine(encoder);

    // For each locale, fetch its data from the JSON files and execute an encoder.
    locales.forEach(locale => {
      pack.push(locale);
      const main = getMain(locale.id);
      machine.encode(main, ORIGIN);
    });

    // Pack all strings appended by the encoder.
    const raw = pack.render();

    // Write uncompressed pack
    let name = `${lang}.json`;
    path = join(dest, name);
    console.warn(`writing:  ${path}`);
    fs.writeFileSync(path, raw, { encoding: 'utf-8' });
    hashes[name] = sha256(raw);

    // Write compressed
    name = `${lang}.json.gz`;
    path = join(dest, name);
    console.warn(`writing:  ${path}`);
    const data = zlib.gzipSync(raw, { level: zlib.constants.Z_BEST_COMPRESSION });
    fs.writeFileSync(path, data, { encoding: 'binary' });
    hashes[name] = sha256(data);
    pkghash.update(data);
  });

  // Write hashes file
  path = join(dest, 'sha256sums.txt');
  console.warn(`writing: ${path}`);

  fs.writeFileSync(path, Object.keys(hashes).sort().map(k => `${hashes[k]}  ${k}`).join('\n') + '\n');

  path = join(dest, 'resource.json');
  console.warn(`writing: ${path}`);

  fs.writeFileSync(path, JSON.stringify({ sha256: pkghash.digest('hex') }));
};
