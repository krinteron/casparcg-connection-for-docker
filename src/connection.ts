import { Socket } from 'net'
import type { Response, ServerSettings } from './api'
import { AMCPCommand, Commands } from './commands'
import { deserializers } from './deserializers'
import { serializers, serializersV21 } from './serializers'
import { Version } from './enums'

const version = Version.v23x
const RESPONSE_REGEX = /(RES (?<ReqId>.+) )?(?<ResponseCode>\d{3}) ((?<Action>.+) )?(OK|ERROR|FAILED)/i

export enum ResponseTypes {
	Info = 'INFO',
	OK = 'OK',
	ClientError = 'ERROR',
	ServerError = 'FAILED',
}

interface romanType {
	[key: number]: any
}

const RESPONSES: romanType = {
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
}
const serializeCommand = (cmd: AMCPCommand, reqId?: string): string => {
	const serializers = getVersionedSerializers()

	// use a cheeky type assertion here to easen up a bit, TS doesn't let us use just cmd.command
	const serializer = serializers[cmd.command] as ((c: AMCPCommand['command'], p: AMCPCommand['params']) => string)[]
	let payload = serializer
		.map((fn) => fn(cmd.command, cmd.params).trim())
		.filter((p) => p !== '')
		.join(' ')

	if (reqId) payload = 'REQ ' + reqId + ' ' + payload

	return payload
}

const getVersionedSerializers = () => {
	if (version <= Version.v21x) {
		return serializersV21
	}
	return serializers
}

const getVersionedDeserializers = () => {
	return deserializers
}
export const sendCommand = async (server: ServerSettings, cmd: AMCPCommand): Promise<any> => {
	if (!cmd.command) throw new Error('No command specified')
	if (!cmd.params) throw new Error('No parameters specified')
	const reqId = Math.random().toString(35).slice(2, 7)
	const payload = serializeCommand(cmd, reqId)
	const message: string[] = []
	let timeoutId: NodeJS.Timeout
	const socket = new Socket()
	socket.setEncoding('utf-8')

	return new Promise((resolve, reject) => {
		socket.on('connect', () => {
			socket.write(payload + '\r\n', (e) => {
				if (e) reject(e)
			})
		})
		socket.on('error', (e) => reject(e))
		socket.on('data', (data) => {
			void (async () => {
				const string = data.toString('utf-8')
				message.push(string)
				clearTimeout(timeoutId)
				const newLines = message.join('').trim().split('\r\n')
				const result = RESPONSE_REGEX.exec(newLines[0])
				const responseCode =
					result && result?.groups?.['ResponseCode'] ? parseInt(result?.groups?.['ResponseCode']) : 0
				const response: Response = {
					reqId: result?.groups?.['ReqId'],
					command: result?.groups?.['Action'] as Commands,
					responseCode,
					data: newLines.slice(1),
					...RESPONSES[responseCode],
				}
				if ([200].includes(responseCode)) {
					return resolve(response)
				} else if ([201, 202, 400].includes(responseCode)) {
					const deserializers = getVersionedDeserializers()
					if (deserializers[response.command] && response.data.length) {
						try {
							response.data = await deserializers[response.command](response.data)
							return resolve(response)
						} catch (e) {
							timeoutId = setTimeout(() => {
								return reject('Time Out')
							}, server.cmdTimeoutTime)
						}
					} else return resolve(response)
				} else return reject(RESPONSES[responseCode])
			})()
		})
		socket.connect(server.port, server.host)
	})
		.catch((error) => {
			throw error
		})
		.finally(() => socket.destroy())
}
