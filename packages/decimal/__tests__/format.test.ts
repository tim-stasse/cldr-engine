import { Decimal, StringDecimalFormatter } from '../src';

const parse = (s: string) => new Decimal(s);

test('format', () => {
  expect(parse('-12.79').toString()).toEqual('-12.79');
});

test('string', () => {
  const f = new StringDecimalFormatter();
  const digits = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const n = new Decimal('123456789');
  n.format(f, '.', ',', 1, 1, 3, 3, true, digits);
  expect(f.render()).toEqual('bcd,efg,hij');
});
