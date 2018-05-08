import {ILookupDataProvider} from "../Common/ILookupDataProvider";
import BusinessUnits from './mockData/BusinessUnits';

export class BusinessUnitsLookupDataService implements ILookupDataProvider {
  public async GetAll() {
    //Todo : Implement the real data provider
    return []
  }

}

export class MockBusinessUnitsLookupDataService implements ILookupDataProvider {
  public async GetAll() {
    return BusinessUnits;
  }
}
