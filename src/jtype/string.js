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
    wrapResult
} from '../util/result';

/*
    equal,
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

const LENGTH_STATE_ERROR_TIP = 'use equal, notEqual, gt, lt, gte, lte function after length';
const ERROR_LENGTH_STATE_ERROR_TIP = 'should not use \'length\' before includes, startsWith, endsWith';

const NOT_REGEXP_ERROR_TIP = 'pass RegExp to matchRegexp';
const NOT_FUNC_ERROR_TIP = 'pass Function to matchFunction';

const JStringStates = {
    length: 'length'
};

class JTypeString extends JType {
    constructor (returnControl) {
        super(returnControl);

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

    equal (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().equal(compareTarget).isMatch(value.length),
            `${value} length not equal ${compareTarget}`
        ));
        return this;
    }

    gt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().gt(compareTarget).isMatch(value.length),
            `${value} length not gt ${compareTarget}`
        ));
        return this;
    }

    lt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().lt(compareTarget).isMatch(value.length),
            `${value} length not lt ${compareTarget}`
        ));
        return this;
    }

    gte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().gte(compareTarget).isMatch(value.length),
            `${value} length not gte ${compareTarget}`
        ));
        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            new JTypeNumber().lte(compareTarget).isMatch(value.length),
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
