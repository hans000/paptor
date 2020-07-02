import { StructType, OldKey, CallbackFn } from ".";
export default function <T, P>(data: T, struct: StructType<T, P>, remove?: OldKey<T>[] | CallbackFn<T>): P;
