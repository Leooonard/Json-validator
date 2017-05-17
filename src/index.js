/* @flow */

class Joi {
    constructor (schema, config) {
        this._schema = schema;
        this._config = this._parseConfig(config);
    }

    _parseConfig (config) {
        const defaultConfig = {
            silentError: true,
            useFilter: false
        };

        if (typeof config !== 'object' || config === null) {
            return defaultConfig;
        }

        return Object.assign(defaultConfig, config);
    }

    test (target) {
        return this._schema.isMatch(target);
    }

    filter (target) {
        return target;
    }

    static test (target, schema) {
        return new Joi(schema).test(target);
    }

    static filter (target, schema) {
        return new Joi(schema).filter(target);
    }
};

export {
    Joi
};
