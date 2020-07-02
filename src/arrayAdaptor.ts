import { StructType, ChildrenOption, objectAdaptor } from "."

export default function arrayAdaptor<T, P>(data: T[], struct: StructType<T, P>, childrenOption?: ChildrenOption<T>): P[] {
    const newData: P[] = []
    if (!data) { return [] }
    data.forEach(item => {
        const result = objectAdaptor<T, P>(item, struct)
        if (childrenOption) {
            let [oldKey, newKey] = childrenOption
            if (newKey === undefined) {
                newKey = 'children'
            }
            // @ts-ignore
            result[newKey] = arrayAdaptor<T, P>(item[oldKey], struct, childrenOption)
        }
        newData.push(result)
    })
    return newData
}