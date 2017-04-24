// @flow

'use strict';

/*
    array:
        lengthEqual,
        lengthNotEqual,
        lengthGreatThan,
        lengthLessThan,
        lengthGreatThanOrEqual,
        lengthLessThanOrEqual
*/

import {
    JType
} from './jtype';

class JTypeArray extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._addMatcher(value => this._isArray(value));
    }

    _isArray (value) {
        return Array.isArray(value);
    }
}

export {
    JTypeArray
};
