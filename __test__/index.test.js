// @flow

import {
    JTC,
    Joi
} from '../src';

describe('Joi', () => {
    test('a real example', () => {
        expect(Joi.filter({
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
                    type: 2,
                    title: '3123',
                    content: false
                },
                {
                    type: 1,
                    title: 123,
                    content: '123'
                }
            ]
        }, JTC.object.matchShape({
            packageType: JTC.number.positive,
            packageShortName: JTC.string.unEmpty,
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
                type: JTC.number.inNumbers([1]),
                title: JTC.string.unEmpty,
                content: JTC.string.unEmpty
            })).and.length.gt(0),
            a: JTC.object.matchShape({
                packageType: JTC.number.inNumbers([10]),
                passengerList: JTC.array.matchChild(JTC.object.matchShape({
                    passengerType: JTC.number.inNumbers([0, 1, 2, 3])
                })).and.length.gt(0)
            }).or.object.matchShape({
                packageType: JTC.number.inNumbers([9]),
                passengerList: JTC.array.matchChild(JTC.object.matchShape({
                    passengerType: JTC.number.inNumbers([1, 2, 3])
                })).and.length.gt(0)
            })
        }))).toEqual({
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
                }
            ]
        });
    });
});
