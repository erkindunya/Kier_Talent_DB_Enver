define("41a93aee-7ae4-44cf-84b0-b20a33892f39_0.0.1", ["@microsoft/sp-core-library","@microsoft/decorators","@microsoft/sp-listview-extensibility","@microsoft/sp-dialog"], function(__WEBPACK_EXTERNAL_MODULE_129__, __WEBPACK_EXTERNAL_MODULE_1259__, __WEBPACK_EXTERNAL_MODULE_1260__, __WEBPACK_EXTERNAL_MODULE_1261__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1258);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = __webpack_require__(1259);
var sp_core_library_1 = __webpack_require__(129);
var sp_listview_extensibility_1 = __webpack_require__(1260);
var sp_dialog_1 = __webpack_require__(1261);
var LOG_SOURCE = 'TalentDbCommandSetCommandSet';
var TalentDbCommandSetCommandSet = (function (_super) {
    __extends(TalentDbCommandSetCommandSet, _super);
    function TalentDbCommandSetCommandSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TalentDbCommandSetCommandSet.prototype.onInit = function () {
        sp_core_library_1.Log.info(LOG_SOURCE, 'Initialized TalentDbCommandSetCommandSet');
        return Promise.resolve();
    };
    TalentDbCommandSetCommandSet.prototype.onListViewUpdated = function (event) {
        var compareOneCommand = this.tryGetCommand('COMMAND_1');
        if (compareOneCommand) {
            // This command should be hidden unless exactly one row is selected.
            compareOneCommand.visible = event.selectedRows.length === 1;
        }
    };
    TalentDbCommandSetCommandSet.prototype.onExecute = function (event) {
        switch (event.itemId) {
            case 'COMMAND_1':
                sp_dialog_1.Dialog.alert("" + this.properties.sampleTextOne);
                break;
            case 'COMMAND_2':
                sp_dialog_1.Dialog.alert("" + this.properties.sampleTextTwo);
                break;
            default:
                console.log("Command Clicked is " + event.itemId);
                console.log("More info about the event " + JSON.stringify(event));
                throw new Error('Unknown command');
        }
    };
    __decorate([
        decorators_1.override
    ], TalentDbCommandSetCommandSet.prototype, "onInit", null);
    __decorate([
        decorators_1.override
    ], TalentDbCommandSetCommandSet.prototype, "onListViewUpdated", null);
    __decorate([
        decorators_1.override
    ], TalentDbCommandSetCommandSet.prototype, "onExecute", null);
    return TalentDbCommandSetCommandSet;
}(sp_listview_extensibility_1.BaseListViewCommandSet));
exports.default = TalentDbCommandSetCommandSet;



/***/ }),

/***/ 1259:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1259__;

/***/ }),

/***/ 1260:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1260__;

/***/ }),

/***/ 1261:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1261__;

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_129__;

/***/ })

/******/ })});;
//# sourceMappingURL=talent-db-command-set-command-set.js.map