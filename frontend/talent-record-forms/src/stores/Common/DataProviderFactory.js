"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sp_core_library_1 = require("@microsoft/sp-core-library");
var BusinessFunctionsService_1 = require("../services/BusinessFunctionsService");
var RisksService_1 = require("../services/RisksService");
var BusinessUnitsLookupDataService_1 = require("../services/BusinessUnitsLookupDataService");
var DevelopmentRequirementsLookupDataService_1 = require("../services/DevelopmentRequirementsLookupDataService");
var DataProviderFactory = /** @class */ (function () {
    function DataProviderFactory() {
    }
    DataProviderFactory.GetBusinessFunctionsDataProvider = function () {
        //if ( Environment.type ==EnvironmentType.Local)
        return new BusinessFunctionsService_1.MockBusinessFunctionsService();
        //return new BusinessFunctionsService();
    };
    DataProviderFactory.GetRisksDataProvider = function () {
        if (sp_core_library_1.Environment.type == sp_core_library_1.EnvironmentType.Local)
            return new RisksService_1.MockRisksService();
        //return new BusinessFunctionsService();
    };
    DataProviderFactory.GetBusinessUnitsLookupDataProvider = function () {
        if (sp_core_library_1.Environment.type == sp_core_library_1.EnvironmentType.Local)
            return new BusinessUnitsLookupDataService_1.MockBusinessUnitsLookupDataService();
        return new BusinessUnitsLookupDataService_1.BusinessUnitsLookupDataService();
    };
    DataProviderFactory.GetDevelopmentRequirementsLookupDataProvider = function () {
        if (sp_core_library_1.Environment.type == sp_core_library_1.EnvironmentType.Local)
            return new DevelopmentRequirementsLookupDataService_1.MockDevelopmentRequirementsLookupDataService();
        return new DevelopmentRequirementsLookupDataService_1.DevelopmentRequirementsLookupDataService();
    };
    return DataProviderFactory;
}());
exports.DataProviderFactory = DataProviderFactory;
//# sourceMappingURL=DataProviderFactory.js.map