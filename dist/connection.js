"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = exports.ResponseTypes = void 0;
const eventemitter3_1 = require("eventemitter3");
const net_1 = require("net");
const deserializers_1 = require("./deserializers");
const enums_1 = require("./enums");
const serializers_1 = require("./serializers");
const RESPONSE_REGEX = /(RES (?<ReqId>.+) )?(?<ResponseCode>\d{3}) ((?<Action>.+) )?(OK|ERROR|FAILED)/i;
var ResponseTypes;
(function (ResponseTypes) {
    ResponseTypes["Info"] = "INFO";
    ResponseTypes["OK"] = "OK";
    ResponseTypes["ClientError"] = "ERROR";
    ResponseTypes["ServerError"] = "FAILED";
})(ResponseTypes = exports.ResponseTypes || (exports.ResponseTypes = {}));
const RESPONSES = {
    100: {
        type: ResponseTypes.Info,
        message: 'Information about an event.',
    },
    101: {
        type: ResponseTypes.Info,
        message: 'Information about an event. A line of data is being returned.',
    },
    200: {
        type: ResponseTypes.OK,
        message: 'The command has been executed and several lines of data are being returned',
    },
    201: {
        type: ResponseTypes.OK,
        message: 'The command has been executed and data is being returned.',
    },
    202: {
        type: ResponseTypes.OK,
        message: 'The command has been executed.',
    },
    400: {
        type: ResponseTypes.ClientError,
        message: 'Command not understood and data is being returned.',
    },
    401: {
        type: ResponseTypes.ClientError,
        message: 'Illegal video_channel',
    },
    402: {
        type: ResponseTypes.ClientError,
        message: 'Parameter missing',
    },
    403: {
        type: ResponseTypes.ClientError,
        message: 'Illegal parameter',
    },
    404: {
        type: ResponseTypes.ClientError,
        message: 'Media file not found',
    },
    500: {
        type: ResponseTypes.ServerError,
        message: 'Internal server error',
    },
    501: {
        type: ResponseTypes.ServerError,
        message: 'Internal server error',
    },
    502: {
        type: ResponseTypes.ServerError,
        message: 'Media file unreadable',
    },
    503: {
        type: ResponseTypes.ServerError,
        message: 'Access error',
    },
};
class Connection extends eventemitter3_1.EventEmitter {
    constructor(host, port = 5250, autoConnect) {
        super();
        this.host = host;
        this.port = port;
        this._connected = false;
        this._version = enums_1.Version.v23x;
        this._chunk = '';
        if (autoConnect)
            this._setupSocket();
    }
    get connected() {
        return this._connected;
    }
    set version(version) {
        this._version = version;
    }
    changeConnection(host, port = 5250) {
        this.host = host;
        this.port = port;
        this._socket?.end();
        this._setupSocket();
    }
    disconnect() {
        this._socket?.end();
    }
    async sendCommand(cmd, reqId) {
        if (!cmd.command)
            throw new Error('No command specified');
        if (!cmd.params)
            throw new Error('No parameters specified');
        const payload = this._serializeCommand(cmd, reqId);
        return new Promise((r) => {
            this._socket?.write(payload + '\r\n', (e) => (e ? r(e) : r(undefined)));
        });
    }
    async _processIncomingData(data) {
        const string = data.toString('utf-8');
        let newLines = string.split('\r\n');
        let result = RESPONSE_REGEX.exec(newLines[0]);
        let responseCode = result && result?.groups?.['ResponseCode'] ? parseInt(result?.groups?.['ResponseCode']) : 0;
        if (responseCode && data.length === 1460) {
            this._chunk = string;
            return;
        }
        if (!responseCode) {
            if (!this._chunk)
                return;
            const input = this._chunk + string;
            this._chunk = '';
            newLines = input.split('\r\n');
            result = RESPONSE_REGEX.exec(newLines[0]);
            responseCode = result && result?.groups?.['ResponseCode'] ? parseInt(result?.groups?.['ResponseCode']) : 0;
        }
        if (result && result?.groups?.['ResponseCode']) {
            const response = {
                reqId: result?.groups?.['ReqId'],
                command: result?.groups?.['Action'],
                responseCode,
                data: [],
                ...RESPONSES[responseCode],
            };
            if (response.responseCode === 200) {
                response.data = newLines.slice(1);
            }
            if ([201, 400].includes(responseCode)) {
                response.data = [newLines[1]];
                const deserializers = this._getVersionedDeserializers();
                if (deserializers[response.command] && response.data.length) {
                    response.data = await deserializers[response.command](response.data);
                }
            }
            this.emit('data', response);
        }
    }
    _triggerReconnect() {
        if (!this._reconnectTimeout) {
            this._reconnectTimeout = setTimeout(() => {
                this._reconnectTimeout = undefined;
                if (!this._connected)
                    this._setupSocket();
            }, 5000);
        }
    }
    _setupSocket() {
        if (this._socket) {
            this._socket.removeAllListeners();
            if (!this._socket.destroyed) {
                this._socket.destroy();
            }
        }
        this._socket = new net_1.Socket();
        this._socket.setEncoding('utf-8');
        this._socket.on('data', (data) => {
            this._processIncomingData(data).catch((e) => this.emit('error', e));
        });
        this._socket.on('connect', () => {
            this._setConnected(true);
        });
        this._socket.on('close', () => {
            this._setConnected(false);
            this._triggerReconnect();
        });
        this._socket.on('error', (e) => {
            if (`${e}`.match(/ECONNREFUSED/)) {
                // Unable to connect, no need to handle this error
                this._setConnected(false);
            }
            else {
                this.emit('error', e);
            }
        });
        this._socket.connect(this.port, this.host);
    }
    _setConnected(connected) {
        if (connected) {
            if (!this._connected) {
                this._connected = true;
                this.emit('connect');
            }
        }
        else {
            if (this._connected) {
                this._connected = false;
                this.emit('disconnect');
            }
        }
    }
    _serializeCommand(cmd, reqId) {
        const serializers = this._getVersionedSerializers();
        // use a cheeky type assertion here to easen up a bit, TS doesn't let us use just cmd.command
        const serializer = serializers[cmd.command];
        let payload = serializer
            .map((fn) => fn(cmd.command, cmd.params).trim())
            .filter((p) => p !== '')
            .join(' ');
        if (reqId)
            payload = 'REQ ' + reqId + ' ' + payload;
        return payload;
    }
    _getVersionedSerializers() {
        if (this._version <= enums_1.Version.v21x) {
            return serializers_1.serializersV21;
        }
        return serializers_1.serializers;
    }
    _getVersionedDeserializers() {
        return deserializers_1.deserializers;
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map