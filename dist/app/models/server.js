"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODES = exports.HTTP_METHOD = void 0;
var HTTP_METHOD;
(function (HTTP_METHOD) {
    HTTP_METHOD["POST"] = "POST";
    HTTP_METHOD["GET"] = "GET";
})(HTTP_METHOD = exports.HTTP_METHOD || (exports.HTTP_METHOD = {}));
;
var STATUS_CODES;
(function (STATUS_CODES) {
    STATUS_CODES[STATUS_CODES["OK"] = 200] = "OK";
    STATUS_CODES[STATUS_CODES["REDIRECT"] = 302] = "REDIRECT";
    STATUS_CODES[STATUS_CODES["CREATED"] = 201] = "CREATED";
})(STATUS_CODES = exports.STATUS_CODES || (exports.STATUS_CODES = {}));
