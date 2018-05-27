import {LookupDataModel} from "../Common/LookupDataModel";
import {applySnapshot, flow, IModelType, types} from "mobx-state-tree";
import {DataProviderFactory} from "../Common/DataProviderFactory";


//GradesLookup_API_URL


export type __IModelType = IModelType<any, any>;

export const GradesStore = types.model({
  items: types.optional(types.array(LookupDataModel), []),
  isLoading: types.optional(types.boolean, false)
})
  .actions(self => {

    const _dataProvider = DataProviderFactory.GetGradesLookupDataProvider();
    //loading all business items
    const loadGrades = flow(function* loadGrades() {
      try {
        self.isLoading = true;
        const resposne = yield _dataProvider.GetAll();
        console.log(JSON.stringify(resposne, null, 4));
        if (resposne)
          applySnapshot(self.items, resposne)
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
      loadGrades
    }
  })

export type GradesStore = typeof GradesStore.Type
