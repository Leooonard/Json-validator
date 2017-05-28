// @flow

'use strict';

import {
    JType
} from './index';

import {
    wrapResult,
    isSuccessResult,
    getResultMessage
} from '../util/result';

/*
    matchShape
*/

class JTypeObject extends JType {
    constructor(returnControl, collector) {
        super(returnControl, collector);

        this._action = '';

        this._$addMatcher(value => {
            if (this._action === 'test') {
                return wrapResult(
                    this._isObject(value),
                    `${value} not object`
                );
            } else {
                return this._isObject(value) ? value : undefined
            }
        });
    }

    _isObject(value) {
        return typeof value === 'object' && value !== null;
    }

    matchShape(shape) {
        this._$addMatcher(value => {
            if (this._action === 'test') {
                return this._isMatchShape(value, shape);
            } else {
                return this._filterShape(value, shape);
            }
        });
        return this;
    }

    _filterShape (value, shape) {
        const valueKeys = Object.keys(value);
        const shapeKeys = Object.keys(shape);

        for (let i = 0; i < shapeKeys.length; i++) {
            let shapeKey = shapeKeys[i];
            let shapeProperty = shape[shapeKey];
            let findValueKey = false;

            for (let j = 0; j < valueKeys.length; j++) {
                let valueKey = valueKeys[j];
                let valueProperty = value[valueKey];

                if (shapeKey === valueKey) {
                    findValueKey = true;
                    const result = shapeProperty.filter(valueProperty);
                    if (result === undefined) {
                        return undefined;
                    } else {
                        value[valueKey] = result;
                    }
                }
            }

            if (!findValueKey) {
                return undefined;
            }
        }

        return value;
    }

    _isMatchShape(value, shape) {
        const valueKeys = Object.keys(value);
        const shapeKeys = Object.keys(shape);

        for (let i = 0; i < shapeKeys.length; i++) {
            let shapeKey = shapeKeys[i];
            let shapeProperty = shape[shapeKey];
            let findValueKey = false;

            for (let j = 0; j < valueKeys.length; j++) {
                let valueKey = valueKeys[j];
                let valueProperty = value[valueKey];

                if (shapeKey === valueKey) {
                    findValueKey = true;
                    const isMatch = shapeProperty.test(valueProperty);
                    if (!isSuccessResult(isMatch)) {
                        return wrapResult(false, `attribute ${shapeKey} not match shape , ${getResultMessage(isMatch)}`);
                    } else {
                        continue;
                    }
                }
            }

            if (!findValueKey) {
                return wrapResult(false, 'not find ${shapeKey} in value');
            }
        }

        return wrapResult(true);
    }

    test (value) {
        this._action = 'test';
        return this._isMatch(value);
    }

    filter (value) {
        this._action = 'filter';
        return this._isMatch(value);
    }

    _isMatch (value) {
        const matchers = this._$getMatchers();

        if (this._action === 'test') {
            for (let i = 0 ; i < matchers.length ; i++) {
                let matcher = matchers[i];
                let result = matcher.func(value);

                if (!isSuccessResult(result)) {
                    return wrapResult(false, getResultMessage(result));
                }
            }

            return wrapResult(true);
        } else {
            for (let i = 0 ; i < matchers.length ; i++) {
                let matcher = matchers[i];
                let result = matcher.func(value);

                if (result === undefined) {
                    return undefined;
                }
            }

            return value;
        }
    }
}

export {
    JTypeObject
};
