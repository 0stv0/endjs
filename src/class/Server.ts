import http from 'http';
import { Route } from './Route.js';
import { Handler, Method } from '../lib/Types.js';
import { EndRequest } from '../types/EndRequest.js';
import { EndResponse } from '../types/EndResponse.js';

class Server
{
    private port: number;
    private routes: Record<string, Route>;

    constructor(port: number)
    {
        this.port   = port;
        this.routes = {};
    };
    public addRoute = (path: string, method: Method, handler: Handler): void => 
    {
        let route: Route = new Route(path, method, handler);
        this.routes[route.getPath()] = route;
    };
    private parse = async(req: http.IncomingMessage): Promise<Record<string, any>> =>
    {
        return new Promise((resolve) =>
        {
            let buff = '';

            req.on('data', (chunk) => buff += chunk);
            req.on('end', () =>
            {
                try { resolve(JSON.parse(buff)); } 
                catch { resolve({}); }
            });
        });
    };
    private handler = async(req: http.IncomingMessage, res: http.ServerResponse) =>
    {
        const url: string | undefined  = (req.url || '').split('?')[0];
        const route: Route | undefined = this.routes[url || ''];
        if (!route || route.getMethod() !== (req.method as string))
        {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                message: 'Not Found' 
            }));
            return;
        };

        let body: Record<string, any>      = {};
        let params: Record<string, string> = {};
        if (route.getMethod() === 'POST' || route.getMethod() === 'PUT')
        {
            body = await this.parse(req);
        }
        else if ((route.getMethod() === 'GET' || route.getMethod() === 'DELETE') && req.url)
        {
            let parts: string[]               = req.url.split("?");
            let found: Record<string, string> = {};
            if (parts[1])
            {
                let items: string[] = parts[1].split("&");
                for (let item of items)
                {
                    let value: string[] = item.split("=");
                    if (value[0] === undefined || value[1] === undefined) 
                        continue;

                    found[value[0]] = value[1];
                }
            }
            params = found;
        }

        let handler: Handler    = route.getHandler();
        let request: EndRequest = {
            url: req.url || '',
            body: body,
            headers: req.headers as Record<string, string>,
            params: params
        };
        let response: EndResponse = {
            setStatus: (code: number) => 
            { 
                res.statusCode = code; 
            },
            send: (body: Record<string, any>) => 
            {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(body));
            }
        };
        await handler(request, response);
    };
    public listen = (cb: () => void): void =>
    {
        const server: http.Server = http.createServer(this.handler);
        server.listen(this.port, cb);
    };
};
export { Server };