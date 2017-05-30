// @flow

import {
    JTypeString
} from '../../src/jtype/string';

import {
    isSuccessResult,
    getResultValue,
    getResultMessage
} from '../../src/util/result';

describe('validate api', () => {
    describe('test JTypeString', () => {
        let stringType = undefined;

        beforeEach(() => {
            stringType = new JTypeString();
        });

        describe('test JTypeString\'s basic function', () => {
            describe('should only match string', () => {
                test('\'aaa\' is string filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.validate('aaa'))).toBe('aaa');
                });

                test('5 is not string filter result is undefined', () => {
                    expect(isSuccessResult(stringType.validate(5))).toBeFalsy();
                    expect(getResultValue(stringType.validate(5))).toBe(undefined);
                    console.log(getResultMessage(stringType.validate(5)));
                });
            });

            describe('empty', () => {
                test('\'\' is empty string filter result is \'\'', () => {
                    expect(isSuccessResult(stringType.empty.validate(''))).toBeTruthy();
                    expect(getResultValue(stringType.empty.validate(''))).toBe('');
                });

                test('\'aaa\' is not empty string filter result is undefined', () => {
                    expect(isSuccessResult(stringType.empty.validate('aaa'))).toBeFalsy();
                    expect(getResultValue(stringType.empty.validate('aaa'))).toBe(undefined);
                    console.log(getResultMessage(stringType.empty.validate('aaa')));
                })
            });

            describe('unEmpty', () => {
                test('\'aaa\' is unEmpty string filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.unEmpty.validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.unEmpty.validate('aaa'))).toBe('aaa');
                });

                test('\'\' is not unEmpty string filter result is undefined', () => {
                    expect(isSuccessResult(stringType.unEmpty.validate(''))).toBeFalsy();
                    expect(getResultValue(stringType.unEmpty.validate(''))).toBe(undefined);
                    console.log(getResultMessage(stringType.unEmpty.validate('')));
                });
            });

            describe('length conjunction should return JTypeString instance itself', () => {
                test('should equal after use length conjunction', () => {
                    expect(stringType.length === stringType).toBeTruthy();
                });
            });

            describe('equal', () => {
                test('\'aaa\' length should equal 3 filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.length.eq(3).validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.length.eq(3).validate('aaa'))).toBe('aaa');
                });

                test('\'aaaa\' length should not equal 3 filter result is undefined', () => {
                    expect(isSuccessResult(stringType.length.eq(3).validate('aaaa'))).toBeFalsy();
                    expect(getResultValue(stringType.length.eq(3).validate('aaaa'))).toBe(undefined);
                    console.log(getResultMessage(stringType.length.eq(3).validate('aaaa')));
                });
            });

            describe('gt', () => {
                test('\'aaaa\' length should gt 3 filter result is \'aaaa\'', () => {
                    expect(isSuccessResult(stringType.length.gt(3).validate('aaaa'))).toBeTruthy();
                    expect(getResultValue(stringType.length.gt(3).validate('aaaa'))).toBe('aaaa');
                });

                test('\'aaa\' length should not gt 3 filter result is undefined', () => {
                    expect(isSuccessResult(stringType.length.gt(3).validate('aaa'))).toBeFalsy();
                    expect(getResultValue(stringType.length.gt(3).validate('aaa'))).toBe(undefined);
                    console.log(getResultMessage(stringType.length.gt(3).validate('aaa')));
                });
            });

            describe('gte', () => {
                test('\'aaaa\' length should gte 3 filter result is \'aaaa\'', () => {
                    expect(isSuccessResult(stringType.length.gte(3).validate('aaaa'))).toBeTruthy();
                    expect(getResultValue(stringType.length.gte(3).validate('aaaa'))).toBe('aaaa');
                });

                test('\'aaa\' length should gte 3 filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.length.gte(3).validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.length.gte(3).validate('aaa'))).toBe('aaa');
                });

                test('\'aa\' length should not gte 3 filter result is undefined', () => {
                    expect(isSuccessResult(stringType.length.gte(3).validate('aa'))).toBeFalsy();
                    expect(getResultValue(stringType.length.gte(3).validate('aa'))).toBe(undefined);
                    console.log(getResultMessage(stringType.length.gte(3).validate('aa')));
                });
            });

            describe('lt', () => {
                test('\'aa\' length should lt 3 filter result is \'aa\'', () => {
                    expect(isSuccessResult(stringType.length.lt(3).validate('aa'))).toBeTruthy();
                    expect(getResultValue(stringType.length.lt(3).validate('aa'))).toBe('aa');
                });

                test('\'aaaa\' length should not lt 3 filter result is undefined', () => {
                    expect(isSuccessResult(stringType.length.lt(3).validate('aaaa'))).toBeFalsy();
                    expect(getResultValue(stringType.length.lt(3).validate('aaaa'))).toBe(undefined);
                    console.log(getResultMessage(stringType.length.lt(3).validate('aaaa')));
                });
            });

            describe('lte', () => {
                test('\'aa\' length should lte 3 filter result is \'aa\'', () => {
                    expect(isSuccessResult(stringType.length.lte(3).validate('aa'))).toBeTruthy();
                    expect(getResultValue(stringType.length.lte(3).validate('aa'))).toBe('aa');
                });

                test('\'aaa\' length should lte 3 filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.length.lte(3).validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.length.lte(3).validate('aaa'))).toBe('aaa');
                });

                test('\'aaaa\' length should not lte 3 filter result is undefined', () => {
                    expect(isSuccessResult(stringType.length.lte(3).validate('aaaa'))).toBeFalsy();
                    expect(getResultValue(stringType.length.lte(3).validate('aaaa'))).toBe(undefined);
                    console.log(getResultMessage(stringType.length.lte(3).validate('aaaa')));
                });
            });

            describe('includes', () => {
                test('\'bbbaaabbb\' should includes \'aaa\' filter result is \'bbbaaabbb\'', () => {
                    expect(isSuccessResult(stringType.includes('aaa').validate('bbbaaabbb'))).toBeTruthy();
                    expect(getResultValue(stringType.includes('aaa').validate('bbbaaabbb'))).toBe('bbbaaabbb');
                });

                test('\'bbbaabbb\' should not includes \'aaa\' filter result is undefined', () => {
                    expect(isSuccessResult(stringType.includes('aaa').validate('bbbaabbb'))).toBeFalsy();
                    expect(getResultValue(stringType.includes('aaa').validate('bbbaabbb'))).toBe(undefined);
                    console.log(getResultMessage(stringType.includes('aaa').validate('bbbaabbb')));
                });
            });

            describe('startsWith', () => {
                test('\'aaabbb\' should starsWith \'aaa\' filter result is \'aaabbb\'', () => {
                    expect(isSuccessResult(stringType.startsWith('aaa').validate('aaabbb'))).toBeTruthy();
                    expect(getResultValue(stringType.startsWith('aaa').validate('aaabbb'))).toBe('aaabbb');
                });

                test('\'aabbb\' should not startsWith \'aaa\' filter result is undefined', () => {
                    expect(isSuccessResult(stringType.startsWith('aaa').validate('aabbb'))).toBeFalsy();
                    expect(getResultValue(stringType.startsWith('aaa').validate('aabbb'))).toBe(undefined);
                    console.log(getResultMessage(stringType.startsWith('aaa').validate('aabbb')));
                });
            });

            describe('endsWith', () => {
                test('\'aaabbb\' should endsWith \'bbb\' filter result is \'aaabbb\'', () => {
                    expect(isSuccessResult(stringType.endsWith('bbb').validate('aaabbb'))).toBeTruthy();
                    expect(getResultValue(stringType.endsWith('bbb').validate('aaabbb'))).toBe('aaabbb');
                });

                test('\'aaabb\' should not endsWith \'bbb\' filter result is undefined', () => {
                    expect(isSuccessResult(stringType.endsWith('bbb').validate('aaabb'))).toBeFalsy();
                    expect(getResultValue(stringType.endsWith('bbb').validate('aaabb'))).toBe(undefined);
                    console.log(getResultMessage(stringType.endsWith('bbb').validate('aaabb')));
                });
            });

            describe('matchRegexp', () => {
                test('\'aaa\' is not a regexp, so it should throw an exception', () => {
                    expect(stringType.matchRegexp('aaa')).toThrow();
                })

                test('/^a+$/ should match \'aaaaaa\' filter result is \'aaaaaa\'', () => {
                    expect(isSuccessResult(stringType.matchRegexp(/^a+$/).validate('aaaaaa'))).toBeTruthy();
                    expect(getResultValue(stringType.matchRegexp(/^a+$/).validate('aaaaaa'))).toBe('aaaaaa');
                });

                test('/^a+$/ should not match \'aaaaab\' filter result is undefined', () => {
                    expect(isSuccessResult(stringType.matchRegexp(/^a+$/).validate('aaaaab'))).toBeFalsy();
                    expect(getResultValue(stringType.matchRegexp(/^a+$/).validate('aaaaab'))).toBe(undefined);
                    console.log(getResultMessage(stringType.matchRegexp(/^a+$/).validate('aaaaab')));
                });
            });

            describe('matchFunction', () => {
                test('\'aaa\' is not a function, so it should throw an exception', () => {
                    expect(stringType.matchFunction('aaa')).toThrow();
                });

                test('a function expect string \'aaa\' will return true when meet \'aaa\' filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.matchFunction(value => value === 'aaa').validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.matchFunction(value => value === 'aaa').validate('aaa'))).toBe('aaa');
                });
            })
        });

        describe('test JTypeString\'s advanced function', () => {
            describe('multi length conditon', () => {
                test('\'aaa\' length should lt 5 and gt 0 filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.lt(5).and.gt(0).validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.lt(5).and.gt(0).validate('aaa'))).toBe('aaa');
                });

                test('\'aaa\' length should gte 3 and lte 3 filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.lte(3).and.gte(3).validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.lte(3).and.gte(3).validate('aaa'))).toBe('aaa');
                });

                test('\'aaa\' length should equal 3 and gt 1 and gte 2 and lt 5 and lte 3 filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.eq(3).and.gt(1).and.gte(2).lt(5).and.lte(3).validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.eq(3).and.gt(1).and.gte(2).lt(5).and.lte(3).validate('aaa'))).toBe('aaa');
                });
            });

            describe('multi match condition', () => {
                test('\'aaa\' should match regexp /^a+$/ and match function that expect string \'aaa\' filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'aaa').validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'aaa').validate('aaa'))).toBe('aaa');
                });

                test('\'aaa\' should match regexp /^a+$/ and not match function that expect string \'bbb\' filter result is undefined', () => {
                    expect(isSuccessResult(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'bbb').validate('aaa'))).toBeFalsy();
                    expect(getResultValue(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'bbb').validate('aaa'))).toBe(undefined);
                    console.log(getResultMessage(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'bbb').validate('aaa')));
                });
            });

            describe('multi length and match condition', () => {
                test('\'aaa\' should lt 5 and eq 3 and match regexp /^a+$/ filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.lt(5).and.eq(3).and.matchRegexp(/^a+$/).validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.lt(5).and.eq(3).and.matchRegexp(/^a+$/).validate('aaa'))).toBe('aaa');
                });

                test('\'aaa\' should lte 5 and match function that expect string \'aaa\' filter result is \'aaa\'', () => {
                    expect(isSuccessResult(stringType.lte(5).and.matchFunction(value => value === 'aaa').validate('aaa'))).toBeTruthy();
                    expect(getResultValue(stringType.lte(5).and.matchFunction(value => value === 'aaa').validate('aaa'))).toBe('aaa');
                });
            });
        });
    });
});
