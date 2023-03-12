"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializersV21 = exports.serializers = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const commands_1 = require("./commands");
const enums_1 = require("./enums");
const commandNameSerializer = (command) => command;
const splitCommandSerializer = (command) => command.split(' ')[0];
const splitCommandKeywordSerializer = (command) => command.split(' ')[1];
const channelSerializer = (_command, { channel }) => channel + '';
const channelLayerSerializer = (_command, { channel, layer }) => `${channel}-${layer}`;
const channelLayer2Serializer = (_command, { channel2, layer2 }) => `${channel2}-${layer2}`;
const channelLayerOptSerializer = (_command, { channel, layer }) => channel + (layer ? '-' + layer : '');
const channelOptLayerOptSerializer = (_command, { channel, layer }) => (channel ? channel + (layer ? '-' + layer : '') : '');
const clipCommandSerializer = (_command, { clip, loop, inPoint, seek, length, clearOn404 }) => (clip ? `"${clip}"` : '') +
    (loop ? ' LOOP' : '') +
    (inPoint ? ' IN ' + inPoint : '') +
    (seek ? ' SEEK ' + seek : '') +
    (length ? ' LENGTH ' + length : '') +
    (clearOn404 ? ' CLEAR_ON_404' : '');
const decklinkCommandSerializer = (_, { device, format }) => 'DECKLINK ' + device + (format ? ' FORMAT ' + format : '');
const htmlCommandSerializerr = (_, { url }) => '[html] ' + url;
const routeCommandSerializer = (_, { route, mode, framesDelay }) => 'route://' +
    route.channel +
    (route.layer !== undefined ? '-' + route.layer : '') +
    (mode ? '  ' + mode : '') +
    (framesDelay ? 'BUFFER ' + framesDelay : '');
const producerOptionsSerializer = (_, { vFilter, aFilter }) => {
    return [vFilter ? 'VFILTER ' + vFilter : undefined, aFilter ? 'AFILTER ' + aFilter : undefined]
        .filter((p) => p !== undefined)
        .join(' ');
};
const producerV21Serializer = (_, { channelLayout, vFilter }) => {
    return [vFilter ? 'FILTER ' + vFilter : undefined, channelLayout ? 'CHANNEL_LAYOUT ' + channelLayout : undefined]
        .filter((p) => p !== undefined)
        .join(' ');
};
const transitionOptSerializer = (_command, { transition }) => (transition && transitionSerializer(transition)) || '';
const transitionSerializer = ({ transitionType, duration, tween, direction, stingProperties, }) => {
    if (transitionType === enums_1.TransitionType.Sting) {
        const params = {
            MASK: stingProperties?.maskFile,
            OVERLAY: stingProperties?.overlayFile,
            TRIGGER_POINT: stingProperties?.delay,
            AUDIO_FADE_START: stingProperties?.audioFadeStart,
            AUDIO_FADE_DURATION: stingProperties?.audioFadeDuration,
        };
        return ('STING (' +
            Object.entries(params)
                .filter(([_, v]) => v !== undefined && v !== null)
                .map(([k, v]) => k + '=' + v)
                .join(' ') +
            ')');
    }
    else {
        return [transitionType, duration, tween, direction].filter((p) => p !== undefined).join(' ');
    }
};
const callAttributeSerializer = (_, { param, value }) => param + (value !== undefined ? ' ' + value : '');
const consumerSerializer = (_, { consumer, parameters }) => consumer + ' ' + parameters;
const removeSerializer = (_, { consumer }) => consumer + '';
const cgLayerSerializer = (_, { cgLayer }) => cgLayer + '';
const cgDataSerializer = (_, { data }) => {
    if (!data) {
        return '';
    }
    else if (typeof data === 'string') {
        return data;
    }
    else {
        return JSON.stringify(data);
    }
};
const mixerTweenSerializer = (_, { tween, duration }) => (tween ? tween + ' ' + duration : '');
const mixerSimpleValueSerializer = (_, { value }) => value !== undefined ? (typeof value === 'boolean' ? (value ? '1' : '0') : value + '') : '';
const optional = (fn) => (command, params) => {
    const keys = Object.keys(params);
    if (keys.length > 2) {
        return fn(command, params);
    }
    else {
        return '';
    }
};
exports.serializers = {
    [commands_1.Commands.Loadbg]: [
        commandNameSerializer,
        channelLayerSerializer,
        clipCommandSerializer,
        (_, { auto }) => (auto ? 'AUTO' : ''),
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.LoadbgDecklink]: [
        splitCommandSerializer,
        channelLayerSerializer,
        decklinkCommandSerializer,
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.LoadbgHtml]: [
        splitCommandSerializer,
        channelLayerSerializer,
        htmlCommandSerializerr,
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.LoadbgRoute]: [
        splitCommandSerializer,
        channelLayerSerializer,
        routeCommandSerializer,
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.Load]: [
        commandNameSerializer,
        channelLayerSerializer,
        clipCommandSerializer,
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.Play]: [
        commandNameSerializer,
        channelLayerSerializer,
        clipCommandSerializer,
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.PlayDecklink]: [
        splitCommandSerializer,
        channelLayerSerializer,
        decklinkCommandSerializer,
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.PlayHtml]: [
        splitCommandSerializer,
        channelLayerSerializer,
        htmlCommandSerializerr,
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.PlayRoute]: [
        splitCommandSerializer,
        channelLayerSerializer,
        routeCommandSerializer,
        producerOptionsSerializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.Pause]: [commandNameSerializer, channelLayerSerializer],
    [commands_1.Commands.Resume]: [commandNameSerializer, channelLayerSerializer],
    [commands_1.Commands.Stop]: [commandNameSerializer, channelLayerSerializer],
    [commands_1.Commands.Clear]: [commandNameSerializer, channelLayerOptSerializer],
    [commands_1.Commands.Call]: [commandNameSerializer, channelLayerSerializer, callAttributeSerializer],
    [commands_1.Commands.Swap]: [commandNameSerializer, channelLayerSerializer, channelLayer2Serializer],
    [commands_1.Commands.Add]: [commandNameSerializer, channelSerializer, consumerSerializer],
    [commands_1.Commands.Remove]: [commandNameSerializer, channelSerializer, removeSerializer],
    [commands_1.Commands.Print]: [commandNameSerializer, channelSerializer],
    [commands_1.Commands.LogLevel]: [commandNameSerializer, (_, { level }) => level],
    [commands_1.Commands.LogCategory]: [
        commandNameSerializer,
        (_, { category, enable }) => category + '' + (enable ? '1' : '0'),
    ],
    [commands_1.Commands.Set]: [
        commandNameSerializer,
        channelSerializer,
        (_, { variable, value }) => variable + ' ' + value,
    ],
    [commands_1.Commands.Lock]: [
        commandNameSerializer,
        channelSerializer,
        (_, { action, secret }) => action + (secret ? ' ' + secret : ''),
    ],
    [commands_1.Commands.DataStore]: [commandNameSerializer, (_, { name, data }) => name + ' ' + data],
    [commands_1.Commands.DataRetrieve]: [commandNameSerializer, (_, { name }) => name],
    [commands_1.Commands.DataList]: [commandNameSerializer, (_, { subDirectory }) => subDirectory || ''],
    [commands_1.Commands.DataRemove]: [commandNameSerializer, (_, { name }) => name],
    [commands_1.Commands.CgAdd]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        cgLayerSerializer,
        (_, { template, playOnLoad }) => `${template} ${playOnLoad}`,
        cgDataSerializer,
    ],
    [commands_1.Commands.CgPlay]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        cgLayerSerializer,
    ],
    [commands_1.Commands.CgStop]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        cgLayerSerializer,
    ],
    [commands_1.Commands.CgNext]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        cgLayerSerializer,
    ],
    [commands_1.Commands.CgRemove]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        cgLayerSerializer,
    ],
    [commands_1.Commands.CgClear]: [splitCommandSerializer, channelLayerSerializer, splitCommandKeywordSerializer],
    [commands_1.Commands.CgUpdate]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        cgLayerSerializer,
        cgDataSerializer,
    ],
    [commands_1.Commands.CgInvoke]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        cgLayerSerializer,
        (_, { method }) => method,
    ],
    [commands_1.Commands.CgInfo]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        cgLayerSerializer,
    ],
    [commands_1.Commands.MixerKeyer]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        (_, { keyer }) => (keyer ? '1' : '0'),
    ],
    [commands_1.Commands.MixerChroma]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        optional((_, params) => `${params.enable ? 1 : 0} ${params.targetHue} ${params.hueWidth} ${params.minSaturation} ${params.minBrightness} ${params.softness} ${params.spillSuppress} ${params.spillSuppressSaturation} ${params.showMask}`),
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerBlend]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
    ],
    [commands_1.Commands.MixerInvert]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
    ],
    [commands_1.Commands.MixerOpacity]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerBrightness]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerSaturation]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerContrast]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerLevels]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        optional((_, params) => [params.minInput, params.maxInput, params.gamma, params.minOutput, params.maxOutput].join(' ')),
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerFill]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        optional((_, params) => [params.x, params.y, params.xScale, params.yScale].join(' ')),
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerClip]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        optional((_, params) => [params.x, params.y, params.width, params.height].join(' ')),
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerAnchor]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        optional((_, params) => [params.x, params.y].join(' ')),
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerCrop]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        optional((_, params) => [params.left, params.top, params.right, params.bottom].join(' ')),
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerRotation]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerPerspective]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        optional((_, params) => [
            params.topLeftX,
            params.topLeftY,
            params.topRightX,
            params.topRightY,
            params.bottomRightX,
            params.bottomRightY,
            params.bottomLeftX,
            params.bottomLeftY,
        ].join(' ')),
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerMipmap]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
    ],
    [commands_1.Commands.MixerVolume]: [
        splitCommandSerializer,
        channelLayerSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerMastervolume]: [
        splitCommandSerializer,
        channelSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerStraightAlphaOutput]: [
        splitCommandSerializer,
        channelSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
    ],
    [commands_1.Commands.MixerGrid]: [
        splitCommandSerializer,
        channelSerializer,
        splitCommandKeywordSerializer,
        mixerSimpleValueSerializer,
        mixerTweenSerializer,
    ],
    [commands_1.Commands.MixerCommit]: [splitCommandSerializer, channelSerializer, splitCommandKeywordSerializer],
    [commands_1.Commands.MixerClear]: [splitCommandSerializer, channelLayerOptSerializer, splitCommandKeywordSerializer],
    [commands_1.Commands.ChannelGrid]: [commandNameSerializer],
    [commands_1.Commands.ThumbnailList]: [commandNameSerializer, (_, { subDirectory }) => subDirectory],
    [commands_1.Commands.ThumbnailRetrieve]: [commandNameSerializer, (_, { filename }) => filename],
    [commands_1.Commands.ThumbnailGenerate]: [commandNameSerializer, (_, { filename }) => filename],
    [commands_1.Commands.ThumbnailGenerateAll]: [commandNameSerializer],
    [commands_1.Commands.Cinf]: [commandNameSerializer, (_, { filename }) => filename],
    [commands_1.Commands.Cls]: [commandNameSerializer, (_, { subDirectory }) => subDirectory],
    [commands_1.Commands.Fls]: [commandNameSerializer],
    [commands_1.Commands.Tls]: [commandNameSerializer, (_, { subDirectory }) => subDirectory],
    [commands_1.Commands.Version]: [commandNameSerializer],
    [commands_1.Commands.Info]: [commandNameSerializer, channelOptLayerOptSerializer],
    [commands_1.Commands.InfoTemplate]: [commandNameSerializer, (_, { template }) => template],
    [commands_1.Commands.InfoConfig]: [commandNameSerializer],
    [commands_1.Commands.InfoPaths]: [commandNameSerializer],
    [commands_1.Commands.InfoSystem]: [commandNameSerializer],
    [commands_1.Commands.InfoServer]: [commandNameSerializer],
    [commands_1.Commands.InfoQueues]: [commandNameSerializer],
    [commands_1.Commands.InfoThreads]: [commandNameSerializer],
    [commands_1.Commands.InfoDelay]: [commandNameSerializer, channelLayerOptSerializer],
    [commands_1.Commands.Diag]: [commandNameSerializer],
    [commands_1.Commands.GlInfo]: [commandNameSerializer],
    [commands_1.Commands.GlGc]: [commandNameSerializer],
    [commands_1.Commands.Bye]: [commandNameSerializer],
    [commands_1.Commands.Kill]: [commandNameSerializer],
    [commands_1.Commands.Restart]: [commandNameSerializer],
};
exports.serializersV21 = {
    ...exports.serializers,
    [commands_1.Commands.Loadbg]: [
        commandNameSerializer,
        channelLayerSerializer,
        clipCommandSerializer,
        (_, { auto }) => (auto ? 'AUTO' : ''),
        producerV21Serializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.LoadbgDecklink]: [
        splitCommandSerializer,
        channelLayerSerializer,
        decklinkCommandSerializer,
        producerV21Serializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.LoadbgHtml]: [
        splitCommandSerializer,
        channelLayerSerializer,
        htmlCommandSerializerr,
        producerV21Serializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.LoadbgRoute]: [
        splitCommandSerializer,
        channelLayerSerializer,
        routeCommandSerializer,
        producerV21Serializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.Load]: [
        commandNameSerializer,
        channelLayerSerializer,
        clipCommandSerializer,
        producerV21Serializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.Play]: [
        commandNameSerializer,
        channelLayerSerializer,
        clipCommandSerializer,
        producerV21Serializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.PlayDecklink]: [
        splitCommandSerializer,
        channelLayerSerializer,
        decklinkCommandSerializer,
        producerV21Serializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.PlayHtml]: [
        splitCommandSerializer,
        channelLayerSerializer,
        htmlCommandSerializerr,
        producerV21Serializer,
        transitionOptSerializer,
    ],
    [commands_1.Commands.PlayRoute]: [
        splitCommandSerializer,
        channelLayerSerializer,
        routeCommandSerializer,
        producerV21Serializer,
        transitionOptSerializer,
    ],
};
//# sourceMappingURL=serializers.js.map