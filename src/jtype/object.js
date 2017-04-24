// @flow

'use strict';

import {
    JType
} from './jtype';

class JTypeObject extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._addMatcher(value => this._isObject(value));
    }

    _isObject (value) {
        return typeof value === 'object' && value !== null;
    }
}

export {
    JTypeObject
};
