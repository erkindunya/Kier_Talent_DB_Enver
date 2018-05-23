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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var lodash_1 = require("lodash");
var Option = antd_1.Select.Option;
var React = require("react");
var mobx_react_1 = require("mobx-react");
var sp_pnp_js_1 = require("sp-pnp-js");
var UserRemoteSelect = (function (_super) {
    __extends(UserRemoteSelect, _super);
    function UserRemoteSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: [],
            value: [],
            fetching: false,
        };
        _this.fetchUser = function (value) {
            var opt = {
                AllowEmailAddresses: true,
                MaximumEntitySuggestions: 10,
                PrincipalSource: 15,
                PrincipalType: 15,
                QueryString: value
            };
            console.log('fetching user', value);
            _this.lastFetchId += 1;
            var fetchId = _this.lastFetchId;
            _this.setState({ data: [], fetching: true });
            sp_pnp_js_1.default.sp.profiles.clientPeoplePickerSearchUser(opt).then(function (response) {
                if (fetchId !== _this.lastFetchId) {
                    return;
                }
                var data = response.map(function (user) { return ({
                    text: user.DisplayText,
                    value: user.Key
                }); });
                _this.setState({ data: data, fetching: false });
            });
        };
        _this.handleChange = function (value) {
            _this.setState({
                value: value,
                data: [],
                fetching: false,
            });
            (value.length >= 1) ? _this.props.changed(value[0].key) : "";
        };
        _this.lastFetchId = 0;
        _this.fetchUser = lodash_1.debounce(_this.fetchUser, 800);
        return _this;
    }
    UserRemoteSelect.prototype.render = function () {
        var _a = this.state, fetching = _a.fetching, data = _a.data, value = _a.value;
        return (React.createElement(antd_1.Select, { size: "small", mode: "multiple", labelInValue: true, value: value, placeholder: "Select user", notFoundContent: fetching ? React.createElement(antd_1.Spin, { size: "small" }) : null, filterOption: false, onSearch: this.fetchUser, onChange: this.handleChange, style: { width: '100%' } }, data.map(function (d) { return React.createElement(Option, { key: d.value }, d.text); })));
    };
    UserRemoteSelect = __decorate([
        mobx_react_1.inject("store", "context"),
        mobx_react_1.observer
    ], UserRemoteSelect);
    return UserRemoteSelect;
}(React.Component));
exports.default = UserRemoteSelect;

//# sourceMappingURL=UserSelector.js.map
