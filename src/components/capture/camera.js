"use strict";
exports.__esModule = true;
exports.Camera = void 0;
var Camera;
(function (Camera) {
    /**
     * Camera type (not guaranteed to be correct, depending on the device).
     */
    var Type;
    (function (Type) {
        /**
         * Front facing camera.
         */
        Type["FRONT"] = "front";
        /**
         * Back facing camera.
         */
        Type["BACK"] = "back";
    })(Type = Camera.Type || (Camera.Type = {}));
})(Camera = exports.Camera || (exports.Camera = {}));
