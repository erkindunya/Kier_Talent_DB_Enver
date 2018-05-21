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
        },
        get GradeLookupData() {
            return [{ value: "L2", label: "L2" }, { value: "L1", label: "L1" }, { value: "M3", label: "M3" }, {
                    value: "M2",
                    label: "M2"
                }, { value: "M1", label: "M1" }, { value: "C4", label: "C4" }, { value: "C3", label: "C3" }, {
                    value: "C2",
                    label: "C2"
                }, { value: "C1", label: "C1" }];
        },
        get PerformanceRatingLookupData() {
            /*return [{value: '1', label: '1'},
              {value: '2', label: '2'},
              {value: '3', label: '3'},
              {value: '4', label: '4'},
              {value: '5', label: '5'}]*/
            return { 0: '1', 25: '2', 50: '3', 75: '4', 100: '5' };
        },
        get PotentialRatingLookupData() {
            return { 0: 'A', 50: 'B', 100: 'C' };
        },
        get MovementLookupData() {
            return [
                { value: 'Now', label: 'Now' },
                { value: 'Soon', label: 'Soon' },
                { value: 'Low', label: 'Low' },
                { value: 'Lateral', label: 'Lateral' }
            ];
        },
        get RiskLookupData() {
            return [
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
            ];
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
    var formatPerformanceTip = function (value) {
        //Todo : refactor to make it more intelligent
        if (value == 0)
            return 1;
        if (value == 25)
            return 2;
        if (value == 50)
            return 3;
        if (value == 75)
            return 4;
        if (value == 100)
            return 5;
        return value;
    };
    var formatPotentialTip = function (value) {
        //Todo : refactor to make it more intelligent
        if (value == 0)
            return 'A';
        if (value == 50)
            return 'B';
        if (value == 100)
            return 'C';
        return value;
    };
    return {
        afterCreate: afterCreate,
        formatPerformanceTip: formatPerformanceTip,
        formatPotentialTip: formatPotentialTip
    };
});
//# sourceMappingURL=LookupDataStore.js.map