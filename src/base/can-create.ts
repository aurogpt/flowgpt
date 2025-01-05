export abstract class CanCreate<T> {
    static create<T>(
        this: new (options: T) => CanCreate<T>,
        options: T
    ): CanCreate<T> {
        return new this(options);
    }
}
