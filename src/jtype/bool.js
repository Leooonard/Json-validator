// @flow

'use strict';

import {
    JType
} from './index';

import {
    wrapResult
} from '../util/result';

class JTypeBool extends JType {
    constructor (returnControl) {
        super(returnControl);

        this._$addMatcher(value => wrapResult(this._isBool(value), 'not boolean type'));
    }

    _isBool (value) {
        return typeof value === 'boolean';
    }

    get truely () {
        this._$addMatcher(value => wrapResult(value === true, 'not true value'));
        return this;
    }

    get falsely () {
        this._$addMatcher(value => wrapResult(value === false, 'not false value'));
        return this;
    }
}

export {
    JTypeBool
};
