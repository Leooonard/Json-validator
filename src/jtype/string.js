// @flow

'use strict';

import {
    JType,
    JStates
} from './jtype';

import {
    JTypeNumber
} from './number';

import {
    assert
} from '../util/assert';

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

    _isValidLengthState () {
        const states = this._$getStates();
        const statesCount = states.length;

        if (states[statesCount - 1] === JStringStates.length) {
            return true;
        } else if (states[statesCount - 2] === JStringStates.length && states[statesCount - 1] === JStates.not) {
            return true;
        } else {
            return false;
        }
    }

    _isNotTheCurrentState () {
        const currentState = this._$getCurrentState();

        if (currentState === JStates.not) {
            return true;
        } else {
            return false;
        }
    }

    get empty () {
        if (this._isNotTheCurrentState()) {
            this._$popState();
            this._$addMatcher(value => !this._isEmptyString(value));
        } else {
            this._$addMatcher(value => this._isEmptyString(value));
        }

        return this;
    }

    _isEmptyString (value) {
        return value === '';
    }

    get length () {
        this._$pushState(LENGTH_STATE);
        return this;
    }

    equal (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._isValidLengthState());

        if (this._isNotTheCurrentState()) {
            this._$popState();
            this._$addMatcher(value => !new JTypeNumber().equal(compareTarget).isMatch(value.length));
        } else {
            this._$addMatcher(value => new JTypeNumber().equal(compareTarget).isMatch(value.length));
        }

        this._$popState();
        return this;
    }

    gt (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._isValidLengthState());

        if (this._isNotTheCurrentState()) {
            this._$popState();
            this._$addMatcher(value => !new JTypeNumber().gt(compareTarget).isMatch(value.length));
        } else {
            this._$addMatcher(value => new JTypeNumber().gt(compareTarget).isMatch(value.length));
        }

        this._$popState();
        return this;
    }

    lt (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._isValidLengthState());

        if (this._isNotTheCurrentState()) {
            this._$popState();
            this._$addMatcher(value => !new JTypeNumber().lt(compareTarget).isMatch(value.length));
        } else {
            this._$addMatcher(value => new JTypeNumber().lt(compareTarget).isMatch(value.length));
        }

        this._$popState();
        return this;
    }

    gte (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._isValidLengthState());

        if (this._isNotTheCurrentState()) {
            this._$popState();
            this._$addMatcher(value => !new JTypeNumber().gte(compareTarget).isMatch(value.length));
        } else {
            this._$addMatcher(value => new JTypeNumber().gte(compareTarget).isMatch(value.length));
        }

        this._$popState();
        return this;
    }

    lte (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._isValidLengthState());

        if (this._isNotTheCurrentState()) {
            this._$popState();
            this._$addMatcher(value => !new JTypeNumber().lte(compareTarget).isMatch(value.length));
        } else {
            this._$addMatcher(value => new JTypeNumber().lte(compareTarget).isMatch(value.length));
        }

        this._$popState();
        return this;
    }

    includes (subString) {
        assert()
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
        assert(NOT_REGEXP_ERROR_TIP, regexp instanceof RegExp);

        this._$addMatcher(value => regexp.test(value));
        return this;
    }

    matchFunction (func) {
        assert(NOT_FUNC_ERROR_TIP, typeof func === 'function');

        this._$addMatcher(value => func(value));
        return this;
    }
}

export {
    JTypeString
};
