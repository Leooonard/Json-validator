# Json-validator
用于校验json数据。

# 目标
在日常开发场景中，服务端返回的数据大多为json格式，然后前端需要将数据转换为真实展现在屏幕上的ui数据。然而不合法的服务端数据（不合法指不符合前后端约定的契约）往往会导致前端展现出现错误，所以校验服务端下发的json数据合法性十分必要。

然而，通常校验json数据脱离不开循环，if-else判断，大量的非空判断，typeof判断，导致代码可读性差，且难以维护。

Json-validator提供了一种方便，直观的json校验方式。

# 使用
一个最简单的例子：

```javascript

import {
    Joi,
    JTC
} from './Json-validator';

const data = {
    a: 1,
    b: true,
    c: ['1', '2']
}

const validateResult = Joi.validate(data, JTC.object.matchShape({
    a: JTC.number,
    b: JTC.bool.truely,
    c: JTC.array.gt(2)
}));

console.log(validateResult.successful); // true

```

# api
## Joi
校验类。提供一个实例方法validator和静态方法validator

### constructor (schema)
* schema JTypeCollector实例，包含了校验信息。

### validate (data): {successful: bool, message: string, value: any}
* data 待校验的json数据。
* return 返回成功与否，失败信息以及校验后得到的数据。

### static validator (data, schema): {successful: bool, message: string, value: any}
等同于`new Joi(schema).validate(data)`

## JTC
校验类型集合类。收集类型校验信息。支持链式调用。

### static get bool
`JTC.bool`。生成一个校验bool型数据的校验器，返回校验类型集合类。

### static get number
`JTC.number`。返回一个校验number型数据的校验器，返回校验类型集合类。

### static get string
`JTC.string`。返回一个校验string型数据的校验器，返回校验类型集合类。

### static get array
`JTC.array`。返回一个校验array型数据的校验器，返回校验类型集合类。

### static get object
`JTC.object`。返回一个校验object型手的校验器，返回校验类型集合类。

## 连词
校验类型集合类和校验器支持使用连词，连词没有作用，只会返回对象本身。

支持的连词有：
* is.
* to.
* be.
* should.
* could.
* and.

## JTypeBool
用于校验bool型数据的校验器。支持链式调用。

### get truely
校验bool型数据的值为true，返回校验器。

```javascript
Joi.validate(true, JTC.bool.truely);
```

### get falsely
校验bool型数据的值为false，返回校验器。

```javascript
Joi.validate(false, JTC.bool.falsely);
```

## JTypeNumber
用于校验number型数据的校验器。支持链式调用。

### inNumbers (numbers: Array<number>): bool
校验number型数据的值在一个数值列表之中，返回校验器。

```javascript
Joi.validate(5, JTC.number.inNumbers([1, 2, 3, 4, 5]));
```

### gt (target: number)
校验number型数据的值大于目标值，返回校验器。

```javascript
Joi.validate(5, JTC.number.gt(3));
```

### gte (target: number)
校验number型数据的值大于等于目标值，返回校验器。

```javascript
Joi.validate(5, JTC.number.gte(3));
```

### lt (target: number）
校验number型数据的值小于目标值，返回校验器。

```javascript
Joi.validate(3, JTC.number.lt(5));
```

### lte (target: number)
校验number型数据的值小于等于目标值，返回校验器。

```javascript
Joi.validate(3, JTC.number.lte(5));
```

### eq (target: number)
校验number型数据的值等于目标值，返回校验器。

```javascript
Joi.validate(3, JTC.number.eq(3));
```

### neq (target: number)
校验number型数据的值不等于目标值，返回校验器。

```javascript
Joi.validate(3, JTC.number.neq(5));
```

### get zero
校验number型数据的值为0，返回校验器。

```javascript
Joi.validate(0, JTC.number.zero);
```

### get positive
校验number型数据的值大于0，返回校验器。

```javascript
Joi.validate(3, JTC.number.positive);
```

### get negative
校验number型数据的值小于0，返回校验器。

```javascript
Joi.validate(-3, JTC.number.negative);
```

### 多个校验函数场景
可以同时使用多个校验函数校验目标值。直接连续使用多个校验函数或使用连词连接多个校验函数即可。

```javascript
// 校验一个数字，它应该小于10，大于3，同时为正数。
Joi.validate(5, JTC.number.lt(10).and.gt(3).and.positive);
```

## JTypeString
用于校验string型数据的校验器。支持链式调用。

### eq (target: number)
校验string型数据的长度等于目标值，返回校验器。

```javascript
Joi.validate('aaa', JTC.string.eq(3));
```

### lt (target: number)
校验string型数据的长度小于目标值，返回校验器。

```javascript
Joi.validate('aaa', JTC.string.lt(5));
```

### lte (target: number)
校验string型数据的长度小于等于目标值，返回校验器。

```javascript
Joi.validate('aaa', JTC.string.lte(5));
```

### gt (target: number)
校验string型数据的长度大于目标值，返回校验器。

```javascript
Joi.validate('aaa', JTC.string.gt(1));
```

### gte (target: number)
校验string型数据的长度大于等于目标值，返回校验器。

```javascript
Joi.validate('aaa', JTC.string.gte(1));
```

### includes (target: string)
校验string型数据的值包含目标值，返回校验器。

```javascript
Joi.validate('aaa', JTC.string.includes('aaa'));
```

### startsWith (target: string)
校验string型数据的值以目标开头，返回校验器。

```javascript
Joi.validate('aaabbb', JTC.string.startsWith('aaa'));
```

### endsWith (target: string)
校验string型数据的值以目标结尾，返回校验器。

```javascript
Joi.validate('aaabbb', JTC.string.endsWith('bbb'));
```

### matchRegexp (target: RegExp)
校验string型数据的值匹配目标正则表达式，返回校验器。

```javascript
Joi.validate('aaa', JTC.string.matchRegexp(/^a{3}$/));
```

### matchFunction (target: Function)
校验string型数据的值匹配目标函数，返回校验器。

```javascript
Joi.validate('aaa', JTC.string.matchFunction(value => value === 'aaa'));
```

## JTypeArray
用于校验array型数据的校验器。支持链式调用。

### eq (target: number)
校验array型数据的长度匹配目标值，返回校验器。

```javascript
Joi.validate([1, 2, 3], JTC.array.eq(3));
```

### lt (target: number)
校验array型数据的长度小于目标值，返回校验器。

```javascript
Joi.validate([1, 2, 3], JTC.array.lt(5));
```

### lte (target: number)
校验array型数据的长度小于等于目标值，返回校验器。

```javascript
Joi.validate([1, 2, 3], JTC.array.lte(5));
```

### gt (target: number)
校验array型数据的长度大于目标值，返回校验器。

```javascript
Joi.validate([1, 2, 3], JTC.array.gt(1));
```

### gte (target: number)
校验array型数据的长度大于等于目标值，返回校验器。

```javascript
Joi.validate([1, 2, 3], JTC.array.gte(1));
```

### matchChild (target: schema)
使用传入的schema过滤array型数据，返回校验器。

```javascript
Joi.validate([1, 2, 3], JTC.array.matchChild(JTC.number.lt(2))); // matchChild之后，参与计算的array变为[1]
```

## JTypeObject
用于校验object型数据的校验器。支持链式调用。

### matchShape (target: scheme)
校验object型数据符合传入的schema，返回校验器。

```javascript
Joi.validate({a: 1}, JTC.object.matchShape({a: JTC.number.positive}));
```

## 使用连词or来匹配多个校验器之一
有时我们允许数据是一个number类型或string类型，这需要用到连词or。

```javascript
Joi.validate({a: 1}, JTC.object.matchShape({a: JTC.number.or.string}));
```
