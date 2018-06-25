"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var LoadingSpinner = function (props) {
    var style = {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        vAlign: 'middle',
        height: '900'
    };
    return React.createElement("div", { style: style },
        React.createElement(antd_1.Spin, { size: "large", tip: "Loading Talent Form..." }));
};
exports.default = LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map