export abstract class Builder<T> {
  protected object: Partial<T> = {};

  abstract build(): T;
}
