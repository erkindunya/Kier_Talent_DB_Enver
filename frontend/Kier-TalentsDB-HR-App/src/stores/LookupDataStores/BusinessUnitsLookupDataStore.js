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
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var LookupDataModel_1 = require("../Common/LookupDataModel");
var DataProviderFactory_1 = require("../Common/DataProviderFactory");
exports.BusinessUnitsLookupDataStore = mobx_state_tree_1.types.model({
    //Todo : Fix the following error. We need to find a way to convert ObservableArray to normal Array "react.js:3528
    // Warning: Failed prop
    // type: Invalid prop `options` of type `object` supplied to `Cascader`, expected `array`."
    items: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(LookupDataModel_1.NestedLookupDataModel), []),
    isLoading: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false)
})
    .actions(function (self) {
    var _dataProvider = DataProviderFactory_1.DataProviderFactory.GetBusinessUnitsLookupDataProvider();
    //loading all business items
    var loadBusinessUnits = mobx_state_tree_1.flow(function loadBusinessUnits() {
        var resposne, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    self.isLoading = true;
                    return [4 /*yield*/, _dataProvider.GetAll()];
                case 1:
                    resposne = _a.sent();
                    console.log(JSON.stringify(resposne, null, 4));
                    if (resposne)
                        mobx_state_tree_1.applySnapshot(self.items, resposne);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.log("Error retrieving Business Units" + error_1);
                    throw new Error(error_1.message);
                case 3:
                    self.isLoading = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
    return {
        loadBusinessUnits: loadBusinessUnits
    };
});
//# sourceMappingURL=BusinessUnitsLookupDataStore.js.map