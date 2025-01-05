import { ChatOpenAI } from "@langchain/openai";
import { FlowBot } from "~/flow-bot";
import { Scenario } from "~/scenario";
const scenarios = [
    Scenario.loadObject({
        name: "Browse Products",
        description: "Helps customers find and browse products",
        steps: [
            {
                name: "Greet User",
                description: "Welcome the user to the store",
                instructions:
                    "Send a greeting message with options like 'View Products' or 'Search for a Product'.",
            },
            {
                name: "Product Search",
                description: "Assist the user in finding specific products",
                instructions:
                    "Ask for the product name or category and display matching results.",
            },
            {
                name: "View Product Details",
                description:
                    "Provide detailed information about a selected product",
                instructions:
                    "Show product details, price, and an 'Add to Cart' option.",
            },
        ],
    }),
    Scenario.loadObject({
        name: "Place an Order",
        description: "Guides customers through the order placement process",
        steps: [
            {
                name: "Add to Cart",
                description:
                    "Confirm the user wants to add the product to the cart",
                instructions:
                    "Confirm the product selection and display cart contents.",
            },
            {
                name: "Review Cart",
                description: "Allow the user to review items in the cart",
                instructions:
                    "Show cart items with options to remove or adjust quantity.",
            },
            {
                name: "Proceed to Checkout",
                description: "Guide the user to the checkout process",
                instructions:
                    "Ask for delivery details, payment method, and confirm the order.",
            },
        ],
    }),
    Scenario.loadObject({
        name: "Order Tracking",
        description: "Allows customers to check the status of their order",
        steps: [
            {
                name: "Request Order ID",
                description: "Ask the user to provide their order ID",
                instructions:
                    "Prompt the user for their order ID to retrieve tracking information.",
            },
            {
                name: "Display Order Status",
                description: "Show the current status of the order",
                instructions:
                    "Provide shipping updates, expected delivery date, and tracking details.",
            },
        ],
    }),
    Scenario.loadObject({
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
                instructions:
                    "Explain the process for returning the item and the expected timeline.",
            },
            {
                name: "Confirm Return",
                description: "Finalize the return request",
                instructions:
                    "Confirm the details and provide a return label or further instructions.",
            },
        ],
    }),
];

const flowBot = FlowBot.create({
    name: "Test Flow Bot",
    description: "A test flow bot",
    scenarios,
    instructionModel: new ChatOpenAI({
        modelName: "gpt-4o",
        apiKey: "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",
    }),
    detectionModel: new ChatOpenAI({
        apiKey: "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",
    }),
});

const run = async () => {
    const op = await flowBot.invoke(
        "User: Hi\n Bot: Hello \n User: What is the status of my order id #324? "
    );
    console.log(op);
};

run().catch((error) => {
    console.error(error);
});
