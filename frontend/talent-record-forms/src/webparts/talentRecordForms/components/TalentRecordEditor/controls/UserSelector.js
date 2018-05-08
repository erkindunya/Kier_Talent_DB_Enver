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
var antd_1 = require("antd");
var lodash_1 = require("lodash");
var Option = antd_1.Select.Option;
var React = require("react");
var UserRemoteSelect = /** @class */ (function (_super) {
    __extends(UserRemoteSelect, _super);
    function UserRemoteSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: [],
            value: [],
            fetching: false,
        };
        _this.fetchUser = function (value) {
            console.log('fetching user', value);
            _this.lastFetchId += 1;
            var fetchId = _this.lastFetchId;
            _this.setState({ data: [], fetching: true });
            fetch('https://randomuser.me/api/?results=10')
                .then(function (response) { return response.json(); })
                .then(function (body) {
                if (fetchId !== _this.lastFetchId) {
                    return;
                }
                var data = body.results.map(function (user) { return ({
                    text: user.name.last + ", " + user.name.first + " ",
                    value: user.login.username,
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
        };
        _this.lastFetchId = 0;
        _this.fetchUser = lodash_1.debounce(_this.fetchUser, 800);
        return _this;
    }
    UserRemoteSelect.prototype.render = function () {
        var _a = this.state, fetching = _a.fetching, data = _a.data, value = _a.value;
        return (React.createElement(antd_1.Select, { mode: "combobox", labelInValue: true, value: value, placeholder: "Select users", notFoundContent: fetching ? React.createElement(antd_1.Spin, { size: "small" }) : null, filterOption: false, onSearch: this.fetchUser, onChange: this.handleChange, style: { width: '100%' } }, data.map(function (d) { return React.createElement(Option, { key: d.value }, d.text); })));
    };
    return UserRemoteSelect;
}(React.Component));
exports.default = UserRemoteSelect;
//# sourceMappingURL=UserSelector.js.map