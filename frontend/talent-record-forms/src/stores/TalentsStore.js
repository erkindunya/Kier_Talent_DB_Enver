"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var DataProviderFactory_1 = require("./Common/DataProviderFactory");
var axios_1 = require("axios");
exports.Talent = mobx_state_tree_1.types.model({
    Id: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number),
    EmployeeId: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Name: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Manager: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    AreaHead: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Division: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Unit: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Stream: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Function: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Location: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Grade: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    BusinessRisk: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    FlightRisk: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Performance: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Potential: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Movement: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_01_category: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_01_subcategory: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_02_category: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_02_subcategory: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Notes: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    IsCurrentSubmission: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false)
})
    .named("TalentRecord")
    .actions(function (self) {
    var changeEmployeeId = function (id) {
        self.EmployeeId = id;
    };
    var SetValueIfDifferent = function (oldValue, newValue) {
        if (oldValue != newValue)
            oldValue = newValue;
    };
    //Todo : think about the Person data . Do we need to include userId, Email and displayName
    var changeBusinessUnit = function (businessUnit) {
        var _a = __read(businessUnit, 4), division = _a[0], stream = _a[1], unit = _a[2], location = _a[3];
        self.Division = division;
        self.Stream = stream;
        self.Unit = unit;
        self.Location = location;
    };
    var changeFunction = function (newFunction) {
        self.Function = newFunction;
        //SetValueIfDifferent(self.BusinessFunction, newFunction)
    };
    var changeGrade = function (newGrade) {
        SetValueIfDifferent(self.Grade, newGrade);
    };
    var changeBusinessRisk = function (newBusinessRisk) {
        SetValueIfDifferent(self.BusinessRisk, newBusinessRisk);
    };
    var changeFlightRisk = function (newFlightRisk) {
        SetValueIfDifferent(self.FlightRisk, newFlightRisk);
    };
    return {
        changeBusinessUnit: changeBusinessUnit,
        changeFunction: changeFunction,
        changeGrade: changeGrade,
        changeBusinessRisk: changeBusinessRisk,
        changeFlightRisk: changeFlightRisk
    };
})
    .views(function (self) { return ({
    get BusinessUnits() {
        console.log("BusinessUnits: called");
        var Division = self.Division, Unit = self.Unit, Stream = self.Stream, Location = self.Location;
        var result = [Division, Unit, Stream, Location];
        console.log(result);
        return result;
    },
    get DevelopmentRequirement01() {
        var Requirements_01_category = self.Requirements_01_category, Requirements_01_subcategory = self.Requirements_01_subcategory;
        return [Requirements_01_category, Requirements_01_subcategory];
    },
    get DevelopmentRequirement02() {
        var Requirements_02_category = self.Requirements_02_category, Requirements_02_subcategory = self.Requirements_02_subcategory;
        return [Requirements_02_category, Requirements_02_subcategory];
    }
}); });
var TalentsStore = mobx_state_tree_1.types.model({
    items: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(exports.Talent), []),
    isLoading: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false)
}).actions(function (self) {
    var _dataProvider = DataProviderFactory_1.DataProviderFactory.GetTalentsDataProvider();
    var LoadAllTalents = mobx_state_tree_1.flow(function LoadAllTalents() {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, _dataProvider.GetAll()];
                case 1:
                    response = _a.sent();
                    if (response) {
                        console.log("Talents : " + JSON.stringify(response, null, 4));
                        mobx_state_tree_1.applySnapshot(self.items, response);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.log("Error retrieving Talents" + error_1);
                    throw new Error(error_1.message);
                case 3:
                    self.isLoading = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
    var SaveTalentRecord = function () {
        axios_1.default.post('https://kiertalentportalwebapi20180516031250.azurewebsites.net/api/talents', {
            Id: 1,
            EmployeeId: 'MK0000000',
            Name: 'khalil, Abdalla',
            Manager: 'Jones,Brian',
            Function: 'Finance',
            AreaHead: 'Ahmed, Mohamed',
            Division: 'DP&BS',
            //Division: undefined,
            Unit: 'Enviromental',
            Stream: 'Environmental Central',
            Location: 'Environmental Central - Corby Borough Council',
            BusinessRisk: 'High',
            FlightRisk: 'Low',
            Performance: '2',
            Potential: 'B',
            Grade: 'L2',
            Movement: 'Soon',
            Requirements_01_category: 'Technical Training',
            Requirements_01_subcategory: 'Option 2',
            Requirements_02_category: 'Technical Training',
            Requirements_02_subcategory: 'Option 3',
            Notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed fermentum ex, sit amet congue eros. Ut cursus mattis feugiat. Aenean tristique ante in urna lobortis, sit amet luctus nulla dapibus. Etiam sodales, odio et faucibus placerat, libero ligula lobortis augue, quis malesuada sem enim in erat. Donec eu lorem sit amet nulla congue porta ut vitae dui. Fusce dignissim ullamcorper lorem eu sagittis. Ut mollis purus vel nibh mollis dignissim.'
        }).then(function (_) { return console.log("New Record Operation is done"); })
            .catch(function (error) { return console.log(JSON.stringify(error, null, 4)); });
    };
    var GetTalentById = mobx_state_tree_1.flow(function GetTalentById(id) {
        var talent, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, _dataProvider.GetTalentById(id)];
                case 1:
                    response = _a.sent();
                    if (response) {
                        //Todo : ugly piece of code that needs to be refactored.
                        console.log("Talents : " + JSON.stringify(response, null, 4));
                        talent = exports.Talent.create(response.data);
                        mobx_state_tree_1.applySnapshot(mobx_state_tree_1.getParent(self, 1).Talent, talent);
                        //Todo: move this code for the AppStore\ViewStore
                        /* if (getParent(self, 1).Talent)
                          applySnapshot(getParent(self, 1).Talent, talent);
                        else
                          getParent(self, 1).SetTalent(talent);*/
                        console.log("Talent Record : " + JSON.stringify(talent, null, 4));
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_2 = _a.sent();
                    console.log("Error retrieving Talents" + error_2);
                    throw new Error(error_2.message);
                case 3:
                    self.isLoading = false;
                    return [2 /*return*/, talent];
                case 4: return [2 /*return*/];
            }
        });
    });
    return { LoadAllTalents: LoadAllTalents, GetTalentById: GetTalentById, SaveTalentRecord: SaveTalentRecord };
}).actions(function (self) {
    var afterCreate = function () {
        console.log("Loading relevant Talent Records");
        self.LoadAllTalents().then(function (_) { return console.log("Number of Loaded Talent Records :" + self.items.length); });
    };
    return {
        afterCreate: afterCreate
    };
});
exports.default = TalentsStore;
//# sourceMappingURL=TalentsStore.js.map