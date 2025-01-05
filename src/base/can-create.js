"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanCreate = void 0;
var CanCreate = /** @class */ (function () {
    function CanCreate() {
    }
    CanCreate.create = function (options) {
        return new this(options);
    };
    return CanCreate;
}());
exports.CanCreate = CanCreate;
