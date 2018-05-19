import {applySnapshot, flow, getParent, types} from "mobx-state-tree";
import {DataProviderFactory} from "./Common/DataProviderFactory";
import axios from 'axios';
import {REST_API_URL} from './Common/Constants';

export const PreviousYearRating = types.model({
  Performance: types.optional(types.string, ""),
  Potential: types.optional(types.string, ""),
  Year: types.optional(types.number, 0),
  By: types.optional(types.string, ""),
  At: types.optional(types.string, "")
});

//Todo : need to add extra couple of fields CreatedBy and ModifiedBy
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
  Notes: types.optional(types.string, ""),
  IsCurrentSubmission: types.optional(types.boolean, false),
  Position: types.optional(types.string, ""),
  SubmissionYear: types.optional(types.number, 0),
  PreviousYear: types.maybe(PreviousYearRating)
})
  .named("TalentRecord")
  .actions(self => {


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

    const changeDevelopmentRequirement01 = (requirements: string[]) => {
      const [category, subcategory] = requirements;
      self.Requirements_01_category = category;
      self.Requirements_01_subcategory = subcategory
    }


    const changeDevelopmentRequirement02 = (requirements: string[]) => {
      const [category, subcategory] = requirements;
      self.Requirements_02_category = category;
      self.Requirements_02_subcategory = subcategory
    }

    const changeFunction = (newFunction: string) => {
      self.Function = newFunction;
      //SetValueIfDifferent(self.BusinessFunction, newFunction)
    }

    const changeEmployeeName = (newEmployeeKey: string) => {
      self.Name = newEmployeeKey;
    }

    const changeGrade = (newGrade: string) => {
      self.Grade = newGrade;
    }

    const changeBusinessRisk = (newBusinessRisk: string) => {
      self.BusinessRisk = newBusinessRisk;
    }

    const changeFlightRisk = (newFlightRisk: string) => {
      self.FlightRisk = newFlightRisk;
    }


    const changeEmployeeId = (newEmployeeId: string) => {
      self.EmployeeId = newEmployeeId;
    }

    const changePosition = (newPosition: string) => {
      self.Position = newPosition;
    }

    const changeMovement = (newMovement: string) => {
      self.Movement = newMovement;
    }

    const changePotentialRating = (newRating: string) => {
      self.Potential = newRating;
    }

    const changePerformanceRating = (newRating: string) => {
      self.Performance = newRating;
    }

    const changeAreaHead = (newHead: string) => {
      self.AreaHead = newHead;
    }

    const changeManager = (newManager: string) => {
      self.Manager = newManager;
    }

    const changeNotes = (notes: string) => {
      self.Notes = notes;
    }

    return {
      changeBusinessUnit,
      changeFunction,
      changeGrade,
      changeBusinessRisk,
      changeFlightRisk,
      changeEmployeeId,
      changePosition,
      changeMovement,
      changePotentialRating,
      changePerformanceRating,
      changeDevelopmentRequirement01,
      changeDevelopmentRequirement02,
      changeEmployeeName,
      changeAreaHead,
      changeManager,
      changeNotes

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
    ,
    get HasPreviousYearRating() {
      return (self.PreviousYear) ? true : false;
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

    const SaveTalentRecord = () => {

      axios.post(REST_API_URL, JSON.stringify(getParent(self, 1).Talent), {headers: {'content-type': 'application/json'}}).then(_ => console.log("New Record Operation is done"))
        .catch(error => console.log(JSON.stringify(error, null, 4)))
    }

    const UpdateTalentRecord = () => {

      axios.put(REST_API_URL, JSON.stringify(getParent(self, 1).Talent), {headers: {'content-type': 'application/json'}}).then(_ => console.log("New Record Operation is done"))
        .catch(error => console.log(JSON.stringify(error, null, 4)))
    }
    const GetTalentById = flow(function* GetTalentById(id: number, employeeId: string) {

      let talent;
      try {
        const response = yield _dataProvider.GetTalentById(id, employeeId);
        if (response) {

          //Todo : ugly piece of code that needs to be refactored.
          console.log("Talents : " + JSON.stringify(response, null, 4));
          talent = Talent.create(response.data);
          getParent(self, 1).SetTalent(talent);
          //applySnapshot(getParent(self, 1).Talent, talent);
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
    return {LoadAllTalents, GetTalentById, SaveTalentRecord, UpdateTalentRecord}
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
