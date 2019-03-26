import { roundtrip, Timestamp } from './_helpers';
import { TZ, ZoneInfo } from '../src';

const ID = 'America/New_York';
const MAR102019_065930 = new Timestamp(1552201170000);
const NOV181883_170000 = new Timestamp(-2717650800000);

test('new york min / max', () => {
  let info = TZ.fromUTC(ID, Timestamp.MIN.n);
  expect(info).toEqual({ abbr: 'LMT', dst: 0, offset: -17762000 });

  const t = NOV181883_170000;
  info = TZ.fromUTC(ID, t.n);
  expect(info).toEqual({ abbr: 'EST', dst: 0, offset: -18000000 });

  info = TZ.fromUTC(ID, t.mins(-1).n);
  expect(info).toEqual({ abbr: 'LMT', dst: 0, offset: -17762000 });

  info = TZ.fromUTC(ID, Timestamp.MAX.n);
  expect(info).toEqual({ abbr: 'EST', dst: 0, offset: -18000000 });
});

test('round trips', () => {
  const t = MAR102019_065930;
  roundtrip(ID, t.n);
  roundtrip(ID, t.mins(1).n);
  roundtrip(ID, t.mins(2).n);
  roundtrip(ID, t.mins(-1).n);
  roundtrip(ID, t.mins(-2).n);
});

test('new york zones', () => {
  const t = MAR102019_065930;
  let info: ZoneInfo | undefined;

  info = TZ.fromUTC(ID, t.n);
  expect(info).toEqual({ abbr: 'EST', dst: 0, offset: -18000000 });

  info = TZ.fromUTC(ID, t.secs(30).n);
  expect(info).toEqual({ abbr: 'EDT', dst: 1, offset: -14400000 });

  info = TZ.fromUTC(ID, t.mins(1).n);
  expect(info).toEqual({ abbr: 'EDT', dst: 1, offset: -14400000 });
});
