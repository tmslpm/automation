export function getOrDefault(value: string, defaultValue: string): string {
    return value && value.length > 0 ? value : defaultValue;
};

export function getOrThrow(value: string) {
    if (value && value.length)
        return value;
    throw new Error("NullPointerException value:" + value);
};