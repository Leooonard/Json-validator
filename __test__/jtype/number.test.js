// @flow

import {
    JTypeNumber
} from '../../src/jtype/number';

import {
    isSuccessResult,
    getResultValue,
    getResultMessage
} from '../../src/util/result';

describe('validate api', () => {
    describe('test JTypeNumber\'s basic function', () => {
        describe('should only match number', () => {
            test('5 filter result is 5', () => {
                let numberType = new JTypeNumber();
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('true filter result is undefined', () => {
                let numberType = new JTypeNumber();
                expect(isSuccessResult(numberType.validate(true))).toBeFalsy();
                expect(getResultValue(numberType.validate(true))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(true)));
            });
        });

        describe('inNumbers', () => {
            test('5 should in numbers [1, 5] filter result is 5', () => {
                let numberType = new JTypeNumber().inNumbers([1, 5]);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('5 should not in numbers [1, 2] filter result is undefined', () => {
                let numberType = new JTypeNumber().inNumbers([1, 2]);
                expect(isSuccessResult(numberType.validate(5))).toBeFalsy();
                expect(getResultValue(numberType.validate(5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(5)));
            });
        });

        describe('gt', () => {
            test('5 should gt 0 filter result is 5', () => {
                let numberType = new JTypeNumber().gt(0);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('5 should not gt 10 filter result is undefined', () => {
                let numberType = new JTypeNumber().gt(10);
                expect(isSuccessResult(numberType.validate(5))).toBeFalsy();
                expect(getResultValue(numberType.validate(5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(5)));
            });
        });

        describe('lt', () => {
            test('0 should lt 5 filter result is 0', () => {
                let numberType = new JTypeNumber().lt(5);
                expect(isSuccessResult(numberType.validate(0))).toBeTruthy();
                expect(getResultValue(numberType.validate(0))).toBe(0);
            });

            test('5 should not lt 0 filter result is undefined', () => {
                let numberType = new JTypeNumber().lt(0);
                expect(isSuccessResult(numberType.validate(5))).toBeFalsy();
                expect(getResultValue(numberType.validate(5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(5)));
            });
        })

        describe('gte', () => {
            test('5 should gte 0 filter result is 5', () => {
                let numberType = new JTypeNumber().gte(0);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('5 should gte 5 filter result is 5', () => {
                let numberType = new JTypeNumber().gte(5);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('0 should not gte 5 filter result is undefined', () => {
                let numberType = new JTypeNumber().gte(5);
                expect(isSuccessResult(numberType.validate(0))).toBeFalsy();
                expect(getResultValue(numberType.validate(0))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(0)));
            });
        });

        describe('lte', () => {
            test('0 should lte 5 filter result is 0', () => {
                let numberType = new JTypeNumber().lte(5);
                expect(isSuccessResult(numberType.validate(0))).toBeTruthy();
                expect(getResultValue(numberType.validate(0))).toBe(0);
            });

            test('5 should lte 5 filter result is 5', () => {
                let numberType = new JTypeNumber().lte(5);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('5 should not lte 0 filter result is undefined', () => {
                let numberType = new JTypeNumber().lte(0);
                expect(isSuccessResult(numberType.validate(5))).toBeFalsy();
                expect(getResultValue(numberType.validate(5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(5)));
            });
        });

        describe('equal', () => {
            test('5 should equal 5 filter result is 5', () => {
                let numberType = new JTypeNumber().eq(5);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('5 should not equal 0 filter result is undefined', () => {
                let numberType = new JTypeNumber().eq(0);
                expect(isSuccessResult(numberType.validate(5))).toBeFalsy();
                expect(getResultValue(numberType.validate(5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(5)));
            });
        });

        describe('not equal', () => {
            test('5 should not equal 5 filter result is undefined', () => {
                let numberType = new JTypeNumber().neq(5);
                expect(isSuccessResult(numberType.validate(5))).toBeFalsy();
                expect(getResultValue(numberType.validate(5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(5)));
            });

            test('5 should not equal 0 filter result is 5', () => {
                let numberType = new JTypeNumber().neq(0);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });
        });

        describe('zero', () => {
            test('0 should be zero filter result is 0', () => {
                let numberType = new JTypeNumber().zero;
                expect(isSuccessResult(numberType.validate(0))).toBeTruthy();
                expect(getResultValue(numberType.validate(0))).toBe(0);
            });

            test('5 should not be 0 filter result is undefined', () => {
                let numberType = new JTypeNumber().zero;
                expect(isSuccessResult(numberType.validate(5))).toBeFalsy();
                expect(getResultValue(numberType.validate(5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(5)));
            });
        });

        describe('positive', () => {
            test('5 should be positive filter result is 5', () => {
                let numberType = new JTypeNumber().positive;
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('-5 should not be positive filter result is undefined', () => {
                let numberType = new JTypeNumber().positive;
                expect(isSuccessResult(numberType.validate(-5))).toBeFalsy();
                expect(getResultValue(numberType.validate(-5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(-5)));
            });
        });

        describe('negative', () => {
            test('-5 should be negative filter result is -5', () => {
                let numberType = new JTypeNumber().negative;
                expect(isSuccessResult(numberType.validate(-5))).toBeTruthy();
                expect(getResultValue(numberType.validate(-5))).toBe(-5);
            });

            test('5 should not be negative filter result is undefined', () => {
                let numberType = new JTypeNumber().negative;
                expect(isSuccessResult(numberType.validate(5))).toBeFalsy();
                expect(getResultValue(numberType.validate(5))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(5)));
            });
        });
    });

    describe('test JTypeNumber\'s advanced function', () => {
        describe('multi lt, gt condition', () => {
            test('5 should lt 10 and gt 0 filter result is 5', () => {
                let numberType = new JTypeNumber().gt(0).lt(10);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('5 should gte 5 and lt 10 filter result is 5', () => {
                let numberType = new JTypeNumber().gte(5).lt(10);
                expect(isSuccessResult(numberType.validate(5))).toBeTruthy();
                expect(getResultValue(numberType.validate(5))).toBe(5);
            });

            test('10 should gte 5 but not lt 10 filter result is undefined', () => {
                let numberType = new JTypeNumber().gte(5).lt(10);
                expect(isSuccessResult(numberType.validate(10))).toBeFalsy();
                expect(getResultValue(numberType.validate(10))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(10)));
            });

            test('10 should gt 5 and lte 10 filter result is 10', () => {
                let numberType = new JTypeNumber().gt(5).and.lte(10);
                expect(isSuccessResult(numberType.validate(10))).toBeTruthy();
                expect(getResultValue(numberType.validate(10))).toBe(10);
            });

            test('10 should gt 5 but not negative filter result is undefined', () => {
                let numberType = new JTypeNumber().gt(5).and.negative;
                expect(isSuccessResult(numberType.validate(10))).toBeFalsy();
                expect(getResultValue(numberType.validate(10))).toBe(undefined);
                console.log(getResultMessage(numberType.validate(10)));
            });
        });
    });
});
