import type { Pool } from 'pg';

export class Staff {
  constructor(private dbPool: Pool) {}
}
