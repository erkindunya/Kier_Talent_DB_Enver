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
var PerformanceRatingSlider = /** @class */ (function (_super) {
    __extends(PerformanceRatingSlider, _super);
    function PerformanceRatingSlider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formatTip = function (value) {
            //Todo : refactor to make it more intelligent
            if (value == 0)
                return 1;
            if (value == 25)
                return 2;
            if (value == 50)
                return 3;
            if (value == 75)
                return 4;
            if (value == 100)
                return 5;
            return value;
        };
        return _this;
    }
    PerformanceRatingSlider.prototype.render = function () {
        return (React.createElement(antd_1.Slider, { marks: { 0: '1', 25: '2', 50: '3', 75: '4', 100: '5' }, tipFormatter: this.formatTip, defaultValue: 0, step: null }));
    };
    return PerformanceRatingSlider;
}(React.Component));
exports.default = PerformanceRatingSlider;
//# sourceMappingURL=PerformanceRatingSlider.js.map