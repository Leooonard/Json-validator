// @flow

'use strict';

import {
    JType
} from './index';

/*
    matchShape
*/

class JTypeObject extends JType {
    constructor(returnControl) {
        super(returnControl);

        this._$addMatcher(value => this._isObject(value));
    }

    _isObject(value) {
        return typeof value === 'object' && value !== null;
    }

    matchShape(shape) {
        this._$addMatcher(value => this._isMatchShape(value, shape));
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

                    if (!isMatch) {
                        return false;
                    } else {
                        continue;
                    }
                }
            }

            if (!findValueKey) {
                return false;
            }
        }

        return true;
    }
}

export {
    JTypeObject
};
