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
    LookupDataStore: types.optional(LookupDataStore,{}),
    TalentDataStore: types.optional(TalentsStore, {}),
    IsLoadingReferenceData: types.optional(types.boolean, false),
    IsLoadingTalentData: types.optional(types.boolean, false),
    IsSubmittingData: types.optional(types.boolean, false),
    ViewStore: types.optional(ViewStore, {}),
    Talent: types.optional(Talent, {})

  }
).named("ApplicationDataStore")
  .actions(self => {


    const SetIsLoadingReferenceData = (loading: boolean) => {
      self.IsLoadingReferenceData = loading;
    }

    const SetIsLoadingTalentData = (submitting: boolean) => {
      self.IsLoadingTalentData = submitting;
    }

    const SetIsSubmittingData = (loading: boolean) => {
      self.IsSubmittingData = loading;
    }

    const SetTalent = (item) => {
      self.Talent = item;
    }


    const afterCreate = () => {
      self.ViewStore.LoadData();
    }
    return {
      SetIsLoadingReferenceData,
      SetIsLoadingTalentData,
      SetTalent,
      SetIsSubmittingData,
      afterCreate
    }
  }).actions(self => {
    const LoadTalentRecord = (id: number, employeeId: string) => {
      self.SetIsLoadingTalentData(true);
      self.TalentDataStore.GetTalentById(id, employeeId).then(_ =>
        self.SetIsLoadingTalentData(false))
    }

    return {
      LoadTalentRecord
    }
  });







