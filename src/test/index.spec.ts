import { objectAdaptor, arrayAdaptor } from ".."

// define interface
interface IData {
    name: string,
    age: number,
    number: string,
}
// define test date
const data: IData = {
    name: 'Jack',
    age: 20,
    number: '18812345678'
}

describe('objectAdaptor test', () => {
    test('pick', () => {
        expect(objectAdaptor(data, [ ['name'], ['age'], ])).toEqual({ name: 'Jack', age: 20 })
    })
    test('rename', () => {
        expect(objectAdaptor(data, [ ['name', 'Name'], ['age', 'Age'], ])).toEqual({ Name: 'Jack', Age: 20 })
    })
    test('add new props', () => {
        expect(objectAdaptor(data, [ 
            ['name'], 
            ['age'], 
            ['number'], 
            ['age', 'isAdult', (age) => {
                return age >= 18
            }] 

        ])).toEqual({ name: 'Jack', age: 20, number: '18812345678', isAdult: true })
    })
})

describe('objectAdaptor test remove', () => {
    test('only remove', () => {
        expect(objectAdaptor(data, [], ['number'])).toEqual({ name: 'Jack', age: 20 })
    })
    test('update and remove', () => {
        expect(objectAdaptor(data, [ ['name', 'Name']], ['number'])).toEqual({ Name: 'Jack', age: 20 })
    })
    test('add new props and remove', () => {
        expect(objectAdaptor(data, [ 
            ['name'], 
            ['age'], 
            ['number'], 
            ['age', 'isAdult', (age) => {
                return age >= 18
            }] 
        ], [
            'number'
        ])).toEqual({ name: 'Jack', age: 20, isAdult: true })
    })
    test('add new props and remove', () => {
        expect(objectAdaptor(data, [ 
            ['name', 'name', (e: string) => e.toLocaleLowerCase()], 
            ['age', 'age'], 
            ['number', (e: string) => '+86 ' + e], 
            ['age', 'isAdult', (age) => {
                return age >= 18
            }] 
        ], [
            'age'
        ])).toEqual({ name: 'jack', isAdult: true, number: '+86 18812345678' })
    })
})

// mock data list
const dataList = [
    { name: 'foo', id: '10000001' },
    { name: 'baz', id: '10000002' },
    { name: 'bar', id: '10000003' },
]
// mock data tree
const dataTree = [
    { name: 'foo', id: '10000001' },
    { name: 'baz', id: '10000002', child: [ { name: 'bar', id: '10000003' } ] },
]

describe('arrayAdaptor test', () => {
    test('list', () => {
        expect(arrayAdaptor(dataList, [['id', 'value'], ['name', 'title']])).toEqual([
            { title: 'foo', value: '10000001' },
            { title: 'baz', value: '10000002' },
            { title: 'bar', value: '10000003' },
        ])
    })
    test('tree', () => {
        expect(arrayAdaptor(dataTree, [['id', 'value'], ['name', 'title']], ['child', 'children'])).toEqual([
            { title: 'foo', value: '10000001', children: [] },
            { title: 'baz', value: '10000002', children: [ { title: 'bar', value: '10000003', children: [] } ] },
        ])
    })
})