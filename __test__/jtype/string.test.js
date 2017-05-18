// @flow

import {
    JTypeString
} from '../../src/jtype/string';

describe('test JTypeString', () => {
    let stringType = undefined;

    beforeEach(() => {
        stringType = new JTypeString();
    });

    describe('test JTypeString\'s basic function', () => {
        describe('should only match string', () => {
            test('\'aaa\' is string', () => {
                expect(stringType.isMatch('aaa')).toBeTruthy();
            });

            test('5 is not string', () => {
                expect(stringType.isMatch(5).message).toBe('5 not string');
            });
        });

        describe('empty', () => {
            test('\'\' is empty string', () => {
                expect(stringType.empty.isMatch('')).toBeTruthy();
            });

            test('\'aaa\' is not empty string', () => {
                expect(stringType.empty.isMatch('aaa').message).toBe('aaa not empty');
            })
        });

        describe('unEmpty', () => {
            test('\'aaa\' is unEmpty string', () => {
                expect(stringType.unEmpty.isMatch('aaa')).toBeTruthy();
            });

            test('\'\' is not unEmpty string', () => {
                expect(stringType.unEmpty.isMatch('').message).toBe(' not unEmpty');
            });
        });

        describe('length conjunction should return JTypeString instance itself', () => {
            test('should equal after use length conjunction', () => {
                expect(stringType.length === stringType).toBeTruthy();
            });
        });

        describe('equal', () => {
            test('\'aaa\' length should equal 3', () => {
                expect(stringType.length.equal(3).isMatch('aaa')).toBeTruthy();
            });

            test('\'aaaa\' length should not equal 3', () => {
                expect(stringType.length.equal(3).isMatch('aaaa').message).toBe('aaaa length not equal 3');
            });
        });

        describe('gt', () => {
            test('\'aaaa\' length should gt 3', () => {
                expect(stringType.length.gt(3).isMatch('aaaa')).toBeTruthy();
            });

            test('\'aaa\' length should not gt 3', () => {
                expect(stringType.length.gt(3).isMatch('aaa').message).toBe('aaa length not gt 3');
            });
        });

        describe('gte', () => {
            test('\'aaaa\' length should gte 3', () => {
                expect(stringType.length.gte(3).isMatch('aaaa')).toBeTruthy();
            });

            test('\'aaa\' length should gte 3', () => {
                expect(stringType.length.gte(3).isMatch('aaa')).toBeTruthy();
            });

            test('\'aa\' length should not gte 3', () => {
                expect(stringType.length.gte(3).isMatch('aa').message).toBe('aa length not gte 3');
            });
        });

        describe('lt', () => {
            test('\'aa\' length should lt 3', () => {
                expect(stringType.length.lt(3).isMatch('aa')).toBeTruthy();
            });

            test('\'aaaa\' length should not lt 3', () => {
                expect(stringType.length.lt(3).isMatch('aaaa').message).toBe('aaaa length not lt 3');
            });
        });

        describe('lte', () => {
            test('\'aa\' length should lte 3', () => {
                expect(stringType.length.lte(3).isMatch('aa')).toBeTruthy();
            });

            test('\'aaa\' length should lte 3', () => {
                expect(stringType.length.lte(3).isMatch('aaa')).toBeTruthy();
            });

            test('\'aaaa\' length should not lte 3', () => {
                expect(stringType.length.lte(3).isMatch('aaaa').message).toBe('aaaa length not lte 3');
            });
        });

        describe('includes', () => {
            test('\'bbbaaabbb\' should includes \'aaa\'', () => {
                expect(stringType.includes('aaa').isMatch('bbbaaabbb')).toBeTruthy();
            });

            test('\'bbbaabbb\' should not includes \'aaa\'', () => {
                expect(stringType.includes('aaa').isMatch('bbbaabbb').message).toBe('bbbaabbb not includes aaa');
            });
        });

        describe('startsWith', () => {
            test('\'aaabbb\' should starsWith \'aaa\'', () => {
                expect(stringType.startsWith('aaa').isMatch('aaabbb')).toBeTruthy();
            });

            test('\'aabbb\' should not startsWith \'aaa\'', () => {
                expect(stringType.startsWith('aaa').isMatch('aabbb').message).toBe('aabbb not startsWith aaa');
            });
        });

        describe('endsWith', () => {
            test('\'aaabbb\' should endsWith \'bbb\'', () => {
                expect(stringType.endsWith('bbb').isMatch('aaabbb')).toBeTruthy();
            });

            test('\'aaabb\' should not endsWith \'bbb\'', () => {
                expect(stringType.endsWith('bbb').isMatch('aaabb').message).toBe('aaabb not endsWith bbb');
            });
        });

        describe('matchRegexp', () => {
            test('\'aaa\' is not a regexp, so it should throw an exception', () => {
                expect(stringType.matchRegexp('aaa')).toThrow();
            })

            test('/^a+$/ should match \'aaaaaa\'', () => {
                expect(stringType.matchRegexp(/^a+$/).isMatch('aaaaaa')).toBeTruthy();
            });

            test('/^a+$/ should not match \'aaaaab\'', () => {
                expect(stringType.matchRegexp(/^a+$/).isMatch('aaaaab').message).toBe('aaaaab not match ^a+$');
            });
        });

        describe('matchFunction', () => {
            test('\'aaa\' is not a function, so it should throw an exception', () => {
                expect(stringType.matchFunction('aaa')).toThrow();
            });

            test('a function expect string \'aaa\' will return true when meet \'aaa\'', () => {
                expect(stringType.matchFunction(value => value === 'aaa').isMatch('aaa')).toBeTruthy();
            });
        })
    });

    describe('test JTypeString\'s advanced function', () => {
        describe('multi length conditon', () => {
            test('\'aaa\' length should lt 5 and gt 0', () => {
                expect(stringType.lt(5).and.gt(0).isMatch('aaa')).toBeTruthy();
            });

            test('\'aaa\' length should gte 3 and lte 3', () => {
                expect(stringType.lte(3).and.gte(3).isMatch('aaa')).toBeTruthy();
            });

            test('\'aaa\' length should equal 3 and gt 1 and gte 2 and lt 5 and lte 3', () => {
                expect(stringType.equal(3).and.gt(1).and.gte(2).lt(5).and.lte(3).isMatch('aaa')).toBeTruthy();
            });
        });

        describe('multi match condition', () => {
            test('\'aaa\' should match regexp /^a+$/ and match function that expect string \'aaa\'', () => {
                expect(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'aaa').isMatch('aaa')).toBeTruthy();
            });

            test('\'aaa\' should match regexp /^a+$/ and not match function that expect string \'bbb\'', () => {
                expect(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'bbb').isMatch('aaa').message).toBe('aaa not match function');
            });
        });

        describe('multi length and match condition', () => {
            test('\'aaa\' should lt 5 and eq 3 and match regexp /^a+$/', () => {
                expect(stringType.lt(5).and.equal(3).and.matchRegexp(/^a+$/));
            });

            test('\'aaa\' should lte 5 and match function that expect string \'aaa\'', () => {
                expect(stringType.lte(5).and.matchFunction(value => value === 'aaa'));
            });
        });
    });
});
