import { StructType, OldKey, CallbackFn } from ".";
declare function objectAdaptor<T, P>(data: T, struct: StructType<T, P>, remove?: OldKey<T>[]): P;
declare function objectAdaptor<T, P>(data: T, struct: StructType<T, P>, remove?: CallbackFn<T>): P;
export default objectAdaptor;
