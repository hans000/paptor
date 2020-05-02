import { paramsAdaptor, recursionAdaptor } from "..";

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

describe('paramsAdaptor test', () => {
    test('pick', () => {
        expect(paramsAdaptor(data, [ ['name'], ['age'], ])).toEqual({ name: 'Jack', age: 20 })
    })
    test('rename', () => {
        expect(paramsAdaptor(data, [ ['name', 'Name'], ['age', 'Age'], ])).toEqual({ Name: 'Jack', Age: 20 })
    })
    test('add new props', () => {
        expect(paramsAdaptor(data, [ 
            ['name'], 
            ['age'], 
            ['number'], 
            ['age', 'isAdult', (age) => {
                return age >= 18
            }] 
        ])).toEqual({ name: 'Jack', age: 20, number: '18812345678', isAdult: true })
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

describe('recursionAdaptor test', () => {
    test('list', () => {
        expect(recursionAdaptor(dataList, [['id', 'value'], ['name', 'title']])).toEqual([
            { title: 'foo', value: '10000001' },
            { title: 'baz', value: '10000002' },
            { title: 'bar', value: '10000003' },
        ])
    })
    test('tree', () => {
        expect(recursionAdaptor(dataTree, [['id', 'value'], ['name', 'title']], ['child', 'children'])).toEqual([
            { title: 'foo', value: '10000001', children: [] },
            { title: 'baz', value: '10000002', children: [ { title: 'bar', value: '10000003', children: [] } ] },
        ])
    })
})