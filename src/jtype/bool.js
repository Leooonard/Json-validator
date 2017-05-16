// @flow

'use strict';

import {
    JType
} from './index';

class JTypeBool extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._$addMatcher(value => this._isBool(value));
    }

    _isBool (value) {
        return typeof value === 'boolean';
    }

    get truely () {
        this._$addMatcher(value => value === true);
        return this;
    }

    get falsely () {
        this._$addMatcher(value => value === false);
        return this;
    }
}

export {
    JTypeBool
};
