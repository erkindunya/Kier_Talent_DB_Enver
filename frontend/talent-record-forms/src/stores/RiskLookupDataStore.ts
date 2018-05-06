import {flow, types, IModelType, applySnapshot} from 'mobx-state-tree';
import {LookupDataModel} from "./LookupDataModel";
import {DataProviderFactory} from "./services/DataProviderFactory";


export type __IModelType = IModelType<any, any>;

export const RiskLookupDataStore = types.model({
  risksLookup: types.optional(types.array(LookupDataModel), []),
  isLoading: types.optional(types.boolean, false)
})
  .actions(self => {

    const _dataProvider = DataProviderFactory.GetRisksDataProvider();
    //loading all business functions
    const loadRiskLookupData = flow(function* loadRiskLookupData() {
      try {
        self.isLoading = true;
        const resposne = yield _dataProvider.GetAll();
        console.log(JSON.stringify(resposne, null, 4));
        if (resposne)
          applySnapshot(self.risksLookup, resposne)
      }
      catch (error) {
        console.log("Error retrieving Risks Lookup Data " + error);
        throw new Error(error.message);
      }
      finally {
        self.isLoading = false;
      }
    })
    return {
      loadRiskLookupData
    }
  })
  .actions(self => {
    const afterCreate = () => {
      const promise = (window as any).riskLookupDataPromise = self.loadRiskLookupData();
      promise
        .then(_ => {
          console.log("Risks Lookup Data Retrived Successfully")
        })
        .catch(_ => {
          console.log("Risks Lookup Data Promise Failed")
        })
    }

    return {afterCreate}
  })
export type RiskLookupDataStore = typeof RiskLookupDataStore.Type
