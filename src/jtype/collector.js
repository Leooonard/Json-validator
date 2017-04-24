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

const JTypes = {
    number: 1,
    string: 2,
    bool: 3,
    array: 4,
    object: 5
};

class JTypeCollector {
    constructor (type) {
        this._currentTyper = this._generateTyper(type);
        this._typers = [this._currentTyper];
        this._returnControl = this._returnControl.bind(this);

        return this._currentTyper;
    }

    _generateTyper (type) {
        switch (type) {
        case JTypes.number:
            return new JTypeNumber(this._returnControl);
        case JTypes.string:
            return new JTypeString(this._returnControl);
        case JTypes.bool:
            return new JTypeBool(this._returnControl);
        case JTypes.array:
            return new JTypeArray(this._returnControl);
        case JTypes.object:
            return new JTypeObject(this._returnControl);
        default:
            throw new Error('unknown type');
        }
    }

    _returnControl () {
        return this;
    }

    _getTypers () {
        return this._typers;
    }

    _addTyper (type) {
        const typers = this._getTypers();
        const currentTyper = this._generateTyper(type);
        typers.push(currentTyper);

        return currentTyper;
    }

    _setCurrentTyper (typer) {
        this._currentTyper = typer;
    }

    get number () {
        const currentTyper = this._addTyper(JTypes.number);
        this._setCurrentTyper(currentTyper);
        return currentTyper;
    }

    get string () {
        const currentTyper = this._addTyper(JTypes.string);
        this._setCurrentTyper(currentTyper);
        return currentTyper;
    }

    get bool () {
        const currentTyper = this._addTyper(JTypes.bool);
        this._setCurrentTyper(currentTyper);
        return currentTyper;
    }

    get array () {
        const currentTyper = this._addTyper(JTypes.array);
        this._setCurrentTyper(currentTyper);
        return currentTyper;
    }

    get object () {
        const currentTyper = this._addTyper(JTypes.object);
        this._setCurrentTyper(currentTyper);
        return currentTyper;
    }

    isMatch (value) {
        const typers = this._getTypers();

        return typers.every(typer => typer.isMatch(value));
    }
}

export {
    JTypeCollector,
    JTypes
};
