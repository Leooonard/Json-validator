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
            this._value = this._value.filter(listItem => isSuccessResult(jType.test(listItem)));
            return true;
        });
        return this;
    }

    eq (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().eq(compareTarget).test(this._value.length)),
            `[${value}] not equal ${compareTarget}`
        ));
        return this;
    }

    gt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().gt(compareTarget).test(this._value.length)),
            `[${value}] not gt ${compareTarget}`
        ));
        return this;
    }

    lt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().lt(compareTarget).test(this._value.length)),
            `[${value}] not lt ${compareTarget}`
        ));
        return this;
    }

    gte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().gte(compareTarget).test(this._value.length)),
            `[${value}] not gte ${compareTarget}`
        ));
        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().lte(compareTarget).test(this._value.length)),
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
