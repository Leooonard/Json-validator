// @flow

'use strict';

import {
    JType,
    JStates
} from './index';

/*
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

        this._$addMatcher(value => this._isNumber(value));
    }

    _isNumber (value) {
        return typeof value === 'number';
    }

    gt (compareTarget) {
        this._$addMatcher(value => this._isGreatThan(value, compareTarget));
        return this;
    }

    _isGreatThan (value, compareTarget) {
        return value > compareTarget;
    }

    gte (compareTarget) {
        this._$addMatcher(value => this._isGreatThanOrEqual(value, compareTarget));
        return this;
    }

    _isGreatThanOrEqual (value, compareTarget) {
        return value >= compareTarget;
    }

    lt (compareTarget) {
        this._$addMatcher(value => !this._isGreatThanOrEqual(value, compareTarget));
        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => !this._isGreatThan(value, compareTarget));
        return this;
    }

    equal (compareTarget) {
        this._$addMatcher(value => this._isEqual(value, compareTarget));
        return this;
    }

    notEqual (compareTarget) {
        this._$addMatcher(value => !this._isEqual(value, compareTarget));
        return this;
    }

    _isEqual (value, compareTarget) {
        return value === compareTarget;
    }

    zero () {
        this._$addMatcher(value => this._isEqual(value, 0));
        return this;
    }

    positive () {
        this._$addMatcher(value => this._isGreatThan(value, 0));
        return this;
    }

    negative () {
        this._$addMatcher(value => !this._isGreatThanOrEqual(value, 0));
        return this;
    }
}

export {
    JTypeNumber
};
