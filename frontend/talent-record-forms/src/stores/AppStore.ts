import {types, IModelType} from 'mobx-state-tree'
import {BusinessFunctionsStore} from "./LookupDataStores/BusinessFunctionsStore";
import {get} from "mobx";
import {RiskLookupDataStore} from "./LookupDataStores/RiskLookupDataStore";
import {BusinessUnitsLookupDataStore} from "./LookupDataStores/BusinessUnitsLookupDataStore";
import {DevelopmentRequirementsLookupDataStore} from "./LookupDataStores/DevelopmentRequirementsDataStore";
import {LookupDataStore} from "./LookupDataStore";

export const AppStore = types.model(
  {
    LookupDataStore: types.optional(LookupDataStore, {})
  }
).named("ApplicationDataStore");
