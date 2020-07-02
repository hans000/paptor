import objectAdaptor from "./objectAdaptor";
import arrayAdaptor from "./arrayAdaptor";

type NewKey = string

export type OldKey<T> = keyof T
export type HandleFunction = (value: any, data: any) => any
export type StructItem<T, P> = [keyof T, (keyof P)?, HandleFunction?] | [keyof T, HandleFunction?] 
export type CallbackFn<T> = (key: string, data: T) => boolean;
export type StructType<T, P> = StructItem<T, P>[]
export type ChildrenOption<T> = [OldKey<T>, NewKey?]

export {
    objectAdaptor,
    arrayAdaptor,
}

