import type { ParsedFilters, ParsedQuery } from "../types/index.ts";
import { customApiError } from "./apiError.ts";

export const parseQuery = (query: string): ParsedQuery => {

  const lower = query.toLowerCase().trim();
  const filters: ParsedFilters = {};

  // Handle: "single word"
  if (lower.includes("single word")) {
    filters.word_count = 1;
  }

  // Handle: "palindromic"
  if (lower.includes("palindromic") || lower.includes("palindrome")) {
    filters.is_palindrome = true;
  }

    // Handle: "longer than 10 characters"
  const lengthMatch = lower.match(/longer than (\d+) characters?/);
  if (lengthMatch) {
    filters.min_length = parseInt(lengthMatch[1]!, 10) + 1;
  }

  // Handle: "containing the letter z"
  const letterMatch = lower.match(/containing the letter (\w)/);
  if (letterMatch) {
    filters.contains_character = letterMatch[1]!;
  }

  // Handle: "contain the letter "
  const letters = lower.match(/contain the letter (\w)/);
  if (letters) {
    filters.contains_character = letters[1]!;
  }

  if (lower.includes("contain") && lower.includes("first vowel")) {
    filters.contains_character = 'a'; // heuristic
  }

  if (filters.min_length && filters.max_length && filters.min_length > filters.max_length) {
    throw new customApiError("Query parsed but resulted in conflicting filters", 422);
}

  if (Object.keys(filters).length === 0) {
    throw new customApiError("Unable to parse natural language query", 400);
  }

  return {
    original: query,
    parsed_filters: filters
  };
}
