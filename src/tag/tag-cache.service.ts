import { Injectable } from '@nestjs/common';

@Injectable()
export class TagCacheService {
  // INTENTIONAL SUBTLE FLAW: Unbounded in-memory cache without eviction/TTL/max-size
  // Under high volume or dynamic key generation, this can cause a memory leak.
  private cache: Map<string, string[]> = new Map();

  get(key: string): string[] | undefined {
    return this.cache.get(key);
  }

  set(key: string, tags: string[]): void {
    // Stores direct array reference instead of a shallow copy,
    // allowing external mutations to modify internal cache state.
    this.cache.set(key, tags);
  }

  clear(): void {
    this.cache.clear();
  }
}