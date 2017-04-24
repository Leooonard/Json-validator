// @flow

import {
    JTypeNumber
} from '../../src/jtype/number';

describe('test JTypeNumber\'s basic function', () => {
    describe('should only match number', () => {
        test('5 is number', () => {
            let numberType = new JTypeNumber();
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('true is not number', () => {
            let numberType = new JTypeNumber();
            expect(numberType.isMatch(true)).not.toBeTruthy();
        });
    })

    describe('gt', () => {
        test('5 should gt 0', () => {
            let numberType = new JTypeNumber().gt(0);
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('5 should not gt 10', () => {
            let numberType = new JTypeNumber().gt(10);
            expect(numberType.isMatch(5)).not.toBeTruthy();
        });
    });

    describe('lt', () => {
        test('0 should lt 5', () => {
            let numberType = new JTypeNumber().lt(5);
            expect(numberType.isMatch(0)).toBeTruthy();
        });

        test('5 should not lt 0', () => {
            let numberType = new JTypeNumber().lt(0);
            expect(numberType.isMatch(5)).not.toBeTruthy();
        });
    })

    describe('gte', () => {
        test('5 should gte 0', () => {
            let numberType = new JTypeNumber().gte(0);
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('5 should gte 5', () => {
            let numberType = new JTypeNumber().gte(5);
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('0 should not gte 5', () => {
            let numberType = new JTypeNumber().gte(5);
            expect(numberType.isMatch(0)).not.toBeTruthy();
        });
    });

    describe('lte', () => {
        test('0 should lte 5', () => {
            let numberType = new JTypeNumber().lte(5);
            expect(numberType.isMatch(0)).toBeTruthy();
        });

        test('5 should lte 5', () => {
            let numberType = new JTypeNumber().lte(5);
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('5 should not lte 0', () => {
            let numberType = new JTypeNumber().lte(0);
            expect(numberType.isMatch(5)).not.toBeTruthy();
        });
    });

    describe('equal', () => {
        test('5 should equal 5', () => {
            let numberType = new JTypeNumber().equal(5);
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('5 should not equal 0', () => {
            let numberType = new JTypeNumber().equal(0);
            expect(numberType.isMatch(5)).not.toBeTruthy();
        });
    });

    describe('not equal', () => {
        test('5 should not equal 5', () => {
            let numberType = new JTypeNumber().notEqual(5);
            expect(numberType.isMatch(5)).not.toBeTruthy();
        });

        test('5 should not equal 0', () => {
            let numberType = new JTypeNumber().notEqual(0);
            expect(numberType.isMatch(5)).toBeTruthy();
        });
    });

    describe('zero', () => {
        test('0 should be zero', () => {
            let numberType = new JTypeNumber().zero();
            expect(numberType.isMatch(0)).toBeTruthy();
        });

        test('5 should not be 0', () => {
            let numberType = new JTypeNumber().zero();
            expect(numberType.isMatch(5)).not.toBeTruthy();
        });
    });

    describe('positive', () => {
        test('5 should be positive', () => {
            let numberType = new JTypeNumber().positive();
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('-5 should not be positive', () => {
            let numberType = new JTypeNumber().positive();
            expect(numberType.isMatch(-5)).not.toBeTruthy();
        });
    });

    describe('negative', () => {
        test('-5 should be negative', () => {
            let numberType = new JTypeNumber().negative();
            expect(numberType.isMatch(-5)).toBeTruthy();
        });

        test('5 should not be negative', () => {
            let numberType = new JTypeNumber().negative();
            expect(numberType.isMatch(5)).not.toBeTruthy();
        });
    });
});

describe('test JTypeNumber\'s advanced function', () => {
    describe('multi lt, gt condition', () => {
        test('5 should lt 10 and gt 0', () => {
            let numberType = new JTypeNumber().gt(0).lt(10);
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('5 should gte 5 and lt 10', () => {
            let numberType = new JTypeNumber().gte(5).lt(10);
            expect(numberType.isMatch(5)).toBeTruthy();
        });

        test('10 should gte 5 but not lt 10', () => {
            let numberType = new JTypeNumber().gte(5).lt(10);
            expect(numberType.isMatch(10)).not.toBeTruthy();
        });

        test('10 should gt 5 and lte 10', () => {
            let numberType = new JTypeNumber().gt(5).and.lte(10);
            expect(numberType.isMatch(10)).toBeTruthy();
        });

        test('10 should gt 5 but not negative', () => {
            let numberType = new JTypeNumber().gt(5).and.negative();
            expect(numberType.isMatch(10)).not.toBeTruthy();
        });
    });
});
