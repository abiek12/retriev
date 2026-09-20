export interface ICacheProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options: { ttl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  exist(key: string): Promise<boolean>;
  expire(key: string, ttl: number): Promise<boolean>;
  ttl(key: string): Promise<number>;
}
