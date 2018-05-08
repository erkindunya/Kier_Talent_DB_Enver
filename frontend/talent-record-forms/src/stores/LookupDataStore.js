"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var DevelopmentRequirementsDataStore_1 = require("./LookupDataStores/DevelopmentRequirementsDataStore");
var BusinessFunctionsStore_1 = require("./LookupDataStores/BusinessFunctionsStore");
var RiskLookupDataStore_1 = require("./LookupDataStores/RiskLookupDataStore");
var BusinessUnitsLookupDataStore_1 = require("./LookupDataStores/BusinessUnitsLookupDataStore");
exports.LookupDataStore = mobx_state_tree_1.types.model({
    RisksDataStore: mobx_state_tree_1.types.optional(RiskLookupDataStore_1.RiskLookupDataStore, { items: [] }),
    BusinessUnitsDataStore: mobx_state_tree_1.types.optional(BusinessUnitsLookupDataStore_1.BusinessUnitsLookupDataStore, { items: [] }),
    DevelopmentRequirementsDataStore: mobx_state_tree_1.types.optional(DevelopmentRequirementsDataStore_1.DevelopmentRequirementsLookupDataStore, { items: [] }),
    BusinessFunctionsDataStore: mobx_state_tree_1.types.optional(BusinessFunctionsStore_1.BusinessFunctionsStore, { items: [] })
}).named("LookupDataStore")
    .views(function (self) {
    return {
        get RisksLookupData() {
            return self.RisksDataStore.items;
        },
        get BusinessFunctionsLookupData() {
            return self.BusinessFunctionsDataStore.items;
        },
        get BusinessUnitsLookupData() {
            return self.BusinessUnitsDataStore.items;
        },
        get DevelopmentRequirementsLookupData() {
            return self.DevelopmentRequirementsDataStore.items;
        }
    };
})
    .actions(function (self) {
    var afterCreate = function () {
        var risksPromise = window.risksLookupDataPromise = self.RisksDataStore.loadRiskLookupData();
        var unitsPromise = window.unitsLookupDataPromise = self.BusinessUnitsDataStore.loadBusinessUnits();
        var functionsPromise = window.functionsLookupDataPromise = self.BusinessFunctionsDataStore.loadBusinessFunctions();
        var requirementsPromise = window.requirementsLookupDataPromise = self.DevelopmentRequirementsDataStore.loadDevelopmentRequirements();
        Promise.all([risksPromise, unitsPromise, functionsPromise, requirementsPromise])
            .then(function (_) { return console.log("All Lookup data retrievedd successfully"); })
            .catch(function (_) { return console.error("Lookup data retrieval failed."); });
    };
    return {
        afterCreate: afterCreate
    };
});
//# sourceMappingURL=LookupDataStore.js.map