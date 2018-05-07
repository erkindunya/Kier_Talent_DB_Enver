import {flow, types, IModelType, applySnapshot} from 'mobx-state-tree';
import {LookupDataModel} from "../Common/LookupDataModel";
import {DataProviderFactory} from "../Common/DataProviderFactory";


export type __IModelType = IModelType<any, any>;

export const RiskLookupDataStore = types.model({
  items: types.optional(types.array(LookupDataModel), []),
  isLoading: types.optional(types.boolean, false)
})
  .actions(self => {

    const _dataProvider = DataProviderFactory.GetRisksDataProvider();
    //loading all business items
    const loadRiskLookupData = flow(function* loadRiskLookupData() {
      try {
        self.isLoading = true;
        const resposne = yield _dataProvider.GetAll();
        console.log(JSON.stringify(resposne, null, 4));
        if (resposne)
          applySnapshot(self.items, resposne)
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
export type RiskLookupDataStore = typeof RiskLookupDataStore.Type
