"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var LookupDataStore_1 = require("./LookupDataStore");
exports.AppStore = mobx_state_tree_1.types.model({
    LookupDataStore: mobx_state_tree_1.types.optional(LookupDataStore_1.LookupDataStore, {})
}).named("ApplicationDataStore");
//# sourceMappingURL=AppStore.js.map