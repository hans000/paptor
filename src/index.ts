
// type DataType<T> = { [P in keyof T]: T[P] }

type HandleFunction = (value: any, data: any) => any

export type StructItem<T, P> = [keyof T, (keyof P)?, HandleFunction?] | [keyof T, HandleFunction?] 

export type StructType<T, P> = StructItem<T, P>[]

type oldChildrenKey<T> = keyof T
type newChildrenKey = string
type ChildrenOption<T> = [oldChildrenKey<T>, newChildrenKey?]

function isType(object: any): string {
    return Object.prototype.toString.call(object).toLowerCase().slice(8, -1)
}

export function paramsAdaptor<T, P>(data: T, struct: StructType<T, P>): P {
    const type = isType(data)
    const structType = isType(struct)

    if (type === 'null') { return null }
    if (type !== 'object') { throw new Error('data is expected an object') }
    if (structType !== 'array') { throw new Error('struct is expected an array') }

    return struct.reduce<any>((s, item, index) => {
        if (isType(item) !== 'array') {
            throw new Error(`struct's ${item} at ${index}, expected an array`)
        }
        const [key, newKey, callback] = item
        if (key === undefined) {
            throw new Error('first parameter is required')
        }
        if (callback) {
            if (newKey) {
                s[newKey as string] = callback.call(s, data[key], data)
            } else {
                throw new Error(`second parameter's type is string`)
            }
        } else {
            if (newKey === undefined) {
                s[key] = data[key]
            } else if (typeof newKey === 'string') {
                s[newKey] = data[key]
            } else if (typeof newKey === 'function') {
                s[key] = newKey.call(s, data[key], data)
            } else {
                throw new Error(`second parameter's type is string or function`)
            }
        }
        return s
    }, {})
}

export function recursionAdaptor<T, P>(data: T[], struct: StructType<T, P>, childrenOption?: ChildrenOption<T>): P[] {
    const newData: P[] = []
    if (!data) { return [] }
    data.forEach(item => {
        const result = paramsAdaptor<T, P>(item, struct)
        if (childrenOption) {
            let [oldKey, newKey] = childrenOption
            if (newKey === undefined) {
                newKey = 'children'
            }
            // @ts-ignore
            result[newKey] = recursionAdaptor<T, P>(item[oldKey], struct, childrenOption)
        }
        newData.push(result)
    })
    return newData
}
