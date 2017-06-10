// @flow

import {
    JTypeArray
} from '../../src/jtype/array';

import {
    JTypeNumber
} from '../../src/jtype/number';

import {
    JTypeString
} from '../../src/jtype/string';

import {
    JTypeObject
} from '../../src/jtype/object';

import {
    JTC
} from '../../src/jtype/collector';

import {
    isSuccessResult,
    getResultValue,
    getResultMessage
} from '../../src/util/result';

describe('validate api', () => {
    describe('test JTypeArray', () => {
        let arrayType = undefined;

        beforeEach(() => {
            arrayType = new JTypeArray();
        });

        describe('test JTypeArray\'s basic function', () => {
            describe('should only match array', () => {
                test('[] is array filter result is []', () => {
                    expect(isSuccessResult(arrayType.validate([]))).toBeTruthy();
                    expect(getResultValue(arrayType.validate([]))).toEqual([]);
                });

                test('5 is not arary filter result is undefined', () => {
                    expect(isSuccessResult(arrayType.validate(5))).toBeFalsy();
                    expect(getResultValue(arrayType.validate(5))).toBe(undefined);
                    console.log(getResultMessage(arrayType.validate(5)));
                });
            });

            describe('eq', () => {
                test('[]\'s length should equal 0 filter result is []', () => {
                    expect(isSuccessResult(arrayType.eq(0).validate([]))).toBeTruthy();
                    expect(getResultValue(arrayType.eq(0).validate([]))).toEqual([]);
                });

                test('[]\'s length should not equal 5 filter result is undefined', () => {
                    expect(isSuccessResult(arrayType.eq(5).validate([]))).toBeFalsy();
                    expect(getResultValue(arrayType.eq(5).validate([]))).toBe(undefined);
                    console.log(getResultMessage(arrayType.eq(5).validate([])));
                });
            });

            describe('gt', () => {
                test('[1, 2, 3]\'s length should gt 1 filter result is [1, 2, 3]', () => {
                    expect(isSuccessResult(arrayType.gt(1).validate([1, 2, 3]))).toBeTruthy();
                    expect(getResultValue(arrayType.gt(1).validate([1, 2, 3]))).toEqual([1, 2, 3]);
                });

                test('[1, 2, 3]\'s length should not gt 5 filter result is undefined', () => {
                    expect(isSuccessResult(arrayType.gt(5).validate([1, 2, 3]))).toBeFalsy();
                    expect(getResultValue(arrayType.gt(5).validate([1, 2, 3]))).toBe(undefined);
                    console.log(getResultMessage(arrayType.gt(5).validate([1, 2, 3])));
                });
            });

            describe('lt', () => {
                test('[1, 2, 3]\'s length should lt 5 filter result is [1, 2, 3]', () => {
                    expect(isSuccessResult(arrayType.lt(5).validate([1, 2, 3]))).toBeTruthy();
                    expect(getResultValue(arrayType.lt(5).validate([1, 2, 3]))).toEqual([1, 2, 3]);
                });

                test('[1, 2, 3]\'s length should not lt 1 filter result is undefined', () => {
                    expect(isSuccessResult(arrayType.lt(1).validate([1, 2, 3]))).toBeFalsy();
                    expect(getResultValue(arrayType.lt(1).validate([1, 2, 3]))).toBe(undefined);
                    console.log(getResultMessage(arrayType.lt(1).validate([1, 2, 3])));
                });
            });

            describe('gte', () => {
                test('[1, 2, 3]\'s length should gte 1 filter result is [1, 2, 3]', () => {
                    expect(isSuccessResult(arrayType.gte(1).validate([1, 2, 3]))).toBeTruthy();
                    expect(getResultValue(arrayType.gte(1).validate([1, 2, 3]))).toEqual([1, 2, 3]);
                });

                test('[1, 2, 3]\'s length should gte 3 filter result is [1, 2, 3]', () => {
                    expect(isSuccessResult(arrayType.gte(3).validate([1, 2, 3]))).toBeTruthy();
                    expect(getResultValue(arrayType.gte(3).validate([1, 2, 3]))).toEqual([1, 2, 3]);
                })

                test('[1, 2, 3]\'s length should not gte 5 filter result is undefined', () => {
                    expect(isSuccessResult(arrayType.gte(5).validate([1, 2, 3]))).toBeFalsy();
                    expect(getResultValue(arrayType.gte(5).validate([1, 2, 3]))).toBe(undefined);
                    console.log(getResultMessage(arrayType.gte(5).validate([1, 2, 3])));
                });
            });

            describe('lte', () => {
                test('[1, 2, 3]\'s length should lte 5 filter result is [1, 2, 3]', () => {
                    expect(isSuccessResult(arrayType.lte(5).validate([1, 2, 3]))).toBeTruthy();
                    expect(getResultValue(arrayType.lte(5).validate([1, 2, 3]))).toEqual([1, 2, 3]);
                });

                test('[1, 2, 3]\'s length should lte 3 filter result is [1, 2, 3]', () => {
                    expect(isSuccessResult(arrayType.lte(3).validate([1, 2, 3]))).toBeTruthy();
                    expect(getResultValue(arrayType.lte(3).validate([1, 2, 3]))).toEqual([1, 2, 3]);
                })

                test('[1, 2, 3]\'s length should not lte 1 filter result is undefined', () => {
                    expect(isSuccessResult(arrayType.lte(1).validate([1, 2, 3]))).toBeFalsy();
                    expect(getResultValue(arrayType.lte(1).validate([1, 2, 3]))).toBe(undefined);
                    console.log(getResultMessage(arrayType.lte(1).validate([1, 2, 3])));
                });
            });

            describe('matchChild', () => {
                test('[1, 2, 3] should match rules that expect positive number filter result is [1, 2, 3]', () => {
                    expect(isSuccessResult(arrayType.matchChild(JTC.number.positive).eq(3).validate([1, 2, 3]))).toBeTruthy();
                    expect(getResultValue(arrayType.matchChild(JTC.number.positive).eq(3).validate([1, 2, 3]))).toEqual([1, 2, 3]);
                });

                test('[\'a\', \'aa\', \'aaa\'] should match rules that expect specific string filter result [\'a\', \'aa\', \'aaa\']', () => {
                    expect(isSuccessResult(arrayType.matchChild(JTC.string.matchRegexp(/^a+$/)).eq(3).validate(['a', 'aa', 'aaa']))).toBeTruthy();
                    expect(getResultValue(arrayType.matchChild(JTC.string.matchRegexp(/^a+$/)).eq(3).validate(['a', 'aa', 'aaa']))).toEqual(['a', 'aa', 'aaa']);
                });

                test('use conjunction or in matchChild schema', () => {
                    expect(isSuccessResult(arrayType.matchChild(JTC.string.gt(3).or.number.lt(5)).validate(['aaaa']))).toBeTruthy();
                    expect(getResultValue(arrayType.matchChild(JTC.string.gt(3).or.number.lt(5)).validate(['aaaa']))).toEqual(['aaaa']);

                    expect(isSuccessResult(arrayType.matchChild(JTC.string.gt(3).or.number.lt(5)).validate([3]))).toBeTruthy();
                    expect(getResultValue(arrayType.matchChild(JTC.string.gt(3).or.number.lt(5)).validate([3]))).toEqual([3]);
                });
            });
        });

        describe('test JTypeArray\'s advanced function', () => {
            describe('matchChild', () => {
                test('should only match child like {type: 1} filter result is [{type: 1}]', () => {
                    let result = getResultValue(arrayType.matchChild(JTC.object.matchShape({
                        type: JTC.number.eq(1)
                    })).eq(1).validate([
                        {
                            type: 1
                        },
                        {
                            type: 2
                        },
                        {
                            type: 3
                        }
                    ]));
                    expect(result).toEqual([
                        {
                            type: 1
                        }
                    ]);
                });
            });
        });
    });
});
