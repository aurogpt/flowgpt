"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownPromptLoader = void 0;
var fs = require("fs");
var path = require("path");
var url_1 = require("url");
var MarkdownPromptLoader = /** @class */ (function () {
    function MarkdownPromptLoader(markdown) {
        this.content = markdown;
    }
    MarkdownPromptLoader.fromFile = function (filePath) {
        // Get the directory of the current file
        var __filename = (0, url_1.fileURLToPath)(import.meta.url);
        var __dirname = path.dirname(__filename);
        // Resolve the absolute path
        var absolutePath = path.resolve(__dirname, filePath);
        if (!fs.existsSync(absolutePath)) {
            console.error("File not found: ".concat(absolutePath));
            throw new Error("File not found: ".concat(absolutePath));
        }
        var fileContent = fs.readFileSync(absolutePath, "utf-8");
        return new MarkdownPromptLoader(fileContent);
    };
    MarkdownPromptLoader.prototype.getContent = function () {
        return this.content;
    };
    return MarkdownPromptLoader;
}());
exports.MarkdownPromptLoader = MarkdownPromptLoader;
