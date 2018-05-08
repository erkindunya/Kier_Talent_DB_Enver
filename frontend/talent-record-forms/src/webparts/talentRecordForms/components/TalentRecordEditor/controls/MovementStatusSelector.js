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
var antd_1 = require("antd");
var MovementStatusSelector = /** @class */ (function (_super) {
    __extends(MovementStatusSelector, _super);
    function MovementStatusSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (e) {
            console.log(e.target.value);
        };
        _this.buildSelector = function () {
            var RadioButton = antd_1.Radio.Button;
            var RadioGroup = antd_1.Radio.Group;
            return (React.createElement(RadioGroup, { onChange: _this.handleChange },
                React.createElement(RadioButton, { value: "Now" }, "Now"),
                React.createElement(RadioButton, { value: "Soon" }, "Soon"),
                React.createElement(RadioButton, { value: "Future" }, "Future"),
                React.createElement(RadioButton, { value: "Lateral" }, "Lateral")));
        };
        return _this;
    }
    MovementStatusSelector.prototype.render = function () {
        return this.buildSelector();
    };
    return MovementStatusSelector;
}(React.Component));
exports.default = MovementStatusSelector;
//# sourceMappingURL=MovementStatusSelector.js.map