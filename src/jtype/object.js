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
    constructor(returnControl) {
        super(returnControl);

        this._$addMatcher(value => wrapResult(
            this._isObject(value),
            `${value} not object`
        ));
    }

    _isObject(value) {
        return typeof value === 'object' && value !== null;
    }

    matchShape(shape) {
        this._$addMatcher(value => {
            let result = this._isMatchShape(value, shape)

            if (isSuccessResult(result)) {
                return wrapResult(true);
            } else {
                return wrapResult(false, getResultMessage(result));
            }
        });
        return this;
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
                    const isMatch = shapeProperty.isMatch(valueProperty);

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
}

export {
    JTypeObject
};
