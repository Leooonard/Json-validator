// @flow

import {
    JType
} from './index';

import {
    JTypeNumber
} from './number';

import {
    assert
} from '../util/assert';

import {
    wrapResult,
    isSuccessResult
} from '../util/result';

/*
    array:
        eq,
        gt,
        gte,
        lt,
        lte,
        matchChild
*/

class JTypeArray extends JType {
    constructor (collector) {
        super(collector);

        this._$addMatcher(value => {
            this._value = value;
            return wrapResult(
                this._isArray(value),
                this._value,
                `${value} not array`
            );
        });
    }

    _isArray (value) {
        return Array.isArray(value);
    }

    get length () {
        return this;
    }

    matchChild (jType) {
        assert(JType.isJType(jType), 'matchChild only accpet a JType instance');

        this._$addMatcher(value => {
            this._value = this._value.filter(listItem => {
                let result = jType.validate(listItem);
                return isSuccessResult(result);
            });
            return wrapResult(true, this._value);
        });
        return this;
    }

    eq (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().eq(compareTarget).validate(this._value.length)),
            this._value,
            `[${value}]\'s length not equal ${compareTarget}`
        ));
        return this;
    }

    gt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().gt(compareTarget).validate(this._value.length)),
            this._value,
            `[${value}]\'s length not greater than ${compareTarget}`
        ));
        return this;
    }

    lt (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().lt(compareTarget).validate(this._value.length)),
            this._value,
            `[${value}]\'s length not less than ${compareTarget}`
        ));
        return this;
    }

    gte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().gte(compareTarget).validate(this._value.length)),
            this._value,
            `[${value}]\'s length not greater than or equal ${compareTarget}`
        ));
        return this;
    }

    lte (compareTarget) {
        this._$addMatcher(value => wrapResult(
            isSuccessResult(new JTypeNumber().lte(compareTarget).validate(this._value.length)),
            this._value,
            `[${value}]\'s length not less than or equal ${compareTarget}`
        ));
        return this;
    }

    validate (value) {
        const matchers = this._$getMatchers();

        for (let i = 0 ; i < matchers.length ; i++) {
            let matcher = matchers[i];
            let result = matcher.func(value);

            if (!isSuccessResult(result)) {
                return result;
            }
        }

        return wrapResult(true, this._value);
    }
}

export {
    JTypeArray
};
