import {types} from "mobx-state-tree";
import {DevelopmentRequirementsLookupDataStore} from "./LookupDataStores/DevelopmentRequirementsDataStore";
import {BusinessFunctionsStore} from "./LookupDataStores/BusinessFunctionsStore";
import {RiskLookupDataStore} from "./LookupDataStores/RiskLookupDataStore";
import {BusinessUnitsLookupDataStore} from "./LookupDataStores/BusinessUnitsLookupDataStore";
import {GradesStore} from "./LookupDataStores/GradesDataStore";


export const LookupDataStore = types.model(
  {
    RisksDataStore: types.optional(RiskLookupDataStore, {items: []}),
    BusinessUnitsDataStore: types.optional(BusinessUnitsLookupDataStore, {items: []}),
    DevelopmentRequirementsDataStore: types.optional(DevelopmentRequirementsLookupDataStore, {items: []}),
    BusinessFunctionsDataStore: types.optional(BusinessFunctionsStore, {items: []}),
    GradeDataStore: types.optional(GradesStore, {items: []})
  }
).named("LookupDataStore")
  .views(
    self => {
      return {
        get RisksLookupData() {
          return self.RisksDataStore.items;
        }
        ,
        get BusinessFunctionsLookupData() {
          return self.BusinessFunctionsDataStore.items;
        }
        ,
        get BusinessUnitsLookupData() {
          return self.BusinessUnitsDataStore.items;
        }
        ,
        get DevelopmentRequirementsLookupData() {
          return self.DevelopmentRequirementsDataStore.items;
        }
        ,
        get GradeLookupData() {
          return self.GradeDataStore.items;
        }
        ,
        get PerformanceRatingLookupData() {
          /*return [{value: '1', label: '1'},
            {value: '2', label: '2'},
            {value: '3', label: '3'},
            {value: '4', label: '4'},
            {value: '5', label: '5'}]*/

          return {0:'New To Rate',20: '5', 40: '4', 60: '3', 80: '2', 100: '1'};
        }
        ,

        get PotentialRatingLookupData() {
          return {0:'New To Rate', 33: 'C', 66: 'B', 100: 'A'};
        },

        get MovementLookupData() {
          return [
            {value: 'Now', label: 'Now'},
            {value: 'Soon', label: 'Soon'},
            {value: 'Low', label: 'Low'},
            {value: 'Lateral', label: 'Lateral'}
          ];
        }
        ,
        get RiskLookupData() {
          return [
            {value: 'High', label: 'High'},
            {value: 'Medium', label: 'Medium'},
            {value: 'Low', label: 'Low'},
          ]
        }
      }
    }
  )
  .actions(
    self => {
      const afterCreate = () => {

        const risksPromise = (window as any).risksLookupDataPromise = self.RisksDataStore.loadRiskLookupData();
        const unitsPromise = (window as any).unitsLookupDataPromise = self.BusinessUnitsDataStore.loadBusinessUnits();
        const functionsPromise = (window as any).functionsLookupDataPromise = self.BusinessFunctionsDataStore.loadBusinessFunctions();
        const requirementsPromise = (window as any).requirementsLookupDataPromise = self.DevelopmentRequirementsDataStore.loadDevelopmentRequirements();
        const gradesPromise = self.GradeDataStore.loadGrades();


        Promise.all([risksPromise, unitsPromise, functionsPromise, requirementsPromise, gradesPromise])
          .then(_ => console.log("All Lookup data retrievedd successfully"))
          .catch(_ => console.error("Lookup data retrieval failed."))
      }

      const formatPerformanceTip = (value) => {
        //Todo : refactor to make it more intelligent
        if (value == 0)
          return "Too New To Rate";
        if (value == 20)
          return "Unsatisfactory";
        if (value == 40)
          return "Developing";
        if (value == 60)
          return "Good";
        if (value == 80)
          return "Excellent";
        if (value == 100)
          return "Oustanding";
        return value;
      }

      const formatPotentialTip = (value) => {
        //Todo : refactor to make it more intelligent
        if (value == 0)
          return 'Too New To Rate';
        if (value == 0)
          return 'C';
        if (value == 50)
          return 'B';
        if (value == 100)
          return 'A';
        return value;
      }

      return {
        afterCreate,
        formatPerformanceTip,
        formatPotentialTip

      }
    }
  )
