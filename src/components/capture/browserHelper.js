"use strict";
exports.__esModule = true;
exports.BrowserHelper = exports.UAParser = void 0;
var js_cookie_1 = require("js-cookie");
var ua_parser_js_1 = require("ua-parser-js");
exports.UAParser = ua_parser_js_1.UAParser;
var browserCompatibility_1 = require("./browserCompatibility");
var BrowserHelper;
(function (BrowserHelper) {
    /**
     * @hidden
     */
    BrowserHelper.userAgentInfo = new ua_parser_js_1.UAParser(navigator.userAgent);
    /**
     * @hidden
     */
    BrowserHelper.canvas = document.createElement("canvas");
    /**
     * @returns The built [[BrowserCompatibility]] object representing the current OS/Browser's support for features.
     */
    function checkBrowserCompatibility() {
        function objectHasPropertyWithType(object, propertyNames, propertyType) {
            // tslint:disable-next-line:no-any
            var objectProperty = object[propertyNames[0]];
            if (objectProperty == null) {
                return false;
            }
            if (propertyNames.length === 1) {
                return typeof objectProperty === propertyType;
            }
            else {
                return ((typeof objectProperty === "function" || typeof objectProperty === "object") &&
                    objectHasPropertyWithType(objectProperty, propertyNames.slice(1), propertyType));
            }
        }
        function isBrokenWebAssemblyOS(os) {
            return os.name === "iOS" && os.version != null && ["11.2.2", "11.2.5", "11.2.6"].includes(os.version);
        }
        var fullSupport = true;
        var scannerSupport = true;
        var missingFeatures = [];
        if (!objectHasPropertyWithType(navigator, ["mediaDevices", "getUserMedia"], "function") &&
            !objectHasPropertyWithType(navigator, ["enumerateDevices"], "function") &&
            !objectHasPropertyWithType(window, ["MediaStreamTrack", "getSources"], "function")) {
            missingFeatures.push(browserCompatibility_1.BrowserCompatibility.Feature.MEDIA_DEVICES);
            fullSupport = false;
        }
        if (!objectHasPropertyWithType(window, ["Worker"], "function")) {
            missingFeatures.push(browserCompatibility_1.BrowserCompatibility.Feature.WEB_WORKERS);
            fullSupport = scannerSupport = false;
        }
        if (!objectHasPropertyWithType(window, ["WebAssembly"], "object")) {
            missingFeatures.push(browserCompatibility_1.BrowserCompatibility.Feature.WEB_ASSEMBLY);
            fullSupport = scannerSupport = false;
        }
        if (!objectHasPropertyWithType(window, ["Blob"], "function")) {
            missingFeatures.push(browserCompatibility_1.BrowserCompatibility.Feature.BLOB);
            fullSupport = scannerSupport = false;
        }
        if (!objectHasPropertyWithType(window, ["URL", "createObjectURL"], "function")) {
            missingFeatures.push(browserCompatibility_1.BrowserCompatibility.Feature.URL_OBJECT);
            fullSupport = scannerSupport = false;
        }
        if (!objectHasPropertyWithType(window, ["OffscreenCanvas"], "function")) {
            missingFeatures.push(browserCompatibility_1.BrowserCompatibility.Feature.OFFSCREEN_CANVAS);
        }
        try {
            if (!objectHasPropertyWithType(window, ["WebGLRenderingContext"], "function") ||
                (BrowserHelper.canvas.getContext("webgl") == null && BrowserHelper.canvas.getContext("experimental-webgl") == null)) {
                throw new Error();
            }
        }
        catch (_a) {
            missingFeatures.push(browserCompatibility_1.BrowserCompatibility.Feature.WEBGL);
        }
        var userAgentOS = BrowserHelper.userAgentInfo.getOS();
        if (isBrokenWebAssemblyOS(userAgentOS)) {
            missingFeatures.push(browserCompatibility_1.BrowserCompatibility.Feature.WEB_ASSEMBLY_ERROR_FREE);
            fullSupport = scannerSupport = false;
        }
        return {
            fullSupport: fullSupport,
            scannerSupport: scannerSupport,
            missingFeatures: missingFeatures
        };
    }
    BrowserHelper.checkBrowserCompatibility = checkBrowserCompatibility;
    /**
     * @hidden
     *
     * Get a device id for the current browser, when available it's retrieved from a cookie,
     * when not it's randomly generated and stored in a cookie to be retrieved by later calls.
     *
     * @returns The device id for the current browser.
     */
    function getDeviceId() {
        var cookieKey = "scandit-device-id";
        var storedDeviceId = js_cookie_1["default"].get("scandit-device-id");
        if (storedDeviceId != null && storedDeviceId !== "") {
            return storedDeviceId;
        }
        var hexCharacters = "0123456789abcdef";
        var randomDeviceId = "";
        for (var i = 0; i < 40; ++i) {
            // tslint:disable-next-line:insecure-random
            randomDeviceId += hexCharacters.charAt(Math.floor(Math.random() * 16));
        }
        js_cookie_1["default"].set(cookieKey, randomDeviceId, { expires: 3650 });
        return randomDeviceId;
    }
    BrowserHelper.getDeviceId = getDeviceId;
    /**
     * @hidden
     *
     * Check if a given object is a valid HTMLElement
     *
     * @param object The object to check.
     * @returns Whether the given object is a valid HTMLElement.
     */
    // tslint:disable-next-line:no-any
    function isValidHTMLElement(object) {
        return (object instanceof HTMLElement ||
            (object != null && typeof object === "object" && typeof object.tagName === "string"));
    }
    BrowserHelper.isValidHTMLElement = isValidHTMLElement;
})(BrowserHelper = exports.BrowserHelper || (exports.BrowserHelper = {}));
