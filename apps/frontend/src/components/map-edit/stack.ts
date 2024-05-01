class Stack<T> {
  private storage: T[] = [];

  constructor(readonly capacity: number = Infinity) {
    this.capacity = capacity;
  }

  push(item: T): void {
    if (this.size() === this.capacity) {
      return;
    }

    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  size(): number {
    return this.storage.length;
  }
}

const stack = new Stack<number>(5);
stack.push(1);
