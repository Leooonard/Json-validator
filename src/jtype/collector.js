// @flow

'use strict';

import {
    JTypeNumber
} from './number';

import {
    JTypeString
} from './string';

import {
    JTypeBool
} from './bool';

import {
    JTypeArray
} from './array';

import {
    JTypeObject
} from './object';

import {
    wrapResult,
    isSuccessResult,
    getResultMessage
} from '../util/result';

class JTypeCollector {
    constructor () {
        this._returnControl = this._returnControl.bind(this);
        this._typers = [];
    }

    _getTypers () {
        return this._typers;
    }

    _addTyper (typer) {
        this._typers.push(typer);
        return typer;
    }

    _returnControl () {
        return this;
    }

    get bool () {
        const boolType = new JTypeBool(this);
        return this._addTyper(boolType);
    }

    static get bool () {
        return new JTypeCollector().bool;
    }

    get number () {
        const numberType = new JTypeNumber(this);
        return this._addTyper(numberType);
    }

    static get number () {
        return new JTypeCollector().number;
    }

    get string () {
        const stringType = new JTypeString(this);
        return this._addTyper(stringType);
    }

    static get string () {
        return new JTypeCollector().string;
    }

    get array () {
        const arrayType = new JTypeArray(this);
        return this._addTyper(arrayType);
    }

    static get array () {
        return new JTypeCollector().array;
    }

    get object () {
        const objectType = new JTypeObject(this);
        return this._addTyper(objectType);
    }

    static get object () {
        return new JTypeCollector().object;
    }

    static isJTC (obj) {
        return obj instanceof JTypeCollector;
    }

    validate (value) {
        const typers = this._getTypers();
        let errorResult = undefined;
        let successResult = undefined;

        let result = typers.some(typer => {
            let result = typer.validate(value);
            if (!isSuccessResult(result)) {
                errorResult = result;
                return false;
            } else {
                successResult = result;
                return true;
            }
        });

        if (result) {
            return successResult;
        } else {
            return errorResult;
        }
    }
}

export {
    JTypeCollector as JTC
};
