// @flow

import {
    JType
} from './index';

import {
    wrapResult
} from '../util/result';

class JTypeBool extends JType {
    constructor (collector) {
        super(collector);

        this._$addMatcher(value => wrapResult(this._isBool(value), value, 'not boolean type'));
    }

    _isBool (value) {
        return typeof value === 'boolean';
    }

    get truely () {
        this._$addMatcher(value => wrapResult(value === true, value, 'not true value'));
        return this;
    }

    get falsely () {
        this._$addMatcher(value => wrapResult(value === false, value, 'not false value'));
        return this;
    }
}

export {
    JTypeBool
};
