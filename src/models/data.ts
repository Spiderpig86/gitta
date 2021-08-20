/**
 * Base interface that the service models follow.
 */
interface Data<T> {
    default: T[];
    custom: T[];
}