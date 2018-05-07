import {applySnapshot, flow, getParent, types} from "mobx-state-tree";
import {DataProviderFactory} from "./Common/DataProviderFactory";

export const Talent = types.model({
  id: types.number,
  employeeId: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  manager: types.optional(types.string, ""),
  areaHead: types.optional(types.string, ""),
  divison: types.optional(types.string, ""),
  unit: types.optional(types.string, ""),
  stream: types.optional(types.string, ""),
  function: types.optional(types.string, ""),
  location: types.optional(types.string, ""),
  grade: types.optional(types.string, ""),
  businessRisk: types.optional(types.string, ""),
  flightRisk: types.optional(types.string, ""),
  performance: types.optional(types.string, ""),
  potential: types.optional(types.string, ""),
  movement: types.optional(types.string, ""),
  requirements_01_category: types.optional(types.string, ""),
  requirements_01_subcategory: types.optional(types.string, ""),
  requirements_02_category: types.optional(types.string, ""),
  requirements_02_subcategory: types.optional(types.string, ""),
  notes: types.optional(types.string, "")
})
  .named("TalentRecord");

const TalentsStore = types.model({
  items: types.optional(types.array(Talent), []),
  isLoading: types.optional(types.boolean, false)
}).actions(
  self => {

    const _dataProvider = DataProviderFactory.GetTalentsDataProvider();
    const LoadAllTalents = flow(function* LoadAllTalents() {

      try {
        const response = yield _dataProvider.GetAll();
        if (response) {
          console.log("Talents : " + JSON.stringify(response, null, 4));
          applySnapshot(self.items, response);
        }
      }
      catch (error) {
        console.log("Error retrieving Talents" + error);
        throw new Error(error.message);
      }
      finally {
        self.isLoading = false;
      }

    })

    const GetTalentById = flow(function* GetTalentById(id: number) {

      let talent;
      try {
        const response = yield _dataProvider.GetTalentById(id);
        if (response) {
          console.log("Talents : " + JSON.stringify(response, null, 4));
          talent = Talent.create(response);
          applySnapshot(getParent(self, 1).Talent, talent);
          console.log("Talent Record : " + JSON.stringify(talent, null, 4));
        }
      }
      catch (error) {
        console.log("Error retrieving Talents" + error);
        throw new Error(error.message);
      }
      finally {
        self.isLoading = false;
        return talent
      }

    })
    return {LoadAllTalents, GetTalentById}
  }
).actions(self => {
  const afterCreate = () => {
    console.log("Loading relevant Talent Records")
    self.LoadAllTalents().then(_ => console.log("Number of Loaded Talent Records :" + self.items.length));


  }

  return {
    afterCreate
  }
})


export default TalentsStore;
