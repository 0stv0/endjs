import { Handler, Method } from "../lib/Types.js";

class Route
{
    private path: string;
    private handler: Handler;
    private method: Method;

    constructor(path: string, method: Method, handler: Handler)
    {
        this.path   = path;
        this.handler = handler;
        this.method  = method;
    }
    public getPath = (): string => this.path;
    public getMethod = (): Method => this.method;
    public getHandler = (): Handler => this.handler;
};
export { Route };