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


//Todo : make the dataProviderFactory smart enough to test environment before providing the dataProvider
export class DataProviderFactory {
  public static GetBusinessFunctionsDataProvider(): ILookupDataProvider {
    //if ( Environment.type ==EnvironmentType.Local)
    return new MockBusinessFunctionsService();
    //return new BusinessFunctionsService();
  }

  public static GetRisksDataProvider(): ILookupDataProvider {
    //if (Environment.type == EnvironmentType.Local)
    return new MockRisksService();
    //return new BusinessFunctionsService();
  }

  public static GetBusinessUnitsLookupDataProvider(): ILookupDataProvider {
    //if (Environment.type == EnvironmentType.Local)
    return new MockBusinessUnitsLookupDataService();
    // return new BusinessUnitsLookupDataService();
  }


  public static GetDevelopmentRequirementsLookupDataProvider(): ILookupDataProvider {
    //if (Environment.type == EnvironmentType.Local)
    return new MockDevelopmentRequirementsLookupDataService();
    // return new DevelopmentRequirementsLookupDataService();
  }

  public static GetTalentsDataProvider() {
    return new TalentService();
  }
}
