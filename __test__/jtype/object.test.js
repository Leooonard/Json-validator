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

import {
    JTC
} from '../../src/jtype/collector';

import {
    isSuccessResult,
    getResultValue,
    getResultMessage
} from '../../src/util/result';

describe('validate api', () => {
    describe('test JTypeObject', () => {
        let objectType = undefined;

        beforeEach(() => {
            objectType = new JTypeObject();
        });

        describe('test JTypeObject\'s basic function', () => {
            describe('should only match object', () => {
                test('{} is object filter result is {}', () => {
                    expect(isSuccessResult(objectType.validate([]))).toBeTruthy();
                    expect(getResultValue(objectType.validate([]))).toEqual([]);
                });

                test('5 is not arary filter result is undefined', () => {
                    expect(isSuccessResult(objectType.validate(5))).toBeFalsy();
                    expect(getResultValue(objectType.validate(5))).toBe(undefined);
                    console.log(getResultMessage(objectType.validate(5)));
                });

                test('null is not arary filter result is undefined', () => {
                    expect(isSuccessResult(objectType.validate(null))).toBeFalsy();
                    expect(getResultValue(objectType.validate(null))).toBe(undefined);
                    console.log(getResultMessage(objectType.validate(null)));
                });
            });

            describe('matchShape', () => {
                test('{a: 1} should have a attribute a that value is a number filter result is {a: 1}', () => {
                    expect(isSuccessResult(objectType.matchShape({
                        a: JTC.number.gt(0)
                    }).validate({a: 1}))).toBeTruthy();
                    expect(getResultValue(objectType.matchShape({
                        a: JTC.number.gt(0)
                    }).validate({a: 1}))).toEqual({a: 1});
                });

                test('{a: true} should have a attribute a that value is a boolean filter result is {a: true}', () => {
                    expect(isSuccessResult(objectType.matchShape({
                        a: JTC.bool.truely
                    }).validate({a: true}))).toBeTruthy();
                    expect(getResultValue(objectType.matchShape({
                        a: JTC.bool.truely
                    }).validate({a: true}))).toEqual({a: true});
                });

                test('{a: \'aaaa\'} should not have a attribute a that value is match regexp /^a+b$/ filter result is undefined', () => {
                    expect(isSuccessResult(objectType.matchShape({
                        a: JTC.string.matchRegexp(/^a+b$/)
                    }).validate({a: 'aaaa'}))).toBeFalsy();
                    expect(getResultValue(objectType.matchShape({
                        a: JTC.string.matchRegexp(/^a+b$/)
                    }).validate({a: 'aaaa'}))).toBe(undefined);
                    console.log(getResultMessage(objectType.matchShape({
                        a: JTC.string.matchRegexp(/^a+b$/)
                    }).validate({a: 'aaaa'})));
                });
            });
        });

        describe('test JTypeObject\'s advanced function', () => {
            describe('matchShape', () => {
                test(`{a: 1, b: [1, 2], c: {d: true}} should have attribute a that value is a number
                    and have attribute b that is an array and have attribute c that is an object
                    which have attribute d filter result is {a: 1, b: [1, 2], c: {d: true}}`, () => {
                    expect(isSuccessResult(objectType.matchShape({
                        a: JTC.number.gt(0),
                        b: JTC.array.eq(2),
                        c: JTC.object.matchShape({
                            d: JTC.bool.truely
                        })
                    }).validate({a: 1, b: [1, 2], c: {d: true}}))).toBeTruthy();
                    expect(getResultValue(objectType.matchShape({
                        a: JTC.number.gt(0),
                        b: JTC.array.eq(2),
                        c: JTC.object.matchShape({
                            d: JTC.bool.truely
                        })
                    }).validate({a: 1, b: [1, 2], c: {d: true}}))).toEqual({a: 1, b: [1, 2], c: {d: true}});
                });

                test(`shape like {a: number.positive} should match object {a: 1, b: false, c: -1} filter result is {a: 1, b: false, c: -1}`, () => {
                    expect(isSuccessResult(objectType.matchShape({
                        a: JTC.number.positive
                    }).validate({
                        a: 1,
                        b: false,
                        c: -1
                    }))).toBeTruthy();
                    expect(getResultValue(objectType.matchShape({
                        a: JTC.number.positive
                    }).validate({
                        a: 1,
                        b: false,
                        c: -1
                    }))).toEqual({
                        a: 1,
                        b: false,
                        c: -1
                    });
                });

                test('use conjunction or in matchShape schema', () => {
                    expect(isSuccessResult(objectType.matchShape({
                        a: JTC.number.gt(3).or.string.gt(3)
                    }).validate({
                        a: 5
                    }))).toBeTruthy();
                    expect(getResultValue(objectType.matchShape({
                        a: JTC.number.gt(3).or.string.gt(3)
                    }).validate({
                        a: 5
                    }))).toEqual({
                        a: 5
                    });

                    expect(isSuccessResult(objectType.matchShape({
                        a: JTC.number.gt(3).or.string.gt(3)
                    }).validate({
                        a: 'aaaaa'
                    }))).toBeTruthy();
                    expect(getResultValue(objectType.matchShape({
                        a: JTC.number.gt(3).or.string.gt(3)
                    }).validate({
                        a: 'aaaaa'
                    }))).toEqual({
                        a: 'aaaaa'
                    });
                });
            });
        });
    });
});
