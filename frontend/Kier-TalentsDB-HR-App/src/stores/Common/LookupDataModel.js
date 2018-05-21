"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var mobx_state_tree_1 = require("mobx-state-tree");
exports.LookupDataModel = mobx_state_tree_1.types.model({
  value: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
  label: mobx_state_tree_1.types.string
});
exports.NestedLookupDataModel = mobx_state_tree_1.types.model({
  value: mobx_state_tree_1.types.string,
  label: mobx_state_tree_1.types.string,
  children: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.late(function () {
    return exports.NestedLookupDataModel;
  })), [])
});
//# sourceMappingURL=LookupDataModel.js.map
