import {types, IModelType} from 'mobx-state-tree'
import {BusinessFunctionsStore} from "./BusinessFunctionsStore";
import {get} from "mobx";
import {RiskLookupDataStore} from "./RiskLookupDataStore";
import {BusinessUnitsLookupDataStore} from "./BusinessUnitsLookupDataStore";
import {DevelopmentRequirementsLookupDataStore} from "./DevelopmentRequirementsDataStore";

export const AppStore = types.model(
  {
    BusinessFunctions: types.optional(BusinessFunctionsStore, {functions: []}),
    Risks: types.optional(RiskLookupDataStore, {risksLookup: []}),
    BusinessUnits: types.optional(BusinessUnitsLookupDataStore, {businessUnits: []}),
    DevelopmentRequirements: types.optional(DevelopmentRequirementsLookupDataStore, {developmentRequirements: []})
  }
)
  .named("ApplicationDataStore");
