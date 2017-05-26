// @flow

import {
    JTypeNumber
} from '../../src/jtype/number';

describe('test api', () => {
    describe('test JTypeNumber\'s basic function', () => {
        describe('should only match number', () => {
            test('5 is number', () => {
                let numberType = new JTypeNumber();
                expect(numberType.test(5)).toBeTruthy();
            });

            test('true is not number', () => {
                let numberType = new JTypeNumber();
                expect(numberType.test(true).message).toBe('not number type');
            });
        });

        describe('inNumbers', () => {
            test('5 should in numbers [1, 5]', () => {
                let numberType = new JTypeNumber().inNumbers([1, 5]);
                expect(numberType.test(5)).toBeTruthy();
            });

            test('5 should not in numbers [1, 2]', () => {
                let numberType = new JTypeNumber().inNumbers([1, 2]);
                expect(numberType.test(5).message).toBe('5 not in [1,2]');
            });
        });

        describe('gt', () => {
            test('5 should gt 0', () => {
                let numberType = new JTypeNumber().gt(0);
                expect(numberType.test(5)).toBeTruthy();
            });

            test('5 should not gt 10', () => {
                let numberType = new JTypeNumber().gt(10);
                expect(numberType.test(5).message).toBe('5 not gt 10');
            });
        });

        describe('lt', () => {
            test('0 should lt 5', () => {
                let numberType = new JTypeNumber().lt(5);
                expect(numberType.test(0)).toBeTruthy();
            });

            test('5 should not lt 0', () => {
                let numberType = new JTypeNumber().lt(0);
                expect(numberType.test(5).message).toBe('5 not lt 0');
            });
        })

        describe('gte', () => {
            test('5 should gte 0', () => {
                let numberType = new JTypeNumber().gte(0);
                expect(numberType.test(5)).toBeTruthy();
            });

            test('5 should gte 5', () => {
                let numberType = new JTypeNumber().gte(5);
                expect(numberType.test(5)).toBeTruthy();
            });

            test('0 should not gte 5', () => {
                let numberType = new JTypeNumber().gte(5);
                expect(numberType.test(0).message).toBe('0 not gte 5');
            });
        });

        describe('lte', () => {
            test('0 should lte 5', () => {
                let numberType = new JTypeNumber().lte(5);
                expect(numberType.test(0)).toBeTruthy();
            });

            test('5 should lte 5', () => {
                let numberType = new JTypeNumber().lte(5);
                expect(numberType.test(5)).toBeTruthy();
            });

            test('5 should not lte 0', () => {
                let numberType = new JTypeNumber().lte(0);
                expect(numberType.test(5).message).toBe('5 not lte 0');
            });
        });

        describe('equal', () => {
            test('5 should equal 5', () => {
                let numberType = new JTypeNumber().eq(5);
                expect(numberType.test(5)).toBeTruthy();
            });

            test('5 should not equal 0', () => {
                let numberType = new JTypeNumber().eq(0);
                expect(numberType.test(5).message).toBe('5 not equal 0');
            });
        });

        describe('not equal', () => {
            test('5 should not equal 5', () => {
                let numberType = new JTypeNumber().neq(5);
                expect(numberType.test(5).message).toBe('5 not notEqual 5');
            });

            test('5 should not equal 0', () => {
                let numberType = new JTypeNumber().neq(0);
                expect(numberType.test(5)).toBeTruthy();
            });
        });

        describe('zero', () => {
            test('0 should be zero', () => {
                let numberType = new JTypeNumber().zero;
                expect(numberType.test(0)).toBeTruthy();
            });

            test('5 should not be 0', () => {
                let numberType = new JTypeNumber().zero;
                expect(numberType.test(5).message).toBe('5 not zero');
            });
        });

        describe('positive', () => {
            test('5 should be positive', () => {
                let numberType = new JTypeNumber().positive;
                expect(numberType.test(5)).toBeTruthy();
            });

            test('-5 should not be positive', () => {
                let numberType = new JTypeNumber().positive;
                expect(numberType.test(-5).message).toBe('-5 not positive');
            });
        });

        describe('negative', () => {
            test('-5 should be negative', () => {
                let numberType = new JTypeNumber().negative;
                expect(numberType.test(-5)).toBeTruthy();
            });

            test('5 should not be negative', () => {
                let numberType = new JTypeNumber().negative;
                expect(numberType.test(5).message).toBe('5 not negative');
            });
        });
    });

    describe('test JTypeNumber\'s advanced function', () => {
        describe('multi lt, gt condition', () => {
            test('5 should lt 10 and gt 0', () => {
                let numberType = new JTypeNumber().gt(0).lt(10);
                expect(numberType.test(5)).toBeTruthy();
            });

            test('5 should gte 5 and lt 10', () => {
                let numberType = new JTypeNumber().gte(5).lt(10);
                expect(numberType.test(5)).toBeTruthy();
            });

            test('10 should gte 5 but not lt 10', () => {
                let numberType = new JTypeNumber().gte(5).lt(10);
                expect(numberType.test(10).message).toBe('10 not lt 10');
            });

            test('10 should gt 5 and lte 10', () => {
                let numberType = new JTypeNumber().gt(5).and.lte(10);
                expect(numberType.test(10)).toBeTruthy();
            });

            test('10 should gt 5 but not negative', () => {
                let numberType = new JTypeNumber().gt(5).and.negative;
                expect(numberType.test(10).message).toBe('10 not negative');
            });
        });
    });
});

describe('filter api', () => {
    describe('test JTypeNumber\'s basic function', () => {
        describe('should only match number', () => {
            test('5 filter result is 5', () => {
                let numberType = new JTypeNumber();
                expect(numberType.filter(5)).toBe(5);
            });

            test('true filter result is undefined', () => {
                let numberType = new JTypeNumber();
                expect(numberType.filter(true)).toBe(undefined);
            });
        });

        describe('inNumbers', () => {
            test('5 should in numbers [1, 5] filter result is 5', () => {
                let numberType = new JTypeNumber().inNumbers([1, 5]);
                expect(numberType.filter(5)).toBe(5);
            });

            test('5 should not in numbers [1, 2] filter result is undefined', () => {
                let numberType = new JTypeNumber().inNumbers([1, 2]);
                expect(numberType.filter(5)).toBe(undefined);
            });
        });

        describe('gt', () => {
            test('5 should gt 0 filter result is 5', () => {
                let numberType = new JTypeNumber().gt(0);
                expect(numberType.filter(5)).toBe(5);
            });

            test('5 should not gt 10 filter result is undefined', () => {
                let numberType = new JTypeNumber().gt(10);
                expect(numberType.filter(5)).toBe(undefined);
            });
        });

        describe('lt', () => {
            test('0 should lt 5 filter result is 0', () => {
                let numberType = new JTypeNumber().lt(5);
                expect(numberType.filter(0)).toBe(0);
            });

            test('5 should not lt 0 filter result is undefined', () => {
                let numberType = new JTypeNumber().lt(0);
                expect(numberType.filter(5)).toBe(undefined);
            });
        })

        describe('gte', () => {
            test('5 should gte 0 filter result is 5', () => {
                let numberType = new JTypeNumber().gte(0);
                expect(numberType.filter(5)).toBe(5);
            });

            test('5 should gte 5 filter result is 5', () => {
                let numberType = new JTypeNumber().gte(5);
                expect(numberType.filter(5)).toBe(5);
            });

            test('0 should not gte 5 filter result is undefined', () => {
                let numberType = new JTypeNumber().gte(5);
                expect(numberType.filter(0)).toBe(undefined);
            });
        });

        describe('lte', () => {
            test('0 should lte 5 filter result is 0', () => {
                let numberType = new JTypeNumber().lte(5);
                expect(numberType.filter(0)).toBe(0);
            });

            test('5 should lte 5 filter result is 5', () => {
                let numberType = new JTypeNumber().lte(5);
                expect(numberType.filter(5)).toBe(5);
            });

            test('5 should not lte 0 filter result is undefined', () => {
                let numberType = new JTypeNumber().lte(0);
                expect(numberType.filter(5)).toBe(undefined);
            });
        });

        describe('equal', () => {
            test('5 should equal 5 filter result is 5', () => {
                let numberType = new JTypeNumber().eq(5);
                expect(numberType.filter(5)).toBe(5);
            });

            test('5 should not equal 0 filter result is undefined', () => {
                let numberType = new JTypeNumber().eq(0);
                expect(numberType.filter(5)).toBe(undefined);
            });
        });

        describe('not equal', () => {
            test('5 should not equal 5 filter result is undefined', () => {
                let numberType = new JTypeNumber().neq(5);
                expect(numberType.filter(5)).toBe(undefined);
            });

            test('5 should not equal 0 filter result is 5', () => {
                let numberType = new JTypeNumber().neq(0);
                expect(numberType.filter(5)).toBe(5);
            });
        });

        describe('zero', () => {
            test('0 should be zero filter result is 0', () => {
                let numberType = new JTypeNumber().zero;
                expect(numberType.filter(0)).toBe(0);
            });

            test('5 should not be 0 filter result is undefined', () => {
                let numberType = new JTypeNumber().zero;
                expect(numberType.filter(5)).toBe(undefined);
            });
        });

        describe('positive', () => {
            test('5 should be positive filter result is 5', () => {
                let numberType = new JTypeNumber().positive;
                expect(numberType.filter(5)).toBe(5);
            });

            test('-5 should not be positive filter result is undefined', () => {
                let numberType = new JTypeNumber().positive;
                expect(numberType.filter(-5)).toBe(undefined);
            });
        });

        describe('negative', () => {
            test('-5 should be negative filter result is -5', () => {
                let numberType = new JTypeNumber().negative;
                expect(numberType.filter(-5)).toBe(-5);
            });

            test('5 should not be negative filter result is undefined', () => {
                let numberType = new JTypeNumber().negative;
                expect(numberType.filter(5)).toBe(undefined);
            });
        });
    });

    describe('test JTypeNumber\'s advanced function', () => {
        describe('multi lt, gt condition', () => {
            test('5 should lt 10 and gt 0 filter result is 5', () => {
                let numberType = new JTypeNumber().gt(0).lt(10);
                expect(numberType.filter(5)).toBe(5);
            });

            test('5 should gte 5 and lt 10 filter result is 5', () => {
                let numberType = new JTypeNumber().gte(5).lt(10);
                expect(numberType.filter(5)).toBe(5);
            });

            test('10 should gte 5 but not lt 10 filter result is undefined', () => {
                let numberType = new JTypeNumber().gte(5).lt(10);
                expect(numberType.filter(10)).toBe(undefined);
            });

            test('10 should gt 5 and lte 10 filter result is 10', () => {
                let numberType = new JTypeNumber().gt(5).and.lte(10);
                expect(numberType.filter(10)).toBe(10);
            });

            test('10 should gt 5 but not negative filter result is undefined', () => {
                let numberType = new JTypeNumber().gt(5).and.negative;
                expect(numberType.filter(10)).toBe(undefined);
            });
        });
    });
});
