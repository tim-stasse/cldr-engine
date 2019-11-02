import { CurrencySpacingPattern, CurrencySpacingPos } from '@phensley/cldr-types';
import { NumberSymbolType, NumberSystemName } from '@phensley/cldr-schema';

export type CurrencySpacing = { [P in CurrencySpacingPos]: { [Q in CurrencySpacingPattern]: string } };
export type NumberSymbols =  { [P in NumberSymbolType]: string };

export interface NumberParams {
  numberSystemName: NumberSystemName;
  digits: string[];
  latinDigits: string[];
  symbols: NumberSymbols;
  minimumGroupingDigits: number;
  primaryGroupingSize: number;
  secondaryGroupingSize: number;
  beforeCurrency: CurrencySpacing;
  afterCurrency: CurrencySpacing;
}

export interface NumberFormatRequest {
  // readonly numberSystem:
}