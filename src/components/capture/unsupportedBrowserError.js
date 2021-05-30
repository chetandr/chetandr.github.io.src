"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UnsupportedBrowserError = void 0;
var customError_1 = require("./customError");
/**
 * @hidden
 */
var UnsupportedBrowserError = /** @class */ (function (_super) {
    __extends(UnsupportedBrowserError, _super);
    // istanbul ignore next
    function UnsupportedBrowserError(browserCompatibility) {
        var _this = _super.call(this, {
            name: "UnsupportedBrowserError",
            message: "This OS / Browser has one or more missing features preventing it from working correctly"
        }) || this;
        _this.data = browserCompatibility;
        return _this;
    }
    return UnsupportedBrowserError;
}(customError_1.CustomError));
exports.UnsupportedBrowserError = UnsupportedBrowserError;
