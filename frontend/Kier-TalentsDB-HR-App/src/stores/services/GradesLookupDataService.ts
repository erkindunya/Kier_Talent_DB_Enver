import {ILookupDataProvider} from "../Common/ILookupDataProvider";
import {GradesLookup_API_URL} from "../Common/Constants";
import axios from "axios";


export class GradesLookupDataService implements ILookupDataProvider {
  public async GetAll() {
    const result = await axios.get(GradesLookup_API_URL);
    return result.data;
  }

}

export class MockGradesLookupDataService implements ILookupDataProvider {
  public async GetAll() {
    return [];
  }
}
