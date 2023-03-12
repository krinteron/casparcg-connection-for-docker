"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializers = void 0;
const commands_1 = require("./commands");
const xml2js_1 = require("xml2js");
const enums_1 = require("./enums");
const deserializeClipInfo = (line) => {
    const groups = line.match(/"([\s\S]*)" +(MOVIE|STILL|AUDIO) +([\s\S]*)/i);
    if (!groups) {
        return undefined;
    }
    const data = groups[3].split(' ');
    return {
        clip: groups[1],
        type: groups[2],
        size: data[0],
        datetime: data[1],
        frames: data[2],
        framerate: data[3],
    };
};
const deserializeXML = async (line) => {
    return await (0, xml2js_1.parseStringPromise)(line); // todo - this seems to get stuck when we pass it non-xml
};
const deserializeInfo = async (line) => {
    if (line.startsWith('<?xml')) {
        // parse as xml
        return deserializeXML(line);
    }
    // parse as generic info (no params)
    const info = line.match(/(?<ChannelNo>\d) (?<Format>\d+(?<Interlaced>p|i)(?<Channelrate>\d+)) .*/i);
    if (info) {
        return {
            channel: info.groups?.ChannelNo,
            format: info.groups?.Format,
            channelRate: parseInt(info.groups?.Channelrate || '') / 100,
            frameRate: parseInt(info.groups?.Channelrate || '') / 100,
            interlaced: info.groups?.Interlaced === 'i',
        };
    }
    // no idea what it is - just return
    return line;
};
const deserializeVersion = (line) => {
    let version = enums_1.Version.Unsupported;
    const v = line.split('.');
    const major = Number(v[0]);
    const minor = Number(v[1]);
    if (major <= 2) {
        if (minor === 1) {
            version = enums_1.Version.v21x;
        }
        else if (minor === 2) {
            version = enums_1.Version.v22x;
        }
        else if (minor >= 3) {
            // just parse anything newer as v2.3 as it's most likely closest
            version = enums_1.Version.v23x;
        }
    }
    else {
        version = enums_1.Version.v23x;
    }
    return {
        version,
        fullVersion: line,
    };
};
exports.deserializers = {
    [commands_1.Commands.Cls]: async (data) => data.map(deserializeClipInfo),
    [commands_1.Commands.Cinf]: async (data) => [deserializeClipInfo(data[0])],
    [commands_1.Commands.Info]: async (data) => Promise.all(data.map(deserializeInfo)),
    [commands_1.Commands.Version]: async (data) => [deserializeVersion(data[0])],
};
//# sourceMappingURL=deserializers.js.map