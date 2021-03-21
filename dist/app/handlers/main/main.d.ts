/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "node:http";
export declare class Main {
    protected req: IncomingMessage;
    protected res: ServerResponse;
    constructor(req: IncomingMessage, res: ServerResponse);
    set setRequest(req: IncomingMessage);
    set setResponse(res: ServerResponse);
}
