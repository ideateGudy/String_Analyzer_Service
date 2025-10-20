import crypto from 'crypto';
import type { CharFreqType, AnalyzedStringProperties } from '../types/index.ts';

    //  "is_palindrome": boolean,
    export const isPalindromeString = (str: string): boolean => {
      const cleaned = str.replace(/[^0-9a-z]/gi, '').toLowerCase();
      const reversed = cleaned.split('').reverse().join('');
      return cleaned === reversed;
    };


    //  "unique_characters": number,
    export const countUniqueCharacters = (str: string): number => {
      const cleaned = str.replace(/[^0-9a-z]/gi, '').toLowerCase();
      const uniqueChars = new Set(cleaned);
      return uniqueChars.size;
    };


    //  "word_count": number,
    export const countWords = (str: string): number => {
      const cleaned = str.replace(/[^0-9a-z\s]/gi, ' ').toLowerCase();
      const words = cleaned.split(/\s+/).filter(Boolean);
      return words.length;
    }


    //  "sha256_hash": string,
    export const computeSHA256Hash = (str: string): string => {
      return crypto.createHash('sha256').update(str).digest('hex');
    };


    //  "character_frequency_map": { [key: string]: number }
    export const characterFrequencyMap = (str: string): CharFreqType => {
      const freqMap: CharFreqType = {};
      
      const cleaned = str.replace(/\s/g, '').toLowerCase();

        for (const char of cleaned) {
          freqMap[char] = (freqMap[char] || 0) + 1;
        }
      return freqMap;
    };

    //Analyse String
    export const analyzeString = (str: string): AnalyzedStringProperties => {
      return {
        length: str.length,
        is_palindrome: isPalindromeString(str),
        unique_characters: countUniqueCharacters(str),
        word_count: countWords(str),
        sha256_hash: computeSHA256Hash(str),
        character_frequency_map: characterFrequencyMap(str),
      };
    };




