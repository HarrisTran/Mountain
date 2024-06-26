import { _decorator, Animation, Component, EventKeyboard, game, input, Input, KeyCode, ProgressBar, RealCurve, tween, v3, Vec3 } from "cc";
import { ENUM_ADUDIO_CLIP, ENUM_GAME_EVENT, ENUM_PLAYER_STATUS, Speed } from '../Enum';
import { GameManager } from '../Manager/GameManager';
import { ClimbHepler, MOVE_STATE } from "./ClimbHepler";
import { Player } from "./Player";
import { Tutorial } from "./Tutorial";
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Tutorial)
    tutorial: Tutorial = null;

    @property(ClimbHepler)
    climbHepler : ClimbHepler = null;

    @property(Animation)
    animationMotion: Animation = null;

    @property({type: RealCurve, visible : true})
    jumpCurve: RealCurve = new RealCurve();

    @property(ProgressBar)
    energyProgressBar: ProgressBar = null;


    private _position: Vec3 = new Vec3(0,-2000);
    private _speed: number = Speed;
    private _status: ENUM_PLAYER_STATUS;

    private _power: number = 0;

    private _timeEnd = 0;
    private _timeStart = 0;
    private _timeActivate = 300;

    private _maxPower: number = 10;

    public get status(){
        return this._status;
    }

    public set status(value : ENUM_PLAYER_STATUS){
        this._status = value;
    }

    protected onLoad(): void {
        game.on(ENUM_GAME_EVENT.PLAYER_FALL, this.playerFalling, this);
        game.on(ENUM_GAME_EVENT.GAME_OVER,this.onPlayerDie,this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    protected lateUpdate(dt: number): void {
        this.node.position = this.node.position.clampf(
            new Vec3(-400, this.node.position.y - 1000),
            new Vec3(400, this.node.position.y + 1000)
        )

        
    }

    public onRightSwipe(){
        if (this._status === ENUM_PLAYER_STATUS.JUMP || this._status === ENUM_PLAYER_STATUS.FALL) return;
        this._status = ENUM_PLAYER_STATUS.JUMP;
        GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.PLAYER_JUMP_01)
        if(!this.tutorial.swipeRightDone) {
            this.tutorial.hide();
            this.tutorial.swipeRightDone = true;
        }
        this._position.add3f(400, 0, 0)

        tween(this.node)
        .to(0.67,{position: this._position},
            {
                easing : k => this.jumpCurve.evaluate(k),
                onComplete: () => {
                    this._status = ENUM_PLAYER_STATUS.CLIMB
                    this.animationMotion.play("climb")
                }
            })
        .start();
        this.animationMotion.play("jump_right")
        // await delay(500);
        // this.animationMotion.play("climb")
        // this._status = ENUM_PLAYER_STATUS.CLIMB;
    }

    private onPlayerDie(){
        this.unscheduleAllCallbacks();
        this.animationMotion.stop();
        this.animationMotion.play("dead");
        
        this._status = ENUM_PLAYER_STATUS.DEAD;
    }


    public onLeftSwipe(){
        if (this._status === ENUM_PLAYER_STATUS.JUMP || this._status === ENUM_PLAYER_STATUS.FALL) return;
        this._status = ENUM_PLAYER_STATUS.JUMP;
        GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.PLAYER_JUMP_02)
        if(!this.tutorial.swipeLeftDone) {
            this.tutorial.hide();
            this.tutorial.swipeLeftDone = true;
        }
        this._position.add3f(-400, 0, 0)
        tween(this.node)
        .to(0.67,{position: this._position, },
            {
                easing : k => this.jumpCurve.evaluate(k), 
                onComplete: () => {
                    this._status = ENUM_PLAYER_STATUS.CLIMB
                    this.animationMotion.play("climb")
                }
            })
        .start();
        this.animationMotion.play("jump_left")
        // await delay(500);
        // this._status = ENUM_PLAYER_STATUS.CLIMB;
    }


    private playerFalling(): void {
        if (this.node.getComponent(Player).isShieldActive) return;
        this._status = ENUM_PLAYER_STATUS.FALL;
        GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.PLAYER_SLIP)
        tween(this.node)
            .by(1.5, { position: v3(0, -150 * 5) }, {
                easing: "cubicInOut", onComplete: () => {
                    this._status = ENUM_PLAYER_STATUS.CLIMB
                }
            })
            .call(()=>{
                this._position = this.node.getPosition();
            })
            .start();
    }

    public playerFast(){
        this._timeStart = this._timeEnd;
        this._timeEnd = Date.now();
        if (this._timeEnd - this._timeStart <= this._timeActivate) {
            if(!this.tutorial.doubleClickDone) {
                this.tutorial.hide();
                this.tutorial.doubleClickDone = true;
            }
            this._power = Math.min(this._power + 1.5, this._maxPower);
            this.energyProgressBar.progress = this._power/this._maxPower;
        }
    }

    private onKeyDown(event: EventKeyboard): void {
        if(this._status == ENUM_PLAYER_STATUS.IDLE) return;
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.onLeftSwipe()
                break;
            case KeyCode.KEY_D:
                this.onRightSwipe()
                break;
            case KeyCode.SPACE:
                this.playerFast();
                break;
            default:
                break;
        }
    }

    public updateSpeed() {
        this._speed = Speed * 2;
    }

    public resetSpeed() {
        this._speed = Speed;
    }

    start() {
        this.animationMotion.stop();
        this.status = ENUM_PLAYER_STATUS.IDLE;
    }

    startMove(){
        this.animationMotion.play("climb")
        this.status = ENUM_PLAYER_STATUS.CLIMB;
    }


    update(dt: number) {
        if(this.status == ENUM_PLAYER_STATUS.CLIMB){
            this._power = Math.max(0, this._power - 6 * dt);
            this.energyProgressBar.progress = this._power/this._maxPower;
            if(this.climbHepler.moveState === MOVE_STATE.MOVE){
                this._position.add3f(0, dt * this._speed * (1 + this._power * 2 / this._maxPower), 0);
                let currentPos = this.node.getPosition();
                this._position = currentPos.lerp(this._position, dt);
                this.node.setPosition(this._position);
            }
        }
    }

}


