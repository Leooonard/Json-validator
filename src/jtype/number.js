// @flow

'use strict';

import {
    JType,
    JStates
} from './index';

import {
    wrapResult
} from '../util/result';

/*
    inNumbers,
    gt,
    gte,
    lt,
    lte,
    equal,
    notEqual,
    zero,
    positive,
    negative
*/

class JTypeNumber extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._$addMatcher(value => wrapResult(this._isNumber(value), 'not number type'));
    }

    _isNumber (value) {
        return typeof value === 'number';
    }

    inNumbers (compareTargetList) {
        this._$addMatcher(value => wrapResult(
            compareTargetList.some(compareTarget => this._isEqual(value, compareTarget)),
            `${value} not in ${compareTargetList}`
        ));

        return this;
    }

    gt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            this._isGreatThan(value, compareTarget),
            '${value} not gt ${compareTarget}'
        ));

        return this;
    }

    _isGreatThan (value, compareTarget) {
        return value > compareTarget;
    }

    gte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            this._isGreatThanOrEqual(value, compareTarget),
            `${value} not gte ${compareTarget}`
        ));

        return this;
    }

    _isGreatThanOrEqual (value, compareTarget) {
        return value >= compareTarget;
    }

    lt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            !this._isGreatThanOrEqual(value, compareTarget),
            `${value} not lt ${compareTarget}`
        ));

        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            !this._isGreatThan(value, compareTarget),
            `${value} not lte ${compareTarget}`
        ));

        return this;
    }

    equal (compareTarget) {
        this._$addMatcher(value => wrapResult(
            this._isEqual(value, compareTarget),
            `${value} not equal ${compareTarget}`
        ));

        return this;
    }

    notEqual (compareTarget) {
        this._$addMatcher(value => wrapResult(
            !this._isEqual(value, compareTarget),
            `${value} not notEqual ${compareTarget}`
        ));

        return this;
    }

    _isEqual (value, compareTarget) {
        return value === compareTarget;
    }

    get zero () {
        this._$addMatcher(value => wrapResult(
            this._isEqual(value, 0),
            `${value} not zero`
        ));
        return this;
    }

    get positive () {
        this._$addMatcher(value => wrapResult(
            this._isGreatThan(value, 0),
            `${value} not positive`
        ));
        return this;
    }

    get negative () {
        this._$addMatcher(value => wrapResult(
            !this._isGreatThanOrEqual(value, 0),
            `${value} not negative`
        ));
        return this;
    }
}

export {
    JTypeNumber
};
