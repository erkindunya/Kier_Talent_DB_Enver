import Talents from "./mockData/Talents";

interface ITalentService {
  GetAll,

  GetTalentById(id: number),

}

export class MockTalentService implements ITalentService {

  public async GetTalentById(id: number) {

    var results = Talents.filter(i => i.Id === id);
    if (results)
      return results[0];
    return null;
  }

  public async GetAll() {
    return await Talents;
  }

}
