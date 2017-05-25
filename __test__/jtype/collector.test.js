// @flow

import {
    JTC,
    JTypes
} from '../../src/jtype/collector';

describe('JTC', () => {
    test('number type and great than 5 and less than 15', () => {
        expect(new JTC(JTypes.number).gt(5).and.lt(15).end.isMatch(10)).toBeTruthy();
    });

    test('should not match this complex shape object', () => {
        const message = new JTC(JTypes.object).matchShape({
            name: JTC.string.lte(25).and.gte(5),
            phoneNumber: JTC.string.eq(11),
            age: JTC.number.lte(20).and.gte(12),
            certificateType: JTC.number.eq(1),
            noteList: JTC.array.matchChild(JTC.object.matchShape({
                type: JTC.number.inNumbers([1, 2]),
                title: JTC.string.unEmpty,
                content: JTC.string.unEmpty
            })).and.eq(1)
        }).end.isMatch({
            name: 'aa/zz', // 姓名应该在5 - 25字范围。
            phoneNumber: '13681622894', // 电话号码长度必须是11位。
            age: 15, // 年龄必须在12 - 20岁之间。
            certificateType: 1, // 证件类型必须为1或2。
            noteList: [
                {
                    type: 1,
                    title: '',
                    content: 'hahaha'
                },
            ], // noteList中必须包含type为1的数据，且对应的数据有非空的title和content字段。
        }).message;

        console.log(message);

        expect(message).toMatch(/.+/);
    });

    test('should match this complex shape object', () => {
        expect(new JTC(JTypes.object).matchShape({
            name: JTC.string.lte(25).and.gte(5),
            phoneNumber: JTC.string.eq(11),
            age: JTC.number.lte(20).and.gte(12),
            certificateType: JTC.number.inNumbers([1, 2]),
            noteList: JTC.array.matchChild(JTC.object.matchShape({
                type: JTC.number.eq(1),
                title: JTC.string.unEmpty,
                content: JTC.string.unEmpty
            })).and.eq(1)
        }).end.isMatch({
            name: 'aa/zz',
            phoneNumber: '13681622894',
            age: 15,
            certificateType: 1,
            noteList: [
                {
                    type: 1,
                    title: 'haha',
                    content: 'hahaha'
                },
            ]
        })).toBeTruthy();
    });
});
