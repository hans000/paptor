# param-adaptor

解决前后分离项目的接口数据不适用的问题，可以方便的对元数据进行增、删、改操作。
该项目使用typescript开发，因此推荐使用ts开发

## 引入
```
import paptor from 'paptor'

or

<script src='https://unpkg.com/paptor@<version>/dist/paptor.js'></script>
```
****
## 示例
```
// 包含了两个函数，分别是对对象和数组操作
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

// 提取需要的属性 pick prop
console.log(objectAdaptor(data, [['age'], ['number']]));
// { age: 20, number: '18812345678' }

// 提取需求的属性并重命名属性名 pick prop and rename prop
console.log(objectAdaptor(data, [['age', 'Age'], ['number', 'Number']]));
// { Age: 20, Number: '18812345678' }

// 提取需求的属性并修改属性名 pick prop and update value
console.log(objectAdaptor(data, [['age'], ['name', (name) => `name is ${name}`]]));
// { age: 20 }

// 提取需求的属性、重命名属性名并修改属性名 pick prop, rename prop and update value
console.log(objectAdaptor(data, [['age'], ['name', 'Name', (name) => `name is ${name}`]]));
// { age: 20, Name: 'name is Jack' }

// 过滤属性 filter prop by array
console.log(objectAdaptor(data, [], ['number']));
// { name: 'Jack', age: 20 }

// 使用函数过滤 filter prop by function
console.log(objectAdaptor(data, [], (prop) => prop.startsWith('n')));
// { age: 20 }

// 提取和过滤 pick and filter
console.log(objectAdaptor(data, [['age', 'Age']], ['number']));
// { name: 'Jack', Age: 20 }


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

// 提取并重命名 pick and rename
console.log(arrayAdaptor(dataList, [['name', 'title'], ['id', 'value']]));
// [ { title: 'foo', value: '10000001' }, { title: 'baz', value: '10000002' }, { title: 'bar', value: '10000003' } ]
console.log(JSON.stringify(arrayAdaptor(dataTree, [['name', 'title'], ['id', 'value']], ['child', 'children'])));
// [{"title":"foo","value":"10000001","children":[]},{"title":"baz","value":"10000002","children":[{"title":"bar","value":"10000003","children":[]}]}]
```