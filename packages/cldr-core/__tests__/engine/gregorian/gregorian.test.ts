import { EN, EN_GB, ES, ES_419, FR, LT, SR, ZH } from '../../_helpers';
import { buildSchema } from '../../../src/schema';
import { GregorianEngine, GregorianInternal, WrapperInternal } from '../../../src/engine';
import { ZonedDateTime } from '../../../src/types/datetime';

const SCHEMA = buildSchema();
const INTERNAL = new GregorianInternal(SCHEMA, new WrapperInternal());

const DAY = 86400000;
const LOS_ANGELES = 'America/Los_Angeles';
const MARCH_11_2018 = new ZonedDateTime(1520751625000, LOS_ANGELES);
const MARCH_14_2018 = new ZonedDateTime(1520751625000 + (DAY * 3), LOS_ANGELES);

test('basics', () => {
  let engine = new GregorianEngine(INTERNAL, EN);
  let s = engine.format(MARCH_11_2018, { date: 'full' });
  expect(s).toEqual('Saturday, March 10, 2018');

  s = engine.formatInterval(MARCH_11_2018, MARCH_14_2018, 'yMMMd');
  expect(s).toEqual('Mar 10 – 14, 2018');

  engine = new GregorianEngine(INTERNAL, EN_GB);
  s = engine.format(MARCH_11_2018, { date: 'full' });
  expect(s).toEqual('Saturday, 10 March 2018');

  s = engine.formatInterval(MARCH_11_2018, MARCH_14_2018, 'yMMMd');
  expect(s).toEqual('10–14 Mar 2018');

  engine = new GregorianEngine(INTERNAL, ES);
  s = engine.format(MARCH_11_2018, { date: 'full' });
  expect(s).toEqual('sábado, 10 de marzo de 2018');

  engine = new GregorianEngine(INTERNAL, ES_419);
  s = engine.format(MARCH_11_2018, { date: 'medium' });
  expect(s).toEqual('10 mar. 2018');

  engine = new GregorianEngine(INTERNAL, FR);
  s = engine.format(MARCH_11_2018, { date: 'full' });
  expect(s).toEqual('samedi 10 mars 2018');

  engine = new GregorianEngine(INTERNAL, LT);
  s = engine.format(MARCH_11_2018, { date: 'full' });
  expect(s).toEqual('2018 m. kovo 10 d., šeštadienis');

  engine = new GregorianEngine(INTERNAL, SR);
  s = engine.format(MARCH_11_2018, { date: 'full' });
  expect(s).toEqual('субота, 10. март 2018.');

  engine = new GregorianEngine(INTERNAL, ZH);
  s = engine.format(MARCH_11_2018, { date: 'full' });
  expect(s).toEqual('2018年3月10日星期六');
});
