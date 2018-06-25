"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var DevelopmentRequirementsDataStore_1 = require("./LookupDataStores/DevelopmentRequirementsDataStore");
var BusinessFunctionsStore_1 = require("./LookupDataStores/BusinessFunctionsStore");
var RiskLookupDataStore_1 = require("./LookupDataStores/RiskLookupDataStore");
var BusinessUnitsLookupDataStore_1 = require("./LookupDataStores/BusinessUnitsLookupDataStore");
var GradesDataStore_1 = require("./LookupDataStores/GradesDataStore");
exports.LookupDataStore = mobx_state_tree_1.types.model({
    RisksDataStore: mobx_state_tree_1.types.optional(RiskLookupDataStore_1.RiskLookupDataStore, { items: [] }),
    BusinessUnitsDataStore: mobx_state_tree_1.types.optional(BusinessUnitsLookupDataStore_1.BusinessUnitsLookupDataStore, { items: [] }),
    DevelopmentRequirementsDataStore: mobx_state_tree_1.types.optional(DevelopmentRequirementsDataStore_1.DevelopmentRequirementsLookupDataStore, { items: [] }),
    BusinessFunctionsDataStore: mobx_state_tree_1.types.optional(BusinessFunctionsStore_1.BusinessFunctionsStore, { items: [] }),
    GradeDataStore: mobx_state_tree_1.types.optional(GradesDataStore_1.GradesStore, { items: [] }),
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
            return self.GradeDataStore.items;
        },
        get PerformanceRatingLookupData() {
            /*return [{value: '1', label: '1'},
              {value: '2', label: '2'},
              {value: '3', label: '3'},
              {value: '4', label: '4'},
              {value: '5', label: '5'}]*/
            return { 0: 'Too New to Rate', 20: '5', 40: '4', 60: '3', 80: '2', 100: '1' };
        },
        get PotentialRatingLookupData() {
            return { 0: 'Too New to Rate', 33: 'C', 66: 'B', 100: 'A' };
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
        var gradesPromise = self.GradeDataStore.loadGrades();
        //Todo : Run this code in SetTimeOut..Known bug in Mobx-State-Tree. It should have been resolved in Nov 2017, but it still there
        setTimeout(function () {
            mobx_state_tree_1.getParent(self).SetIsLoadingReferenceData(true);
        }, 0);
        Promise.all([risksPromise, unitsPromise, functionsPromise, requirementsPromise, gradesPromise])
            .then(function (_) {
            console.log("All Lookup data retrievedd successfully");
            setTimeout(function () {
                mobx_state_tree_1.getParent(self, 1).SetIsLoadingReferenceData(false);
            }, 0);
        })
            .catch(function (_) { return console.error("Lookup data retrieval failed."); });
        //Todo : Add code to display error message.
    };
    var formatPerformanceTip = function (value) {
        //Todo : refactor to make it more intelligent
        if (value == 0)
            return "Employee is too new to rate. In probation period, please follow procedure\n";
        if (value == 20)
            return "Unsatisfactory : Consistently fails to achieve against goals and/or consistently fails to demonstrate behaviours that are aligned with the Kier values.\n" +
                "Needs development under guidance and supervision. Significant and immediate improvement required via performance improvement plan\n";
        if (value == 40)
            return "Developing : Performance against goals has significant, clearly identified development areas and/or limited demonstration of behaviours that are consistent with the Kier values. \n" +
                "May have good performance in achieving some performance and behavioural indicators.  Needs more practice and  guidance.\n ";
        if (value == 60)
            return "Good : Performs the role to an acceptable level both from a results and behaviours perspective – this means that most goals are achieved to the required standard with good evidence of the behaviours in action.\n" +
                "May significantly exceed on either results or behaviours, but not both.\n" +
                "Requires little guidance to perform at this level.\n";
        if (value == 80)
            return "Excellent : Both results and behaviours are consistently at a very high level.\n" +
                "All goals are fully achieved with some over-achieved.\n";
        if (value == 100)
            return "Oustanding : Both results and behaviours are clearly at an exceptional level. \n" +
                "All goals are exceeded to a consistently high level i.e. exceeds targets.  Individual also seeks out additional responsibilities within role and completes them to a high standard.  \n" +
                "Acts as a role model in the way they perform and behave.\n";
        return value;
    };
    var formatPotentialTip = function (value) {
        //Todo : refactor to make it more intelligent
        if (value == 0)
            return 'Employee is too new to rate';
        if (value == 33)
            return 'C = Slow Potential: employee meets slower potential definitions and either does not demonstrate the ability, or have the desire (or mobility) to move up in the organisation. Further development likely to be within current role/level of responsibility.  ';
        if (value == 66)
            return 'B = Moderate potential: meets partial criteria on fast potential definitions, but needs more time for development. Showing potential to take lateral roles for development, but not likely to move up to significantly larger roles in the near future';
        if (value == 100)
            return 'A = Fast potential: meets faster potential definitions, employee is agreed by leadership as showing strong indicators to be successful at performing significantly larger roles/responsibility, and with development at an accelerated pace ';
        return value;
    };
    return {
        afterCreate: afterCreate,
        formatPerformanceTip: formatPerformanceTip,
        formatPotentialTip: formatPotentialTip
    };
});
//# sourceMappingURL=LookupDataStore.js.map