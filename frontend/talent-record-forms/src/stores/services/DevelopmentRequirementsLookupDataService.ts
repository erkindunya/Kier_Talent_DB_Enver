import {ILookupDataProvider} from "../Common/ILookupDataProvider";
import Requirements from './mockData/DevelopmentRequirements';

export class DevelopmentRequirementsLookupDataService implements ILookupDataProvider {
  public async GetAll() {
    //Todo : Implement the real data provider
    return []
  }

}

export class MockDevelopmentRequirementsLookupDataService implements ILookupDataProvider {
  public async GetAll() {
    return Requirements;
  }
}
