/* @flow */

import {
    Joi
} from '../src';

import {
    JType
} from '../src/schema';

// 提供连词，比如and，also。
// 提供比较方法。
// 除动词比较外，其他不使用函数。

// 语义连词 should，be，is，could，to。
// 函数连词 and，or。

new Joi({
    productType: JType.number().and.gt(0), // 这个条件说明两个问题，productType必须为数字，且其值必须大于0。
    productType: JType.is.number().and.gt(0), // 多了一个is，和上一条表达同样的语义，is作为连词，没有任何作用，只为增强语义。
    productName: JType.string().and.empty(), // 这个条件说明两个问题，productName必须为字符串，且其值必须为空。
    productLocation: JType.string().and.unEmpty(), // 这个条件会报错，maybe使用在类型定义之前没有意义（因为可以是也可以不是，）
    productLocation: JType.string().and.length.gt(5).or.number().and.gt(5), // 代表是字符串类型，且字符串长度大于5，或者是数值类型，且值大于5。
    noteList: JType.array().length.gt(5).and.child().all.match({
        noteType: JType.valueIn(1, 2, 3),
        noteTitle: JType.string(),
        noteContent: JType.string()
    }),
    packageNoteLIst: JType.array().length.gt(3).and.child().least.match(1, {
        noteType: JType.valueIn('str', 'num'),
        noteTitle: JType.string(),
        noteContent: JType.number()
    })
});
