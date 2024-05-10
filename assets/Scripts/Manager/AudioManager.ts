import { _decorator, AudioClip, AudioSource, Component, director, Node, resources } from 'cc';
import { ENUM_ADUDIO_CLIP } from '../Enum';
const { ccclass, property } = _decorator;


@ccclass('AudioManager')
export class AudioManager extends Component {

    @property(AudioSource)
    private soundSource: AudioSource = null;

    @property(AudioSource)
    private musicSource: AudioSource = null;

    @property([AudioClip])
    private audioLibrary : AudioClip[] = [];

    @property(Node)
    private soundButton : Node = null;

    private _audioClipSet: { [key: string]: AudioClip } = {};

    private _isMute = false;

    protected onLoad(): void {
        this.audioLibrary.forEach(audio => {
            this._audioClipSet[audio.name] = audio;
        })
    }
  
    public toggleMute(): boolean {
        this._isMute = !this._isMute;
        this.soundButton.active = !this._isMute;
        this.setMute(this._isMute);
        return this._isMute;
    }

    public setMute(mute: boolean) {
        this._isMute = mute;
        if(this.soundSource.clip){
            this.soundSource.volume = mute ? 0 : 1;
        }
        if(this.musicSource.clip){
            this.musicSource.volume = mute ? 0 : 1;
        }
    }

    public playBGM(volume = 1, loop = true) {
        this.musicSource.stop();
        this.musicSource.clip = this._audioClipSet["BGM"];
        this.musicSource.play();
    }

    public playSfx(audioClipName: ENUM_ADUDIO_CLIP, volume = 1, loop = false) {
        
        this.soundSource.clip = this._audioClipSet[audioClipName];
        this.soundSource.volume = volume;
        this.soundSource.loop = loop;
        if(loop) return;
        this.soundSource.play();
    }

}


