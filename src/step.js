"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
var uuid_1 = require("uuid");
var Step = /** @class */ (function () {
    function Step(options) {
        this.id = (0, uuid_1.v4)();
        this.name = options.name;
        this.description = options.description;
        this.instructions = options.instructions;
    }
    Step.create = function (object) {
        return new Step(object);
    };
    Step.prototype.toObject = function () {
        return {
            name: this.name,
            description: this.description,
            instructions: this.instructions,
        };
    };
    Step.prototype.toString = function () {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            description: this.description,
            instructions: this.instructions,
        });
    };
    return Step;
}());
exports.Step = Step;
