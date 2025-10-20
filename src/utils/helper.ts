import { customApiError } from "./apiError.ts";

export const isValidInt = (value: string): boolean => {
    const num = Number(value);
    return Number.isInteger(num) && num >= 0;
}

export const badQueryMessage = () =>{
    throw new customApiError("Invalid query parameter values or types", 400);
}