import {types, IModelType} from 'mobx-state-tree'
import {BusinessFunctionsStore} from "./LookupDataStores/BusinessFunctionsStore";
import {get} from "mobx";
import {RiskLookupDataStore} from "./LookupDataStores/RiskLookupDataStore";
import {BusinessUnitsLookupDataStore} from "./LookupDataStores/BusinessUnitsLookupDataStore";
import {DevelopmentRequirementsLookupDataStore} from "./LookupDataStores/DevelopmentRequirementsDataStore";
import {LookupDataStore} from "./LookupDataStore";
import TalentsStore, {Talent} from "./TalentsStore";
import ViewStore from "./ViewStore";

export const AppStore = types.model(
  {
    LookupDataStore: types.optional(LookupDataStore, {}),
    TalentDataStore: types.optional(TalentsStore, {}),
    ViewStore: types.optional(ViewStore, {}),
    Talent: types.maybe(Talent)
  }
).named("ApplicationDataStore")
  .actions(self => {

    const SetTalent = (item) => {
      self.Talent = item;
    }

    const LoadTalentRecord = (id: number) => {
      self.TalentDataStore.GetTalentById(id)
    }

    return {
      SetTalent,
      LoadTalentRecord
    }
  });
