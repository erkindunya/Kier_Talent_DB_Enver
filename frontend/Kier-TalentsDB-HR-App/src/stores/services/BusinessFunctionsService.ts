import functions from './mockData/Functions';
import {ILookupDataProvider} from "../Common/ILookupDataProvider";
import axios from 'axios';
import {BusinessUnitsLookup_API_URL} from '../Common/Constants';

export class BusinessFunctionsService implements ILookupDataProvider {
  public async GetAll() {
    const result = await axios.get(BusinessUnitsLookup_API_URL);

    return result;
  }

}

export class MockBusinessFunctionsService implements ILookupDataProvider {
  public async GetAll() {
    return functions;
  }
}
