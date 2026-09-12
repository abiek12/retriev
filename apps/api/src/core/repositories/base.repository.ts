import type { Database } from "@repo/database";

export interface IBaseRepository {
  readonly database: Database;
}

export abstract class BaseRepository implements IBaseRepository {
  constructor(protected readonly db: Database) {}

  get database() {
    return this.db;
  }
}
