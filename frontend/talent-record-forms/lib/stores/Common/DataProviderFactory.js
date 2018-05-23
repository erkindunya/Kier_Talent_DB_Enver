"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BusinessFunctionsService_1 = require("../services/BusinessFunctionsService");
var RisksService_1 = require("../services/RisksService");
var BusinessUnitsLookupDataService_1 = require("../services/BusinessUnitsLookupDataService");
var DevelopmentRequirementsLookupDataService_1 = require("../services/DevelopmentRequirementsLookupDataService");
var TalentRecordsService_1 = require("../services/TalentRecordsService");
//Todo : make the dataProviderFactory smart enough to test environment before providing the dataProvider
var DataProviderFactory = (function () {
    function DataProviderFactory() {
    }
    DataProviderFactory.GetBusinessFunctionsDataProvider = function () {
        //if ( Environment.type ==EnvironmentType.Local)
        return new BusinessFunctionsService_1.MockBusinessFunctionsService();
        //return new BusinessFunctionsService();
    };
    DataProviderFactory.GetRisksDataProvider = function () {
        //if (Environment.type == EnvironmentType.Local)
        return new RisksService_1.MockRisksService();
        //return new BusinessFunctionsService();
    };
    DataProviderFactory.GetBusinessUnitsLookupDataProvider = function () {
        //if (Environment.type == EnvironmentType.Local)
        return new BusinessUnitsLookupDataService_1.MockBusinessUnitsLookupDataService();
        // return new BusinessUnitsLookupDataService();
    };
    DataProviderFactory.GetDevelopmentRequirementsLookupDataProvider = function () {
        //if (Environment.type == EnvironmentType.Local)
        return new DevelopmentRequirementsLookupDataService_1.MockDevelopmentRequirementsLookupDataService();
        // return new DevelopmentRequirementsLookupDataService();
    };
    DataProviderFactory.GetTalentsDataProvider = function () {
        return new TalentRecordsService_1.TalentService();
    };
    return DataProviderFactory;
}());
exports.DataProviderFactory = DataProviderFactory;

//# sourceMappingURL=DataProviderFactory.js.map
