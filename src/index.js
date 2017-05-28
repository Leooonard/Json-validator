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

    test (target) {
        return this._schema.test(target);
    }

    filter (target) {
        return this._schema.filter(target);
    }

    static test (target, schema) {
        return new Joi(schema).test(target);
    }

    static filter (target, schema) {
        return new Joi(schema).filter(target);
    }
};

export {
    Joi,
    JTC
};
