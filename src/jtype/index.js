/* @flow */

'use strict';

const JStates = {
    not: 'not'
};

class JType {
    constructor (returnControl) {
        this._matchers = [];
        this._states = [];
        this._returnControl = returnControl;
    }

    // conjunction part start
    get is () {
        return this;
    }

    get to () {
        return this;
    }

    get be () {
        return this;
    }

    get should () {
        return this;
    }

    get could () {
        return this;
    }

    get and () {
        return this;
    }
    // conjunction part end

    // functional conjunction start
    get or () {
        return this._returnControl();
    }

    get not () {
        this._$pushState();
        return this;
    }

    get end () {
        return this._returnControl();
    }
    // functional conjunction end

    _$pushState (state) {
        this._states.push(state);
    }

    _$popState () {
        return this._states.pop();
    }

    _$getCurrentState () {
        const lastIndex = this._states.length - 1;
        return this._states[lastIndex];
    }

    _$addMatcher (func) {
        this._matchers.push({
            func
        });
    }

    _$getMatchers () {
        return this._matchers;
    }

    isMatch (value) {
        const matchers = this._getMatchers();

        return matchers.every(matcher => matcher.func(value));
    }
}

export {
    JType,
    JStates
};
