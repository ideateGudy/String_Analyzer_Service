export interface StringAnalysisInput {
    value: string;
}

export type CharFreqType = { [key: string]: number };

export interface AnalyzedStringProperties {
    length: number;
    is_palindrome: boolean;
    unique_characters: number;
    word_count: number;
    sha256_hash: string;
    character_frequency_map: CharFreqType;
}

export interface StringAnalysisResult {
    id: string;
    value: StringAnalysisInput["value"];
    properties: AnalyzedStringProperties;
    created_at: string;
}

export interface FilterQueryParams {
    is_palindrome: string;
    min_length?: string;
    max_length?: string;
    word_count?: string;
    contains_character?: string;
}

export interface ParsedFilters { 
        is_palindrome?: boolean; 
        min_length?: number; 
        max_length?: number; 
        word_count?: number; 
        contains_character?: string;
    }

export interface GetStringParams {
    stringValue: string;
}

export interface ParsedQuery {
  original: string;
  parsed_filters: ParsedFilters;
}
