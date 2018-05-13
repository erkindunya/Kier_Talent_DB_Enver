import {applySnapshot, flow, getParent, types} from "mobx-state-tree";
import {DataProviderFactory} from "./Common/DataProviderFactory";


export const Talent = types.model({
  id: types.maybe(types.number),
  employeeId: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  manager: types.optional(types.string, ""),
  areaHead: types.optional(types.string, ""),
  divison: types.optional(types.string, ""),
  unit: types.optional(types.string, ""),
  stream: types.optional(types.string, ""),
  function: types.maybe(types.string),
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
  .named("TalentRecord")
  .actions(self => {
    const changeEmployeeId = (id: string) => {
      self.employeeId = id;
    }

    const SetValueIfDifferent = (oldValue: string, newValue: string) => {
      if (oldValue != newValue)
        oldValue = newValue;
    }

    //Todo : think about the Person data . Do we need to include userId, Email and displayName
    const changeBusinessUnit = (businessUnit: string[]) => {
      const [division, stream, unit, location] = businessUnit;


      self.divison = division;
      self.stream = stream;
      self.unit = unit;
      self.location = location;
    }

    const changeFunction = (newFunction: string) => {
      SetValueIfDifferent(self.function, newFunction)
    }

    const changeGrade = (newGrade: string) => {
      SetValueIfDifferent(self.grade, newGrade);
    }

    const changeBusinessRisk = (newBusinessRisk: string) => {
      SetValueIfDifferent(self.businessRisk, newBusinessRisk);
    }

    const changeFlightRisk = (newFlightRisk: string) => {
      SetValueIfDifferent(self.flightRisk, newFlightRisk);
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
      const {divison, unit, stream, location} = self;
      const result = [divison, unit, stream, location];
      console.log(result)
      return result;
    },
    get DevelopmentRequirement01() {
      const {requirements_01_category, requirements_01_subcategory} = self;
      return [requirements_01_category, requirements_01_subcategory];
    },
    get DevelopmentRequirement02() {
      const {requirements_02_category, requirements_02_subcategory} = self;
      return [requirements_02_category, requirements_02_subcategory];
    },
    get Function() {
      return (self.function) ? self.function : "";
    },
    get Grade() {
      return (self.grade) ? self.grade : "";
    },
    get Movement() {
      return (self.movement) ? self.movement : "";
    },
    get PerformanceRating() {
      return (self.performance) ? parseInt(self.performance) : 2;
    },
    get PotentialRating() {
      return (self.potential) ? parseInt(self.potential) : 50;
    },
    get BusinessRisk() {
      return (self.businessRisk) ? self.businessRisk : "";
    },
    get FlightRisk() {
      return (self.flightRisk) ? self.flightRisk : "";
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
