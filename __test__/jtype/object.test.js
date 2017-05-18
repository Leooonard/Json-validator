// @flow

import {
    JTypeObject
} from '../../src/jtype/object';

import {
    JTypeArray
} from '../../src/jtype/array';

import {
    JTypeBool
} from '../../src/jtype/bool';

import {
    JTypeNumber
} from '../../src/jtype/number';

import {
    JTypeString
} from '../../src/jtype/string';

describe('test JTypeObject', () => {
    let objectType = undefined;

    beforeEach(() => {
        objectType = new JTypeObject();
    });

    describe('test JTypeObject\'s basic function', () => {
        describe('should only match object', () => {
            test('{} is object', () => {
                expect(objectType.isMatch([])).toBeTruthy();
            });

            test('5 is not arary', () => {
                expect(objectType.isMatch(5).message).toBe('5 not object');
            });

            test('null is not arary', () => {
                expect(objectType.isMatch(null).message).toBe('null not object');
            });
        });

        describe('matchShape', () => {
            test('{a: 1} should have a attribute a that value is a number', () => {
                let numberType = new JTypeNumber();
                expect(objectType.matchShape({
                    a: numberType.gt(0)
                }).isMatch({a: 1})).toBeTruthy();
            });

            test('{a: true} should have a attribute a that value is a boolean', () => {
                let boolType = new JTypeBool();
                expect(objectType.matchShape({
                    a: boolType.truely
                }).isMatch({a: true})).toBeTruthy();
            });

            test('{a: \'aaaa\'} should not have a attribute a that value is match regexp /^a+b$/', () => {
                let stringType = new JTypeString();

                expect(objectType.matchShape({
                    a: stringType.matchRegexp(/^a+b$/)
                }).isMatch({a: 'aaaa'}).message).toMatch(/.+/);
            });
        });
    });

    describe('test JTypeObject\'s advanced function', () => {
        describe('matchShape', () => {
            test(`{a: 1, b: [1, 2], c: {d: true}} should have attribute a that value is a number
                and have attribute b that is an array and have attribute c that is an object
                which have attribute d`, () => {
                expect(objectType.matchShape({
                    a: new JTypeNumber().gt(0),
                    b: new JTypeArray().eq(2),
                    c: new JTypeObject().matchShape({
                        d: new JTypeBool().truely
                    })
                }).isMatch({a: 1, b: [1, 2], c: {d: true}})).toBeTruthy();
            });

            test(`shape like {a: number.positive} should match object {a: 1, b: false, c: -1}`, () => {
                expect(objectType.matchShape({
                    a: new JTypeNumber().positive
                }).isMatch({
                    a: 1,
                    b: false,
                    c: -1
                })).toBeTruthy();
            })
        });
    });
});
