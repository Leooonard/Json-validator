// @flow

'use strict';

/*
    array:
        lengthEqual,
        lengthNotEqual,
        lengthGreatThan,
        lengthLessThan,
        lengthGreatThanOrEqual,
        lengthLessThanOrEqual
*/

import {
    JType
} from './jtype';

class JTypeArray extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._addMatcher(value => {
            this._isArray(value);
            this._value = value;
        });
    }

    _isArray (value) {
        return Array.isArray(value);
    }

    get length () {
        return this;
    }

    matchChild (jType) {
        this._value = this._value.filter(listItem => jType.isMatch(listItem));
        return this;
    }

    equal (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().equal(compareTarget).isMatch(this._value.length));
        return this;
    }

    gt (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().gt(compareTarget).isMatch(this._value.length));
        return this;
    }

    lt (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().lt(compareTarget).isMatch(this._value.length));
        return this;
    }

    gte (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().gte(compareTarget).isMatch(this._value.length));
        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().lte(compareTarget).isMatch(this._value.length));
        return this;
    }
}

export {
    JTypeArray
};
