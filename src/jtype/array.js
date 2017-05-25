// @flow

'use strict';

import {
    JType
} from './index';

import {
    JTypeNumber
} from './number';

import {
    wrapResult,
    isSuccessResult
} from '../util/result';

/*
    array:
        eq,
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
            return wrapResult(
                this._isArray(value),
                `${value} not array`
            );
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
            this._value = this._value.filter(listItem => isSuccessResult(jType.isMatch(listItem)));
            return true;
        });
        return this;
    }

    eq (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().eq(compareTarget).isMatch(this._value.length),
            `[${value}] not equal ${compareTarget}`
        ));
        return this;
    }

    gt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().gt(compareTarget).isMatch(this._value.length),
            `[${value}] not gt ${compareTarget}`
        ));
        return this;
    }

    lt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().lt(compareTarget).isMatch(this._value.length),
            `[${value}] not lt ${compareTarget}`
        ));
        return this;
    }

    gte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().gte(compareTarget).isMatch(this._value.length),
            `[${value}] not gte ${compareTarget}`
        ));
        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().lte(compareTarget).isMatch(this._value.length),
            `[${value}] not lte ${compareTarget}`
        ));
        return this;
    }

    filter (value) {
        if (isSuccessResult(this._isMatch(value))) {
            return this._value;
        } else {
            return undefined;
        }
    }
}

export {
    JTypeArray
};
