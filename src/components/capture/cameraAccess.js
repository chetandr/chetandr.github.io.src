"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CameraAccess = void 0;
var browserCompatibility_1 = require("./browserCompatibility");
var browserHelper_1 = require("./browserHelper");
var camera_1 = require("./camera");
var unsupportedBrowserError_1 = require("./unsupportedBrowserError");
/**
 * A helper object to interact with cameras.
 */
var CameraAccess;
(function (CameraAccess) {
    /**
     * @hidden
     *
     * Handle localized camera labels. Supported languages:
     * English, German, French, Spanish (spain), Portuguese (brasil), Portuguese (portugal), Italian,
     * Chinese (simplified), Chinese (traditional), Japanese, Russian, Turkish, Dutch, Arabic, Thai, Swedish,
     * Danish, Vietnamese, Norwegian, Polish, Finnish, Indonesian, Hebrew, Greek, Romanian, Hungarian, Czech,
     * Catalan, Slovak, Ukraininan, Croatian, Malay, Hindi.
     */
    var backCameraKeywords = [
        "rear",
        "back",
        "rück",
        "arrière",
        "trasera",
        "trás",
        "traseira",
        "posteriore",
        "后面",
        "後面",
        "背面",
        "后置",
        "後置",
        "背置",
        "задней",
        "الخلفية",
        "후",
        "arka",
        "achterzijde",
        "หลัง",
        "baksidan",
        "bagside",
        "sau",
        "bak",
        "tylny",
        "takakamera",
        "belakang",
        "אחורית",
        "πίσω",
        "spate",
        "hátsó",
        "zadní",
        "darrere",
        "zadná",
        "задня",
        "stražnja",
        "belakang",
        "बैक"
    ];
    /**
     * @hidden
     */
    var cameraObjects = new Map();
    /**
     * @hidden
     */
    var getCamerasPromise;
    /**
     * @hidden
     *
     * @param label The camera label.
     * @returns Whether the label mentions the camera being a back-facing one.
     */
    function isBackCameraLabel(label) {
        var lowercaseLabel = label.toLowerCase();
        return backCameraKeywords.some(function (keyword) {
            return lowercaseLabel.includes(keyword);
        });
    }
    /**
     * @hidden
     *
     * Adjusts the cameras' type classification based on the given currently active video stream:
     * If the stream comes from an environment-facing camera, the camera is marked to be a back-facing camera
     * and the other cameras to be of other types accordingly (if they are not correctly set already).
     *
     * The method returns the currently active camera if it's actually the main (back or only) camera in use.
     *
     * @param mediaStreamTrack The currently active `MediaStreamTrack`.
     * @param cameras The array of available [[Camera]] objects.
     * @returns Whether the stream was actually from the main camera.
     */
    function adjustCamerasFromMainCameraStream(mediaStreamTrack, cameras) {
        var mediaTrackSettings;
        if (typeof mediaStreamTrack.getSettings === "function") {
            mediaTrackSettings = mediaStreamTrack.getSettings();
        }
        var activeCamera = cameras.find(function (camera) {
            return ((mediaTrackSettings != null && camera.deviceId === mediaTrackSettings.deviceId) ||
                camera.label === mediaStreamTrack.label);
        });
        if (activeCamera !== undefined) {
            var activeCameraIsBackFacing = (mediaTrackSettings != null && mediaTrackSettings.facingMode === "environment") ||
                isBackCameraLabel(mediaStreamTrack.label);
            var activeCameraIsMainBackCamera = activeCameraIsBackFacing;
            // TODO: also correct camera types when active camera is not back-facing
            if (activeCameraIsBackFacing && cameras.length > 1) {
                // Correct camera types if needed
                cameras.forEach(function (camera) {
                    if (camera.deviceId === activeCamera.deviceId) {
                        // tslint:disable-next-line:no-any
                        camera.cameraType = camera_1.Camera.Type.BACK;
                    }
                    else if (!isBackCameraLabel(camera.label)) {
                        // tslint:disable-next-line:no-any
                        camera.cameraType = camera_1.Camera.Type.FRONT;
                    }
                });
                var mainBackCamera = cameras
                    .filter(function (camera) {
                    return camera.cameraType === camera_1.Camera.Type.BACK;
                })
                    .sort(function (camera1, camera2) {
                    return camera1.label.localeCompare(camera2.label);
                })[0];
                activeCameraIsMainBackCamera = activeCamera.deviceId === mainBackCamera.deviceId;
            }
            if (cameras.length === 1 || activeCameraIsMainBackCamera) {
                return activeCamera;
            }
        }
        return undefined;
    }
    CameraAccess.adjustCamerasFromMainCameraStream = adjustCamerasFromMainCameraStream;
    /**
     * @hidden
     *
     * @param devices The list of available devices.
     * @returns The extracted list of camera objects initialized from the given devices.
     */
    function extractCamerasFromDevices(devices) {
        var cameras = devices
            .filter(function (device) {
            return device.kind === "videoinput";
        })
            .map(function (videoDevice) {
            if (cameraObjects.has(videoDevice.deviceId)) {
                return cameraObjects.get(videoDevice.deviceId);
            }
            var label = videoDevice.label != null ? videoDevice.label : "";
            var camera = {
                deviceId: videoDevice.deviceId,
                label: label,
                cameraType: isBackCameraLabel(label) ? camera_1.Camera.Type.BACK : camera_1.Camera.Type.FRONT
            };
            if (label !== "") {
                cameraObjects.set(videoDevice.deviceId, camera);
            }
            return camera;
        });
        if (cameras.length > 1 &&
            !cameras.some(function (camera) {
                return camera.cameraType === camera_1.Camera.Type.BACK;
            })) {
            // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
            // Otherwise pick the last camera
            var backCameraIndex = cameras.length - 1;
            var cameraResolutions = cameras.map(function (camera) {
                var match = camera.label.match(/\b([0-9]+)MP?\b/i);
                if (match != null) {
                    return parseInt(match[1], 10);
                }
                return NaN;
            });
            if (!cameraResolutions.some(function (cameraResolution) {
                return isNaN(cameraResolution);
            })) {
                backCameraIndex = cameraResolutions.lastIndexOf(Math.max.apply(Math, cameraResolutions));
            }
            // tslint:disable-next-line:no-any
            cameras[backCameraIndex].cameraType = camera_1.Camera.Type.BACK;
        }
        return cameras;
    }
    /**
     * Get a list of cameras (if any) available on the device, a camera access permission is requested to the user
     * the first time this method is called if needed.
     *
     * Depending on device features and user permissions for camera access, any of the following errors
     * could be the rejected result of the returned promise:
     * - `UnsupportedBrowserError`
     * - `PermissionDeniedError`
     * - `NotAllowedError`
     * - `NotFoundError`
     * - `AbortError`
     * - `NotReadableError`
     * - `InternalError`
     *
     * @returns A promise resolving to the array of available [[Camera]] objects (could be empty).
     */
    function getCameras() {
        var _this = this;
        if (getCamerasPromise != null) {
            return getCamerasPromise;
        }
        var browserCompatibility = browserHelper_1.BrowserHelper.checkBrowserCompatibility();
        if (!browserCompatibility.fullSupport) {
            return Promise.reject(new unsupportedBrowserError_1.UnsupportedBrowserError(browserCompatibility));
        }
        var accessPermissionPromise = new Promise(function (resolve, reject) {
            return enumerateDevices()
                .then(function (devices) {
                if (devices
                    .filter(function (device) {
                    return device.kind === "videoinput";
                })
                    .every(function (device) {
                    return device.label === "";
                })) {
                    resolve(navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false
                    }));
                }
                else {
                    resolve();
                }
            })["catch"](reject);
        });
        getCamerasPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var stream, devices, cameras, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, accessPermissionPromise];
                    case 1:
                        stream = _a.sent();
                        return [4 /*yield*/, enumerateDevices()];
                    case 2:
                        devices = _a.sent();
                        cameras = extractCamerasFromDevices(devices);
                        console.debug.apply(console, __spreadArrays(["Camera list: "], cameras));
                        return [2 /*return*/, resolve(cameras)];
                    case 3:
                        error_1 = _a.sent();
                        // istanbul ignore if
                        if (error_1.name === "SourceUnavailableError") {
                            error_1.name = "NotReadableError";
                        }
                        return [2 /*return*/, reject(error_1)];
                    case 4:
                        // istanbul ignore else
                        if (stream != null) {
                            stream.getVideoTracks().forEach(function (track) {
                                track.stop();
                            });
                        }
                        getCamerasPromise = undefined;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        return getCamerasPromise;
    }
    CameraAccess.getCameras = getCameras;
    /**
     * @hidden
     *
     * Call `navigator.mediaDevices.getUserMedia` asynchronously in a `setTimeout` call.
     *
     * @param getUserMediaParams The parameters for the `navigator.mediaDevices.getUserMedia` call.
     * @returns A promise resolving when the camera is accessed.
     */
    function getUserMediaDelayed(getUserMediaParams) {
        console.debug("Camera access:", getUserMediaParams.video);
        return new Promise(function (resolve, reject) {
            window.setTimeout(function () {
                navigator.mediaDevices
                    .getUserMedia(getUserMediaParams)
                    .then(resolve)["catch"](reject);
            }, 0);
        });
    }
    /**
     * @hidden
     *
     * Get the *getUserMedia* *video* parameters to be used given a resolution fallback level and the browser used.
     *
     * @param resolutionFallbackLevel The number representing the wanted resolution, from 0 to 6,
     * resulting in higher to lower video resolutions.
     * @param isSafariBrowser Whether the browser is *Safari*.
     * @returns The resulting *getUserMedia* *video* parameters.
     */
    function getUserMediaVideoParams(resolutionFallbackLevel, isSafariBrowser) {
        switch (resolutionFallbackLevel) {
            case 0:
                if (isSafariBrowser) {
                    return {
                        width: { min: 1400, ideal: 1920, max: 1920 },
                        height: { min: 900, ideal: 1080, max: 1440 }
                    };
                }
                else {
                    return {
                        width: { min: 1400, ideal: 1920, max: 1920 },
                        height: { min: 900, ideal: 1440, max: 1440 }
                    };
                }
            case 1:
                if (isSafariBrowser) {
                    return {
                        width: { min: 1200, ideal: 1600, max: 1920 },
                        height: { min: 900, ideal: 1080, max: 1200 }
                    };
                }
                else {
                    return {
                        width: { min: 1200, ideal: 1920, max: 1920 },
                        height: { min: 900, ideal: 1200, max: 1200 }
                    };
                }
            case 2:
                if (isSafariBrowser) {
                    return {
                        width: { min: 1080, ideal: 1600, max: 1920 },
                        height: { min: 900, ideal: 900, max: 1080 }
                    };
                }
                else {
                    return {
                        width: { min: 1080, ideal: 1920, max: 1920 },
                        height: { min: 900, ideal: 1080, max: 1080 }
                    };
                }
            case 3:
                if (isSafariBrowser) {
                    return {
                        width: { min: 960, ideal: 1280, max: 1440 },
                        height: { min: 480, ideal: 720, max: 960 }
                    };
                }
                else {
                    return {
                        width: { min: 960, ideal: 1280, max: 1440 },
                        height: { min: 480, ideal: 960, max: 960 }
                    };
                }
            case 4:
                if (isSafariBrowser) {
                    return {
                        width: { min: 720, ideal: 1024, max: 1440 },
                        height: { min: 480, ideal: 768, max: 768 }
                    };
                }
                else {
                    return {
                        width: { min: 720, ideal: 1280, max: 1440 },
                        height: { min: 480, ideal: 720, max: 768 }
                    };
                }
            case 5:
                if (isSafariBrowser) {
                    return {
                        width: { min: 640, ideal: 800, max: 1440 },
                        height: { min: 480, ideal: 600, max: 720 }
                    };
                }
                else {
                    return {
                        width: { min: 640, ideal: 960, max: 1440 },
                        height: { min: 480, ideal: 720, max: 720 }
                    };
                }
            default:
                return {};
        }
    }
    /**
     * @hidden
     *
     * Try to access a given camera for video input at the given resolution level.
     *
     * @param resolutionFallbackLevel The number representing the wanted resolution, from 0 to 6,
     * resulting in higher to lower video resolutions.
     * @param camera The camera to try to access for video input.
     * @returns A promise resolving to the `MediaStream` object coming from the accessed camera.
     */
    function accessCameraStream(resolutionFallbackLevel, camera) {
        var browserName = browserHelper_1.BrowserHelper.userAgentInfo.getBrowser().name;
        var getUserMediaParams = {
            audio: false,
            video: getUserMediaVideoParams(resolutionFallbackLevel, browserName != null && browserName.includes("Safari"))
        };
        if (camera.deviceId === "") {
            getUserMediaParams.video.facingMode = {
                ideal: camera.cameraType === camera_1.Camera.Type.BACK ? "environment" : "user"
            };
        }
        else {
            getUserMediaParams.video.deviceId = {
                exact: camera.deviceId
            };
        }
        return getUserMediaDelayed(getUserMediaParams);
    }
    CameraAccess.accessCameraStream = accessCameraStream;
    /**
     * @hidden
     *
     * Get a list of available devices in a cross-browser compatible way.
     *
     * @returns A promise resolving to the `MediaDeviceInfo` array of all available devices.
     */
    function enumerateDevices() {
        if (typeof navigator.enumerateDevices === "function") {
            return navigator.enumerateDevices();
        }
        else if (typeof navigator.mediaDevices === "object" &&
            typeof navigator.mediaDevices.enumerateDevices === "function") {
            return navigator.mediaDevices.enumerateDevices();
        }
        else {
            return new Promise(function (resolve, reject) {
                try {
                    if (window.MediaStreamTrack == null || window.MediaStreamTrack.getSources == null) {
                        throw new Error();
                    }
                    window.MediaStreamTrack.getSources(function (devices) {
                        resolve(devices
                            .filter(function (device) {
                            return device.kind.toLowerCase() === "video" || device.kind.toLowerCase() === "videoinput";
                        })
                            .map(function (device) {
                            return {
                                deviceId: device.deviceId != null ? device.deviceId : "",
                                groupId: device.groupId,
                                kind: "videoinput",
                                label: device.label,
                                toJSON: /* istanbul ignore next */ function () {
                                    return this;
                                }
                            };
                        }));
                    });
                }
                catch (_a) {
                    var browserCompatibility = {
                        fullSupport: false,
                        scannerSupport: true,
                        missingFeatures: [browserCompatibility_1.BrowserCompatibility.Feature.MEDIA_DEVICES]
                    };
                    return reject(new unsupportedBrowserError_1.UnsupportedBrowserError(browserCompatibility));
                }
            });
        }
    }
})(CameraAccess = exports.CameraAccess || (exports.CameraAccess = {}));
