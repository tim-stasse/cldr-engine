import { calendarsApi } from '../_helpers';

test('custom calendars', () => {
  const zoneId = 'America/New_York';
  const date = { date: new Date(2019, 5, 10, 12, 34, 56), zoneId };
  const api = calendarsApi('en', { calendars: [] });
  let s: string;

  s = api.formatDate(date, { datetime: 'full' });
  expect(s).toEqual('Monday, June 10, 2019 at 8:34:56 AM Eastern Daylight Time');

  // We've omitted all non-gregorian calendars, so all date formatting
  // will use the given calendar's rules but fall back to gregorian
  // patterns, names, etc

  s = api.formatDate(date, { datetime: 'full', ca: 'buddhist' });
  expect(s).toEqual('Monday, June 10, 2019 at 8:34:56 AM Eastern Daylight Time');

  s = api.formatDate(date, { datetime: 'full', ca: 'persian' });
  expect(s).toEqual('Monday, June 10, 2019 at 8:34:56 AM Eastern Daylight Time');
});

test('skeleton pattern defaulting', () => {
  const zoneId = 'America/New_York';
  const date = { date: new Date(2019, 5, 10, 12, 34, 56), zoneId };
  const api = calendarsApi('en', { calendars: [] });
  let s: string;

  // If all skeletons are ommitted, it will attempt to match the input
  // skeleton against one of the named formats, e.g. 'short', 'long', etc.

  s = api.formatDate(date, { date: 'short' });
  expect(s).toEqual('6/10/19');

  s = api.formatDate(date, { skeleton: 'yyMd' });
  expect(s).toEqual('6/10/19');

  s = api.formatDate(date, { skeleton: 'yMd' });
  expect(s).toEqual('6/10/2019');

  // This requests year and quarter, but we get the closest match
  s = api.formatDate(date, { skeleton: 'yQQQQ' });
  expect(s).toEqual('Jun 10, 2019');
});

test('skeleton pattern quarters', () => {
  const zoneId = 'America/New_York';
  const date = { date: new Date(2019, 5, 10, 12, 34, 56), zoneId };
  const api = calendarsApi('en', {
    calendars: [],
    'gregorian-available-format': ['yQQQ', 'yQQQQ']
  });

  let s: string;

  // Skeleton matcher can't narrow 'yQQQ' to 'yQ', so we get 'yQQQ' here
  s = api.formatDate(date, { skeleton: 'yQ' });
  expect(s).toEqual('Q2 2019');

  s = api.formatDate(date, { skeleton: 'yQQQQ' });
  expect(s).toEqual('2nd quarter 2019');
});
