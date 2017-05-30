// @flow

import {
    JTypeBool
} from '../../src/jtype/bool';

import {
    isSuccessResult,
    getResultMessage,
    getResultValue
} from '../../src/util/result';

describe('validate api', () => {
    describe('test JTypeBool\'s basic function', () => {
        describe('should only match bool', () => {
            test('true filter result is true', () => {
                let boolType = new JTypeBool();
                expect(isSuccessResult(boolType.validate(true))).toBeTruthy();
                expect(getResultValue(boolType.validate(true))).toBe(true);
            });

            test('5 filter result is undefined', () => {
                let boolType = new JTypeBool();
                expect(isSuccessResult(boolType.validate(5))).toBeFalsy();
                expect(getResultValue(boolType.validate(5))).toBe(undefined);
                console.log(getResultMessage(boolType.validate(5)));
            });
        });

        describe('true', () => {
            test('true filter result is true', () => {
                let boolType = new JTypeBool().truely;
                expect(isSuccessResult(boolType.validate(true))).toBeTruthy();
                expect(getResultValue(boolType.validate(true))).toBe(true);
            });

            test('false filter result is undefined', () => {
                let boolType = new JTypeBool().truely;
                expect(isSuccessResult(boolType.validate(false))).toBeFalsy();
                expect(getResultValue(boolType.validate(false))).toBe(undefined);
                console.log(getResultMessage(boolType.validate(false)));
            });
        });

        describe('false', () => {
            test('false filter result is false', () => {
                let boolType = new JTypeBool().falsely;
                expect(isSuccessResult(boolType.validate(false))).toBeTruthy();
                expect(getResultValue(boolType.validate(false))).toBe(false);
            });

            test('false .validate( result is undefined', () => {
                let boolType = new JTypeBool().falsely;
                expect(isSuccessResult(boolType.validate(true))).toBeFalsy();
                expect(getResultValue(boolType.validate(true))).toBe(undefined);
                console.log(getResultMessage(boolType.validate(true)));
            });
        });
    });
});
