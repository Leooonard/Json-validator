// @flow

'use strict';

import {
    JType
} from './jtype';

class JTypeBool extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._addMatcher(value => this._isBool(value));
    }

    _isBool (value) {
        return typeof value === 'bool';
    }

    get truely () {
        this._addMatcher(value => value === true);
        return this;
    }

    get falsely () {
        this._addMatcher(value => value === false);
        return this;
    }
}

export {
    JTypeBool
};
