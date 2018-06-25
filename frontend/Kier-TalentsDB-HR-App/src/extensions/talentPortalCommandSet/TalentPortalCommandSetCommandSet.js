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
var LOG_SOURCE = 'TalentPortalCommandSetCommandSet';
var TalentPortalCommandSetCommandSet = /** @class */ (function (_super) {
    __extends(TalentPortalCommandSetCommandSet, _super);
    function TalentPortalCommandSetCommandSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TalentPortalCommandSetCommandSet.prototype.onInit = function () {
        sp_core_library_1.Log.info(LOG_SOURCE, 'Initialized TalentPortalCommandSetCommandSet');
        return Promise.resolve();
    };
    TalentPortalCommandSetCommandSet.prototype.onListViewUpdated = function (event) {
        var compareOneCommand = this.tryGetCommand('Edit_TALENT_RECORD');
        sp_core_library_1.Log.info(LOG_SOURCE, JSON.stringify(event));
        if (compareOneCommand) {
            // This command should be hidden unless exactly one row is selected.
            compareOneCommand.visible = event.selectedRows.length === 1;
        }
    };
    TalentPortalCommandSetCommandSet.prototype.onExecute = function (event) {
        switch (event.itemId) {
            case 'Edit_TALENT_RECORD':
                //get record id & employee Id
                //redirect to Talent Record Editor
                var employeeId = event.selectedRows[0].getValueByName("KTPEmployeeID");
                var recordId = event.selectedRows[0].getValueByName("ID");
                var url = "/sites/talent/SitePages/TalentEditor.aspx?talentId=" + recordId + "&employeeId=" + employeeId;
                window.location.href = url;
                break;
            case 'NEW_TALENT_RECORD':
                var url = "/sites/talent/SitePages/TalentEditor.aspx";
                window.location.href = url;
                break;
            default:
                throw new Error('Unknown command');
        }
    };
    __decorate([
        decorators_1.override
    ], TalentPortalCommandSetCommandSet.prototype, "onInit", null);
    __decorate([
        decorators_1.override
    ], TalentPortalCommandSetCommandSet.prototype, "onListViewUpdated", null);
    __decorate([
        decorators_1.override
    ], TalentPortalCommandSetCommandSet.prototype, "onExecute", null);
    return TalentPortalCommandSetCommandSet;
}(sp_listview_extensibility_1.BaseListViewCommandSet));
exports.default = TalentPortalCommandSetCommandSet;
//# sourceMappingURL=TalentPortalCommandSetCommandSet.js.map