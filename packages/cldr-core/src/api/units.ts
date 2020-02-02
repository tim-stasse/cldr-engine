import { UnitType } from '@phensley/cldr-types';
import { Part } from '@phensley/decimal';
// import { Decimal, DecimalArg, Part, Rational } from '@phensley/decimal';
// import {
//   ACCELERATION,
//   ANGLE,
//   AREA,
//   CONSUMPTION,
//   DIGITAL,
//   DURATION,
//   ELECTRIC,
//   ENERGY,
//   FactorDef,
//   FORCE,
//   FREQUENCY,
//   GRAPHICS_PER,
//   GRAPHICS_PIXEL,
//   LENGTH,
//   MASS,
//   POWER,
//   PRESSURE,
//   SPEED,
//   TORQUE,
//   UnitFactors,
// } from '@phensley/unit-converter';

import { GeneralInternals, Internals, NumberInternals, UnitInternals } from '../internals';
import { ListPatternType, Quantity, UnitFormatOptions, UnitLength } from '../common';
import { Bundle } from '../resource';
import { PartsValue } from '../utils/render';

import { Units } from './api';
import { PrivateApiImpl } from './private';

const DEFAULT_OPTIONS: UnitFormatOptions = { length: 'long', style: 'decimal' };

// const BASE_FACTORS = [
//   ACCELERATION,
//   ANGLE,
//   AREA,
//   CONSUMPTION,
//   DIGITAL,
//   DURATION,
//   ELECTRIC,
//   ENERGY,
//   FORCE,
//   FREQUENCY,
//   GRAPHICS_PER,
//   GRAPHICS_PIXEL,
//   LENGTH,
//   MASS,
//   POWER,
//   PRESSURE,
//   SPEED,
//   TORQUE,
// ];

// type Converters = { [unit: string]: UnitFactors };

// const addfactors = (c: Converters, defs: FactorDef[]) => {
//   const factors = new UnitFactors(defs);
//   for (const unit of factors.units) {
//     c[unit] = factors;
//   }
// };

export class UnitsImpl implements Units {

  private general: GeneralInternals;
  private numbers: NumberInternals;
  private units: UnitInternals;
  // private converters: Converters = {};

  constructor(
    private bundle: Bundle,
    private internal: Internals,
    private privateApi: PrivateApiImpl
  ) {
    this.general = internal.general;
    this.numbers = internal.numbers;
    this.units = internal.units;

    // Build the unit converter
    // for (const defs of BASE_FACTORS) {
    //   addfactors(this.converters, defs);
    // }

    // TODO: add locale-specific factors for volume
    // TODO: add locale-specific temperature conversions
  }

  availableUnits(): UnitType[] {
    return this.internal.indices['unit-id'].keys.slice(0) as UnitType[];
  }

  // convertDecimal(n: DecimalArg, from: UnitType, to: UnitType, options?: UnitConvertOptions): Decimal | undefined {
  //   const converter = this.converters[from];
  //   if (converter) {
  //     const fac = converter.get(from, to);
  //     if (fac) {
  //       const ctx = options ? options.ctx : undefined;
  //       return new Rational(n).multiply(fac, ctx).toDecimal(ctx);
  //     }
  //   }
  //   return undefined;
  // }

  getUnitDisplayName(name: UnitType, length?: UnitLength): string {
    return this.units.getDisplayName(this.bundle, name, length || 'long');
  }

  formatQuantity(q: Quantity, options?: UnitFormatOptions): string {
    options = options || DEFAULT_OPTIONS;
    const params = this.privateApi.getNumberParams(options.nu);
    const renderer = this.numbers.stringRenderer(params);
    return this.units.format(this.bundle, renderer, q, options, params);
  }

  formatQuantityToParts(q: Quantity, options?: UnitFormatOptions): Part[] {
    options = options || DEFAULT_OPTIONS;
    const params = this.privateApi.getNumberParams(options.nu);
    const renderer = this.numbers.partsRenderer(params);
    return this.units.format(this.bundle, renderer, q, options, params);
  }

  formatQuantitySequence(qs: Quantity[], options?: UnitFormatOptions): string {
    options = options || DEFAULT_OPTIONS;
    const items = qs.map(q => this.formatQuantity(q, options));
    const type = this.selectListType(options);
    return this.general.formatList(this.bundle, items, type);
  }

  formatQuantitySequenceToParts(qs: Quantity[], options?: UnitFormatOptions): Part[] {
    options = options || DEFAULT_OPTIONS;
    const parts: Part[][] = qs.map(q => this.formatQuantityToParts(q, options));
    const type = this.selectListType(options);
    return this.general.formatListImpl(this.bundle, new PartsValue(), parts, type);
  }

  protected selectListType(options: UnitFormatOptions): ListPatternType {
    switch (options.length) {
    case 'narrow':
      return 'unit-narrow';
    case 'short':
      return 'unit-short';
    default:
      return 'unit-long';
    }
  }
}
