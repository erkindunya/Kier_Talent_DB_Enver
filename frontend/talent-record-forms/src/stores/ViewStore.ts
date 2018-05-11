import {getParent, types} from "mobx-state-tree";
import {Talent} from "./TalentsStore";


const ViewStore = types.model({
  selectedTalent: types.optional(Talent, {})
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
    return {
      EditTalentRecord,
      NewTalentRecord,
      ViewTalentRecord
    }
  })


export default ViewStore;
