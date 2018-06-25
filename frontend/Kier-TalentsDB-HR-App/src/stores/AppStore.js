"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var LookupDataStore_1 = require("./LookupDataStore");
var TalentsStore_1 = require("./TalentsStore");
var ViewStore_1 = require("./ViewStore");
exports.AppStore = mobx_state_tree_1.types.model({
    LookupDataStore: mobx_state_tree_1.types.optional(LookupDataStore_1.LookupDataStore, {}),
    TalentDataStore: mobx_state_tree_1.types.optional(TalentsStore_1.default, {}),
    IsLoadingReferenceData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false),
    IsLoadingTalentData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false),
    IsSubmittingData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false),
    ViewStore: mobx_state_tree_1.types.optional(ViewStore_1.default, {}),
    Talent: mobx_state_tree_1.types.optional(TalentsStore_1.Talent, {})
}).named("ApplicationDataStore")
    .actions(function (self) {
    var SetIsLoadingReferenceData = function (loading) {
        self.IsLoadingReferenceData = loading;
    };
    var SetIsLoadingTalentData = function (submitting) {
        self.IsLoadingTalentData = submitting;
    };
    var SetIsSubmittingData = function (loading) {
        self.IsSubmittingData = loading;
    };
    var SetTalent = function (item) {
        self.Talent = item;
    };
    var afterCreate = function () {
        self.ViewStore.LoadData();
    };
    return {
        SetIsLoadingReferenceData: SetIsLoadingReferenceData,
        SetIsLoadingTalentData: SetIsLoadingTalentData,
        SetTalent: SetTalent,
        SetIsSubmittingData: SetIsSubmittingData,
        afterCreate: afterCreate
    };
}).actions(function (self) {
    var LoadTalentRecord = function (id, employeeId) {
        self.SetIsLoadingTalentData(true);
        self.TalentDataStore.GetTalentById(id, employeeId).then(function (_) {
            return self.SetIsLoadingTalentData(false);
        });
    };
    return {
        LoadTalentRecord: LoadTalentRecord
    };
});
//# sourceMappingURL=AppStore.js.map