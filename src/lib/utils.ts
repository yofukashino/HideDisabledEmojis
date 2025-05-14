export class LimitedMap<K, V> extends Map<K, V> {
  private limit: number;
  private keysQueue: K[] = [];
  public constructor(limit: number) {
    super();
    this.limit = limit;
  }
  public set(key: K, value: V): this {
    if (this.size >= this.limit) {
      const oldestKey = this.keysQueue.shift();
      if (oldestKey !== void 0) {
        this.delete(oldestKey);
      }
    }
    super.set(key, value);
    this.keysQueue.push(key);
    return this;
  }
}

export default { LimitedMap };
