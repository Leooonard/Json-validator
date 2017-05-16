// @flow

'use strict';

import {
    JType,
    JStates
} from './jtype';

class JTypeNumber extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._$addMatcher(value => this._isNumber(value));
    }

    _isNumber (value) {
        return typeof value === 'number';
    }

    gt (compareTarget) {
        const currentState = this._$getCurrentState();

        if (currentState === JStates.not) {
            this._$popState();
            return this.lte(compareTarget);
        } else {
            this._$addMatcher(value => this._isGreatThan(value, compareTarget));
            return this;
        }
    }

    _isGreatThan (value, compareTarget) {
        return value > compareTarget;
    }

    gte (compareTarget) {
        const currentState = this._$getCurrentState();

        if (currentState === JStates.not) {
            this._$popState();
            return this.lt(compareTarget);
        } else {
            this._$addMatcher(value => this._isGreatThanOrEqual(value, compareTarget));
            return this;
        }
    }

    _isGreatThanOrEqual (value, compareTarget) {
        return value >= compareTarget;
    }

    lt (compareTarget) {
        const currentState = this._$getCurrentState();

        if (currentState === JStates.not) {
            this._$popState();
            return this.gte(compareTarget);
        } else {
            this._$addMatcher(value => !this._isGreatThanOrEqual(value, compareTarget));
            return this;
        }
    }

    lte (compareTarget) {
        const currentState = this._$getCurrentState();

        if (currentState === JStates.not) {
            this._$popState();
            return this.gt(compareTarget);
        } else {
            this._$addMatcher(value => !this._isGreatThan(value, compareTarget));
            return this;
        }
    }

    equal (compareTarget) {
        const currentState = this._$getCurrentState();

        if (currentState === JStates.not) {
            this._$popState();
            this._$addMatcher(value => !this._isEqual(value, compareTarget));
        } else {
            this._$addMatcher(value => this._isEqual(value, compareTarget));
        }

        return this;
    }

    _isEqual (value, compareTarget) {
        return value === compareTarget;
    }

    zero () {
        this._$addMatcher(value => this._isEqual(value, 0));
        return this;
    }

    positive () {
        this._$addMatcher(value => this._isGreatThan(value, 0));
        return this;
    }

    negative () {
        this._$addMatcher(value => !this._isGreatThanOrEqual(value, 0));
        return this;
    }
}

export {
    JTypeNumber
};
