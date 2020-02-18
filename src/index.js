

export function paramsAdaptor(data, struct) {
    if (Object.prototype.toString.call(data) === '[object Null]') {
        return null
    }
    if (Object.prototype.toString.call(data) !== '[object Object]') {
        throw new Error('data is expected a object')
    }
    if (!Array.isArray(struct)) {
        throw new Error('struct is expected an array')
    }
    return struct.reduce((s, item, index) => {
        if (!Array.isArray(item)) {
            throw new Error(`struct's ${item} at ${index}, expected an array`)
        }
        const [key, newKey, callback] = item
        if (key === undefined) {
            throw new Error('first paramter is required')
        }
        if (callback) {
            if (newKey) {
                s[newKey] = callback.call(s, data[key], data)
            } else {
                throw new Error(`second paramter's type is string`)
            }
        } else {
            if (newKey === undefined) {
                s[key] = data[key]
            } else if (typeof newKey === 'string') {
                s[newKey] = data[key]
            } else if (typeof newKey === 'function') {
                s[key] = newKey.call(s, data[key], data)
            } else {
                throw new Error(`second paramter's type is string or function`)
            }
        }
        return s
    }, {})
}
