import {ILookupDataProvider} from "../Common/ILookupDataProvider";
import BusinessUnits from './mockData/BusinessUnits';
import axios from "axios";
import {BusinessUnitsLookup_API_URL} from "../Common/Constants";

export class BusinessUnitsLookupDataService implements ILookupDataProvider {
  public async GetAll() {
    const result = await axios.get(BusinessUnitsLookup_API_URL);
    return result.data;
  }

}

export class MockBusinessUnitsLookupDataService implements ILookupDataProvider {
  public async GetAll() {
    return BusinessUnits;
  }
}
