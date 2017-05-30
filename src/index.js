/* @flow */

import {
    JTC
} from './jtype/collector';

class Joi {
    constructor (schema) {
        if (JTC.isJTC(schema)) {
            this._schema = schema;
        } else {
            this._schema = schema.getCollector();
        }
    }

    validate (target) {
        return this._schema.validate(target);
    }

    static validate (target, schema) {
        return new Joi(schema).validate(target);
    }
};

export {
    Joi,
    JTC
};
