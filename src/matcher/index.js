// @flow

'use strict';

import {
    JTypeCollector,
    JTypes
} from './jtypeCollector';

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

const JTypeInterface = {
    number () {
        return new JTypeCollector(JTypes.number);
    },

    string () {
        return new JTypeCollector(JTypes.string);
    },

    bool () {
        return new JTypeCollector(JTypes.bool);
    },

    array () {
        return new JTypeCollector(JTypes.array);
    },

    object () {
        return new JTypeCollector(JTypes.object);
    }
};

export {
    JTypeInterface as JType
};
