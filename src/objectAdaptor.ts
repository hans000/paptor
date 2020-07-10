import { StructType, OldKey, CallbackFn } from ".";
import { isType } from "./util";

function handle<T, P>(data: T, struct: StructType<T, P> = [], flag = false): any {
    const type = isType(data)

    if (type === 'null') {
        return flag ? data : null
    }
    if (type !== 'object') {
        throw new Error('data expected an object')
    }
    if (isType(struct) !== 'array') {
        console.warn('struct expected an array');
        struct = []
    }
    const initData = flag ? { ...data } : {}
    return struct.reduce<any>((s, item, index) => {
        if (isType(item) !== 'array') {
            throw new Error(`struct's ${item} property expected StructItem`)
        }
        const [key, newKey, callback] = item
        if (key === undefined) {
            throw new Error(`struct's NO.${index} StructItem, first element is required`)
        }
        if (callback) {
            if (typeof newKey === 'string') {
                s[newKey] = callback.call(s, data[key], data)
            } else {
                throw new Error(`struct's NO.${index} StructItem, second element expected string`)
            }
        } else {
            if (newKey === undefined) {
                s[key] = data[key]
            } else if (typeof newKey === 'string') {
                if (<string>newKey !== key) {
                    s[newKey] = data[key]
                    delete s[key]
                }
            } else if (typeof newKey === 'function') {
                s[key] = newKey.call(s, data[key], data)
                delete s[key]
            } else {
                throw new Error(`second parameter's type is string or function`)
            }
        }
        return s
    }, initData)
}

function removeHandle<T, P>(data: T, struct: StructType<T, P> = [], remove: OldKey<T>[] | CallbackFn<T>) {
    const newData = handle(data, struct, true)
    const removeType = isType(remove)

    if (removeType === 'function') {
        Object.keys(newData).forEach(key => {
            if ((remove as CallbackFn<T>)(key, newData)) {
                delete newData[key]
            }
        })
    }
    if (removeType !== 'array') {
        remove = []
    }
    (remove as OldKey<T>[]).forEach(key => {
        delete newData[key]
    })
    return newData
}

function objectAdaptor<T, P>(data: T, struct: StructType<T, P>, remove?: OldKey<T>[]): P;
function objectAdaptor<T, P>(data: T, struct: StructType<T, P>, remove?: CallbackFn<T>): P;
function objectAdaptor<T, P>(data: T, struct: StructType<T, P>, remove?: any): P {
    return remove ? removeHandle<T, P>(data, struct, remove) : handle(data, struct)
}

export default objectAdaptor