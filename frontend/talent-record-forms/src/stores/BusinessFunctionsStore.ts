import {flow, types, IModelType, applySnapshot} from 'mobx-state-tree';
import {LookupDataModel} from "./LookupDataModel";
import {DataProviderFactory} from "./services/DataProviderFactory";


export type __IModelType = IModelType<any, any>;

export const BusinessFunctionsStore = types.model({
  functions: types.optional(types.array(LookupDataModel), []),
  isLoading: types.optional(types.boolean, false)
})
  .actions(self => {

    const _dataProvider = DataProviderFactory.GetBusinessFunctionsDataProvider();
    //loading all business functions
    const loadBusinessFunctions = flow(function* loadBusinessFunctions() {
      try {
        self.isLoading = true;
        const resposne = yield _dataProvider.GetAll();
        console.log(JSON.stringify(resposne, null, 4));
        if (resposne)
          applySnapshot(self.functions, resposne)
      }
      catch (error) {
        console.log("Error retrieving Business Functions " + error);
        throw new Error(error.message);
      }
      finally {
        self.isLoading = false;
      }
    })
    return {
      loadBusinessFunctions
    }
  })
  .actions(self => {
    const afterCreate = () => {
      const promise = (window as any).riskLookupDataPromise = self.loadBusinessFunctions();
      promise
        .then(_ => {
          console.log("Business Functions Retrived Successfully")
        })
        .catch(_ => {
          console.log("Business Functions Promise Failed")
        })
    }

    return {afterCreate}
  })
export type BusinessFunctionsStore = typeof BusinessFunctionsStore.Type
