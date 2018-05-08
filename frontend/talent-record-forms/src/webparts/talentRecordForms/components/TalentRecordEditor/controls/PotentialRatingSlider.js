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
var PotentialRatingSlider = /** @class */ (function (_super) {
    __extends(PotentialRatingSlider, _super);
    function PotentialRatingSlider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formatTip = function (value) {
            //Todo : refactor to make it more intelligent
            if (value == 0)
                return "A";
            if (value == 50)
                return "B";
            if (value == 100)
                return "C";
            return value;
        };
        return _this;
    }
    PotentialRatingSlider.prototype.render = function () {
        return (React.createElement(antd_1.Slider, { marks: { 0: 'A', 50: 'B', 100: 'C' }, tipFormatter: this.formatTip, defaultValue: 0, step: null }));
    };
    return PotentialRatingSlider;
}(React.Component));
exports.default = PotentialRatingSlider;
//# sourceMappingURL=PotentialRatingSlider.js.map