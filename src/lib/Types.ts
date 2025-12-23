import { EndRequest } from "../types/EndRequest.js";
import { EndResponse } from "../types/EndResponse.js";

type Handler = (req: EndRequest, res: EndResponse) => Promise<void>;
type Method  = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type { Handler, Method };