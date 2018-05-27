//Todo : find a way to externalize the configuration and make it varies with the Environment
import {ILookupDataProvider} from "./ILookupDataProvider";
import {Environment, EnvironmentType} from "@microsoft/sp-core-library";
import {BusinessFunctionsService, MockBusinessFunctionsService} from "../services/BusinessFunctionsService";
import {MockRisksService} from "../services/RisksService";
import {
  BusinessUnitsLookupDataService,
  MockBusinessUnitsLookupDataService
} from "../services/BusinessUnitsLookupDataService";
import {
  DevelopmentRequirementsLookupDataService,
  MockDevelopmentRequirementsLookupDataService
} from "../services/DevelopmentRequirementsLookupDataService";
import {MockTalentService, TalentService} from "../services/TalentRecordsService";
import {GradesLookupDataService} from "../services/GradesLookupDataService";


//Todo : make the dataProviderFactory smart enough to test environment before providing the dataProvider
export class DataProviderFactory {
  public static GetBusinessFunctionsDataProvider(): ILookupDataProvider {
    //if ( Environment.type ==EnvironmentType.Local)
    return new BusinessFunctionsService();
    //return new BusinessFunctionsService();
  }

  public static GetRisksDataProvider(): ILookupDataProvider {
    //if (Environment.type == EnvironmentType.Local)
    return new MockRisksService();
    //return new BusinessFunctionsService();
  }

  public static GetBusinessUnitsLookupDataProvider(): ILookupDataProvider {
    //if (Environment.type == EnvironmentType.Local)
    return new BusinessUnitsLookupDataService();
    // return new BusinessUnitsLookupDataService();
  }


  public static GetDevelopmentRequirementsLookupDataProvider(): ILookupDataProvider {
    //if (Environment.type == EnvironmentType.Local)
    return new MockDevelopmentRequirementsLookupDataService();
    // return new DevelopmentRequirementsLookupDataService();
  }

  public static GetGradesLookupDataProvider(): ILookupDataProvider {
    return new GradesLookupDataService();
  }

  public static GetTalentsDataProvider() {
    return new TalentService();
  }
}
