"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var TalentsStore_1 = require("./TalentsStore");
var ViewStore = mobx_state_tree_1.types.model({
    selectedTalent: mobx_state_tree_1.types.optional(TalentsStore_1.Talent, {}),
    isEditing: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false)
})
    .named("ViewStore")
    .views(function (self) {
    return {
        get app() {
            return mobx_state_tree_1.getParent(self);
        }
    };
})
    .actions(function (self) {
    var EditTalentRecord = function (id) {
        /*
        * */
        var result = self.app.TalentDataStore.GetTalentById(id);
        self.selectedTalent = result;
    };
    var NewTalentRecord = function () {
    };
    var ViewTalentRecord = function () {
    };
    var LoadData = function () {
        var url = new URL(window.location.href);
        if (url.searchParams.has("talentId") && url.searchParams.has("employeeId")) {
            self.isEditing = true;
            console.log("Talent Id " + url.searchParams.get("talentId"));
            self.app.LoadTalentRecord(parseInt(url.searchParams.get("talentId")), url.searchParams.get("employeeId"));
        }
    };
    return {
        EditTalentRecord: EditTalentRecord,
        NewTalentRecord: NewTalentRecord,
        ViewTalentRecord: ViewTalentRecord,
        LoadData: LoadData
    };
});
exports.default = ViewStore;
//# sourceMappingURL=ViewStore.js.map