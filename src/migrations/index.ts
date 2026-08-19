import * as migration_20260819_050627_initial from './20260819_050627_initial';

export const migrations = [
  {
    up: migration_20260819_050627_initial.up,
    down: migration_20260819_050627_initial.down,
    name: '20260819_050627_initial'
  },
];
