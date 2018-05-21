import functions from './mockData/Functions';
import {ILookupDataProvider} from "../Common/ILookupDataProvider";

export class BusinessFunctionsService implements ILookupDataProvider {
  public async GetAll() {
    //Todo : Implement the real data provider
    return []
  }

}

export class MockBusinessFunctionsService implements ILookupDataProvider {
  public async GetAll() {
    return functions;
  }
}
