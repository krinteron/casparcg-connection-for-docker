import { BasicCasparCGAPI, Response } from './api'
import { Commands } from './commands'
import {
	LoadbgParameters,
	LoadParameters,
	PlayParameters,
	PlayHtmlParameters,
	PauseParameters,
	ResumeParameters,
	StopParameters,
	ClearParameters,
	CallParameters,
	SwapParameters,
	AddParameters,
	RemoveParameters,
	PrintParameters,
	LogLevelParameters,
	LogCategoryParameters,
	SetParameters,
	LockParameters,
	DataStoreParameters,
	DataRetrieveParameters,
	DataListParameters,
	DataRemoveParameters,
	CgAddParameters,
	CgPlayParameters,
	CgStopParameters,
	CgNextParameters,
	CgRemoveParameters,
	CgClearParameters,
	CgUpdateParameters,
	CgInvokeParameters,
	CgInfoParameters,
	MixerKeyerParameters,
	MixerChromaParameters,
	MixerBlendParameters,
	MixerInvertParameters,
	MixerOpacityParameters,
	MixerBrightnessParameters,
	MixerSaturationParameters,
	MixerContrastParameters,
	MixerLevelsParameters,
	MixerFillParameters,
	MixerClipParameters,
	MixerAnchorParameters,
	MixerCropParameters,
	MixerRotationParameters,
	MixerPerspectiveParameters,
	MixerMipmapParameters,
	MixerVolumeParameters,
	MixerMastervolumeParameters,
	MixerStraightAlphaOutputParameters,
	MixerGridParameters,
	MixerCommitParameters,
	MixerClearParameters,
	ChannelGridParameters,
	ThumbnailListParameters,
	ThumbnailRetrieveParameters,
	ThumbnailGenerateParameters,
	ThumbnailGenerateAllParameters,
	CinfParameters,
	ClsParameters,
	FlsParameters,
	TlsParameters,
	VersionParameters,
	InfoParameters,
	InfoTemplateParameters,
	InfoConfigParameters,
	InfoPathsParameters,
	InfoSystemParameters,
	InfoServerParameters,
	InfoQueuesParameters,
	InfoThreadsParameters,
	InfoDelayParameters,
	DiagParameters,
	GlInfoParameters,
	GlGcParameters,
	ByeParameters,
	KillParameters,
	RestartParameters,
} from './parameters'

export class CasparCG extends BasicCasparCGAPI {
	async loadbg(params: LoadbgParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Loadbg,
			params,
		})
	}
	async load(params: LoadParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Load,
			params,
		})
	}
	async play(params: PlayParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Play,
			params,
		})
	}
	async playHtml(params: PlayHtmlParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.PlayHtml,
			params,
		})
	}
	async pause(params: PauseParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Pause,
			params,
		})
	}
	async resume(params: ResumeParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Resume,
			params,
		})
	}
	async stop(params: StopParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Stop,
			params,
		})
	}
	async clear(params: ClearParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Clear,
			params,
		})
	}
	async call(params: CallParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Call,
			params,
		})
	}
	async swap(params: SwapParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Swap,
			params,
		})
	}
	async add(params: AddParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Add,
			params,
		})
	}
	async remove(params: RemoveParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Remove,
			params,
		})
	}
	async print(params: PrintParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Print,
			params,
		})
	}
	async logLevel(params: LogLevelParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.LogLevel,
			params,
		})
	}
	async logCategory(params: LogCategoryParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.LogCategory,
			params,
		})
	}
	async set(params: SetParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Set,
			params,
		})
	}
	async lock(params: LockParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Lock,
			params,
		})
	}
	async dataStore(params: DataStoreParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.DataStore,
			params,
		})
	}
	async dataRetrieve(params: DataRetrieveParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.DataRetrieve,
			params,
		})
	}
	async dataList(params: DataListParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.DataList,
			params,
		})
	}
	async dataRemove(params: DataRemoveParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.DataRemove,
			params,
		})
	}
	async cgAdd(params: CgAddParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgAdd,
			params,
		})
	}
	async cgPlay(params: CgPlayParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgPlay,
			params,
		})
	}
	async cgStop(params: CgStopParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgStop,
			params,
		})
	}
	async cgNext(params: CgNextParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgNext,
			params,
		})
	}
	async cgRemove(params: CgRemoveParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgRemove,
			params,
		})
	}
	async cgClear(params: CgClearParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgClear,
			params,
		})
	}
	async cgUpdate(params: CgUpdateParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgUpdate,
			params,
		})
	}
	async cgInvoke(params: CgInvokeParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgInvoke,
			params,
		})
	}
	async cgInfo(params: CgInfoParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.CgInfo,
			params,
		})
	}
	async mixerKeyer(params: MixerKeyerParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerKeyer,
			params,
		})
	}
	async mixerChroma(params: MixerChromaParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerChroma,
			params,
		})
	}
	async mixerBlend(params: MixerBlendParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerBlend,
			params,
		})
	}
	async mixerInvert(params: MixerInvertParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerInvert,
			params,
		})
	}
	async mixerOpacity(params: MixerOpacityParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerOpacity,
			params,
		})
	}
	async mixerBrightness(params: MixerBrightnessParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerBrightness,
			params,
		})
	}
	async mixerSaturation(params: MixerSaturationParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerSaturation,
			params,
		})
	}
	async mixerContrast(params: MixerContrastParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerContrast,
			params,
		})
	}
	async mixerLevels(params: MixerLevelsParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerLevels,
			params,
		})
	}
	async mixerFill(params: MixerFillParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerFill,
			params,
		})
	}
	async mixerClip(params: MixerClipParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerClip,
			params,
		})
	}
	async mixerAnchor(params: MixerAnchorParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerAnchor,
			params,
		})
	}
	async mixerCrop(params: MixerCropParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerCrop,
			params,
		})
	}
	async mixerRotation(params: MixerRotationParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerRotation,
			params,
		})
	}
	async mixerPerspective(params: MixerPerspectiveParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerPerspective,
			params,
		})
	}
	async mixerMipmap(params: MixerMipmapParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerMipmap,
			params,
		})
	}
	async mixerVolume(params: MixerVolumeParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerVolume,
			params,
		})
	}
	async mixerMastervolume(params: MixerMastervolumeParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerMastervolume,
			params,
		})
	}
	async mixerStraightAlphaOutput(params: MixerStraightAlphaOutputParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerStraightAlphaOutput,
			params,
		})
	}
	async mixerGrid(params: MixerGridParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerGrid,
			params,
		})
	}
	async mixerCommit(params: MixerCommitParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerCommit,
			params,
		})
	}
	async mixerClear(params: MixerClearParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.MixerClear,
			params,
		})
	}
	async channelGrid(params: ChannelGridParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.ChannelGrid,
			params,
		})
	}
	async thumbnailList(params: ThumbnailListParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.ThumbnailList,
			params,
		})
	}
	async thumbnailRetrieve(params: ThumbnailRetrieveParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.ThumbnailRetrieve,
			params,
		})
	}
	async thumbnailGenerate(params: ThumbnailGenerateParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.ThumbnailGenerate,
			params,
		})
	}
	async thumbnailGenerateAll(params: ThumbnailGenerateAllParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.ThumbnailGenerateAll,
			params,
		})
	}
	async cinf(params: CinfParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Cinf,
			params,
		})
	}
	async cls(params: ClsParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Cls,
			params,
		})
	}
	async fls(params: FlsParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.Fls,
			params,
		})
	}
	async tls(params: TlsParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Tls,
			params,
		})
	}
	async version(params: VersionParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.Version,
			params,
		})
	}
	async info(params: InfoParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.Info,
			params,
		})
	}
	async infoTemplate(params: InfoTemplateParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.InfoTemplate,
			params,
		})
	}
	async infoConfig(params: InfoConfigParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.InfoConfig,
			params,
		})
	}
	async infoPaths(params: InfoPathsParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.InfoPaths,
			params,
		})
	}
	async infoSystem(params: InfoSystemParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.InfoSystem,
			params,
		})
	}
	async infoServer(params: InfoServerParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.InfoServer,
			params,
		})
	}
	async infoQueues(params: InfoQueuesParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.InfoQueues,
			params,
		})
	}
	async infoThreads(params: InfoThreadsParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.InfoThreads,
			params,
		})
	}
	async infoDelay(params: InfoDelayParameters): Promise<Response> {
		return this.executeCommand({
			command: Commands.InfoDelay,
			params,
		})
	}
	async diag(params: DiagParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.Diag,
			params,
		})
	}
	async glInfo(params: GlInfoParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.GlInfo,
			params,
		})
	}
	async glGc(params: GlGcParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.GlGc,
			params,
		})
	}
	async bye(params: ByeParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.Bye,
			params,
		})
	}
	async kill(params: KillParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.Kill,
			params,
		})
	}
	async restart(params: RestartParameters = {}): Promise<Response> {
		return this.executeCommand({
			command: Commands.Restart,
			params,
		})
	}
}
