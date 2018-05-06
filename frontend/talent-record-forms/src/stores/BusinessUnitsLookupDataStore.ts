import {flow, types, IModelType, applySnapshot} from 'mobx-state-tree';
import {LookupDataModel, NestedLookupDataModel} from "./LookupDataModel";
import {DataProviderFactory} from "./services/DataProviderFactory";


export type __IModelType = IModelType<any, any>;

export const BusinessUnitsLookupDataStore = types.model({

  //Todo : Fix the following error. We need to find a way to convert ObservableArray to normal Array "react.js:3528
  // Warning: Failed prop
  // type: Invalid prop `options` of type `object` supplied to `Cascader`, expected `array`."
  businessUnits: types.optional(types.array(NestedLookupDataModel), []),
  isLoading: types.optional(types.boolean, false)
})
  .actions(self => {

    const _dataProvider = DataProviderFactory.GetBusinessUnitsLookupDataProvider();
    //loading all business functions
    const loadBusinessUnits = flow(function* loadBusinessUnits() {
      try {
        self.isLoading = true;
        const resposne = yield _dataProvider.GetAll();
        console.log(JSON.stringify(resposne, null, 4));
        if (resposne)
          applySnapshot(self.businessUnits, resposne)
      }
      catch (error) {
        console.log("Error retrieving Business Units" + error);
        throw new Error(error.message);
      }
      finally {
        self.isLoading = false;
      }
    })
    return {
      loadBusinessUnits
    }
  })
  .actions(self => {
    const afterCreate = () => {
      const promise = (window as any).businessUnitsLookupDataPromise = self.loadBusinessUnits();
      promise
        .then(_ => {
          console.log("Business Units Retrived Successfully")
        })
        .catch(_ => {
          console.log("Business Units Promise Failed")
        })
    }

    return {afterCreate}
  })
export type BusinessUnitsLookupDataStore = typeof BusinessUnitsLookupDataStore.Type
