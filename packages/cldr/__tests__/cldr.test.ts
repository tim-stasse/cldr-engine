import { getCLDR, loader, asyncLoader } from './helpers';
import { Quantity } from '@phensley/cldr-core';

test('init framework', () => {
  const framework = getCLDR();
  let api = framework.get('en');
  expect(framework.info()).toEqual('packs loaded: 1');

  expect(() => framework.get('xx')).toThrowError();

  expect(api.Locales.current().id).toEqual('en');
  expect(api.Locales.resolve('zh').tag.expanded()).toEqual('zh-Hans-CN');
  expect(api.Locales.bundle().id()).toEqual('en-Latn-US');

  expect(api.General.characterOrder()).toEqual('ltr');
  expect(api.General.lineOrder()).toEqual('ttb');

  // TODO:
  // expect(api.Calendars.getMonth('3')).toEqual('March');
  let s: string;

  const ux = { epoch: 1109934428000, zoneId: 'America/New_York'};
  s = api.Calendars.formatDate(ux, { datetime: 'full' });
  s = api.Calendars.formatDate(ux, { datetime: 'full' });
  expect(s).toEqual('Friday, March 4, 2005 at 6:07:08 AM Eastern Standard Time');

  const currOpts: CurrencyFormatOptions = { style: 'short' };
  s = api.Numbers.formatCurrency('345678', 'USD', currOpts);
  s = api.Numbers.formatCurrency('345678', 'USD', currOpts);
  expect(s).toEqual('$346K');

  const qty: Quantity = { value: '17.69', unit: 'pound' };
  const unitOpts = { maximumFractionDigits: 1 };
  s = api.Units.formatQuantity(qty, unitOpts);
  s = api.Units.formatQuantity(qty, unitOpts);
  expect(s).toEqual('17.7 pounds');

  framework.get('es');
  expect(framework.info()).toEqual('packs loaded: 2');
  framework.get('es');
  expect(framework.info()).toEqual('packs loaded: 2');

  // Bundle with invalid region
  api = framework.get('ar-Arab-XX');
  expect(api.Locales.bundle().language()).toEqual('ar');
  expect(api.Locales.bundle().languageRegion()).toEqual('ar-EG');
  expect(api.Locales.bundle().languageScript()).toEqual('ar-Arab');

  // Bundle with invalid script
  api = framework.get('ar-Cyrl-SA');
  expect(api.Locales.bundle().language()).toEqual('ar');
  expect(api.Locales.bundle().languageRegion()).toEqual('ar-EG');
  expect(api.Locales.bundle().languageScript()).toEqual('ar-Arab');
});

test('async loader', () => {
  const framework = getCLDR();
  const en = framework.get('en');
  const es = framework.get('es');

  expect(framework.getAsync('en')).resolves.toEqual(en);
  expect(framework.getAsync('es')).resolves.toEqual(es);

  expect(framework.getAsync('xx')).rejects.toContain('no such file');

  expect(framework.getAsync('de')).resolves.toBeTruthy();
  expect(framework.getAsync('zh-TW')).resolves.toBeTruthy();

  expect(framework.getAsync('de')).resolves.toBeTruthy();
  expect(framework.getAsync('zh-TW')).resolves.toBeTruthy();
});
