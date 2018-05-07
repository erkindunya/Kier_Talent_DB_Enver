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