import type { Request, Response } from "express";
import type { AnalyzedStringProperties, FilterQueryParams, GetStringParams, ParsedFilters, ParsedQuery, StringAnalysisInput, StringAnalysisResult } from "../types/index.ts";
import { analyzeString } from "../utils/stringAnalyzer.ts";
import { customApiError } from "../utils/apiError.ts";
import { parseQuery } from "../utils/parser.ts";
import { applyFilters } from "../utils/filters.ts";
import { badQueryMessage, isValidInt } from "../utils/helper.ts";

const stringArray: Array<StringAnalysisResult> = [];

const stringData: string[] = [
  "madam", "level", "hello", "noon", "example", "zebra",
  "alphabet", "racecar", "tool", "rotator", "eye", "dee eed", "stats", "james", "anna", "civic", "kayak", "refer", "wow", "python", "This is a long text string", "The quick brown fox jumps over the lazy dog", "This is ass", "bobob"
];

export const createStringController = (req: Request, res: Response) => {
    const { value }: StringAnalysisInput = req.body;

        if (!value) {
        throw new customApiError("Invalid request body or missing 'value' field", 400);
    }

    if (typeof value !== "string") {
        throw new customApiError("Invalid data type for 'value' (must be string)", 422);
    }

    const analyzedString: AnalyzedStringProperties = analyzeString(value);

    const newStringAnalysis: StringAnalysisResult = {
        id: analyzedString.sha256_hash,
        value,
        properties: analyzedString,
        created_at: new Date().toISOString(),
    };

    if (stringArray.find(item => item.value === value)) {
        throw new customApiError("String already exists in the system", 409);
    }

    stringArray.push(newStringAnalysis);
    res.status(201).json(newStringAnalysis);
};


export const getStringController = (req: Request<GetStringParams>, res: Response) => {
    const { stringValue } = req.params;
    if (!stringValue) {
        throw new customApiError("String value parameter is missing", 400);
    }
    const foundString = stringArray.find(item => item.value === stringValue);

    if (!foundString) {
        throw new customApiError("String does not exist in the system", 404);
    }
    res.status(200).json(foundString);
};


export const getAllStringsController = (req: Request<{}, {}, {}, FilterQueryParams>, res: Response) => {
    const { is_palindrome , min_length, max_length, word_count, contains_character } = req.query;
    
    const approvedFilters = ["is_palindrome", "min_length", "max_length", "word_count", "contains_character"];
    Object.keys(req.query).forEach(key => {
        if (!approvedFilters.includes(key)) {
            throw new customApiError(`Invalid query parameter: ${key}`, 400);
        }
    });


    const parsedFilters: ParsedFilters = {};

    let filteredStrings = stringArray;
    
    // Validation for is_palindrome (boolean)
    if (is_palindrome) {
        if (is_palindrome !== "true" && is_palindrome !== "false") {
            badQueryMessage();
        }
        parsedFilters.is_palindrome = (is_palindrome === "true");
        filteredStrings = filteredStrings.filter(item => item.properties.is_palindrome === parsedFilters.is_palindrome);
    }

    // Validation for min_length (number)
    if (min_length) {
        if (!isValidInt(min_length)) {
            badQueryMessage();
        }
        parsedFilters.min_length = parseInt(min_length, 10);
        filteredStrings = filteredStrings.filter(item => item.properties.length >= parsedFilters.min_length!);
    }
    
    // Validation for max_length (number)
    if (max_length) {
        if (!isValidInt(max_length)) {
            badQueryMessage();
        }
        parsedFilters.max_length = parseInt(max_length, 10);
        filteredStrings = filteredStrings.filter(item => item.properties.length <= parsedFilters.max_length!);
    }

    // Validation for word_count (number)
    if (word_count) {
        if (!isValidInt(word_count)) {
            badQueryMessage();
        }
        parsedFilters.word_count = parseInt(word_count, 10);
        filteredStrings = filteredStrings.filter(item => item.properties.word_count === parsedFilters.word_count!);
    }

    // Validation for contains_character (single character)
    if (contains_character) {
        if (contains_character.length !== 1) {
            badQueryMessage();
        }
        parsedFilters.contains_character = contains_character;
        filteredStrings = filteredStrings.filter(item => item.value.includes(parsedFilters.contains_character!));
    }

    res.status(200).json({
        data: filteredStrings || stringArray,
        count: filteredStrings ? (filteredStrings as Array<StringAnalysisResult>).length : stringArray.length,
        filters_applied: req.query
    });
};


export const filterByNaturalLanguageController = (req: Request, res: Response) => {
   const query = req.query.query as string | undefined;

  if (!query) {
    throw new customApiError("Query parameter is required", 400);
  }

  let parsedQuery: ParsedQuery = parseQuery(query);

  const results = applyFilters(stringData, parsedQuery.parsed_filters);

  if (!results || results.length === 0) {
    throw new customApiError("Query parsed but resulted in conflicting filters", 422);
  }


  res.status(200).json({
    data: results,
    count: results.length,
    interpreted_query: parsedQuery
  });
};


export const deleteStringController = (req: Request, res: Response) => {
    console.log("Delete String Controller Invoked");
    const { stringValue } = req.params;
    if (!stringValue) {
        throw new customApiError("String value parameter is missing", 400);
    }
    const foundString = stringArray.find(item => item.value === stringValue);

    if (!foundString) {
        throw new customApiError("String does not exist in the system", 404);
    }
    const index = stringArray.indexOf(foundString);

    stringArray.splice(index, 1);

    res.status(204).send();
};