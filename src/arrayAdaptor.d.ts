import { StructType, ChildrenOption } from ".";
export default function arrayAdaptor<T, P>(data: T[], struct: StructType<T, P>, childrenOption?: ChildrenOption<T>): P[];
