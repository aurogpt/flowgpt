"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanFormatString = void 0;
var CanFormatString = /** @class */ (function () {
    function CanFormatString() {
    }
    /**
     * Formats a string by replacing placeholders in the form of `{{ variable }}`
     * with the corresponding values from the provided variables object.
     *
     * @param template - The string containing `{{ variable }}` placeholders.
     * @param variables - An object containing key-value pairs for replacement.
     * @returns The formatted string with placeholders replaced.
     */
    CanFormatString.prototype.formatString = function (template, variables) {
        return template.replace(/\{\{\s*(\w+)\s*\}\}/g, function (match, key) {
            return key in variables ? variables[key] : match;
        });
    };
    return CanFormatString;
}());
exports.CanFormatString = CanFormatString;
