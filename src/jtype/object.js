// @flow

'use strict';

import {
    JType
} from './index';

import {
    JTC
} from './collector';

import {
    wrapResult,
    isSuccessResult,
    getResultValue,
    getResultMessage
} from '../util/result';

import {
    assert
} from '../util/assert';

/*
    matchShape
*/

class JTypeObject extends JType {
    constructor(collector) {
        super(collector);

        this._$addMatcher(value => {
            return wrapResult(
                this._isObject(value),
                value,
                `${value} not object`
            );
        });
    }

    _isObject(value) {
        return typeof value === 'object' && value !== null;
    }

    matchShape(shape) {
        assert(typeof shape === 'object' && shape !== null, 'matchShape only accept object shape');

        this._$addMatcher(value => this._validateShape(value, shape));
        return this;
    }

    _validateShape (value, shape) {
        const valueKeys = Object.keys(value);
        const shapeKeys = Object.keys(shape);

        for (let i = 0; i < shapeKeys.length; i++) {
            let shapeKey = shapeKeys[i];
            let shapeProperty = shape[shapeKey];
            let findValueKey = false;

            if (!JTC.isJTC(shapeProperty)) {
                try {
                    shapeProperty = shapeProperty.getCollector();
                } catch (e) {
                    continue;
                }

                if (!JTC.isJTC(shapeProperty)) {
                    continue;
                }
            }

            for (let j = 0; j < valueKeys.length; j++) {
                let valueKey = valueKeys[j];
                let valueProperty = value[valueKey];

                if (shapeKey === valueKey) {
                    findValueKey = true;
                    const result = shapeProperty.validate(valueProperty);
                    if (!isSuccessResult(result)) {
                        return wrapResult(false, undefined, `${shapeKey}: ${getResultMessage(result)}`);
                    } else {
                        value[valueKey] = getResultValue(result);
                    }
                }
            }

            if (!findValueKey) {
                const defaultValue = shapeProperty.default;
                if (defaultValue !== undefined) {
                    value[shapeKey] = defaultValue;
                } else {
                    return wrapResult(false, undefined, `attribute: ${shapeKey} not found`);
                }
            }
        }

        return wrapResult(true, value);
    }
}

export {
    JTypeObject
};
