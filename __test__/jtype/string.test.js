// @flow

import {
    JTypeString
} from '../../src/jtype/string';

describe('test api', () => {
    describe('test JTypeString', () => {
        let stringType = undefined;

        beforeEach(() => {
            stringType = new JTypeString();
        });

        describe('test JTypeString\'s basic function', () => {
            describe('should only match string', () => {
                test('\'aaa\' is string', () => {
                    expect(stringType.test('aaa')).toBeTruthy();
                });

                test('5 is not string', () => {
                    expect(stringType.test(5).message).toBe('5 not string');
                });
            });

            describe('empty', () => {
                test('\'\' is empty string', () => {
                    expect(stringType.empty.test('')).toBeTruthy();
                });

                test('\'aaa\' is not empty string', () => {
                    expect(stringType.empty.test('aaa').message).toBe('aaa not empty');
                })
            });

            describe('unEmpty', () => {
                test('\'aaa\' is unEmpty string', () => {
                    expect(stringType.unEmpty.test('aaa')).toBeTruthy();
                });

                test('\'\' is not unEmpty string', () => {
                    expect(stringType.unEmpty.test('').message).toBe(' not unEmpty');
                });
            });

            describe('length conjunction should return JTypeString instance itself', () => {
                test('should equal after use length conjunction', () => {
                    expect(stringType.length === stringType).toBeTruthy();
                });
            });

            describe('equal', () => {
                test('\'aaa\' length should equal 3', () => {
                    expect(stringType.length.eq(3).test('aaa')).toBeTruthy();
                });

                test('\'aaaa\' length should not equal 3', () => {
                    expect(stringType.length.eq(3).test('aaaa').message).toBe('aaaa length not equal 3');
                });
            });

            describe('gt', () => {
                test('\'aaaa\' length should gt 3', () => {
                    expect(stringType.length.gt(3).test('aaaa')).toBeTruthy();
                });

                test('\'aaa\' length should not gt 3', () => {
                    expect(stringType.length.gt(3).test('aaa').message).toBe('aaa length not gt 3');
                });
            });

            describe('gte', () => {
                test('\'aaaa\' length should gte 3', () => {
                    expect(stringType.length.gte(3).test('aaaa')).toBeTruthy();
                });

                test('\'aaa\' length should gte 3', () => {
                    expect(stringType.length.gte(3).test('aaa')).toBeTruthy();
                });

                test('\'aa\' length should not gte 3', () => {
                    expect(stringType.length.gte(3).test('aa').message).toBe('aa length not gte 3');
                });
            });

            describe('lt', () => {
                test('\'aa\' length should lt 3', () => {
                    expect(stringType.length.lt(3).test('aa')).toBeTruthy();
                });

                test('\'aaaa\' length should not lt 3', () => {
                    expect(stringType.length.lt(3).test('aaaa').message).toBe('aaaa length not lt 3');
                });
            });

            describe('lte', () => {
                test('\'aa\' length should lte 3', () => {
                    expect(stringType.length.lte(3).test('aa')).toBeTruthy();
                });

                test('\'aaa\' length should lte 3', () => {
                    expect(stringType.length.lte(3).test('aaa')).toBeTruthy();
                });

                test('\'aaaa\' length should not lte 3', () => {
                    expect(stringType.length.lte(3).test('aaaa').message).toBe('aaaa length not lte 3');
                });
            });

            describe('includes', () => {
                test('\'bbbaaabbb\' should includes \'aaa\'', () => {
                    expect(stringType.includes('aaa').test('bbbaaabbb')).toBeTruthy();
                });

                test('\'bbbaabbb\' should not includes \'aaa\'', () => {
                    expect(stringType.includes('aaa').test('bbbaabbb').message).toBe('bbbaabbb not includes aaa');
                });
            });

            describe('startsWith', () => {
                test('\'aaabbb\' should starsWith \'aaa\'', () => {
                    expect(stringType.startsWith('aaa').test('aaabbb')).toBeTruthy();
                });

                test('\'aabbb\' should not startsWith \'aaa\'', () => {
                    expect(stringType.startsWith('aaa').test('aabbb').message).toBe('aabbb not startsWith aaa');
                });
            });

            describe('endsWith', () => {
                test('\'aaabbb\' should endsWith \'bbb\'', () => {
                    expect(stringType.endsWith('bbb').test('aaabbb')).toBeTruthy();
                });

                test('\'aaabb\' should not endsWith \'bbb\'', () => {
                    expect(stringType.endsWith('bbb').test('aaabb').message).toBe('aaabb not endsWith bbb');
                });
            });

            describe('matchRegexp', () => {
                test('\'aaa\' is not a regexp, so it should throw an exception', () => {
                    expect(stringType.matchRegexp('aaa')).toThrow();
                })

                test('/^a+$/ should match \'aaaaaa\'', () => {
                    expect(stringType.matchRegexp(/^a+$/).test('aaaaaa')).toBeTruthy();
                });

                test('/^a+$/ should not match \'aaaaab\'', () => {
                    expect(stringType.matchRegexp(/^a+$/).test('aaaaab').message).toBe('aaaaab not match ^a+$');
                });
            });

            describe('matchFunction', () => {
                test('\'aaa\' is not a function, so it should throw an exception', () => {
                    expect(stringType.matchFunction('aaa')).toThrow();
                });

                test('a function expect string \'aaa\' will return true when meet \'aaa\'', () => {
                    expect(stringType.matchFunction(value => value === 'aaa').test('aaa')).toBeTruthy();
                });
            })
        });

        describe('test JTypeString\'s advanced function', () => {
            describe('multi length conditon', () => {
                test('\'aaa\' length should lt 5 and gt 0', () => {
                    expect(stringType.lt(5).and.gt(0).test('aaa')).toBeTruthy();
                });

                test('\'aaa\' length should gte 3 and lte 3', () => {
                    expect(stringType.lte(3).and.gte(3).test('aaa')).toBeTruthy();
                });

                test('\'aaa\' length should equal 3 and gt 1 and gte 2 and lt 5 and lte 3', () => {
                    expect(stringType.eq(3).and.gt(1).and.gte(2).lt(5).and.lte(3).test('aaa')).toBeTruthy();
                });
            });

            describe('multi match condition', () => {
                test('\'aaa\' should match regexp /^a+$/ and match function that expect string \'aaa\'', () => {
                    expect(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'aaa').test('aaa')).toBeTruthy();
                });

                test('\'aaa\' should match regexp /^a+$/ and not match function that expect string \'bbb\'', () => {
                    expect(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'bbb').test('aaa').message).toBe('aaa not match function');
                });
            });

            describe('multi length and match condition', () => {
                test('\'aaa\' should lt 5 and eq 3 and match regexp /^a+$/', () => {
                    expect(stringType.lt(5).and.eq(3).and.matchRegexp(/^a+$/).test('aaa')).toBeTruthy();
                });

                test('\'aaa\' should lte 5 and match function that expect string \'aaa\'', () => {
                    expect(stringType.lte(5).and.matchFunction(value => value === 'aaa').test('aaa')).toBeTruthy();
                });
            });
        });
    });
});

describe('filter api', () => {
    describe('test JTypeString', () => {
        let stringType = undefined;

        beforeEach(() => {
            stringType = new JTypeString();
        });

        describe('test JTypeString\'s basic function', () => {
            describe('should only match string', () => {
                test('\'aaa\' is string filter result is \'aaa\'', () => {
                    expect(stringType.filter('aaa')).toBe('aaa');
                });

                test('5 is not string filter result is undefined', () => {
                    expect(stringType.filter(5)).toBe(undefined);
                });
            });

            describe('empty', () => {
                test('\'\' is empty string filter result is \'\'', () => {
                    expect(stringType.empty.filter('')).toBe('');
                });

                test('\'aaa\' is not empty string filter result is undefined', () => {
                    expect(stringType.empty.filter('aaa')).toBe(undefined);
                })
            });

            describe('unEmpty', () => {
                test('\'aaa\' is unEmpty string filter result is \'aaa\'', () => {
                    expect(stringType.unEmpty.filter('aaa')).toBe('aaa');
                });

                test('\'\' is not unEmpty string filter result is undefined', () => {
                    expect(stringType.unEmpty.filter('')).toBe(undefined);
                });
            });

            describe('length conjunction should return JTypeString instance itself', () => {
                test('should equal after use length conjunction', () => {
                    expect(stringType.length === stringType).toBeTruthy();
                });
            });

            describe('equal', () => {
                test('\'aaa\' length should equal 3 filter result is \'aaa\'', () => {
                    expect(stringType.length.eq(3).filter('aaa')).toBe('aaa');
                });

                test('\'aaaa\' length should not equal 3 filter result is undefined', () => {
                    expect(stringType.length.eq(3).filter('aaaa')).toBe(undefined);
                });
            });

            describe('gt', () => {
                test('\'aaaa\' length should gt 3 filter result is \'aaaa\'', () => {
                    expect(stringType.length.gt(3).filter('aaaa')).toBe('aaaa');
                });

                test('\'aaa\' length should not gt 3 filter result is undefined', () => {
                    expect(stringType.length.gt(3).filter('aaa')).toBe(undefined);
                });
            });

            describe('gte', () => {
                test('\'aaaa\' length should gte 3 filter result is \'aaaa\'', () => {
                    expect(stringType.length.gte(3).filter('aaaa')).toBe('aaaa');
                });

                test('\'aaa\' length should gte 3 filter result is \'aaa\'', () => {
                    expect(stringType.length.gte(3).filter('aaa')).toBe('aaa');
                });

                test('\'aa\' length should not gte 3 filter result is undefined', () => {
                    expect(stringType.length.gte(3).filter('aa')).toBe(undefined);
                });
            });

            describe('lt', () => {
                test('\'aa\' length should lt 3 filter result is \'aa\'', () => {
                    expect(stringType.length.lt(3).filter('aa')).toBe('aa');
                });

                test('\'aaaa\' length should not lt 3 filter result is undefined', () => {
                    expect(stringType.length.lt(3).filter('aaaa')).toBe(undefined);
                });
            });

            describe('lte', () => {
                test('\'aa\' length should lte 3 filter result is \'aa\'', () => {
                    expect(stringType.length.lte(3).filter('aa')).toBe('aa');
                });

                test('\'aaa\' length should lte 3 filter result is \'aaa\'', () => {
                    expect(stringType.length.lte(3).filter('aaa')).toBe('aaa');
                });

                test('\'aaaa\' length should not lte 3 filter result is undefined', () => {
                    expect(stringType.length.lte(3).filter('aaaa')).toBe(undefined);
                });
            });

            describe('includes', () => {
                test('\'bbbaaabbb\' should includes \'aaa\' filter result is \'bbbaaabbb\'', () => {
                    expect(stringType.includes('aaa').filter('bbbaaabbb')).toBe('bbbaaabbb');
                });

                test('\'bbbaabbb\' should not includes \'aaa\' filter result is undefined', () => {
                    expect(stringType.includes('aaa').filter('bbbaabbb')).toBe(undefined);
                });
            });

            describe('startsWith', () => {
                test('\'aaabbb\' should starsWith \'aaa\' filter result is \'aaabbb\'', () => {
                    expect(stringType.startsWith('aaa').filter('aaabbb')).toBe('aaabbb');
                });

                test('\'aabbb\' should not startsWith \'aaa\' filter result is undefined', () => {
                    expect(stringType.startsWith('aaa').filter('aabbb')).toBe(undefined);
                });
            });

            describe('endsWith', () => {
                test('\'aaabbb\' should endsWith \'bbb\' filter result is \'aaabbb\'', () => {
                    expect(stringType.endsWith('bbb').filter('aaabbb')).toBe('aaabbb');
                });

                test('\'aaabb\' should not endsWith \'bbb\' filter result is undefined', () => {
                    expect(stringType.endsWith('bbb').filter('aaabb')).toBe(undefined);
                });
            });

            describe('matchRegexp', () => {
                test('\'aaa\' is not a regexp, so it should throw an exception', () => {
                    expect(stringType.matchRegexp('aaa')).toThrow();
                })

                test('/^a+$/ should match \'aaaaaa\' filter result is \'aaaaaa\'', () => {
                    expect(stringType.matchRegexp(/^a+$/).filter('aaaaaa')).toBe('aaaaaa');
                });

                test('/^a+$/ should not match \'aaaaab\' filter result is undefined', () => {
                    expect(stringType.matchRegexp(/^a+$/).filter('aaaaab')).toBe(undefined);
                });
            });

            describe('matchFunction', () => {
                test('\'aaa\' is not a function, so it should throw an exception', () => {
                    expect(stringType.matchFunction('aaa')).toThrow();
                });

                test('a function expect string \'aaa\' will return true when meet \'aaa\' filter result is \'aaa\'', () => {
                    expect(stringType.matchFunction(value => value === 'aaa').filter('aaa')).toBe('aaa');
                });
            })
        });

        describe('test JTypeString\'s advanced function', () => {
            describe('multi length conditon', () => {
                test('\'aaa\' length should lt 5 and gt 0 filter result is \'aaa\'', () => {
                    expect(stringType.lt(5).and.gt(0).filter('aaa')).toBe('aaa');
                });

                test('\'aaa\' length should gte 3 and lte 3 filter result is \'aaa\'', () => {
                    expect(stringType.lte(3).and.gte(3).filter('aaa')).toBe('aaa');
                });

                test('\'aaa\' length should equal 3 and gt 1 and gte 2 and lt 5 and lte 3 filter result is \'aaa\'', () => {
                    expect(stringType.eq(3).and.gt(1).and.gte(2).lt(5).and.lte(3).filter('aaa')).toBe('aaa');
                });
            });

            describe('multi match condition', () => {
                test('\'aaa\' should match regexp /^a+$/ and match function that expect string \'aaa\' filter result is \'aaa\'', () => {
                    expect(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'aaa').filter('aaa')).toBe('aaa');
                });

                test('\'aaa\' should match regexp /^a+$/ and not match function that expect string \'bbb\' filter result is undefined', () => {
                    expect(stringType.matchRegexp(/^a+$/).and.matchFunction(value => value === 'bbb').filter('aaa')).toBe(undefined);
                });
            });

            describe('multi length and match condition', () => {
                test('\'aaa\' should lt 5 and eq 3 and match regexp /^a+$/ filter result is \'aaa\'', () => {
                    expect(stringType.lt(5).and.eq(3).and.matchRegexp(/^a+$/).filter('aaa')).toBe('aaa');
                });

                test('\'aaa\' should lte 5 and match function that expect string \'aaa\' filter result is \'aaa\'', () => {
                    expect(stringType.lte(5).and.matchFunction(value => value === 'aaa').filter('aaa')).toBe('aaa');
                });
            });
        });
    });
});
