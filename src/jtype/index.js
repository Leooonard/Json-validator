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
    constructor (returnControl, collector) {
        this._matchers = [];
        this._states = [];
        this._returnControl = returnControl;
        this._collector = collector;

        mixinCoujunction(this);
        mixinOr(this, this._returnControl);
    }

    getCollector () {
        return this._collector;
    }

    // functional conjunction start
    // get or () {
    //     return this._returnControl();
    // }

    // get not () {
    //     this._$pushState();
    //     return this;
    // }

    get end () {
        return this._returnControl();
    }
    // functional conjunction end

    _$pushState (state) {
        this._states.push(state);
    }

    _$popState () {
        return this._states.pop();
    }

    _$getCurrentState () {
        const lastIndex = this._states.length - 1;
        return this._states[lastIndex];
    }

    _$getStates () {
        return this._states;
    }

    _$addMatcher (func) {
        this._matchers.push({
            func
        });
    }

    _$getMatchers () {
        return this._matchers;
    }

    test (value) {
        return this.isMatch(value);
    }

    filter (value) {
        return this.isMatch(value);
    }

    isMatch (value) {
        const matchers = this._$getMatchers();

        for (let i = 0 ; i < matchers.length ; i++) {
            let matcher = matchers[i];
            let result = matcher.func(value);

            if (!isSuccessResult(result)) {
                return wrapResult(false, getResultMessage(result));
            }
        }

        return wrapResult(true);
    }
}

export {
    JType,
    JStates
};
