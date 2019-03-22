import { languageBundle } from '../../_helpers';

import {
  Bundle,
  CalendarsImpl,
  InternalsImpl,
  PrivateApiImpl
} from '../../../src';

const INTERNALS = new InternalsImpl();

const privateApi = (bundle: Bundle) => new PrivateApiImpl(bundle, INTERNALS);
const calendarsApi = (tag: string) => {
  const bundle = languageBundle(tag);
  return new CalendarsImpl(bundle, INTERNALS, privateApi(bundle));
};

test('context transforms', () => {
  const api = calendarsApi('es');
  const date = { date: 123456666666, zoneId: 'America/New_York' };
  let s: string;

  s = api.formatDate(date, { date: 'full' });
  expect(s).toEqual('jueves, 29 de noviembre de 1973');

  s = api.formatDate(date, { date: 'full', context: 'standalone' });
  expect(s).toEqual('Jueves, 29 de noviembre de 1973');

  s = api.formatDate(date, { date: 'full', context: 'begin-sentence' });
  expect(s).toEqual('Jueves, 29 de noviembre de 1973');

  s = api.formatRelativeTimeField(2, 'day');
  expect(s).toEqual('pasado mañana');

  s = api.formatRelativeTimeField(2, 'day', { context: 'begin-sentence' });
  expect(s).toEqual('Pasado mañana');
});
