import * as migration_20260819_052552_initial from './20260819_052552_initial';
import * as migration_20260819_092648_add_financial_value_placements from './20260819_092648_add_financial_value_placements';

export const migrations = [
  {
    up: migration_20260819_052552_initial.up,
    down: migration_20260819_052552_initial.down,
    name: '20260819_052552_initial',
  },
  {
    up: migration_20260819_092648_add_financial_value_placements.up,
    down: migration_20260819_092648_add_financial_value_placements.down,
    name: '20260819_092648_add_financial_value_placements'
  },
];
