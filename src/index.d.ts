declare type HandleFunction = (value: any, data: any) => any;
export declare type StructItem<T, P> = [keyof T, (keyof P)?, HandleFunction?] | [keyof T, HandleFunction?];
export declare type StructType<T, P> = StructItem<T, P>[];
declare type oldChildrenKey<T> = keyof T;
declare type newChildrenKey = string;
declare type ChildrenOption<T> = [oldChildrenKey<T>, newChildrenKey?];
export declare function paramsAdaptor<T, P>(data: T, struct: StructType<T, P>): P;
export declare function recursionAdaptor<T, P>(data: T[], struct: StructType<T, P>, childrenOption?: ChildrenOption<T>): P[];
export {};
