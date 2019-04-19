import { BuddhistDate, GregorianDate, ISO8601Date, JapaneseDate, PersianDate } from '../../../src/systems/calendars';
import { DayOfWeek } from '../../../src/systems/calendars/fields';

const NEW_YORK = 'America/New_York';
const LOS_ANGELES = 'America/Los_Angeles';
const LONDON = 'Europe/London';

// Sat March 11, 2000 8:00:25 AM UTC
const BASE = 952761625000;

const buddhist = (e: number, z: string) => BuddhistDate.fromUnixEpoch(e, z, 1, 1);
const gregorian = (e: number, z: string) => GregorianDate.fromUnixEpoch(e, z, 1, 1);
const iso8601 = (e: number, z: string) => ISO8601Date.fromUnixEpoch(e, z, 1, 1);
const japanese = (e: number, z: string) => JapaneseDate.fromUnixEpoch(e, z, 1, 1);
const persian = (e: number, z: string) => PersianDate.fromUnixEpoch(e, z, 1, 1);

test('years', () => {
  const date: GregorianDate = gregorian(BASE, NEW_YORK);
  let q: GregorianDate;
  expect(date.toString()).toEqual('Gregorian 2000-03-11 03:00:25.000 America/New_York');

  q = date.add({ year: 1 });
  expect(q.toString()).toEqual('Gregorian 2001-03-11 03:00:25.000 America/New_York');

  // TODO: check fractional years
  q = date.add({ year: 1.5 });
  expect(q.toString()).toEqual('Gregorian 2001-09-09 16:00:25.000 America/New_York');

  q = date.add({ year: -3 });
  expect(q.toString()).toEqual('Gregorian 1997-03-11 03:00:25.000 America/New_York');

  // Earliest timezone offset for NY is LMT -4:56:2
  q = date.add({ year: -305 });
  expect(q.toString()).toEqual('Gregorian 1695-03-11 03:04:23.000 America/New_York');

  q = date.add({ year: -1000 });
  expect(q.toString()).toEqual('Gregorian 1000-03-11 03:04:23.000 America/New_York');

  q = date.add({ year: 1100 });
  expect(q.toString()).toEqual('Gregorian 3100-03-11 03:00:25.000 America/New_York');

  q = date.add({ zoneId: LOS_ANGELES });
  expect(q.toString()).toEqual('Gregorian 2000-03-11 00:00:25.000 America/Los_Angeles');
});

test('iso-8601 years', () => {
  const date: ISO8601Date = iso8601(BASE, NEW_YORK);
  let q: ISO8601Date;
  expect(date.toString()).toEqual('ISO8601 2000-03-11 03:00:25.000 America/New_York');

  q = date.add({ year: 1 });
  expect(q.toString()).toEqual('ISO8601 2001-03-11 03:00:25.000 America/New_York');

  q = date.add({ year: -5 });
  expect(q.toString()).toEqual('ISO8601 1995-03-11 03:00:25.000 America/New_York');
});

test('japanese years', () => {
  const date: JapaneseDate = japanese(BASE, NEW_YORK);
  let q: JapaneseDate;
  expect(date.toString()).toEqual('Japanese 2000-03-11 03:00:25.000 America/New_York');

  q = date.add({ year: 1 });
  expect(q.toString()).toEqual('Japanese 2001-03-11 03:00:25.000 America/New_York');

  q = date.add({ year: -5 });
  expect(q.toString()).toEqual('Japanese 1995-03-11 03:00:25.000 America/New_York');
});

test('persian years', () => {
  const date: PersianDate = persian(BASE, NEW_YORK);
  let q: PersianDate;
  expect(date.toString()).toEqual('Persian 1378-12-21 03:00:25.000 America/New_York');

  q = date.add({ year: 1 });
  expect(q.toString()).toEqual('Persian 1379-12-21 03:00:25.000 America/New_York');

  q = date.add({ year: -5 });
  expect(q.toString()).toEqual('Persian 1373-12-21 03:00:25.000 America/New_York');
});

test('buddhist years', () => {
  const date: BuddhistDate = buddhist(BASE, NEW_YORK);
  let q: BuddhistDate;
  expect(date.toString()).toEqual('Buddhist 2543-03-11 03:00:25.000 America/New_York');

  q = date.add({ year: 1 });
  expect(q.toString()).toEqual('Buddhist 2544-03-11 03:00:25.000 America/New_York');

  q = date.add({ year: -5 });
  expect(q.toString()).toEqual('Buddhist 2538-03-11 03:00:25.000 America/New_York');
});

test('months', () => {
  const date: GregorianDate = gregorian(BASE, NEW_YORK);
  let q: GregorianDate;
  expect(date.toString()).toEqual('Gregorian 2000-03-11 03:00:25.000 America/New_York');

  q = date.add({ month: 1 });
  expect(q.toString()).toEqual('Gregorian 2000-04-11 04:00:25.000 America/New_York');

  q = date.add({ month: 1.5 });
  expect(q.toString()).toEqual('Gregorian 2000-04-26 16:00:25.000 America/New_York');

  q = date.add({ month: 7 });
  expect(q.toString()).toEqual('Gregorian 2000-10-11 04:00:25.000 America/New_York');

  q = date.add({ month: 9 });
  expect(q.toString()).toEqual('Gregorian 2000-12-11 03:00:25.000 America/New_York');

  q = date.add({ month: -17 });
  expect(q.toString()).toEqual('Gregorian 1998-10-11 04:00:25.000 America/New_York');

  q = date.add({ month: -60 });
  expect(q.toString()).toEqual('Gregorian 1995-03-11 03:00:25.000 America/New_York');

  q = date.add({ month: -600 });
  expect(q.toString()).toEqual('Gregorian 1950-03-11 03:00:25.000 America/New_York');

  q = date.add({ month: 900 });
  expect(q.toString()).toEqual('Gregorian 2075-03-11 03:00:25.000 America/New_York');
});

test('persian months', () => {
  const date: PersianDate = persian(BASE, NEW_YORK);
  let q: PersianDate;
  expect(date.toString()).toEqual('Persian 1378-12-21 03:00:25.000 America/New_York');

  // Oddities show up with time and non-gregorian calendars, since the timezone
  // rules are based on the gregorian calendar. So adding 1 month below shifts
  // to the next persian year, but in gregorian calendar it crosses a daylight
  // savings boundary for America/New_York, so the hour changes.
  q = date.add({ month: 1 });
  expect(q.toString()).toEqual('Persian 1379-01-21 04:00:25.000 America/New_York');

  q = date.add({ month: 1.5 });
  expect(q.toString()).toEqual('Persian 1379-02-05 16:00:25.000 America/New_York');
});

test('days', () => {
  const date: GregorianDate = gregorian(BASE, NEW_YORK);
  let q: GregorianDate;
  expect(date.toString()).toEqual('Gregorian 2000-03-11 03:00:25.000 America/New_York');

  q = date.add({ day: 1 });
  expect(q.toString()).toEqual('Gregorian 2000-03-12 03:00:25.000 America/New_York');

  q = date.add({ day: 1.5 });
  expect(q.toString()).toEqual('Gregorian 2000-03-12 15:00:25.000 America/New_York');

  q = date.add({ day: 15 });
  expect(q.toString()).toEqual('Gregorian 2000-03-26 03:00:25.000 America/New_York');

  q = date.add({ day: -45 });
  expect(q.toString()).toEqual('Gregorian 2000-01-26 03:00:25.000 America/New_York');

  q = date.add({ day: 450 });
  expect(q.toString()).toEqual('Gregorian 2001-06-04 04:00:25.000 America/New_York');

  q = date.add({ day: -3650 });
  expect(q.toString()).toEqual('Gregorian 1990-03-14 03:00:25.000 America/New_York');
});

test('weeks', () => {
  const date: GregorianDate = gregorian(BASE, NEW_YORK);
  let q: GregorianDate;
  expect(date.toString()).toEqual('Gregorian 2000-03-11 03:00:25.000 America/New_York');
  expect(date.dayOfWeek()).toEqual(DayOfWeek.SATURDAY);

  q = date.add({ week: 1 });
  expect(q.toString()).toEqual('Gregorian 2000-03-18 03:00:25.000 America/New_York');
  expect(q.dayOfWeek()).toEqual(DayOfWeek.SATURDAY);

  q = date.add({ week: 1.5 }); // 10 days 12 hours
  expect(q.toString()).toEqual('Gregorian 2000-03-21 15:00:25.000 America/New_York');
  expect(q.dayOfWeek()).toEqual(DayOfWeek.TUESDAY);

  q = date.add({ week: 10 });
  expect(q.toString()).toEqual('Gregorian 2000-05-20 04:00:25.000 America/New_York');
  expect(q.dayOfWeek()).toEqual(DayOfWeek.SATURDAY);

  q = date.add({ week: -52 });
  expect(q.toString()).toEqual('Gregorian 1999-03-13 03:00:25.000 America/New_York');
  expect(q.dayOfWeek()).toEqual(DayOfWeek.SATURDAY);

  q = date.add({ week: 520 });
  expect(q.toString()).toEqual('Gregorian 2010-02-27 03:00:25.000 America/New_York');
  expect(q.dayOfWeek()).toEqual(DayOfWeek.SATURDAY);
});

test('timezone', () => {
  const date: GregorianDate = gregorian(BASE, NEW_YORK);
  let q: GregorianDate;
  expect(date.toString()).toEqual('Gregorian 2000-03-11 03:00:25.000 America/New_York');

  q = date.add({ zoneId: LOS_ANGELES });
  expect(q.toString()).toEqual('Gregorian 2000-03-11 00:00:25.000 America/Los_Angeles');

  q = date.add({ zoneId: LONDON });
  expect(q.toString()).toEqual('Gregorian 2000-03-11 08:00:25.000 Europe/London');
});

test('hours', () => {
  const date: GregorianDate = gregorian(BASE, NEW_YORK);
  let q: GregorianDate;
  expect(date.toString()).toEqual('Gregorian 2000-03-11 03:00:25.000 America/New_York');

  q = date.add({ hour: 5 });
  expect(q.toString()).toEqual('Gregorian 2000-03-11 08:00:25.000 America/New_York');

  q = date.add({ hour: 10.5 });
  expect(q.toString()).toEqual('Gregorian 2000-03-11 13:30:25.000 America/New_York');

  q = date.add({ hour: -24 });
  expect(q.toString()).toEqual('Gregorian 2000-03-10 03:00:25.000 America/New_York');

  q = date.add({ hour: 72 });
  expect(q.toString()).toEqual('Gregorian 2000-03-14 03:00:25.000 America/New_York');

  q = date.add({ hour: 96 });
  expect(q.toString()).toEqual('Gregorian 2000-03-15 03:00:25.000 America/New_York');

  q = date.add({ hour: 108 });
  expect(q.toString()).toEqual('Gregorian 2000-03-15 15:00:25.000 America/New_York');
});

test('minute', () => {
  const date: GregorianDate = gregorian(BASE, NEW_YORK);
  let q: GregorianDate;
  expect(date.toString()).toEqual('Gregorian 2000-03-11 03:00:25.000 America/New_York');

  q = date.add({ minute: 60 });
  expect(q.toString()).toEqual('Gregorian 2000-03-11 04:00:25.000 America/New_York');

  q = date.add({ minute: 5.505 });
  expect(q.toString()).toEqual('Gregorian 2000-03-11 03:05:55.300 America/New_York');
});
