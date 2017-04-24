// @flow

import {
    JTypeBool
} from '../../src/jtype/bool';

describe('test JTypeBool\'s basic function', () => {
    describe('should only match bool', () => {
        test('true is bool', () => {
            let boolType = new JTypeBool();
            expect(boolType.isMatch(true)).toBeTruthy();
        });

        test('5 is not bool', () => {
            let boolType = new JTypeBool();
            expect(boolType.isMatch(5)).not.toBeTruthy();
        })
    });

    describe('true', () => {
        test('true should equal true', () => {
            let boolType = new JTypeBool().truely;
            expect(boolType.isMatch(true)).toBeTruthy();
        });

        test('false should not equal true', () => {
            let boolType = new JTypeBool().truely;
            expect(boolType.isMatch(false)).not.toBeTruthy();
        });
    });

    describe('false', () => {
        test('false should equal false', () => {
            let boolType = new JTypeBool().falsely;
            expect(boolType.isMatch(false)).toBeTruthy();
        });

        test('false should not equal true', () => {
            let boolType = new JTypeBool().falsely;
            expect(boolType.isMatch(true)).not.toBeTruthy();
        });
    });
});
