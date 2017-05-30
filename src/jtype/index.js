/* @flow */

'use strict';

import {
    wrapResult,
    isSuccessResult,
    getResultMessage
} from '../util/result';

import {
    mixinCoujunction
} from '../conjunction';

import {
    mixinOr
} from '../conjunction/or';

/*
         _____
        |JType|__________________________________________________________
         ̅̅̅̅̅             |               |              |              |
           |               |               |              |              |
      ___________     ___________      _________      __________     ___________
     |JTypeNumber|   |JTypeString|    |JTypeBool|    |JTypeArray|   |JTypeObject|
      ̅̅̅̅̅̅̅̅̅̅̅     ̅̅̅̅̅̅̅̅̅̅̅      ̅̅̅̅̅̅̅̅̅      ̅̅̅̅̅̅̅̅̅̅     ̅̅̅̅̅̅̅̅̅̅̅
           |               |               |              |              |
        ________        ________        ________       ________       ________
       |Matchers|      |Matchers|      |Matchers|     |Matchers|     |Matchers|
        ̅̅̅̅̅̅̅̅        ̅̅̅̅̅̅̅̅        ̅̅̅̅̅̅̅̅       ̅̅̅̅̅̅̅̅       ̅̅̅̅̅̅̅̅

      1. JType开始。
      2. 生成JTypeNumber | JTypeString | JTypeBool | JTypeArray | JTypeObject中的一个。
      3. 使用subType的matcher方法。
      4. 如果使用连词，不做操作直接返回subType本身。
      5. 如果使用matcher，就在matchers数组里添加一个matcher。
      6. 有一个特殊连词，or，使用后需要收集一个新的subType。

      JType -> typeCollector -> typers -> matchers

      JType -> typer -> matchers -> or -> typer -> matchers -> or -> typer -> matchers -> end
*/

const JStates = {
    not: 'not'
};

class JType {
    constructor (collector) {
        this._matchers = [];
        this._collector = collector;
        this.getCollector = this.getCollector.bind(this);

        mixinCoujunction(this);
        mixinOr(this, this.getCollector);
    }

    static isJType (obj) {
        return obj instanceof JType;
    }

    getCollector () {
        return this._collector;
    }

    _$addMatcher (func) {
        this._matchers.push({
            func
        });
    }

    _$getMatchers () {
        return this._matchers;
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

        return wrapResult(true, value);
    }
}

export {
    JType,
    JStates
};
