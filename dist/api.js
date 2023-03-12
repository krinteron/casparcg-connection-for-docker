"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCasparCGAPI = void 0;
const eventemitter3_1 = require("eventemitter3");
const commands_1 = require("./commands");
const connection_1 = require("./connection");
class BasicCasparCGAPI extends eventemitter3_1.EventEmitter {
    constructor(options) {
        super();
        this._requestQueue = [];
        this._host = options?.host || '127.0.0.1';
        this._port = options?.port || 5250;
        this._connection = new connection_1.Connection(this._host, this._port, !(options?.autoConnect === false));
        this._connection.on('connect', () => {
            this.executeCommand({ command: commands_1.Commands.Version, params: {} })
                .then(async ({ request, error }) => {
                if (error) {
                    throw error;
                }
                const result = await request;
                const version = await result.data[0];
                this._connection.version = version.version;
            })
                .catch((e) => this.emit('error', e))
                .finally(() => this.emit('connect'));
            this._processQueue().catch((e) => this.emit('error', e));
        });
        this._connection.on('disconnect', () => this.emit('disconnect'));
        this._connection.on('data', (response) => {
            const request = this._requestQueue.find((req) => req.requestId === response.reqId);
            if (request) {
                request.resolve(response);
                this._requestQueue = this._requestQueue.filter((req) => req.requestId !== response.reqId);
            }
            this._processQueue().catch((e) => this.emit('error', e));
        });
        this._timeoutTime = options?.timeoutTime || 5000;
        this._timeoutTimer = setInterval(() => this._checkTimeouts(), this._timeoutTime);
    }
    get host() {
        return this._host;
    }
    set host(host) {
        this._host = host;
        this._connection.changeConnection(this._host, this._port);
    }
    get port() {
        return this._port;
    }
    set port(port) {
        this._port = port;
        this._connection.changeConnection(this._host, this._port);
    }
    get connected() {
        return this._connection.connected;
    }
    connect(host, port) {
        this._host = host ? host : this._host;
        this._port = port ? port : this._port;
        this._connection.changeConnection(this._host, this._port);
    }
    disconnect() {
        this._connection.disconnect();
        this._requestQueue.forEach((r) => {
            if (r.processed) {
                r.reject(new Error('Disconnected before response was received'));
            }
            else {
                r.sentResolve({ request: undefined, error: new Error('Disconnected before response was received') });
            }
        });
    }
    /** Stops internal timers so that the class is ready for garbage disposal */
    discard() {
        this._connection.disconnect();
        clearInterval(this._timeoutTimer);
    }
    /**
     * Sends a command to CasparCG
     * @return { error: Error } if there was an error when sending the command (such as being disconnected)
     * @return { request: Promise<Response> } a Promise that resolves when CasparCG replies after a command has been sent.
     * If this throws, there's something seriously wrong :)
     */
    async executeCommand(command) {
        const reqId = Math.random().toString(35).slice(2, 7);
        let outerResolve = () => null;
        const s = new Promise((resolve) => {
            outerResolve = resolve;
        });
        const internalRequest = {
            requestId: reqId,
            command,
            // stubs to be replaced
            resolve: () => null,
            reject: () => null,
            processed: false,
            sentResolve: outerResolve,
        };
        this._requestQueue.push(internalRequest);
        this._processQueue().catch((e) => this.emit('error', e));
        return s;
    }
    async _processQueue() {
        if (this._requestQueue.length < 1)
            return;
        this._requestQueue.forEach((r) => {
            if (!r.processed) {
                this._connection
                    .sendCommand(r.command, r.requestId)
                    .then((sendError) => {
                    if (sendError) {
                        this._requestQueue = this._requestQueue.filter((req) => req !== r);
                        r.sentResolve({ error: sendError, request: undefined });
                    }
                    else {
                        const request = new Promise((resolve, reject) => {
                            r.resolve = resolve;
                            r.reject = reject;
                        });
                        r.sentTime = Date.now();
                        r.sentResolve({ error: undefined, request });
                    }
                })
                    .catch((e) => {
                    r.sentResolve({ error: Error(e), request: undefined });
                    r.reject(new Error(e));
                    this._requestQueue = this._requestQueue.filter((req) => req !== r);
                });
                r.processed = true;
                r.processedTime = Date.now();
            }
        });
    }
    _checkTimeouts() {
        const deadRequests = this._requestQueue.filter((req) => req.processed && req.processedTime && req.processedTime < Date.now() - this._timeoutTime);
        deadRequests.forEach((req) => {
            // req.reject(new Error('Time out'))
            // req.sentResolve({ request: undefined, error: new Error('Time out') })
            req.sentResolve({ request: new Promise((resolve) => resolve), error: undefined });
        });
        this._requestQueue = this._requestQueue.filter((req) => !deadRequests.includes(req));
    }
}
exports.BasicCasparCGAPI = BasicCasparCGAPI;
//# sourceMappingURL=api.js.map