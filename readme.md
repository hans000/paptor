# param-adaptor

解决前后分离项目的接口数据不适用的问题，可以方便的对元数据进行增、删、改

## 引入
```
import paptor from 'paptor'

or

<script src='./paptor.js'></script>
```

## 示例
```

// ajax请求的数据
const data = {
    name: 'Jack',
    age: 18,
    weight: 60,
    sports: ['pingpong', 'football'],
    other: {
        a: 'a',
        b: 'b',
    }
}
// 定义一个struct
const struct = [
    ['name', 'lastname'],   // 修改字段名
    ['weight'], // 原样保留
    ['age', 'age', function(item) {
        this['isAdult'] = item >= 18    // 添加新字段
        return item
    } ],
    ['sports', (item) => item.map(e => 'I like ' + e)], // 修改数据
]

const newData = paptor.paramsAdaptor(data, struct)
console.log(newData);

>>> {
>>>     age: 18,
>>>     isAdult: true,
>>>     firstname: "Jack",
>>>     nickname: "little Jack",
>>>     sports: ["I like pingpong", "I like football"],
>>>     weight: 60
>>> }

```

## 说明

对外暴露一个函数，参数定义paramsAdaptor(data, struct)

data是一个对象
struct是一个数组