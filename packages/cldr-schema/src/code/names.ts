import { scope, vector1, vector2, KeyIndex, Scope } from '../types';
import { RegionIdIndex, ScriptIdIndex } from '../schema/names';
import { AltIndex } from '../schema';

export const NAMES: Scope = scope('Names', 'Names', [

  scope('scripts', 'scripts', [
    vector1('displayName', 'script-id')
  ]),

  scope('regions', 'regions', [
    vector2('displayName', 'alt-key', 'region-id')
  ])

]);

export const NAMES_INDICES = {
  'region-id': RegionIdIndex,
  'script-id': ScriptIdIndex
};
