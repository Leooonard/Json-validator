// @flow

'use strict';

import {
    JType
} from './index';

import {
    JTypeNumber
} from './number';

/*
    array:
        equal,
        gt,
        gte,
        lt,
        lte,
        matchChild
*/

class JTypeArray extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._$addMatcher(value => {
            this._value = value;
            return this._isArray(value);
        });
    }

    _isArray (value) {
        return Array.isArray(value);
    }

    get length () {
        return this;
    }

    getValue () {
        return this._value;
    }

    matchChild (jType) {
        this._$addMatcher(value => {
            this._value = this._value.filter(listItem => jType.isMatch(listItem));
            return true;
        });
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
