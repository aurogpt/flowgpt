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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("@langchain/openai");
var flow_bot_1 = require("~/flow-bot");
var scenario_1 = require("~/scenario");
var scenarios = [
    scenario_1.Scenario.loadObject({
        name: "Browse Products",
        description: "Helps customers find and browse products",
        steps: [
            {
                name: "Greet User",
                description: "Welcome the user to the store",
                instructions: "Send a greeting message with options like 'View Products' or 'Search for a Product'.",
            },
            {
                name: "Product Search",
                description: "Assist the user in finding specific products",
                instructions: "Ask for the product name or category and display matching results.",
            },
            {
                name: "View Product Details",
                description: "Provide detailed information about a selected product",
                instructions: "Show product details, price, and an 'Add to Cart' option.",
            },
        ],
    }),
    scenario_1.Scenario.loadObject({
        name: "Place an Order",
        description: "Guides customers through the order placement process",
        steps: [
            {
                name: "Add to Cart",
                description: "Confirm the user wants to add the product to the cart",
                instructions: "Confirm the product selection and display cart contents.",
            },
            {
                name: "Review Cart",
                description: "Allow the user to review items in the cart",
                instructions: "Show cart items with options to remove or adjust quantity.",
            },
            {
                name: "Proceed to Checkout",
                description: "Guide the user to the checkout process",
                instructions: "Ask for delivery details, payment method, and confirm the order.",
            },
        ],
    }),
    scenario_1.Scenario.loadObject({
        name: "Order Tracking",
        description: "Allows customers to check the status of their order",
        steps: [
            {
                name: "Request Order ID",
                description: "Ask the user to provide their order ID",
                instructions: "Prompt the user for their order ID to retrieve tracking information.",
            },
            {
                name: "Display Order Status",
                description: "Show the current status of the order",
                instructions: "Provide shipping updates, expected delivery date, and tracking details.",
            },
        ],
    }),
    scenario_1.Scenario.loadObject({
        name: "Handle Returns",
        description: "Facilitates product returns or exchanges",
        steps: [
            {
                name: "Initiate Return",
                description: "Ask the user for details about the return",
                instructions: "Collect the order ID and reason for the return.",
            },
            {
                name: "Provide Return Options",
                description: "Offer options for a refund or exchange",
                instructions: "Explain the process for returning the item and the expected timeline.",
            },
            {
                name: "Confirm Return",
                description: "Finalize the return request",
                instructions: "Confirm the details and provide a return label or further instructions.",
            },
        ],
    }),
];
var flowBot = flow_bot_1.FlowBot.create({
    name: "Test Flow Bot",
    description: "A test flow bot",
    scenarios: scenarios,
    instructionModel: new openai_1.ChatOpenAI({
        modelName: "gpt-4o",
        apiKey: "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",
    }),
    detectionModel: new openai_1.ChatOpenAI({
        apiKey: "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",
    }),
});
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var op;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, flowBot.invoke("User: Hi\n Bot: Hello \n User: What is the status of my order id #324? ")];
            case 1:
                op = _a.sent();
                console.log(op);
                return [2 /*return*/];
        }
    });
}); };
run().catch(function (error) {
    console.error(error);
});
