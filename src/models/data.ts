/**
 * Base interface that the service models follow.
 */
export interface Data<T> {
    default: T[];
    custom: T[];
}