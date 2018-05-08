import {types} from "mobx-state-tree";
import {DevelopmentRequirementsLookupDataStore} from "./LookupDataStores/DevelopmentRequirementsDataStore";
import {BusinessFunctionsStore} from "./LookupDataStores/BusinessFunctionsStore";
import {RiskLookupDataStore} from "./LookupDataStores/RiskLookupDataStore";
import {BusinessUnitsLookupDataStore} from "./LookupDataStores/BusinessUnitsLookupDataStore";


export const LookupDataStore = types.model(
  {
    RisksDataStore: types.optional(RiskLookupDataStore, {items: []}),
    BusinessUnitsDataStore: types.optional(BusinessUnitsLookupDataStore, {items: []}),
    DevelopmentRequirementsDataStore: types.optional(DevelopmentRequirementsLookupDataStore, {items: []}),
    BusinessFunctionsDataStore: types.optional(BusinessFunctionsStore, {items: []})
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
          return [{value: "L2", label: "L2"}, {value: "L1", label: "L1"}, {value: "M3", label: "M3"}, {
            value: "M2",
            label: "M2"
          }, {value: "M1", label: "M1"}, {value: "C4", label: "C4"}, {value: "C3", label: "C3"}, {
            value: "C2",
            label: "C2"
          }, {value: "C1", label: "C1"}];
        }
        ,
        get PerformanceRatingLookupData() {
          /*return [{value: '1', label: '1'},
            {value: '2', label: '2'},
            {value: '3', label: '3'},
            {value: '4', label: '4'},
            {value: '5', label: '5'}]*/

          return {0: '1', 25: '2', 50: '3', 75: '4', 100: '5'};
        }
        ,

        get PotentialRatingLookupData() {
          return {0: 'A', 50: 'B', 100: 'C'};
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

        Promise.all([risksPromise, unitsPromise, functionsPromise, requirementsPromise])
          .then(_ => console.log("All Lookup data retrievedd successfully"))
          .catch(_ => console.error("Lookup data retrieval failed."))
      }

      return {
        afterCreate
      }
    }
  )
