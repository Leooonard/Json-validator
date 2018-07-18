(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Joi"] = factory();
	else
		root["Joi"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// @flow

/*
    result结构：
    {
        successful: bool,
        value: ?JSON,
        message: ?string
    }
*/

function wrapResult(successful, value, message) {
    if (successful) {
        return {
            successful: successful,
            value: value,
            message: undefined
        };
    } else {
        return {
            successful: successful,
            value: undefined,
            message: message
        };
    }
}

function isSuccessResult(result) {
    return result.successful;
}

function getResultMessage(result) {
    return result.message;
}

function getResultValue(result) {
    return result.value;
}

exports.wrapResult = wrapResult;
exports.isSuccessResult = isSuccessResult;
exports.getResultMessage = getResultMessage;
exports.getResultValue = getResultValue;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* @flow */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JStates = exports.JType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _result = __webpack_require__(0);

var _conjunction = __webpack_require__(6);

var _or = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var JStates = {
    not: 'not'
};

var JType = function () {
    function JType(collector) {
        _classCallCheck(this, JType);

        this._matchers = [];
        this._collector = collector;
        this.getCollector = this.getCollector.bind(this);

        (0, _conjunction.mixinCoujunction)(this);
        (0, _or.mixinOr)(this, this.getCollector);
    }

    _createClass(JType, [{
        key: 'getCollector',
        value: function getCollector() {
            return this._collector;
        }
    }, {
        key: '_$addMatcher',
        value: function _$addMatcher(func) {
            this._matchers.push({
                func: func
            });
        }
    }, {
        key: 'default',
        value: function _default(defaultValue) {
            this._collector.default = defaultValue;
            return this;
        }
    }, {
        key: '_$getMatchers',
        value: function _$getMatchers() {
            return this._matchers;
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            var matchers = this._$getMatchers();

            for (var i = 0; i < matchers.length; i++) {
                var matcher = matchers[i];
                var result = matcher.func(value);

                if (!(0, _result.isSuccessResult)(result)) {
                    return result;
                }
            }

            return (0, _result.wrapResult)(true, value);
        }
    }], [{
        key: 'isJType',
        value: function isJType(obj) {
            return obj instanceof JType;
        }
    }]);

    return JType;
}();

exports.JType = JType;
exports.JStates = JStates;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// @flow



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JTC = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _number = __webpack_require__(3);

var _string = __webpack_require__(8);

var _bool = __webpack_require__(9);

var _array = __webpack_require__(10);

var _object = __webpack_require__(11);

var _result = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JTypeCollector = function () {
    function JTypeCollector() {
        _classCallCheck(this, JTypeCollector);

        this._returnControl = this._returnControl.bind(this);
        this._typers = [];
        this._defaultValue = undefined;
    }

    _createClass(JTypeCollector, [{
        key: '_getTypers',
        value: function _getTypers() {
            return this._typers;
        }
    }, {
        key: '_addTyper',
        value: function _addTyper(typer) {
            this._typers.push(typer);
            return typer;
        }
    }, {
        key: '_returnControl',
        value: function _returnControl() {
            return this;
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            var typers = this._getTypers();
            var errorResult = undefined;
            var successResult = undefined;

            var result = typers.some(function (typer) {
                var result = typer.validate(value);
                if (!(0, _result.isSuccessResult)(result)) {
                    errorResult = result;
                    return false;
                } else {
                    successResult = result;
                    return true;
                }
            });

            if (result) {
                return successResult;
            } else if (this._defaultValue !== undefined) {
                return (0, _result.wrapResult)(true, this._defaultValue);
            } else {
                return errorResult;
            }
        }
    }, {
        key: 'default',
        set: function set(defaultValue) {
            this._defaultValue = defaultValue;
        },
        get: function get() {
            return this._defaultValue;
        }
    }, {
        key: 'bool',
        get: function get() {
            var boolType = new _bool.JTypeBool(this);
            return this._addTyper(boolType);
        }
    }, {
        key: 'number',
        get: function get() {
            var numberType = new _number.JTypeNumber(this);
            return this._addTyper(numberType);
        }
    }, {
        key: 'string',
        get: function get() {
            var stringType = new _string.JTypeString(this);
            return this._addTyper(stringType);
        }
    }, {
        key: 'array',
        get: function get() {
            var arrayType = new _array.JTypeArray(this);
            return this._addTyper(arrayType);
        }
    }, {
        key: 'object',
        get: function get() {
            var objectType = new _object.JTypeObject(this);
            return this._addTyper(objectType);
        }
    }], [{
        key: 'isJTC',
        value: function isJTC(obj) {
            return obj instanceof JTypeCollector;
        }
    }, {
        key: 'bool',
        get: function get() {
            return new JTypeCollector().bool;
        }
    }, {
        key: 'number',
        get: function get() {
            return new JTypeCollector().number;
        }
    }, {
        key: 'string',
        get: function get() {
            return new JTypeCollector().string;
        }
    }, {
        key: 'array',
        get: function get() {
            return new JTypeCollector().array;
        }
    }, {
        key: 'object',
        get: function get() {
            return new JTypeCollector().object;
        }
    }]);

    return JTypeCollector;
}();

exports.JTC = JTypeCollector;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// @flow



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JTypeNumber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(1);

var _result = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
    inNumbers,
    gt,
    gte,
    lt,
    lte,
    eq,
    neq,
    zero,
    positive,
    negative
*/

var JTypeNumber = function (_JType) {
    _inherits(JTypeNumber, _JType);

    function JTypeNumber(collector) {
        _classCallCheck(this, JTypeNumber);

        var _this = _possibleConstructorReturn(this, (JTypeNumber.__proto__ || Object.getPrototypeOf(JTypeNumber)).call(this, collector));

        _this._$addMatcher(function (value) {
            return (0, _result.wrapResult)(_this._isNumber(value), value, 'not number type');
        });
        return _this;
    }

    _createClass(JTypeNumber, [{
        key: '_isNumber',
        value: function _isNumber(value) {
            return typeof value === 'number';
        }
    }, {
        key: 'inNumbers',
        value: function inNumbers(compareTargetList) {
            var _this2 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(compareTargetList.some(function (compareTarget) {
                    return _this2._isEqual(value, compareTarget);
                }), value, value + ' not in [' + compareTargetList + ']');
            });

            return this;
        }
    }, {
        key: 'gt',
        value: function gt(compareTarget) {
            var _this3 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(_this3._isGreatThan(value, compareTarget), value, value + ' not gt ' + compareTarget);
            });

            return this;
        }
    }, {
        key: '_isGreatThan',
        value: function _isGreatThan(value, compareTarget) {
            return value > compareTarget;
        }
    }, {
        key: 'gte',
        value: function gte(compareTarget) {
            var _this4 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(_this4._isGreatThanOrEqual(value, compareTarget), value, value + ' not gte ' + compareTarget);
            });

            return this;
        }
    }, {
        key: '_isGreatThanOrEqual',
        value: function _isGreatThanOrEqual(value, compareTarget) {
            return value >= compareTarget;
        }
    }, {
        key: 'lt',
        value: function lt(compareTarget) {
            var _this5 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(!_this5._isGreatThanOrEqual(value, compareTarget), value, value + ' not lt ' + compareTarget);
            });

            return this;
        }
    }, {
        key: 'lte',
        value: function lte(compareTarget) {
            var _this6 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(!_this6._isGreatThan(value, compareTarget), value, value + ' not lte ' + compareTarget);
            });

            return this;
        }
    }, {
        key: 'eq',
        value: function eq(compareTarget) {
            var _this7 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(_this7._isEqual(value, compareTarget), value, value + ' not equal ' + compareTarget);
            });

            return this;
        }
    }, {
        key: 'neq',
        value: function neq(compareTarget) {
            var _this8 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(!_this8._isEqual(value, compareTarget), value, value + ' not notEqual ' + compareTarget);
            });

            return this;
        }
    }, {
        key: '_isEqual',
        value: function _isEqual(value, compareTarget) {
            return value === compareTarget;
        }
    }, {
        key: 'zero',
        get: function get() {
            var _this9 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(_this9._isEqual(value, 0), value, value + ' not zero');
            });
            return this;
        }
    }, {
        key: 'positive',
        get: function get() {
            var _this10 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(_this10._isGreatThan(value, 0), value, value + ' not positive');
            });
            return this;
        }
    }, {
        key: 'negative',
        get: function get() {
            var _this11 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(!_this11._isGreatThanOrEqual(value, 0), value, value + ' not negative');
            });
            return this;
        }
    }]);

    return JTypeNumber;
}(_index.JType);

exports.JTypeNumber = JTypeNumber;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// @flow

function assert(erroTip, assertExp) {
    if (!assertExp) {
        throw new Error(erroTip);
    }
}

exports.assert = assert;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.typeCollector = exports.validator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* @flow */

var _collector = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Joi = function () {
    function Joi(schema) {
        _classCallCheck(this, Joi);

        if (_collector.JTC.isJTC(schema)) {
            this._schema = schema;
        } else {
            this._schema = schema.getCollector();
        }
    }

    _createClass(Joi, [{
        key: 'validate',
        value: function validate(target) {
            return this._schema.validate(target);
        }
    }], [{
        key: 'validate',
        value: function validate(target, schema) {
            return new Joi(schema).validate(target);
        }
    }]);

    return Joi;
}();

;

exports.validator = Joi;
exports.typeCollector = _collector.JTC;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixinCoujunction = mixinCoujunction;
// @flow

function mixinCoujunction(mixinTarget) {
    var defineGetter = defineGetProperty.bind(null, mixinTarget);

    defineGetter('is');
    defineGetter('to');
    defineGetter('be');
    defineGetter('should');
    defineGetter('could');
    defineGetter('and');
}

function defineGetProperty(obj, attrName) {
    Object.defineProperty(obj, attrName, {
        get: function get() {
            return this;
        }
    });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixinOr = mixinOr;
// @flow

function mixinOr(mixinTarget, getter) {
    Object.defineProperty(mixinTarget, 'or', {
        get: getter
    });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// @flow



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JTypeString = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(1);

var _number = __webpack_require__(3);

var _assert = __webpack_require__(4);

var _result = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
    eq,
    gt,
    gte,
    lt,
    lte,
    includes,
    startsWith,
    endsWith,
    matchRegexp,
    matchFunction
*/

var JTypeString = function (_JType) {
    _inherits(JTypeString, _JType);

    function JTypeString(collector) {
        _classCallCheck(this, JTypeString);

        var _this = _possibleConstructorReturn(this, (JTypeString.__proto__ || Object.getPrototypeOf(JTypeString)).call(this, collector));

        _this._$addMatcher(function (value) {
            return (0, _result.wrapResult)(_this._isString(value), value, value + ' not string');
        });
        return _this;
    }

    _createClass(JTypeString, [{
        key: '_isString',
        value: function _isString(value) {
            return typeof value === 'string';
        }
    }, {
        key: '_isEmptyString',
        value: function _isEmptyString(value) {
            return value === '';
        }
    }, {
        key: 'eq',
        value: function eq(compareTarget) {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().eq(compareTarget).validate(value.length)), value, value + ' length not equal ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'gt',
        value: function gt(compareTarget) {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().gt(compareTarget).validate(value.length)), value, value + ' length not gt ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'lt',
        value: function lt(compareTarget) {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().lt(compareTarget).validate(value.length)), value, value + ' length not lt ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'gte',
        value: function gte(compareTarget) {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().gte(compareTarget).validate(value.length)), value, value + ' length not gte ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'lte',
        value: function lte(compareTarget) {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().lte(compareTarget).validate(value.length)), value, value + ' length not lte ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'includes',
        value: function includes(subString) {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(value.includes(subString), value, value + ' not includes ' + subString);
            });
            return this;
        }
    }, {
        key: 'startsWith',
        value: function startsWith(subString) {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(value.startsWith(subString), value, value + ' not startsWith ' + subString);
            });
            return this;
        }
    }, {
        key: 'endsWith',
        value: function endsWith(subString) {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(value.endsWith(subString), value, value + ' not endsWith ' + subString);
            });
            return this;
        }
    }, {
        key: 'matchRegexp',
        value: function matchRegexp(regexp) {
            (0, _assert.assert)(this._isRegexp(regexp), 'matchRegexp only accept a regexp parameter');

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(regexp.test(value), value, value + ' not match ' + regexp.source);
            });
            return this;
        }
    }, {
        key: '_isRegexp',
        value: function _isRegexp(regexp) {
            return regexp instanceof RegExp;
        }
    }, {
        key: 'matchFunction',
        value: function matchFunction(func) {
            (0, _assert.assert)(this._isFunction(func), 'matchFunction only accpet a function parameter');

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(func(value), value, value + ' not match function');
            });
            return this;
        }
    }, {
        key: '_isFunction',
        value: function _isFunction(func) {
            return typeof func === 'function';
        }
    }, {
        key: 'empty',
        get: function get() {
            var _this2 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(_this2._isEmptyString(value), value, value + ' not empty');
            });
            return this;
        }
    }, {
        key: 'unEmpty',
        get: function get() {
            var _this3 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(!_this3._isEmptyString(value), value, value + ' not unEmpty');
            });
            return this;
        }
    }, {
        key: 'length',
        get: function get() {
            return this;
        }
    }]);

    return JTypeString;
}(_index.JType);

exports.JTypeString = JTypeString;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JTypeBool = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(1);

var _result = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // @flow

var JTypeBool = function (_JType) {
    _inherits(JTypeBool, _JType);

    function JTypeBool(collector) {
        _classCallCheck(this, JTypeBool);

        var _this = _possibleConstructorReturn(this, (JTypeBool.__proto__ || Object.getPrototypeOf(JTypeBool)).call(this, collector));

        _this._$addMatcher(function (value) {
            return (0, _result.wrapResult)(_this._isBool(value), value, 'not boolean type');
        });
        return _this;
    }

    _createClass(JTypeBool, [{
        key: '_isBool',
        value: function _isBool(value) {
            return typeof value === 'boolean';
        }
    }, {
        key: 'truely',
        get: function get() {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(value === true, value, 'not true value');
            });
            return this;
        }
    }, {
        key: 'falsely',
        get: function get() {
            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)(value === false, value, 'not false value');
            });
            return this;
        }
    }]);

    return JTypeBool;
}(_index.JType);

exports.JTypeBool = JTypeBool;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JTypeArray = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(1);

var _collector = __webpack_require__(2);

var _number = __webpack_require__(3);

var _assert = __webpack_require__(4);

var _result = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // @flow

/*
    array:
        eq,
        gt,
        gte,
        lt,
        lte,
        matchChild
*/

var JTypeArray = function (_JType) {
    _inherits(JTypeArray, _JType);

    function JTypeArray(collector) {
        _classCallCheck(this, JTypeArray);

        var _this = _possibleConstructorReturn(this, (JTypeArray.__proto__ || Object.getPrototypeOf(JTypeArray)).call(this, collector));

        _this._$addMatcher(function (value) {
            _this._value = value;
            return (0, _result.wrapResult)(_this._isArray(value), _this._value, value + ' not array');
        });
        return _this;
    }

    _createClass(JTypeArray, [{
        key: '_isArray',
        value: function _isArray(value) {
            return Array.isArray(value);
        }
    }, {
        key: 'matchChild',
        value: function matchChild(jCollector) {
            var _this2 = this;

            try {
                if (!_collector.JTC.isJTC(jCollector)) {
                    jCollector = jCollector.getCollector();
                }
            } catch (e) {
                throw new Error('matchChild only accpet a JTypeCollector instance');
            }

            (0, _assert.assert)('matchChild only accpet a JTypeCollector instance', _collector.JTC.isJTC(jCollector));

            this._$addMatcher(function (value) {
                _this2._value = _this2._value.filter(function (listItem) {
                    var result = jCollector.validate(listItem);
                    return (0, _result.isSuccessResult)(result);
                });
                return (0, _result.wrapResult)(true, _this2._value);
            });
            return this;
        }
    }, {
        key: 'eq',
        value: function eq(compareTarget) {
            var _this3 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().eq(compareTarget).validate(_this3._value.length)), _this3._value, '[' + value + ']\'s length not equal ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'gt',
        value: function gt(compareTarget) {
            var _this4 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().gt(compareTarget).validate(_this4._value.length)), _this4._value, '[' + value + ']\'s length not greater than ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'lt',
        value: function lt(compareTarget) {
            var _this5 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().lt(compareTarget).validate(_this5._value.length)), _this5._value, '[' + value + ']\'s length not less than ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'gte',
        value: function gte(compareTarget) {
            var _this6 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().gte(compareTarget).validate(_this6._value.length)), _this6._value, '[' + value + ']\'s length not greater than or equal ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'lte',
        value: function lte(compareTarget) {
            var _this7 = this;

            this._$addMatcher(function (value) {
                return (0, _result.wrapResult)((0, _result.isSuccessResult)(new _number.JTypeNumber().lte(compareTarget).validate(_this7._value.length)), _this7._value, '[' + value + ']\'s length not less than or equal ' + compareTarget);
            });
            return this;
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            var matchers = this._$getMatchers();

            for (var i = 0; i < matchers.length; i++) {
                var matcher = matchers[i];
                var result = matcher.func(value);

                if (!(0, _result.isSuccessResult)(result)) {
                    return result;
                }
            }

            return (0, _result.wrapResult)(true, this._value);
        }
    }, {
        key: 'length',
        get: function get() {
            return this;
        }
    }]);

    return JTypeArray;
}(_index.JType);

exports.JTypeArray = JTypeArray;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// @flow



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JTypeObject = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(1);

var _collector = __webpack_require__(2);

var _result = __webpack_require__(0);

var _assert = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
    matchShape
*/

var JTypeObject = function (_JType) {
    _inherits(JTypeObject, _JType);

    function JTypeObject(collector) {
        _classCallCheck(this, JTypeObject);

        var _this = _possibleConstructorReturn(this, (JTypeObject.__proto__ || Object.getPrototypeOf(JTypeObject)).call(this, collector));

        _this._$addMatcher(function (value) {
            return (0, _result.wrapResult)(_this._isObject(value), value, value + ' not object');
        });
        return _this;
    }

    _createClass(JTypeObject, [{
        key: '_isObject',
        value: function _isObject(value) {
            return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
        }
    }, {
        key: 'matchShape',
        value: function matchShape(shape) {
            var _this2 = this;

            (0, _assert.assert)((typeof shape === 'undefined' ? 'undefined' : _typeof(shape)) === 'object' && shape !== null, 'matchShape only accept object shape');

            this._$addMatcher(function (value) {
                return _this2._validateShape(value, shape);
            });
            return this;
        }
    }, {
        key: '_validateShape',
        value: function _validateShape(value, shape) {
            var valueKeys = Object.keys(value);
            var shapeKeys = Object.keys(shape);

            for (var i = 0; i < shapeKeys.length; i++) {
                var shapeKey = shapeKeys[i];
                var shapeProperty = shape[shapeKey];
                var findValueKey = false;

                if (!_collector.JTC.isJTC(shapeProperty)) {
                    try {
                        shapeProperty = shapeProperty.getCollector();
                    } catch (e) {
                        continue;
                    }

                    if (!_collector.JTC.isJTC(shapeProperty)) {
                        continue;
                    }
                }

                for (var j = 0; j < valueKeys.length; j++) {
                    var valueKey = valueKeys[j];
                    var valueProperty = value[valueKey];

                    if (shapeKey === valueKey) {
                        findValueKey = true;
                        var result = shapeProperty.validate(valueProperty);
                        if (!(0, _result.isSuccessResult)(result)) {
                            return (0, _result.wrapResult)(false, undefined, shapeKey + ': ' + (0, _result.getResultMessage)(result));
                        } else {
                            value[valueKey] = (0, _result.getResultValue)(result);
                        }
                    }
                }

                if (!findValueKey) {
                    var defaultValue = shapeProperty.default;
                    if (defaultValue !== undefined) {
                        value[shapeKey] = defaultValue;
                    } else {
                        return (0, _result.wrapResult)(false, undefined, 'attribute: ' + shapeKey + ' not found');
                    }
                }
            }

            return (0, _result.wrapResult)(true, value);
        }
    }]);

    return JTypeObject;
}(_index.JType);

exports.JTypeObject = JTypeObject;

/***/ })
/******/ ]);
});