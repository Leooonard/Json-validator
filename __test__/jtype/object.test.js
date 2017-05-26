// @flow

import {
    JTypeObject
} from '../../src/jtype/object';

import {
    JTypeArray
} from '../../src/jtype/array';

import {
    JTypeBool
} from '../../src/jtype/bool';

import {
    JTypeNumber
} from '../../src/jtype/number';

import {
    JTypeString
} from '../../src/jtype/string';

describe('test api', () => {
    describe('test JTypeObject', () => {
        let objectType = undefined;

        beforeEach(() => {
            objectType = new JTypeObject();
        });

        describe('test JTypeObject\'s basic function', () => {
            describe('should only match object', () => {
                test('{} is object', () => {
                    expect(objectType.test([])).toBeTruthy();
                });

                test('5 is not arary', () => {
                    expect(objectType.test(5).message).toBe('5 not object');
                });

                test('null is not arary', () => {
                    expect(objectType.test(null).message).toBe('null not object');
                });
            });

            describe('matchShape', () => {
                test('{a: 1} should have a attribute a that value is a number', () => {
                    let numberType = new JTypeNumber();
                    expect(objectType.matchShape({
                        a: numberType.gt(0)
                    }).test({a: 1})).toBeTruthy();
                });

                test('{a: true} should have a attribute a that value is a boolean', () => {
                    let boolType = new JTypeBool();
                    expect(objectType.matchShape({
                        a: boolType.truely
                    }).test({a: true})).toBeTruthy();
                });

                test('{a: \'aaaa\'} should not have a attribute a that value is match regexp /^a+b$/', () => {
                    let stringType = new JTypeString();

                    expect(objectType.matchShape({
                        a: stringType.matchRegexp(/^a+b$/)
                    }).test({a: 'aaaa'}).message).toMatch(/.+/);
                });
            });
        });

        describe('test JTypeObject\'s advanced function', () => {
            describe('matchShape', () => {
                test(`{a: 1, b: [1, 2], c: {d: true}} should have attribute a that value is a number
                    and have attribute b that is an array and have attribute c that is an object
                    which have attribute d`, () => {
                    expect(objectType.matchShape({
                        a: new JTypeNumber().gt(0),
                        b: new JTypeArray().eq(2),
                        c: new JTypeObject().matchShape({
                            d: new JTypeBool().truely
                        })
                    }).test({a: 1, b: [1, 2], c: {d: true}})).toBeTruthy();
                });

                test(`shape like {a: number.positive} should match object {a: 1, b: false, c: -1}`, () => {
                    expect(objectType.matchShape({
                        a: new JTypeNumber().positive
                    }).test({
                        a: 1,
                        b: false,
                        c: -1
                    })).toBeTruthy();
                })
            });
        });
    });
});

describe('filter api', () => {
    describe('test JTypeObject', () => {
        let objectType = undefined;

        beforeEach(() => {
            objectType = new JTypeObject();
        });

        describe('test JTypeObject\'s basic function', () => {
            describe('should only match object', () => {
                test('{} is object filter result is {}', () => {
                    expect(objectType.filter([])).toEqual({});
                });

                test('5 is not arary filter result is undefined', () => {
                    expect(objectType.filter(5)).toBe(undefined);
                });

                test('null is not arary filter result is undefined', () => {
                    expect(objectType.filter(null)).toBe(undefined);
                });
            });

            describe('matchShape', () => {
                test('{a: 1} should have a attribute a that value is a number filter result is {a: 1}', () => {
                    let numberType = new JTypeNumber();
                    expect(objectType.matchShape({
                        a: numberType.gt(0)
                    }).filter({a: 1})).toEqual({a: 1});
                });

                test('{a: true} should have a attribute a that value is a boolean filter result is {a: true}', () => {
                    let boolType = new JTypeBool();
                    expect(objectType.matchShape({
                        a: boolType.truely
                    }).filter({a: true})).toEqual({a: true});
                });

                test('{a: \'aaaa\'} should not have a attribute a that value is match regexp /^a+b$/ filter result is undefined', () => {
                    let stringType = new JTypeString();

                    expect(objectType.matchShape({
                        a: stringType.matchRegexp(/^a+b$/)
                    }).filter({a: 'aaaa'})).toBe(undefined);
                });
            });
        });

        describe('test JTypeObject\'s advanced function', () => {
            describe('matchShape', () => {
                test(`{a: 1, b: [1, 2], c: {d: true}} should have attribute a that value is a number
                    and have attribute b that is an array and have attribute c that is an object
                    which have attribute d filter result is {a: 1, b: [1, 2], c: {d: true}}`, () => {
                    expect(objectType.matchShape({
                        a: new JTypeNumber().gt(0),
                        b: new JTypeArray().eq(2),
                        c: new JTypeObject().matchShape({
                            d: new JTypeBool().truely
                        })
                    }).filter({a: 1, b: [1, 2], c: {d: true}})).toEqual({a: 1, b: [1, 2], c: {d: true}});
                });

                test(`shape like {a: number.positive} should match object {a: 1, b: false, c: -1} filter result is {a: 1, b: false, c: -1}`, () => {
                    expect(objectType.matchShape({
                        a: new JTypeNumber().positive
                    }).filter({
                        a: 1,
                        b: false,
                        c: -1
                    })).toEqual({
                        a: 1,
                        b: false,
                        c: -1
                    });
                })
            });
        });
    });
});
