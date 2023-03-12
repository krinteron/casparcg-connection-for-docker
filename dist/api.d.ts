import { EventEmitter } from 'eventemitter3';
import { AMCPCommand, Commands } from './commands';
import { ResponseTypes } from './connection';
export interface Options {
    /** Host name of the machine to connect to. Defaults to 127.0.0.1 */
    host?: string;
    /** Port number to connect to. Defaults to 5250 */
    port?: number;
    /** Minimum amount of time before a request is considered to be timed out */
    timeoutTime?: number;
    /** Immediately connects after instantiating the class, defaults to false */
    autoConnect?: boolean;
}
export type SendResult = {
    error: Error;
    request: undefined;
} | {
    error: undefined;
    request: Promise<Response>;
};
export interface Response {
    reqId?: string;
    command: Commands;
    responseCode: number;
    data: any[];
    type: ResponseTypes;
    message: string;
}
export type ConnectionEvents = {
    connect: [];
    disconnect: [];
    error: [error: Error];
};
export declare class BasicCasparCGAPI extends EventEmitter<ConnectionEvents> {
    private _connection;
    private _host;
    private _port;
    private _requestQueue;
    private _timeoutTimer;
    private _timeoutTime;
    constructor(options?: Options);
    get host(): string;
    set host(host: string);
    get port(): number;
    set port(port: number);
    get connected(): boolean;
    connect(host?: string, port?: number): void;
    disconnect(): void;
    /** Stops internal timers so that the class is ready for garbage disposal */
    discard(): void;
    /**
     * Sends a command to CasparCG
     * @return { error: Error } if there was an error when sending the command (such as being disconnected)
     * @return { request: Promise<Response> } a Promise that resolves when CasparCG replies after a command has been sent.
     * If this throws, there's something seriously wrong :)
     */
    executeCommand(command: AMCPCommand): Promise<SendResult>;
    private _processQueue;
    private _checkTimeouts;
}
//# sourceMappingURL=api.d.ts.map