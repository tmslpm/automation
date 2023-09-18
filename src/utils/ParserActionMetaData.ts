import { ActionMetaData } from "../enums/ActionMetaData";

export class ParserActionMetaData {
    private static KEY_BLOCK_TAG: string = "action-metadata";

    public static readonly MAX_LINES_TRY_PARSE: number = 10000;
    public static readonly MAX_LINES_BLOCK_TAG: number = 100;
    public static readonly START_BLOCK_TAG: string = `==${ParserActionMetaData.KEY_BLOCK_TAG}==`;
    public static readonly END_BLOCK_TAG: string = `==/${ParserActionMetaData.KEY_BLOCK_TAG}==`;
    public static readonly START_METADATA: string = "@";
    public static readonly KEY_MINIMUM_LENGTH: number = Object.values(ActionMetaData).sort((a, b) => a.length - b.length)[0].length + 1

    public static tryParse(entry: string) {
        let lines = entry.split("\n").filter(Boolean);

        let lineIndex = 0;
        let counterMetaDataLine = 0;
        let startReadMetaDataLine = false;
        let stopWhile = false;
        let rawMetadataFound = "";

        while (!stopWhile && lineIndex < lines.length && counterMetaDataLine < ParserActionMetaData.MAX_LINES_BLOCK_TAG) {
            let currentLine = lines[lineIndex];

            // line with start block
            if (!startReadMetaDataLine && ParserActionMetaData.isMetaBlockStart(currentLine)) {
                startReadMetaDataLine = true;
            }
            // line with end block
            else if (startReadMetaDataLine && ParserActionMetaData.isMetaBlockEnd(currentLine)) {
                startReadMetaDataLine = false;
                stopWhile = true;
            }
            // line with metadata
            else if (startReadMetaDataLine) {
                counterMetaDataLine++;
                let v = currentLine.trimStart();
                rawMetadataFound += (v.startsWith("//") ? v.replace("//", "") : v) + "\n";
            }

            if (lineIndex > ParserActionMetaData.MAX_LINES_TRY_PARSE) {
                stopWhile = true;
            } else {
                lineIndex++;
            }
        }


        try {
            let parsedMetaData = JSON.parse(rawMetadataFound)

            console.debug(parsedMetaData)
        } catch (error) {
            console.error(error)
        }

        return 0
    }

    /**
     * Check if the line contains {@link START_BLOCK_TAG} and start with `//`
     * 
     * @example
     * ```ts
     * // ==action-metadata==
     * ```
     * result: `true`
     * 
     * ```ts
     *  ==action-metadata==
     * ```
     * result: `false`
     * 
     * @param {string} line - the line
     * 
     * @returns {boolean} true if the line is meta block start
     */
    public static isMetaBlockStart(line: string): boolean {
        line = line.trimStart();
        return line.startsWith("//") && line.includes(ParserActionMetaData.START_BLOCK_TAG)
    }

    /**
     * Check if the line contains {@link END_BLOCK_TAG} and start with `//`
     * 
     * @example
     * ```ts
     * // ==/action-metadata==
     * ```
     * result: `true`
     * 
     * ```ts
     *  ==/action-metadata==
     * ```
     * result: `false`
     * 
     * @param {string} line - the line
     * 
     * @returns {boolean} true if the line is meta block start
     */
    public static isMetaBlockEnd(line: string): boolean {
        line = line.trimStart();
        return line.startsWith("//") && line.includes(ParserActionMetaData.END_BLOCK_TAG)
    }
}



