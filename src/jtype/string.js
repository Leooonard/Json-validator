// @flow

'use strict';

import {
    JType,
    JStates
} from './index';

import {
    JTypeNumber
} from './number';

import {
    assert
} from '../util/assert';

import {
    wrapResult,
    isSuccessResult
} from '../util/result';

/*
    eq,
    gt,
    gte,
    lt,
    lte,
    includes,
    startsWith,
    endsWith,
    matchRegexp,
    matchFunction
*/

const EMPTY_STATE = -1;
const LENGTH_STATE = 1;

const JStringStates = {
    length: 'length'
};

class JTypeString extends JType {
    constructor (returnControl, collector) {
        super(returnControl, collector);

        this._$addMatcher(value => wrapResult(
            this._isString(value),
            `${value} not string`
        ));
    }

    _isString (value) {
        return typeof value === 'string';
    }

    get empty () {
        this._$addMatcher(value => wrapResult(
            this._isEmptyString(value),
            `${value} not empty`
        ));
        return this;
    }

    get unEmpty () {
        this._$addMatcher(value => wrapResult(
            !this._isEmptyString(value),
            `${value} not unEmpty`
        ));
        return this;
    }

    _isEmptyString (value) {
        return value === '';
    }

    get length () {
        return this;
    }

    eq (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().eq(compareTarget).test(value.length)),
            `${value} length not equal ${compareTarget}`
        ));
        return this;
    }

    gt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().gt(compareTarget).test(value.length)),
            `${value} length not gt ${compareTarget}`
        ));
        return this;
    }

    lt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().lt(compareTarget).test(value.length)),
            `${value} length not lt ${compareTarget}`
        ));
        return this;
    }

    gte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().gte(compareTarget).test(value.length)),
            `${value} length not gte ${compareTarget}`
        ));
        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().lte(compareTarget).test(value.length)),
            `${value} length not lte ${compareTarget}`
        ));
        return this;
    }

    includes (subString) {
        this._$addMatcher(value => wrapResult(
            value.includes(subString),
            `${value} not includes ${subString}`
        ));
        return this;
    }

    startsWith (subString) {
        this._$addMatcher(value => wrapResult(
            value.startsWith(subString),
            `${value} not startsWith ${subString}`
        ));
        return this;
    }

    endsWith (subString) {
        this._$addMatcher(value => wrapResult(
            value.endsWith(subString),
            `${value} not endsWith ${subString}`
        ));
        return this;
    }

    matchRegexp (regexp) {
        assert(this._isRegexp(regexp), 'matchRegexp only accept a regexp parameter');

        this._$addMatcher(value => wrapResult(
            regexp.test(value),
            `${value} not match ${regexp.source}`
        ));
        return this;
    }

    _isRegexp (regexp) {
        return regexp instanceof RegExp;
    }

    matchFunction (func) {
        assert(this._isFunction(func), 'matchFunction only accpet a function parameter');

        this._$addMatcher(value => wrapResult(
            func(value),
            `${value} not match function`
        ));
        return this;
    }

    _isFunction (func) {
        return typeof func === 'function';
    }
}

export {
    JTypeString
};
