export interface StringAnalysisInput {
    value: string;
}

export interface Properties {
    length: number;
    is_palindrome: boolean;
    unique_characters: number;
    word_count: number;
    sha256_hash: string;
    character_frequency: { [key: string]: number };
}

export interface StringAnalysisResult {
    id: string;
    value: StringAnalysisInput["value"];
    properties: Properties;
    created_at: string;
}
