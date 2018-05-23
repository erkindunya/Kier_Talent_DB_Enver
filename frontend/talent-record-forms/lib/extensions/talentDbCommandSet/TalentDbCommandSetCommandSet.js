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
var decorators_1 = require("@microsoft/decorators");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_listview_extensibility_1 = require("@microsoft/sp-listview-extensibility");
var sp_dialog_1 = require("@microsoft/sp-dialog");
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

//# sourceMappingURL=TalentDbCommandSetCommandSet.js.map
