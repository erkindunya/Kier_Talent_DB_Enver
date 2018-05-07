import {ILookupDataProvider} from "../Common/ILookupDataProvider";
import {Risks} from './mockData/Risks';

export class RisksService implements ILookupDataProvider {
  public async GetAll() {
    //Todo : Implement the real data provider
    return []
  }

}

export class MockRisksService implements ILookupDataProvider {
  public async GetAll() {
    return Risks;
  }
}
