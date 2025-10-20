import type { ParsedFilters } from "../types/index.ts";
import { countWords, isPalindromeString } from "./stringAnalyzer.ts";

export function applyFilters(data: string[], filters: ParsedFilters): string[] {
  return data.filter(str => {
    if (filters.word_count !== undefined && countWords(str) !== filters.word_count) {
      return false;
    }

    if (filters.is_palindrome && !isPalindromeString(str)) {
      return false;
    }

    if (filters.min_length !== undefined && str.length < filters.min_length) {
      return false;
    }

    if (filters.contains_character && !str.toLowerCase().includes(filters.contains_character.toLowerCase())) {
      return false;
    }


    if (filters.max_length !== undefined && str.length > filters.max_length) {
      return false;
    }

    return true;
  });

}
