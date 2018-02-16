import {
  Alt,
  Bundle,
  FieldWidth,
  FieldWidthType,
  IntervalFormatType,
  DayPeriodType,
  QuarterType,
  MonthType,
  WeekdayType,
  EraType,
  FormatWidth,
  FormatWidthType
} from '@phensley/cldr-schema';

import { ZonedDateTime } from '../../types/datetime';
import { GregorianInternal } from './internal';
import { GregorianFormatOptions } from './options';

const ISO_WEEKDATE_EXTENDED = "YYYY-'W'ww-";
const ISO_WEEKDATE_COMPACT = "YYYY'W'ww";

/**
 * Date formatting using the Gregorian calendar.
 */
export class GregorianEngine {

  constructor(
    protected internal: GregorianInternal,
    protected bundle: Bundle
  ) { }

  /**
   * Get standalone day period.
   */
  getDayPeriod(dayPeriod: DayPeriodType, width: FieldWidthType = FieldWidth.WIDE): string {
    return this.internal.dayPeriods.standAlone[width](this.bundle, dayPeriod, Alt.NONE);
  }

  /**
   * Get standalone era name.
   */
  getEra(era: EraType, width: FieldWidthType = FieldWidth.WIDE): string {
    switch (width) {
    case FieldWidth.NARROW:
    case FieldWidth.SHORT:
      return this.internal.eras.narrow(this.bundle, era);
    case FieldWidth.ABBREVIATED:
      return this.internal.eras.abbr(this.bundle, era);
    case FieldWidth.WIDE:
    default:
      return this.internal.eras.names(this.bundle, era);
    }
  }

  /**
   * Get standalone month name.
   */
  getMonth(month: MonthType, width: FieldWidthType = FieldWidth.WIDE): string {
    return this.internal.months.standAlone[width](this.bundle, month);
  }

  /**
   * Get standalone quarter name.
   */
  getQuarter(quarter: QuarterType, width: FieldWidthType = FieldWidth.WIDE): string {
    return this.internal.quarters.standAlone[width](this.bundle, quarter);
  }

  /**
   * Get standalone weekday name.
   */
  getWeekday(weekday: WeekdayType, width: FieldWidthType = FieldWidth.WIDE): string {
    return this.internal.weekdays.standAlone[width](this.bundle, weekday);
  }

  getCompactISOWeekDate(date: ZonedDateTime): string {
    return this.getISOWeekDate(date, ISO_WEEKDATE_COMPACT);
  }

  getExtendedISOWeekDate(date: ZonedDateTime): string {
    return this.getISOWeekDate(date, ISO_WEEKDATE_EXTENDED);
  }

  // TODO: Support context transforms, context-sensitive fields
  // https://www.unicode.org/reports/tr35/tr35-dates.html#months_days_quarters_eras

  format(date: ZonedDateTime, options: GregorianFormatOptions = {}): string {
    // let pattern = '';
    // if (options.datetime !== undefined) {
    //   pattern = this.internal.Gregorian.timeFormats(this.bundle, (options.datetime || 'full') as FormatWidthType);
    // }
    const width = options.date ? options.date : 'full';
    const pattern = this.internal.Gregorian.dateFormats(this.bundle, width as FormatWidthType);
    return this.internal.format(this.bundle, date, pattern);
  }

  formatParts(date: ZonedDateTime, options: GregorianFormatOptions = {}): any[] {
    const width = options.date ? options.date : 'full';
    const pattern = this.internal.Gregorian.dateFormats(this.bundle, width as FormatWidthType);
    return this.internal.formatParts(this.bundle, date, pattern);
  }

  formatInterval(start: ZonedDateTime, end: ZonedDateTime, skeleton: IntervalFormatType): string {
    const field = start.fieldOfGreatestDifference(end);
    const pattern = this.internal.Gregorian.intervalFormats(skeleton).field(this.bundle, field);
    return this.internal.formatInterval(this.bundle, start, end, pattern);
  }

  private getISOWeekDate(date: ZonedDateTime, pattern: string): string {
    const weekday = date.getDayOfWeek();
    const base = this.internal.format(this.bundle, date, pattern);
    return base + weekday;
  }

}
