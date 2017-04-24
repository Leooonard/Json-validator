// @flow

import {
    JTypeString
} from '../../jtype/string';

describe('test JTypeBool\'s basic function', () => {
    let stringType = undefined;

    beforeEach(() => {
        stringType = new JTypeString();
    });

    describe('should only match string', () => {
        test('\'aaa\' is string', () => {
            expect(stringType.isMatch('aaa')).toBeTruthy();
        });

        test('5 is not string', () => {
            let stringType = new JTypeString();
            expect(stringType.isMatch(5)).not.toBeTruthy();
        });
    });

    describe('empty', () => {
        test('\'\' is empty string', () => {
            expect(stringType.empty.isMatch('')).toBeTruthy();
        });

        test('\'aaa\' is not empty string', () => {
            expect(stringType.empty.isMatch('aaa')).toBeTruthy();
        })
    });

    describe('unEmpty', () => {
        test('\'aaa\' is unEmpty string', () => {
            expect(stringType.unEmpty.isMatch('aaa')).toBeTruthy();
        });

        test('\'\' is not unEmpty string', () => {
            expect(stringType.unEmpty.isMatch('')).not.toBeTruthy();
        });
    });

    describe('equal, unEqual, gt, lt, gte, lte can only be use after length', () => {
        test('should not throw error when use equal after length', () => {
            expect(stringType.length.equal(5).isMatch('12345')).toBeTruthy();
        });

        test('should throw error when use equal without length', () => {
            expect(stringType.equal(5).isMatch('12345')).toThrow();
        });
    });

    describe('equal', () => {
        test('\'aaa\' length should equal 3', () => {
            expect(stringType.length.equal(3).isMatch('aaa')).toBeTruthy();
        });

        test('\'aaaa\' length should not equal 3', () => {
            expect(stringType.length.equal(3).isMatch('aaaa')).not.toBeTruthy();
        });
    });

    describe('gt', () => {
        test('\'aaaa\' length should gt 3', () => {
            expect(stringType.length.gt(3).isMatch('aaaa')).toBeTruthy();
        });

        test('\'aaa\' length should not gt 3', () => {
            expect(stringType.length.gt(3).isMatch('aaa')).not.toBeTruthy();
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
            expect(stringType.length.gte(3).isMatch('aa')).not.toBeTruthy();
        });
    });

    describe('lt', () => {
        test('\'aa\' length should lt 3', () => {
            expect(stringType.length.lt(3).isMatch('aa')).toBeTruthy();
        });

        test('\'aaaa\' length should not lt 3', () => {
            expect(stringType.length.lt(3).isMatch('aaaa')).not.toBeTruthy();
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
            expect(stringType.length.lte(3).isMatch('aaaa')).not.toBeTruthy();
        });
    });

    describe('includes', () => {
        test('\'bbbaaabbb\' should includes \'aaa\'', () => {
            expect(stringType.includes('aaa').isMatch('bbbaaabbb')).toBeTruthy();
        });

        test('\'bbbaabbb\' should not includes \'aaa\'', () => {
            expect(stringType.includes('aaa').isMatch('bbbaabbb')).not.toBeTruthy();
        });
    });

    describe('notIncludes', () => {
        test('\'bbbaabbb\' should notIncludes \'aaa\'', () => {
            expect(stringType.notIncludes('aaa').isMatch('bbbaabbb')).toBeTruthy();
        });

        test('\'bbbaaabbb\' should not notIncludes \'aaa\'', () => {
            expect(stringType.notIncludes('aaa').isMatch('bbbaaabbb')).not.toBeTruthy();
        });
    });

    describe('startsWith', () => {
        test('\'aaabbb\' should starsWith \'aaa\'', () => {
            expect(stringType.startsWith('aaa').isMatch('aaabbb')).toBeTruthy();
        });

        test('\'aabbb\' should not startsWith \'aaa\'', () => {
            expect(stringType.startsWith('aaa').isMatch('aabbb')).not.toBeTruthy();
        });
    });

    describe('endsWith', () => {
        test('\'aaabbb\' should endsWith \'bbb\'', () => {
            expect(stringType.endsWith('bbb').isMatch('aaabbb')).toBeTruthy();
        });

        test('\'aaabb\' should not endsWith \'bbb\'', () => {
            expect(stringType.endsWith('bbb').isMatch('aaabb')).not.toBeTruthy();
        });
    });
});
