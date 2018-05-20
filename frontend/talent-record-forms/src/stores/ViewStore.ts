import {getParent, types} from "mobx-state-tree";
import {Talent} from "./TalentsStore";


const ViewStore = types.model({
  selectedTalent: types.optional(Talent, {}),
  isEditing: types.optional(types.boolean, false)
})
  .named("ViewStore")
  .views(self => {
    return {
      get app() {
        return getParent(self);
      }
    }
  })
  .actions(self => {

    const EditTalentRecord = (id: number) => {
      /*
      * */
      let result = self.app.TalentDataStore.GetTalentById(id);
      self.selectedTalent = result;
    }

    const NewTalentRecord = () => {

    }


    const ViewTalentRecord = () => {

    }
    const LoadData = () => {
      let url = new URL(window.location.href);
      if (url.searchParams.has("talentId") && url.searchParams.has("employeeId")) {
        self.isEditing = true;
        console.log("Talent Id " + url.searchParams.get("talentId"));
        self.app.LoadTalentRecord(parseInt(url.searchParams.get("talentId")), url.searchParams.get("employeeId"));
      }
    }

    return {
      EditTalentRecord,
      NewTalentRecord,
      ViewTalentRecord,
      LoadData
    }
  })


export default ViewStore;
