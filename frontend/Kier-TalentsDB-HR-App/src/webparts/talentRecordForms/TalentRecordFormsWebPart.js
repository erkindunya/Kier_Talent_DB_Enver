"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_pnp_js_1 = require("sp-pnp-js");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var strings = require("TalentRecordFormsWebPartStrings");
var TalentRecordEditor_1 = require("./components/TalentRecordEditor/TalentRecordEditor");
require("antd/dist/antd.less");
var mobx_react_1 = require("mobx-react");
var AppStore_1 = require("../../stores/AppStore");
var mobx_state_tree_1 = require("mobx-state-tree");
var TalentRecordFormsWebPart = /** @class */ (function (_super) {
    __extends(TalentRecordFormsWebPart, _super);
    function TalentRecordFormsWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TalentRecordFormsWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    TalentRecordFormsWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            sp_pnp_js_1.default.setup({
                spfxContext: _this.context
            });
        });
    };
    TalentRecordFormsWebPart.prototype.render = function () {
        var appStore = AppStore_1.AppStore.create({});
        mobx_state_tree_1.onPatch(appStore.Talent, function (patch) {
            console.log(patch);
        });
        mobx_state_tree_1.onAction(appStore, function (call) {
        });
        //Todo : refactor the code that calculates the web part mode
        ReactDom.render(React.createElement(mobx_react_1.Provider, { store: appStore, context: this.context },
            React.createElement(TalentRecordEditor_1.default, null)), this.domElement);
    };
    TalentRecordFormsWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return TalentRecordFormsWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = TalentRecordFormsWebPart;
//# sourceMappingURL=TalentRecordFormsWebPart.js.map