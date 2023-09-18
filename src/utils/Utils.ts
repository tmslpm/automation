export function getOrDefault(value: string, defaultValue: string): string {
    return value && value.length > 0 ? value : defaultValue;
};

export function getOrThrow(value: any) {
    if (value != null || value != undefined)
        return value;
    throw new Error("NullPointerException value: " + value);
};