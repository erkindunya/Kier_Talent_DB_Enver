import {types, IModelType} from 'mobx-state-tree'
import {BusinessFunctionsStore} from "./LookupDataStores/BusinessFunctionsStore";
import {get} from "mobx";
import {RiskLookupDataStore} from "./LookupDataStores/RiskLookupDataStore";
import {BusinessUnitsLookupDataStore} from "./LookupDataStores/BusinessUnitsLookupDataStore";
import {DevelopmentRequirementsLookupDataStore} from "./LookupDataStores/DevelopmentRequirementsDataStore";
import {LookupDataStore} from "./LookupDataStore";
import TalentsStore, {Talent} from "./TalentsStore";

export const AppStore = types.model(
  {
    LookupDataStore: types.optional(LookupDataStore, {}),
    TalentDataStore: types.optional(TalentsStore, {}),
    Talent: types.optional(Talent, {id: -1})
  }
).named("ApplicationDataStore");
