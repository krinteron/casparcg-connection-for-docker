import { AMCPCommand, Commands } from './commands'
import { sendCommand, ResponseTypes } from './connection'

export interface Options {
	/** Host name of the machine to connect to. Defaults to 127.0.0.1 */
	host?: string
	/** Port number to connect to. Defaults to 5250 */
	port?: number
	/** Minimum amount of time before a request is considered to be timed out */
	cmdTimeoutTime?: number
}

export type SendResult =
	| {
			error: Error
			request: undefined
	  }
	| {
			error: undefined
			request: Promise<Response>
	  }

export interface Response {
	reqId?: string
	command: Commands
	responseCode: number
	data: any[]

	type: ResponseTypes
	message: string
}

export interface ServerSettings {
	host: string
	port: number
	cmdTimeoutTime: number
}

export class BasicCasparCGAPI {
	private _host: string
	private _port: number
	private _cmdTimeoutTime: number

	constructor(options?: Options) {
		this._host = options?.host || '127.0.0.1'
		this._port = options?.port || 5250
		this._cmdTimeoutTime = options?.cmdTimeoutTime || 5000
	}

	async executeCommand(command: AMCPCommand): Promise<SendResult> {
		const serverPath: ServerSettings = {
			port: this._port,
			host: this._host,
			cmdTimeoutTime: this._cmdTimeoutTime,
		}
		return sendCommand(serverPath, command)
	}
}
