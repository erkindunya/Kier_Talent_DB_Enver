//Todo : find a way to externalize the configuration and make it varies with the Environment
import {ILookupDataProvider} from "./ILookupDataProvider";
import {Environment, EnvironmentType} from "@microsoft/sp-core-library";
import {BusinessFunctionsService, MockBusinessFunctionsService} from "./BusinessFunctionsService";
import {MockRisksService} from "./RisksService";

export class DataProviderFactory {
  public static GetBusinessFunctionsDataProvider(): ILookupDataProvider {
    //if ( Environment.type ==EnvironmentType.Local)
    return new MockBusinessFunctionsService();
    //return new BusinessFunctionsService();
  }

  public static GetRisksDataProvider(): ILookupDataProvider {
    if (Environment.type == EnvironmentType.Local)
      return new MockRisksService();
    //return new BusinessFunctionsService();
  }
}
