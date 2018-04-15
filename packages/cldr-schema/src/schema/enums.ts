import { KeyIndex } from '../types/instructions';

export enum Plural {
  OTHER = 0,
  ZERO = 1,
  ONE = 2,
  TWO = 3,
  FEW = 4,
  MANY = 5,
}

export const PluralValues = 'other zero one two few many'.split(' ');

export const PluralIndex = new KeyIndex(PluralValues);

export const pluralCategory = (s: string): Plural => {
  switch (s) {
  case 'zero':
    return Plural.ZERO;
  case 'one':
    return Plural.ONE;
  case 'two':
    return Plural.TWO;
  case 'few':
    return Plural.FEW;
  case 'many':
    return Plural.MANY;
  default:
    return Plural.OTHER;
  }
};

export const pluralString = (c: Plural): string => PluralValues[c] || 'other';

export type PluralType = 'other' | 'zero' | 'one' | 'two' | 'few' | 'many';

export enum Alt {
  NONE = 0,
  VARIANT = 1,
  SHORT = 2,
  NARROW = 3,
}

export const AltValues = '|-alt-variant|-alt-short|-alt-narrow'.split('|');

export const AltIndex = new KeyIndex(['none', 'short', 'narrow', 'variant', 'stand-alone']);

export type AltType = 'none' | 'short' | 'narrow' | 'variant' | 'stand-alone';

export enum Yeartype {
  NONE = 0,
  LEAP = 1,
}

export const YeartypeValues = '|-yeartype-leap'.split('|');
