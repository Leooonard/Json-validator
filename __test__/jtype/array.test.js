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

describe('test JTypeArray', () => {
    let arrayType = undefined;

    beforeEach(() => {
        arrayType = new JTypeArray();
    });

    describe('test JTypeArray\'s basic function', () => {
        describe('should only match array', () => {
            test('[] is array', () => {
                expect(arrayType.isMatch([])).toBeTruthy();
            });

            test('5 is not arary', () => {
                expect(arrayType.isMatch(5)).not.toBeTruthy();
            });
        });

        describe('equal', () => {
            test('[]\'s length should equal 0', () => {
                expect(arrayType.equal(0).isMatch([])).toBeTruthy();
            });

            test('[]\'s length should not equal 5', () => {
                expect(arrayType.equal(5).isMatch([])).not.toBeTruthy();
            });
        });

        describe('gt', () => {
            test('[1, 2, 3]\'s length should gt 1', () => {
                expect(arrayType.gt(1).isMatch([1, 2, 3])).toBeTruthy();
            });

            test('[1, 2, 3]\'s length should not gt 5', () => {
                expect(arrayType.gt(5).isMatch([1, 2, 3])).not.toBeTruthy();
            });
        });

        describe('lt', () => {
            test('[1, 2, 3]\'s length should lt 5', () => {
                expect(arrayType.lt(5).isMatch([1, 2, 3])).toBeTruthy();
            });

            test('[1, 2, 3]\'s length should not lt 1', () => {
                expect(arrayType.lt(1).isMatch([1, 2, 3])).not.toBeTruthy();
            });
        });

        describe('gte', () => {
            test('[1, 2, 3]\'s length should gte 1', () => {
                expect(arrayType.gte(1).isMatch([1, 2, 3])).toBeTruthy();
            });

            test('[1, 2, 3]\'s length should gte 3', () => {
                expect(arrayType.gte(3).isMatch([1, 2, 3])).toBeTruthy();
            })

            test('[1, 2, 3]\'s length should not gte 5', () => {
                expect(arrayType.gte(5).isMatch([1, 2, 3])).not.toBeTruthy();
            });
        });

        describe('lte', () => {
            test('[1, 2, 3]\'s length should lte 5', () => {
                expect(arrayType.lte(5).isMatch([1, 2, 3])).toBeTruthy();
            });

            test('[1, 2, 3]\'s length should lte 3', () => {
                expect(arrayType.lte(3).isMatch([1, 2, 3])).toBeTruthy();
            })

            test('[1, 2, 3]\'s length should not lte 1', () => {
                expect(arrayType.lte(1).isMatch([1, 2, 3])).not.toBeTruthy();
            });
        });

        describe('matchChild', () => {
            test('[1, 2, 3] should match rules that expect positive number', () => {
                let numberType = new JTypeNumber();
                expect(arrayType.matchChild(numberType.positive).equal(3).isMatch([1, 2, 3])).toBeTruthy();
            });

            test('[\'a\', \'aa\', \'aaa\'] should match rules that expect specific string', () => {
                let stringType = new JTypeString();
                expect(arrayType.matchChild(stringType.matchRegexp(/^a+$/)).equal(3).isMatch(['a', 'aa', 'aaa'])).toBeTruthy();
            });
        });
    });

    describe('test JTypeArray\'s advanced function', () => {
        describe('equal', () => {
            test('[]\'s length should equal 0', () => {
                expect(arrayType.equal(0).isMatch([])).toBeTruthy();
            });

            test('[]\'s length should not equal 5', () => {
                expect(arrayType.equal(5).isMatch([])).not.toBeTruthy();
            });
        });

        describe('gt', () => {
            test('[1, 2, 3]\'s length should gt 1', () => {
                expect(arrayType.gt(1).isMatch([1, 2, 3])).toBeTruthy();
            });

            test('[1, 2, 3]\'s length should not gt 5', () => {
                expect(arrayType.gt(5).isMatch([1, 2, 3])).not.toBeTruthy();
            });
        });

        describe('matchChild', () => {
            test('should only match child like {type: 1}', () => {
                expect(arrayType.matchChild(new JTypeObject().matchShape({
                    type: new JTypeNumber().equal(1)
                })).equal(1).isMatch([
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
