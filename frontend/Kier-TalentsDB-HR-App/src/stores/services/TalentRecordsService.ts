import Talents from "./mockData/Talents";
import {REST_API_URL} from '../Common/Constants';

import axios from 'axios';

interface ITalentService {
  GetAll,

  GetTalentById(id: number, employeeId: string),

}

export class MockTalentService implements ITalentService {

  public async GetTalentById(id: number, employeeId: string) {

    var results = Talents.filter(i => i.Id === id);
    if (results)
      return results[0];
    return null;
  }

  public async GetAll() {
    return await Talents;
  }

}


export class TalentService implements ITalentService {

  public async GetAll() {
    return await Talents;
  }

  async GetTalentById(id: number, employeeId: string) {
    const api_url = REST_API_URL + '?id=' + id.toString() + '&employeeId=' + employeeId;
    const result = await axios.get(api_url);
    console.log("Talent Data From Server : " + result);
    return result;
  }

}
