"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var TalentsStore_1 = require("./TalentsStore");
var ViewStore = mobx_state_tree_1.types.model({
    selectedTalent: mobx_state_tree_1.types.optional(TalentsStore_1.Talent, {})
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
    return {
        EditTalentRecord: EditTalentRecord,
        NewTalentRecord: NewTalentRecord,
        ViewTalentRecord: ViewTalentRecord
    };
});
exports.default = ViewStore;
//# sourceMappingURL=ViewStore.js.map