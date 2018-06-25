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
var Constants_1 = require("./Common/Constants");
exports.PreviousYearRating = mobx_state_tree_1.types.model({
    Performance: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Potential: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Year: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.number, 0),
    By: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    At: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, "")
});
exports.User = mobx_state_tree_1.types.model({
    value: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    text: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Surname: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    ForeName: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, "")
});
//Todo : need to add extra couple of fields CreatedBy and ModifiedBy
exports.Talent = mobx_state_tree_1.types.model({
    Id: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number),
    EmployeeId: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Name: mobx_state_tree_1.types.optional(exports.User, {}),
    Manager: mobx_state_tree_1.types.optional(exports.User, {}),
    AreaHead: mobx_state_tree_1.types.optional(exports.User, {}),
    Division: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Unit: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Stream: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    ReportingUnit: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Function: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Location: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Grade: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    BusinessRisk: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    FlightRisk: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Gender: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Performance: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Potential: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Movement: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_01_category: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_01_subcategory: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_01_title: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_02_category: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_02_subcategory: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Requirements_02_title: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    Notes: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    IsCurrentSubmission: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false),
    IsLeaver: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false),
    Position: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, ""),
    SubmissionYear: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.number, 0),
    PreviousYear: mobx_state_tree_1.types.maybe(exports.PreviousYearRating)
})
    .named("TalentRecord")
    .actions(function (self) {
    var SetValueIfDifferent = function (oldValue, newValue) {
        if (oldValue != newValue)
            oldValue = newValue;
    };
    //Todo : think about the Person data . Do we need to include userId, Email and displayName
    var changeBusinessUnit = function (businessUnit) {
        var _a = __read(businessUnit, 5), division = _a[0], stream = _a[1], unit = _a[2], reportingUnit = _a[3], location = _a[4];
        self.Division = division;
        self.Stream = stream;
        self.Unit = unit;
        self.ReportingUnit = reportingUnit;
        self.Location = location;
    };
    var changeDevelopmentRequirement01 = function (requirements) {
        var _a = __read(requirements, 3), category = _a[0], subcategory = _a[1], title = _a[2];
        self.Requirements_01_category = category;
        self.Requirements_01_subcategory = subcategory;
        self.Requirements_02_title = title;
    };
    var changeDevelopmentRequirement02 = function (requirements) {
        var _a = __read(requirements, 3), category = _a[0], subcategory = _a[1], title = _a[2];
        self.Requirements_02_category = category;
        self.Requirements_02_subcategory = subcategory;
        self.Requirements_02_title = title;
    };
    var changeFunction = function (newFunction) {
        self.Function = newFunction;
        //SetValueIfDifferent(self.BusinessFunction, newFunction)
    };
    var changeEmployeeName = function (newEmployeeKey) {
        self.Name.value = newEmployeeKey.key;
        self.Name.text = newEmployeeKey.label;
    };
    var changeGrade = function (newGrade) {
        self.Grade = newGrade;
    };
    var changeBusinessRisk = function (newBusinessRisk) {
        self.BusinessRisk = newBusinessRisk;
    };
    var changeFlightRisk = function (newFlightRisk) {
        self.FlightRisk = newFlightRisk;
    };
    var changeEmployeeId = function (newEmployeeId) {
        self.EmployeeId = newEmployeeId;
    };
    var changePosition = function (newPosition) {
        self.Position = newPosition;
    };
    var changeMovement = function (newMovement) {
        self.Movement = newMovement;
    };
    var changePotentialRating = function (newRating) {
        self.Potential = newRating;
    };
    var changePerformanceRating = function (newRating) {
        self.Performance = newRating;
    };
    var changeIsLeaverFlag = function (isLeaver) {
        self.IsLeaver = isLeaver;
    };
    var changeAreaHead = function (newHead) {
        self.AreaHead.value = newHead.key;
        self.AreaHead.text = newHead.label;
    };
    var changeManager = function (newManager) {
        self.Manager.value = newManager.key;
        self.Manager.text = newManager.label;
    };
    var changeNotes = function (notes) {
        self.Notes = notes;
    };
    var changeGender = function (gender) {
        self.Gender = gender;
    };
    return {
        changeBusinessUnit: changeBusinessUnit,
        changeFunction: changeFunction,
        changeGrade: changeGrade,
        changeBusinessRisk: changeBusinessRisk,
        changeFlightRisk: changeFlightRisk,
        changeEmployeeId: changeEmployeeId,
        changePosition: changePosition,
        changeMovement: changeMovement,
        changePotentialRating: changePotentialRating,
        changePerformanceRating: changePerformanceRating,
        changeDevelopmentRequirement01: changeDevelopmentRequirement01,
        changeDevelopmentRequirement02: changeDevelopmentRequirement02,
        changeEmployeeName: changeEmployeeName,
        changeAreaHead: changeAreaHead,
        changeManager: changeManager,
        changeNotes: changeNotes,
        changeIsLeaverFlag: changeIsLeaverFlag,
        changeGender: changeGender
    };
})
    .views(function (self) { return ({
    get BusinessUnits() {
        console.log("BusinessUnits: called");
        var Division = self.Division, Unit = self.Unit, Stream = self.Stream, ReportingUnit = self.ReportingUnit, Location = self.Location;
        if (!Division)
            return undefined;
        var result = [Division, Stream, Unit, ReportingUnit, Location];
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
    },
    get HasPreviousYearRating() {
        return (self.PreviousYear) ? true : false;
    },
    get FullName() {
        return self.Name.Surname + ", " + self.Name.ForeName;
    }
}); });
var TalentsStore = mobx_state_tree_1.types.model({
    items: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(exports.Talent), []),
    isLoading: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false)
})
    .views(function (self) {
    return {
        get app() {
            var app = mobx_state_tree_1.getParent(self, 1);
            return app;
        }
    };
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
        mobx_state_tree_1.getParent(self).SetIsSubmittingData(true);
        axios_1.default.post(Constants_1.REST_API_URL, JSON.stringify(mobx_state_tree_1.getParent(self, 1).Talent), { headers: { 'content-type': 'application/json' } }).then(function (_) {
            console.log("New Record Operation is done");
            mobx_state_tree_1.getParent(self).SetIsSubmittingData(false);
            window.location.href = Constants_1.Talent_List_Url;
        })
            .catch(function (error) { return console.log(JSON.stringify(error, null, 4)); });
    };
    var UpdateTalentRecord = function () {
        mobx_state_tree_1.getParent(self).SetIsSubmittingData(true);
        axios_1.default.put(Constants_1.REST_API_URL, JSON.stringify(mobx_state_tree_1.getParent(self, 1).Talent), { headers: { 'content-type': 'application/json' } }).then(function (_) {
            console.log("Update Record Operation is done");
            mobx_state_tree_1.getParent(self).SetIsSubmittingData(false);
            window.location.href = Constants_1.Talent_List_Url;
        })
            .catch(function (error) { return console.log(JSON.stringify(error, null, 4)); });
    };
    var GetTalentById = mobx_state_tree_1.flow(function GetTalentById(id, employeeId) {
        var talent, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    self.isLoading = true;
                    return [4 /*yield*/, _dataProvider.GetTalentById(id, employeeId)];
                case 1:
                    response = _a.sent();
                    //getParent(self, 1).SetIsLoadingTalentData(true);
                    if (response) {
                        //Todo : ugly piece of code that needs to be refactored.
                        console.log("Talents : " + JSON.stringify(response, null, 4));
                        talent = exports.Talent.create(response.data);
                        mobx_state_tree_1.getParent(self, 1).SetTalent(talent);
                        //applySnapshot(getParent(self, 1).Talent, talent);
                        //Todo: move this code for the AppStore\ViewStore
                        /* if (getParent(self, 1).Talent)
                          applySnapshot(getParent(self, 1).Talent, talent);
                        else
                          getParent(self, 1).SetTalent(talent);*/
                        console.log("previous year " + talent.PreviousYear);
                        console.log("Talent Record : " + JSON.stringify(talent, null, 4));
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_2 = _a.sent();
                    console.log("Error retrieving Talents" + error_2);
                    throw new Error(error_2.message);
                case 3:
                    self.isLoading = false;
                    //getParent(self, 1).SetIsLoadingTalentData(false);
                    return [2 /*return*/, talent];
                case 4: return [2 /*return*/];
            }
        });
    });
    return { LoadAllTalents: LoadAllTalents, GetTalentById: GetTalentById, SaveTalentRecord: SaveTalentRecord, UpdateTalentRecord: UpdateTalentRecord };
}).actions(function (self) {
    var afterCreate = function () {
        console.log("Loading relevant Talent Records");
        //self.LoadAllTalents().then(_ => console.log("Number of Loaded Talent Records :" + self.items.length));
    };
    return {
        afterCreate: afterCreate
    };
});
exports.default = TalentsStore;
//# sourceMappingURL=TalentsStore.js.map