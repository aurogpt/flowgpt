import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

/**
 * A class that loads a markdown file and provides its content as a string.
 *
 * @param markdown - The markdown content to load.
 * @returns A new MarkdownPromptLoader object.
 *
 * @example
 * const loader = MarkdownPromptLoader.fromFile("./path/to/file.md");
 * const content = loader.getContent();
 */
export class MarkdownPromptLoader {
    private content: string;

    constructor(markdown: string) {
        this.content = markdown;
    }

    static fromFile(filePath: string): MarkdownPromptLoader {
        // Get the directory of the current file
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Resolve the absolute path
        const absolutePath = path.resolve(__dirname, filePath);

        if (!fs.existsSync(absolutePath)) {
            console.error(`File not found: ${absolutePath}`);
            throw new Error(`File not found: ${absolutePath}`);
        }

        const fileContent = fs.readFileSync(absolutePath, "utf-8");
        return new MarkdownPromptLoader(fileContent);
    }

    getContent(): string {
        return this.content;
    }
}
