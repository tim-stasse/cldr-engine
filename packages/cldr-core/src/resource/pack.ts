import { Bundle } from '@phensley/cldr-schema';
import { base100decode } from './encoding';
import { Locale, LanguageTag, LanguageResolver } from '../locale';

const DELIMITER = '\t';

export type ExceptionIndex = { [y: number]: number };

export class StringBundle implements Bundle {

  constructor(
    readonly id: string,
    readonly strings: string[],
    readonly exceptions: string[],
    readonly index?: ExceptionIndex
  ) { }

  bundleId(): string {
    return this.id;
  }

  get(offset: number): string {
    // If there is an exception index, attempt to resolve it.
    if (this.index !== undefined) {
      const i = this.index[offset];
      if (i !== undefined) {
        return this.exceptions[i] || '';
      }
    }

    // Return the actual string.
    return this.strings[offset] || '';
  }
}

/**
 * Bundle that gets returned when a lookup fails.
 *
 * TODO: once public api is hammered out this may be unnecessary as
 * we may throw an error.
 */
export class DummyBundle implements Bundle {

  bundleId(): string {
    return 'und';
  }

  get(offset: number): string {
    return '';
  }

}

const DUMMY_BUNDLE = new DummyBundle();

/**
 * Layer in the pack that supports all regions for a single language + script.
 */
export class PackScript {

  readonly _strings: string[];
  readonly _exceptions: string[];
  readonly _regions: { [x: string]: string };
  readonly _cache: { [x: string]: ExceptionIndex} = {};

  constructor(
    strings: string,
    exceptions: string,
    regions: { [x: string]: string }
  ) {
    this._strings = strings.split(DELIMITER);
    this._exceptions = exceptions.split(DELIMITER);
    this._regions = regions;
  }

  get(tag: LanguageTag): Bundle {
    const region = tag.region();
    const index = this._cache[region] || this.decode(region);
    return index === undefined ?
      DUMMY_BUNDLE :
      new StringBundle(tag.compact(), this._strings, this._exceptions, index);
  }

  private decode(region: string): ExceptionIndex | undefined {
    const raw = this._regions[region];
    if (raw === undefined) {
      return undefined;
    }

    const decoded = raw.split(' ').map(base100decode);
    const index: ExceptionIndex = {};
    for (let i = 0; i < decoded.length; i += 2) {
      const k = decoded[i];
      const v = decoded[i + 1];
      index[k] = v;
    }
    this._cache[region] = index;
    return index;
  }
}

/**
 * Runtime resource pack manager.
 */
export class Pack {

  readonly version: string;
  readonly cldrVersion: string;
  readonly language: string;
  readonly scripts: { [x: string]: PackScript } = {};

  constructor(data: string) {
    const raw: any = JSON.parse(data);
    const { version, cldr, language } = raw;
    if (typeof version === undefined) {
      throw new Error('Severe error: data does not look like a valid resource pack.');
    }
    this.version = version;
    this.cldrVersion = cldr;
    this.language = language;
    Object.keys(raw.scripts).forEach(k => {
      const obj = raw.scripts[k];
      this.scripts[k] = new PackScript(obj.strings, obj.exceptions, obj.regions);
    });
  }

  get(tag: LanguageTag): Bundle {
    // We need the script and region to find the correct string layer. Caller should
    // ideally supply a resolved language tag to avoid the overhead of this call.
    if (!tag.hasLanguage() || !tag.hasScript() || !tag.hasRegion()) {
      tag = LanguageResolver.resolve(tag);
    }

    // Strings for a language are organized by script.
    const script = this.scripts[tag.script()];
    return script === undefined ? DUMMY_BUNDLE : script.get(tag);
  }

}
