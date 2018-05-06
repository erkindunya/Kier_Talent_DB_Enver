import {types, IModelType} from 'mobx-state-tree'
import {BusinessFunctionsStore} from "./BusinessFunctionsStore";
import {get} from "mobx";
import {RiskLookupDataStore} from "./RiskLookupDataStore";

export const AppStore = types.model(
  {
    BusinessFunctions: types.optional(BusinessFunctionsStore, {functions: []}),
    Risks: types.optional(RiskLookupDataStore, {risksLookup: []})
  }
)
  .named("ApplicationDataStore");
