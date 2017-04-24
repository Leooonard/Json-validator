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
const NOT_REGEXP_ERROR_TIP = 'pass RegExp to matchRegexp';
const NOT_FUNC_ERROR_TIP = 'pass Function to matchFunction';

class JTypeString extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._setState(EMPTY_STATE);
        this._$addMatcher(value => this._isString(value));
    }

    _isString (value) {
        return typeof value === 'string';
    }

    _setState (state) {
        this._state = state;
    }

    _inState (targetState) {
        return this._state === targetState;
    }

    get empty () {
        let currentState = this._$getCurrentState();

        if (currentState === JStates.not) {
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
        assert(LENGTH_STATE_ERROR_TIP, this._inState(LENGTH_STATE));

        this._$popState();
        this._$addMatcher(value => new JTypeNumber().equal(compareTarget).isMatch(value.length));
        return this;
    }

    gt (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._inState(LENGTH_STATE));

        this._$popState();
        this._$addMatcher(value => new JTypeNumber().gt(compareTarget).isMatch(value.length));
        return this;
    }

    lt (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._inState(LENGTH_STATE));

        this._$popState();
        this._$addMatcher(value => new JTypeNumber().lt(compareTarget).isMatch(value.length));
        return this;
    }

    gte (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._inState(LENGTH_STATE));

        this._$popState();
        this._$addMatcher(value => new JTypeNumber().gte(compareTarget).isMatch(value.length));
        return this;
    }

    lte (compareTarget) {
        assert(LENGTH_STATE_ERROR_TIP, this._inState(LENGTH_STATE));

        this._setState(EMPTY_STATE);
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
