import { Commands } from './commands'
import { XMLValidator, XMLParser } from 'fast-xml-parser'
import { Version } from './enums'

const deserializeClipInfo = (line: string) => {
	const groups = line.match(/"([\s\S]*)" +(MOVIE|STILL|AUDIO) +([\s\S]*)/i)

	if (!groups) {
		return undefined
	}

	const data = groups[3].split(' ')

	return {
		clip: groups[1],
		type: groups[2],
		size: data[0],
		datetime: data[1],
		frames: data[2],
		framerate: data[3],
	}
}

const parserXML = new XMLParser()

const deserializeInfo = async (line: string): Promise<any> => {
	return Promise.resolve().then(() => {
		if (line === '') return ''
		const isXML = line.startsWith('<?xml')
		const isValidXML = XMLValidator.validate(line, {
			allowBooleanAttributes: true,
		})
		if (isXML && isValidXML === true) {
			// parse as xml
			return parserXML.parse(line)
		}
		throw new Error('XML is corrupted')
	})
}

const deserializeVersion = (line: string): any => {
	let version = Version.Unsupported
	const v = line.split('.')
	const major = Number(v[0])
	const minor = Number(v[1])

	if (major <= 2) {
		if (minor === 1) {
			version = Version.v21x
		} else if (minor === 2) {
			version = Version.v22x
		} else if (minor >= 3) {
			// just parse anything newer as v2.3 as it's most likely closest
			version = Version.v23x
		}
	} else {
		version = Version.v23x
	}

	return {
		version,
		fullVersion: line,
	}
}

export const deserializers: Record<string, (data: string[]) => Promise<(Record<string, any> | undefined)[]>> = {
	[Commands.Cls]: async (data: string[]) => data.map(deserializeClipInfo),
	[Commands.Cinf]: async (data: string[]) => [deserializeClipInfo(data[0])],
	[Commands.Info]: async (data: string[]) => Promise.all(data.map(deserializeInfo)),
	[Commands.Version]: async (data: string[]) => [deserializeVersion(data[0])],
}
