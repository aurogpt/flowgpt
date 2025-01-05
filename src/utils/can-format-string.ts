/**
 * A class that can format a string by replacing placeholders in the form of `{{ variable }}`
 * with the corresponding values from the provided variables object.
 */
export abstract class CanFormatString {
    /**
     * Formats a string by replacing placeholders in the form of `{{ variable }}`
     * with the corresponding values from the provided variables object.
     *
     * @param template - The string containing `{{ variable }}` placeholders.
     * @param variables - An object containing key-value pairs for replacement.
     * @returns The formatted string with placeholders replaced.
     */
    formatString(template: string, variables: Record<string, any>): string {
        return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
            return key in variables ? variables[key] : match;
        });
    }
}
