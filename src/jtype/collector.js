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
        const boolType = new JTypeBool(this._returnControl, this);
        return this._addTyper(boolType);
    }

    static get bool () {
        return new JTypeCollector().bool;
    }

    get number () {
        const numberType = new JTypeNumber(this._returnControl, this);
        return this._addTyper(numberType);
    }

    static get number () {
        return new JTypeCollector().number;
    }

    get string () {
        const stringType = new JTypeString(this._returnControl, this);
        return this._addTyper(stringType);
    }

    static get string () {
        return new JTypeCollector().string;
    }

    get array () {
        const arrayType = new JTypeArray(this._returnControl, this);
        return this._addTyper(arrayType);
    }

    static get array () {
        return new JTypeCollector().array;
    }

    get object () {
        const objectType = new JTypeObject(this._returnControl, this);
        return this._addTyper(objectType);
    }

    static get object () {
        return new JTypeCollector().object;
    }

    test (value) {
        const typers = this._getTypers();
        let errorResult = undefined;

        let result = typers.some(typer => {
            let result = typer.test(value);
            if (!isSuccessResult(result)) {
                errorResult = result;
                return false;
            } else {
                return true;
            }
        });

        if (result) {
            return wrapResult(true);
        } else {
            return errorResult;
        }
    }

    filter (value) {
        const typers = this._getTypers();
        let filterResult = undefined;

        typers.some(typer => {
            let result = typer.filter(value);
            if (result !== undefined) {
                filterResult = result;
                return true;
            } else {
                return false;
            }
        });

        return filterResult;
    }
}

export {
    JTypeCollector as JTC
};
