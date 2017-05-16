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

        this._$addMatcher(value => this._isString(value));
    }

    _isString (value) {
        return typeof value === 'string';
    }

    get empty () {
        this._$addMatcher(value => this._isEmptyString(value));
        return this;
    }

    get unEmpty () {
        this._$addMatcher(value => !this._isEmptyString(value));
        return this;
    }

    _isEmptyString (value) {
        return value === '';
    }

    get length () {
        return this;
    }

    equal (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().equal(compareTarget).isMatch(value.length));
        return this;
    }

    gt (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().gt(compareTarget).isMatch(value.length));
        return this;
    }

    lt (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().lt(compareTarget).isMatch(value.length));
        return this;
    }

    gte (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().gte(compareTarget).isMatch(value.length));
        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => new JTypeNumber().lte(compareTarget).isMatch(value.length));
        return this;
    }

    includes (subString) {
        this._$addMatcher(value => value.includes(subString));
        return this;
    }

    startsWith (subString) {
        this._$addMatcher(value => value.startsWith(subString));
        return this;
    }

    endsWith (subString) {
        this._$addMatcher(value => value.endsWith(subString));
        return this;
    }

    matchRegexp (regexp) {
        this._$addMatcher(value => regexp.test(value));
        return this;
    }

    matchFunction (func) {
        this._$addMatcher(value => func(value));
        return this;
    }
}

export {
    JTypeString
};
