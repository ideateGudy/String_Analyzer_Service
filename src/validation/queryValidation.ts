// import { z } from 'zod';

// // Define how the query parameters MUST look
// const FilterQuerySchema = z.object({
//     is_palindrome: z.enum({ invalid_type_error: "is_palindrome must be a boolean" }).optional(),
//     min_length: z.number({ invalid_type_error: "min_length must be a number" }).optional(),
//     max_length: z.number({ invalid_type_error: "max_length must be a number" }).optional(),
//     word_count: z.number({ invalid_type_error: "word_count must be a number" }).optional(),
//     contains_character: z.string({ invalid_type_error: "contains_character must be a string" }).optional(),
// })