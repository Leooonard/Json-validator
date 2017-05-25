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

const JTypes = {
    number: 1,
    string: 2,
    bool: 3,
    array: 4,
    object: 5
};

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

    static get bool () {
        const boolType = new JTypeBool(this._returnControl, this);
        return this._addTyper(boolType);
    }

    static get number () {
        const numberType = new JTypeNumber(this._returnControl, this);
        return this._addTyper(numberType);
    }

    static get string () {
        const stringType = new JTypeString(this._returnControl, this);
        return this._addTyper(stringType);
    }

    static get array () {
        const arrayType = new JTypeArray(this._returnControl, this);
        return this._addTyper(arrayType);
    }

    static get object () {
        const objectType = new JTypeObject(this._returnControl, this);
        return this._addTyper(objectType);
    }

    test (value) {
        return this.isMatch(value);
    }

    filter (value) {
        return this.isMatch(value);
    }

    /*
        当前只支持使用or连接两个typer，所以只要满足其中任意一个即可。
    */
    isMatch (value) {
        const typers = this._getTypers();
        let errorMessage = '';

        for (let i = 0 ; i < typers.length ; i++) {
            let typer = typers[i];
            let result = typer.isMatch(value);

            if (isSuccessResult(result)) {
                return wrapResult(true);
            } else {
                errorMessage = getResultMessage(result);
            }
        }

        return wrapResult(false, errorMessage);
    }
}

export {
    JTypeCollector as JTC,
    JTypes
};
