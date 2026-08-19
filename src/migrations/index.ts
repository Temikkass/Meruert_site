import * as migration_20260819_052552_initial from './20260819_052552_initial';

export const migrations = [
  {
    up: migration_20260819_052552_initial.up,
    down: migration_20260819_052552_initial.down,
    name: '20260819_052552_initial'
  },
];
