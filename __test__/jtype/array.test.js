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

describe('test api', () => {
    describe('test JTypeArray', () => {
        let arrayType = undefined;

        beforeEach(() => {
            arrayType = new JTypeArray();
        });

        describe('test JTypeArray\'s basic function', () => {
            describe('should only match array', () => {
                test('[] is array', () => {
                    expect(arrayType.test([])).toBeTruthy();
                });

                test('5 is not arary', () => {
                    expect(arrayType.test(5).message).toBe('5 not array');
                });
            });

            describe('eq', () => {
                test('[]\'s length should equal 0', () => {
                    expect(arrayType.eq(0).test([])).toBeTruthy();
                });

                test('[]\'s length should not equal 5', () => {
                    expect(arrayType.eq(5).test([]).message).toBe('[] not equal 5');
                });
            });

            describe('gt', () => {
                test('[1, 2, 3]\'s length should gt 1', () => {
                    expect(arrayType.gt(1).test([1, 2, 3])).toBeTruthy();
                });

                test('[1, 2, 3]\'s length should not gt 5', () => {
                    expect(arrayType.gt(5).test([1, 2, 3]).message).toBe('[1,2,3] not gt 5');
                });
            });

            describe('lt', () => {
                test('[1, 2, 3]\'s length should lt 5', () => {
                    expect(arrayType.lt(5).test([1, 2, 3])).toBeTruthy();
                });

                test('[1, 2, 3]\'s length should not lt 1', () => {
                    expect(arrayType.lt(1).test([1, 2, 3]).message).toBe('[1,2,3] not lt 1');
                });
            });

            describe('gte', () => {
                test('[1, 2, 3]\'s length should gte 1', () => {
                    expect(arrayType.gte(1).test([1, 2, 3])).toBeTruthy();
                });

                test('[1, 2, 3]\'s length should gte 3', () => {
                    expect(arrayType.gte(3).test([1, 2, 3])).toBeTruthy();
                })

                test('[1, 2, 3]\'s length should not gte 5', () => {
                    expect(arrayType.gte(5).test([1, 2, 3]).message).toBe('[1,2,3] not gte 5');
                });
            });

            describe('lte', () => {
                test('[1, 2, 3]\'s length should lte 5', () => {
                    expect(arrayType.lte(5).test([1, 2, 3])).toBeTruthy();
                });

                test('[1, 2, 3]\'s length should lte 3', () => {
                    expect(arrayType.lte(3).test([1, 2, 3])).toBeTruthy();
                })

                test('[1, 2, 3]\'s length should not lte 1', () => {
                    expect(arrayType.lte(1).test([1, 2, 3]).message).toBe('[1,2,3] not lte 1');
                });
            });

            describe('matchChild', () => {
                test('[1, 2, 3] should match rules that expect positive number', () => {
                    let numberType = new JTypeNumber();
                    expect(arrayType.matchChild(numberType.positive).eq(3).test([1, 2, 3])).toBeTruthy();
                });

                test('[\'a\', \'aa\', \'aaa\'] should match rules that expect specific string', () => {
                    let stringType = new JTypeString();
                    expect(arrayType.matchChild(stringType.matchRegexp(/^a+$/)).eq(3).test(['a', 'aa', 'aaa'])).toBeTruthy();
                });
            });
        });

        describe('test JTypeArray\'s advanced function', () => {
            describe('matchChild', () => {
                test('should only match child like {type: 1}', () => {
                    expect(arrayType.matchChild(new JTypeObject().matchShape({
                        type: new JTypeNumber().eq(1)
                    })).eq(1).test([
                        {
                            type: 1
                        },
                        {
                            type: 2
                        },
                        {
                            type: 3
                        }
                    ])).toBeTruthy();
                });
            });
        });
    });
});

describe('filter api', () => {
    describe('test JTypeArray', () => {
        let arrayType = undefined;

        beforeEach(() => {
            arrayType = new JTypeArray();
        });

        describe('test JTypeArray\'s basic function', () => {
            describe('should only match array', () => {
                test('[] is array filter result is []', () => {
                    expect(arrayType.filter([])).toEqual([]);
                });

                test('5 is not arary filter result is undefined', () => {
                    expect(arrayType.filter(5)).toBe(undefined);
                });
            });

            describe('eq', () => {
                test('[]\'s length should equal 0 filter result is []', () => {
                    expect(arrayType.eq(0).filter([])).toEqual([]);
                });

                test('[]\'s length should not equal 5 filter result is undefined', () => {
                    expect(arrayType.eq(5).filter([])).toBe(undefined);
                });
            });

            describe('gt', () => {
                test('[1, 2, 3]\'s length should gt 1 filter result is [1, 2, 3]', () => {
                    expect(arrayType.gt(1).filter([1, 2, 3])).toEqual([1, 2, 3]);
                });

                test('[1, 2, 3]\'s length should not gt 5 filter result is undefined', () => {
                    expect(arrayType.gt(5).filter([1, 2, 3])).toBe(undefined);
                });
            });

            describe('lt', () => {
                test('[1, 2, 3]\'s length should lt 5 filter result is [1, 2, 3]', () => {
                    expect(arrayType.lt(5).filter([1, 2, 3])).toEqual([1, 2, 3]);
                });

                test('[1, 2, 3]\'s length should not lt 1 filter result is undefined', () => {
                    expect(arrayType.lt(1).filter([1, 2, 3])).toBe(undefined);
                });
            });

            describe('gte', () => {
                test('[1, 2, 3]\'s length should gte 1 filter result is [1, 2, 3]', () => {
                    expect(arrayType.gte(1).filter([1, 2, 3])).toEqual([1, 2, 3]);
                });

                test('[1, 2, 3]\'s length should gte 3 filter result is [1, 2, 3]', () => {
                    expect(arrayType.gte(3).filter([1, 2, 3])).toEqual([1, 2, 3]);
                })

                test('[1, 2, 3]\'s length should not gte 5 filter result is undefined', () => {
                    expect(arrayType.gte(5).filter([1, 2, 3])).toBe(undefined);
                });
            });

            describe('lte', () => {
                test('[1, 2, 3]\'s length should lte 5 filter result is [1, 2, 3]', () => {
                    expect(arrayType.lte(5).filter([1, 2, 3])).toEqual([1, 2, 3]);
                });

                test('[1, 2, 3]\'s length should lte 3 filter result is [1, 2, 3]', () => {
                    expect(arrayType.lte(3).filter([1, 2, 3])).toEqual([1, 2, 3]);
                })

                test('[1, 2, 3]\'s length should not lte 1 filter result is undefined', () => {
                    expect(arrayType.lte(1).filter([1, 2, 3])).toBe(undefined);
                });
            });

            describe('matchChild', () => {
                test('[1, 2, 3] should match rules that expect positive number filter result is [1, 2, 3]', () => {
                    let numberType = new JTypeNumber();
                    expect(arrayType.matchChild(numberType.positive).eq(3).filter([1, 2, 3])).toEqual([1, 2, 3]);
                });

                test('[\'a\', \'aa\', \'aaa\'] should match rules that expect specific string filter result [\'a\', \'aa\', \'aaa\']', () => {
                    let stringType = new JTypeString();
                    expect(arrayType.matchChild(stringType.matchRegexp(/^a+$/)).eq(3).filter(['a', 'aa', 'aaa'])).toEqual(['a', 'aa', 'aaa']);
                });
            });
        });

        describe('test JTypeArray\'s advanced function', () => {
            describe('matchChild', () => {
                test('should only match child like {type: 1} filter result is [{type: 1}]', () => {
                    expect(arrayType.matchChild(new JTypeObject().matchShape({
                        type: new JTypeNumber().eq(1)
                    })).eq(1).filter([
                        {
                            type: 1
                        },
                        {
                            type: 2
                        },
                        {
                            type: 3
                        }
                    ])).toEqual([
                        {
                            type: 1
                        }
                    ]);
                });
            });
        });
    });
});
