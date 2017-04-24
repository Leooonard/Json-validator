/* @flow */

class Joi {
    _schema: Object;

    constructor (schema) {
        this._schema = schema;
    }

    test (target) {
        return this._testTarget(target);
    }

    _testTarget (target) {

    }

    static test (target, schema) {
        return new Joi(schema).test(target);
    }
};

export {
    Joi
};
