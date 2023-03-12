"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasparCG = void 0;
const api_1 = require("./api");
const commands_1 = require("./commands");
class CasparCG extends api_1.BasicCasparCGAPI {
    async loadbg(params) {
        return this.executeCommand({
            command: commands_1.Commands.Loadbg,
            params,
        });
    }
    async load(params) {
        return this.executeCommand({
            command: commands_1.Commands.Load,
            params,
        });
    }
    async play(params) {
        return this.executeCommand({
            command: commands_1.Commands.Play,
            params,
        });
    }
    async pause(params) {
        return this.executeCommand({
            command: commands_1.Commands.Pause,
            params,
        });
    }
    async resume(params) {
        return this.executeCommand({
            command: commands_1.Commands.Resume,
            params,
        });
    }
    async stop(params) {
        return this.executeCommand({
            command: commands_1.Commands.Stop,
            params,
        });
    }
    async clear(params) {
        return this.executeCommand({
            command: commands_1.Commands.Clear,
            params,
        });
    }
    async call(params) {
        return this.executeCommand({
            command: commands_1.Commands.Call,
            params,
        });
    }
    async swap(params) {
        return this.executeCommand({
            command: commands_1.Commands.Swap,
            params,
        });
    }
    async add(params) {
        return this.executeCommand({
            command: commands_1.Commands.Add,
            params,
        });
    }
    async remove(params) {
        return this.executeCommand({
            command: commands_1.Commands.Remove,
            params,
        });
    }
    async print(params) {
        return this.executeCommand({
            command: commands_1.Commands.Print,
            params,
        });
    }
    async logLevel(params) {
        return this.executeCommand({
            command: commands_1.Commands.LogLevel,
            params,
        });
    }
    async logCategory(params) {
        return this.executeCommand({
            command: commands_1.Commands.LogCategory,
            params,
        });
    }
    async set(params) {
        return this.executeCommand({
            command: commands_1.Commands.Set,
            params,
        });
    }
    async lock(params) {
        return this.executeCommand({
            command: commands_1.Commands.Lock,
            params,
        });
    }
    async dataStore(params) {
        return this.executeCommand({
            command: commands_1.Commands.DataStore,
            params,
        });
    }
    async dataRetrieve(params) {
        return this.executeCommand({
            command: commands_1.Commands.DataRetrieve,
            params,
        });
    }
    async dataList(params) {
        return this.executeCommand({
            command: commands_1.Commands.DataList,
            params,
        });
    }
    async dataRemove(params) {
        return this.executeCommand({
            command: commands_1.Commands.DataRemove,
            params,
        });
    }
    async cgAdd(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgAdd,
            params,
        });
    }
    async cgPlay(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgPlay,
            params,
        });
    }
    async cgStop(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgStop,
            params,
        });
    }
    async cgNext(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgNext,
            params,
        });
    }
    async cgRemove(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgRemove,
            params,
        });
    }
    async cgClear(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgClear,
            params,
        });
    }
    async cgUpdate(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgUpdate,
            params,
        });
    }
    async cgInvoke(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgInvoke,
            params,
        });
    }
    async cgInfo(params) {
        return this.executeCommand({
            command: commands_1.Commands.CgInfo,
            params,
        });
    }
    async mixerKeyer(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerKeyer,
            params,
        });
    }
    async mixerChroma(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerChroma,
            params,
        });
    }
    async mixerBlend(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerBlend,
            params,
        });
    }
    async mixerInvert(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerInvert,
            params,
        });
    }
    async mixerOpacity(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerOpacity,
            params,
        });
    }
    async mixerBrightness(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerBrightness,
            params,
        });
    }
    async mixerSaturation(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerSaturation,
            params,
        });
    }
    async mixerContrast(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerContrast,
            params,
        });
    }
    async mixerLevels(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerLevels,
            params,
        });
    }
    async mixerFill(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerFill,
            params,
        });
    }
    async mixerClip(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerClip,
            params,
        });
    }
    async mixerAnchor(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerAnchor,
            params,
        });
    }
    async mixerCrop(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerCrop,
            params,
        });
    }
    async mixerRotation(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerRotation,
            params,
        });
    }
    async mixerPerspective(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerPerspective,
            params,
        });
    }
    async mixerMipmap(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerMipmap,
            params,
        });
    }
    async mixerVolume(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerVolume,
            params,
        });
    }
    async mixerMastervolume(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerMastervolume,
            params,
        });
    }
    async mixerStraightAlphaOutput(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerStraightAlphaOutput,
            params,
        });
    }
    async mixerGrid(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerGrid,
            params,
        });
    }
    async mixerCommit(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerCommit,
            params,
        });
    }
    async mixerClear(params) {
        return this.executeCommand({
            command: commands_1.Commands.MixerClear,
            params,
        });
    }
    async channelGrid(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.ChannelGrid,
            params,
        });
    }
    async thumbnailList(params) {
        return this.executeCommand({
            command: commands_1.Commands.ThumbnailList,
            params,
        });
    }
    async thumbnailRetrieve(params) {
        return this.executeCommand({
            command: commands_1.Commands.ThumbnailRetrieve,
            params,
        });
    }
    async thumbnailGenerate(params) {
        return this.executeCommand({
            command: commands_1.Commands.ThumbnailGenerate,
            params,
        });
    }
    async thumbnailGenerateAll(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.ThumbnailGenerateAll,
            params,
        });
    }
    async cinf(params) {
        return this.executeCommand({
            command: commands_1.Commands.Cinf,
            params,
        });
    }
    async cls(params) {
        return this.executeCommand({
            command: commands_1.Commands.Cls,
            params,
        });
    }
    async fls(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.Fls,
            params,
        });
    }
    async tls(params) {
        return this.executeCommand({
            command: commands_1.Commands.Tls,
            params,
        });
    }
    async version(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.Version,
            params,
        });
    }
    async info(params) {
        return this.executeCommand({
            command: commands_1.Commands.Info,
            params,
        });
    }
    async infoTemplate(params) {
        return this.executeCommand({
            command: commands_1.Commands.InfoTemplate,
            params,
        });
    }
    async infoConfig(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.InfoConfig,
            params,
        });
    }
    async infoPaths(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.InfoPaths,
            params,
        });
    }
    async infoSystem(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.InfoSystem,
            params,
        });
    }
    async infoServer(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.InfoServer,
            params,
        });
    }
    async infoQueues(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.InfoQueues,
            params,
        });
    }
    async infoThreads(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.InfoThreads,
            params,
        });
    }
    async infoDelay(params) {
        return this.executeCommand({
            command: commands_1.Commands.InfoDelay,
            params,
        });
    }
    async diag(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.Diag,
            params,
        });
    }
    async glInfo(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.GlInfo,
            params,
        });
    }
    async glGc(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.GlGc,
            params,
        });
    }
    async bye(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.Bye,
            params,
        });
    }
    async kill(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.Kill,
            params,
        });
    }
    async restart(params = {}) {
        return this.executeCommand({
            command: commands_1.Commands.Restart,
            params,
        });
    }
}
exports.CasparCG = CasparCG;
//# sourceMappingURL=CasparCG.js.map