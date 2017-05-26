// @flow

import {
    JTypeBool
} from '../../src/jtype/bool';

describe('test api', () => {
    describe('test JTypeBool\'s basic function', () => {
        describe('should only match bool', () => {
            test('true is bool', () => {
                let boolType = new JTypeBool();
                expect(boolType.test(true)).toBeTruthy();
            });

            test('5 is not bool', () => {
                let boolType = new JTypeBool();
                expect(boolType.test(5).message).toBe('not boolean type');
            })
        });

        describe('true', () => {
            test('true should equal true', () => {
                let boolType = new JTypeBool().truely;
                expect(boolType.test(true)).toBeTruthy();
            });

            test('false should not equal true', () => {
                let boolType = new JTypeBool().truely;
                expect(boolType.test(false).message).toBe('not true value');
            });
        });

        describe('false', () => {
            test('false should equal false', () => {
                let boolType = new JTypeBool().falsely;
                expect(boolType.test(false)).toBeTruthy();
            });

            test('false should not equal true', () => {
                let boolType = new JTypeBool().falsely;
                expect(boolType.test(true).message).toBe('not false value');
            });
        });
    });
});

describe('filter api', () => {
    describe('test JTypeBool\'s basic function', () => {
        describe('should only match bool', () => {
            test('true filter result is true', () => {
                let boolType = new JTypeBool();
                expect(boolType.filter(true)).toBe(true);
            });

            test('5 filter result is undefined', () => {
                let boolType = new JTypeBool();
                expect(boolType.filter(5)).toBe(undefined);
            });
        });

        describe('true', () => {
            test('true filter result is true', () => {
                let boolType = new JTypeBool().truely;
                expect(boolType.filter(true)).toBe(true);
            });

            test('false filter result is undefined', () => {
                let boolType = new JTypeBool().truely;
                expect(boolType.filter(false)).toBe(undefined);
            });
        });

        describe('false', () => {
            test('false filter result is false', () => {
                let boolType = new JTypeBool().falsely;
                expect(boolType.filter(false)).toBe(false);
            });

            test('false filter result is undefined', () => {
                let boolType = new JTypeBool().falsely;
                expect(boolType.filter(true)).toBe(undefined);
            });
        });
    });
});
