/**
 * A class that can be created from an object.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class CanCreate<T> {
    static create<T>(
        this: new (options: T) => CanCreate<T>,
        options: T
    ): CanCreate<T> {
        return new this(options);
    }
}
