"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scenario = void 0;
var uuid_1 = require("uuid");
var step_1 = require("./step");
var can_create_1 = require("./base/can-create");
var Scenario = /** @class */ (function (_super) {
    __extends(Scenario, _super);
    function Scenario(_a) {
        var name = _a.name, description = _a.description, steps = _a.steps;
        var _this = _super.call(this) || this;
        _this.id = (0, uuid_1.v4)();
        _this.name = name;
        _this.description = description;
        _this.steps = steps;
        return _this;
    }
    Scenario.prototype.addStep = function (step) {
        this.steps.push(step);
        return this;
    };
    Scenario.loadObject = function (_a) {
        var name = _a.name, description = _a.description, steps = _a.steps;
        return new Scenario({
            name: name,
            description: description,
            steps: steps.map(step_1.Step.create),
        });
    };
    Scenario.prototype.toString = function () {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            description: this.description,
            steps: this.steps.map(function (step) { return JSON.parse(step.toString()); }),
        }, null, 4);
    };
    return Scenario;
}(can_create_1.CanCreate));
exports.Scenario = Scenario;
