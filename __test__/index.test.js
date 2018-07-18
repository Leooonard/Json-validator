// @flow

import {
    typeCollector as JTC,
    validator as Joi
} from '../src';

import {
    getResultValue
} from '../src/util/result';

describe('Joi', () => {
    test('a real example', () => {
        let result = Joi.validate({
            packageType: 1,
            packageShortName: 5,
            packageRemark: '5折优惠',
            packageDetailInfoList: [
                {
                    isSelected: false,
                    defaultSelected: true,
                    packageSalePolicyInfoList: [
                        {
                            salePrice: {
                                priceValue: 100
                            },
                            originalPrice: {
                                priceValue: 200
                            },
                            isSelected: false
                        },
                        {
                            salePrice: {
                                priceValue: 100
                            },
                            originalPrice: {
                                priceValue: 200
                            },
                            isSelected: 5
                        },
                        {
                            salePrice: {
                                priceValue: '100'
                            },
                            originalPrice: {
                                priceValue: 200
                            },
                            isSelected: false
                        }
                    ]
                },
                {
                    isSelected: false,
                    defaultSelected: true,
                    packageSalePolicyInfoList: [
                        {
                            salePrice: {
                                priceValue: 100
                            },
                            originalPrice: {
                                priceValue: true
                            },
                            isSelected: false
                        },
                        {
                            salePrice: {
                                priceValue: 100
                            },
                            originalPrice: {
                                priceValue: 200
                            },
                            isSelected: 5
                        },
                        {
                            salePrice: {
                                priceValue: '100'
                            },
                            originalPrice: {
                                priceValue: 200
                            },
                            isSelected: false
                        }
                    ]
                }
            ],
            packageNoteList: [
                {
                    type: 1,
                    title: '123',
                    content: '213'
                },
                {
                    type: true,
                    title: '123',
                    content: '123'
                }
            ]
        }, JTC.object.matchShape({
            packageType: JTC.number.positive,
            packageShortName: JTC.string.unEmpty.default('休息室'),
            packageRemark: JTC.string.length.gt(3),
            packageDetailInfoList: JTC.array.matchChild(JTC.object.matchShape({
                isSelected: JTC.bool,
                defaultSelected: JTC.bool,
                packageSalePolicyInfoList: JTC.array.matchChild(JTC.object.matchShape({
                    salePrice: JTC.object.matchShape({
                        priceValue: JTC.number.positive
                    }),
                    originalPrice: JTC.object.matchShape({
                        priceValue: JTC.number.positive
                    }),
                    isSelected: JTC.bool
                })).and.length.gt(0)
            })).and.length.gt(0),
            packageNoteList: JTC.array.matchChild(JTC.object.matchShape({
                type: JTC.number.inNumbers([1]).default(1),
                title: JTC.string.unEmpty,
                content: JTC.string.unEmpty
            })).and.length.gt(0),
            flightNoteList: JTC.array.gt(5).default([])
        }));

        expect(getResultValue(result)).toEqual({
            packageType: 1,
            packageShortName: '休息室',
            packageRemark: '5折优惠',
            packageDetailInfoList: [
                {
                    isSelected: false,
                    defaultSelected: true,
                    packageSalePolicyInfoList: [
                        {
                            salePrice: {
                                priceValue: 100
                            },
                            originalPrice: {
                                priceValue: 200
                            },
                            isSelected: false
                        }
                    ]
                }
            ],
            packageNoteList: [
                {
                    type: 1,
                    title: '123',
                    content: '213'
                },
                {
                    type: 1,
                    title: '123',
                    content: '123'
                }
            ],
            flightNoteList: []
        });
    });
});
