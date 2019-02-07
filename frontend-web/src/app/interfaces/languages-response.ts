import { LanguageResponse } from "./language-response";

export interface LanguagesResponse {
    count: number;
    rows: LanguageResponse[];
}