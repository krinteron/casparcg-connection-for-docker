import { EventEmitter } from 'eventemitter3';
import { Response } from './api';
import { AMCPCommand } from './commands';
import { Version } from './enums';
export declare enum ResponseTypes {
    Info = "INFO",
    OK = "OK",
    ClientError = "ERROR",
    ServerError = "FAILED"
}
export type ConnectionEvents = {
    data: [response: Response];
    connect: [];
    disconnect: [];
    error: [error: Error];
};
export declare class Connection extends EventEmitter<ConnectionEvents> {
    private host;
    private port;
    private _socket?;
    private _reconnectTimeout?;
    private _connected;
    private _version;
    private _chunk;
    constructor(host: string, port: number, autoConnect: boolean);
    get connected(): boolean;
    set version(version: Version);
    changeConnection(host: string, port?: number): void;
    disconnect(): void;
    sendCommand(cmd: AMCPCommand, reqId?: string): Promise<Error | undefined>;
    private _processIncomingData;
    private _triggerReconnect;
    private _setupSocket;
    private _setConnected;
    private _serializeCommand;
    private _getVersionedSerializers;
    private _getVersionedDeserializers;
}
//# sourceMappingURL=connection.d.ts.map