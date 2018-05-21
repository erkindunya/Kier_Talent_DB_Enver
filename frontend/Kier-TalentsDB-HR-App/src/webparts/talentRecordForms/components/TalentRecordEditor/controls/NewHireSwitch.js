"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = Object.setPrototypeOf ||
    ({__proto__: []} instanceof Array && function (d, b) {
      d.__proto__ = b;
    }) ||
    function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(exports, "__esModule", {value: true});
var React = require("react");
var antd_1 = require("antd");
var NewHireSwitch = /** @class */ (function (_super) {
  __extends(NewHireSwitch, _super);

  function NewHireSwitch() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.handleChange = function () {
      console.log("Changed");
    };
    return _this;
  }

  NewHireSwitch.prototype.render = function () {
    return (React.createElement(antd_1.Switch, {size: "small", defaultChecked: false, onChange: this.handleChange}));
  };
  return NewHireSwitch;
}(React.Component));
exports.default = NewHireSwitch;
//# sourceMappingURL=NewHireSwitch.js.map
