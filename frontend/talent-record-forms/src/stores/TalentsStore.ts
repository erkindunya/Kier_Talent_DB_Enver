import {applySnapshot, flow, getParent, types} from "mobx-state-tree";
import {DataProviderFactory} from "./Common/DataProviderFactory";
import axios from 'axios';


export const Talent = types.model({
  Id: types.maybe(types.number),
  EmployeeId: types.optional(types.string, ""),
  Name: types.optional(types.string, ""),
  Manager: types.optional(types.string, ""),
  AreaHead: types.optional(types.string, ""),
  Division: types.optional(types.string, ""),
  Unit: types.optional(types.string, ""),
  Stream: types.optional(types.string, ""),
  Function: types.optional(types.string, ""),
  Location: types.optional(types.string, ""),
  Grade: types.optional(types.string, ""),
  BusinessRisk: types.optional(types.string, ""),
  FlightRisk: types.optional(types.string, ""),
  Performance: types.optional(types.string, ""),
  Potential: types.optional(types.string, ""),
  Movement: types.optional(types.string, ""),
  Requirements_01_category: types.optional(types.string, ""),
  Requirements_01_subcategory: types.optional(types.string, ""),
  Requirements_02_category: types.optional(types.string, ""),
  Requirements_02_subcategory: types.optional(types.string, ""),
  Notes: types.optional(types.string, "")
})
  .named("TalentRecord")
  .actions(self => {
    const changeEmployeeId = (id: string) => {
      self.EmployeeId = id;
    }

    const SetValueIfDifferent = (oldValue: string, newValue: string) => {
      if (oldValue != newValue)
        oldValue = newValue;
    }

    //Todo : think about the Person data . Do we need to include userId, Email and displayName
    const changeBusinessUnit = (businessUnit: string[]) => {
      const [division, stream, unit, location] = businessUnit;


      self.Division = division;
      self.Stream = stream;
      self.Unit = unit;
      self.Location = location;
    }

    const changeFunction = (newFunction: string) => {
      self.Function = newFunction;
      //SetValueIfDifferent(self.BusinessFunction, newFunction)
    }

    const changeGrade = (newGrade: string) => {
      SetValueIfDifferent(self.Grade, newGrade);
    }

    const changeBusinessRisk = (newBusinessRisk: string) => {
      SetValueIfDifferent(self.BusinessRisk, newBusinessRisk);
    }

    const changeFlightRisk = (newFlightRisk: string) => {
      SetValueIfDifferent(self.FlightRisk, newFlightRisk);
    }


    return {
      changeBusinessUnit,
      changeFunction,
      changeGrade,
      changeBusinessRisk,
      changeFlightRisk
    }
  })
  .views(self => ({

    get BusinessUnits() {
      console.log("BusinessUnits: called");
      const {Division, Unit, Stream, Location} = self;
      const result = [Division, Unit, Stream, Location];
      console.log(result)
      return result;
    },
    get DevelopmentRequirement01() {
      const {Requirements_01_category, Requirements_01_subcategory} = self;
      return [Requirements_01_category, Requirements_01_subcategory];
    },
    get DevelopmentRequirement02() {
      const {Requirements_02_category, Requirements_02_subcategory} = self;
      return [Requirements_02_category, Requirements_02_subcategory];
    }
  }));


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

    const SaveTalentRecord = ()=>{
axios.post('https://kiertalentportalwebapi20180516031250.azurewebsites.net/api/talents', {
  Id: 1,
  EmployeeId: 'MK0000000',
  Name: 'khalil, Abdalla',
  Manager: 'Jones,Brian',
  Function: 'Finance',
  AreaHead: 'Ahmed, Mohamed',
  Division: 'DP&BS',
  //Division: undefined,
  Unit: 'Enviromental',
  Stream: 'Environmental Central',
  Location: 'Environmental Central - Corby Borough Council',
  BusinessRisk: 'High',
  FlightRisk: 'Low',
  Performance: '2',
  Potential: 'B',
  Grade: 'L2',
  Movement: 'Soon',
  Requirements_01_category: 'Technical Training',
  Requirements_01_subcategory: 'Option 2',
  Requirements_02_category: 'Technical Training',
  Requirements_02_subcategory: 'Option 3',
  Notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed fermentum ex, sit amet congue eros. Ut cursus mattis feugiat. Aenean tristique ante in urna lobortis, sit amet luctus nulla dapibus. Etiam sodales, odio et faucibus placerat, libero ligula lobortis augue, quis malesuada sem enim in erat. Donec eu lorem sit amet nulla congue porta ut vitae dui. Fusce dignissim ullamcorper lorem eu sagittis. Ut mollis purus vel nibh mollis dignissim.'
}).then(_=>console.log("New Record Operation is done"))
  .catch(error=>console.log(JSON.stringify(error,null,4)))
    }

    const GetTalentById = flow(function* GetTalentById(id: number) {

      let talent;
      try {
        const response = yield _dataProvider.GetTalentById(id);
        if (response) {

          //Todo : ugly piece of code that needs to be refactored.
          console.log("Talents : " + JSON.stringify(response, null, 4));
          talent = Talent.create(response);
          applySnapshot(getParent(self, 1).Talent, talent);
          //Todo: move this code for the AppStore\ViewStore
          /* if (getParent(self, 1).Talent)
            applySnapshot(getParent(self, 1).Talent, talent);
          else
            getParent(self, 1).SetTalent(talent);*/
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
    return {LoadAllTalents, GetTalentById,SaveTalentRecord}
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
