# FlowGPT

FlowGPT is an enterprise-grade framework for developing conversational AI bots with structured dialogue flows. Built on LangChain, it provides seamless integration with OpenAI and Azure OpenAI models, enabling developers to create sophisticated conversation scenarios with predefined step sequences.

## Key Features

-   Structured conversation flows with customizable scenarios and steps
-   Seamless integration with OpenAI and Azure OpenAI models
-   Built-in conversation state management
-   Extensible architecture for custom model integration
-   Type-safe scenario definitions
-   Comprehensive error handling

## Installation

```bash
npm install @aurogpt/flowgpt
```

## Quick Start

The following example demonstrates how to create a basic customer service bot with product browsing and order tracking capabilities:

```typescript
import { FlowBot, Scenario } from "@aurogpt/flowgpt";
import { ChatOpenAI } from "langchain/chat_models/openai";

const flowBot = FlowBot.create({
    name: "CustomerServiceBot",
    description: "Automated customer service assistant",
    scenarios: [
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
            name: "Track Order",
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
    ],
    model: new ChatOpenAI({
        modelName: "gpt-4o-mini",
        // apiKey: process.env.OPENAI_API_KEY,
    }),

    // Optional: Prompt for detecting scenario & step
    // prompt: "...",
});

// Example extending default prompt
flowBot.prompt += "This text is appended to the default prompt";

// Example usage
const response = await flowBot.invoke(`
    User: Hi
    Bot: Hello, How can I help you today?
    User: What is the status of my order id #324?
`);

console.log(response);
```

## Configuration

The `FlowBot` constructor accepts the following configuration options:

-   `name`: Bot identifier
-   `description`: Bot purpose and functionality description
-   `scenarios`: Array of conversation scenarios
-   `model`: LLM instance for detecting scenario & step
-   `prompt`: Prompt for detecting scenario & step

## Advanced Usage

For detailed examples and advanced configuration options, please refer to our [documentation](https://docs.aurogpt.com).

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a pull request

Please review our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## Contributors

-   [@aurogpt](https://github.com/aurogpt) - Creator and maintainer

## License

FlowGPT is released under the [MIT License](LICENSE).

## Support

-   Issues: [GitHub Issues](https://github.com/aurogpt/flowgpt/issues)
-   Discord: _Coming Soon_
