import { _decorator, animation, Component, EventKeyboard, game, input, Input, KeyCode, RealCurve, tween, v3, Vec3 } from "cc";
import { ENUM_GAME_EVENT, ENUM_PLAYER_STATUS, MAIN_GAMESTATE, Speed } from '../Enum';
import { GameManager } from '../Manager/GameManager';
import { Player } from "./Player";
const { ccclass, property } = _decorator;



@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(animation.AnimationController)
    animationController: animation.AnimationController = null;

    @property({type: RealCurve, visible : true})
    jumpCurve: RealCurve = new RealCurve();

    private _position: Vec3 = new Vec3();
    private _speed: number = Speed;
    private _status: ENUM_PLAYER_STATUS;

    private _power: number = 0;

    private _timeEnd = 0;
    private _timeStart = 0;
    private _timeActivate = 300;

    private _maxPower: number = 10;

    // private _isPressed: boolean = false;

    protected onLoad(): void {
        game.on(ENUM_GAME_EVENT.PLAYER_FALL, this.playerFalling, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }


    public onRightSwipe(): void {
        if (this._position.x >= 340) return;
        this._status = ENUM_PLAYER_STATUS.JUMP;
        this._position.add3f(340, 0, 0)
        tween(this.node)
        .to(0.8,{position: this._position},{easing : k => this.jumpCurve.evaluate(k),onComplete: () => this._status = ENUM_PLAYER_STATUS.CLIMB})
        .start();
        this.animationController.setValue('jump', true);
        this.animationController.setValue('Horizontal', 1);
    }

    public onLeftSwipe(): void {
        if (this._position.x <= -340) return;
        this._status = ENUM_PLAYER_STATUS.JUMP;
        this._position.add3f(-340, 0, 0)
        tween(this.node)
        .to(0.8,{position: this._position},{easing : k => this.jumpCurve.evaluate(k), onComplete: () => this._status = ENUM_PLAYER_STATUS.CLIMB})
        .start();
        this.animationController.setValue('jump', true);
        this.animationController.setValue('Horizontal', -1);
    }


    private playerFalling(): void {
        if (this.node.getComponent(Player).isShieldActive) return;
        this._status = ENUM_PLAYER_STATUS.FALL;
        tween(this.node)
            .by(1.5, { position: v3(0, -150 * 7) }, {
                easing: "cubicInOut", onComplete: () => {
                    this._status = ENUM_PLAYER_STATUS.CLIMB
                }
            })
            .start();
    }

    public playerFast(){
        this._timeStart = this._timeEnd;
        this._timeEnd = Date.now();
        if (this._timeEnd - this._timeStart <= this._timeActivate) {
            this._power = Math.min(this._power + 1.5, this._maxPower);
        }
    }

    private onKeyDown(event: EventKeyboard): void {
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
        this._status = ENUM_PLAYER_STATUS.CLIMB;
    }

    update(dt: number) {
        if (GameManager.instance.state == MAIN_GAMESTATE.START) {
            if (this._status != ENUM_PLAYER_STATUS.CLIMB) return;

            this._power = Math.max(0, this._power - 6 * dt);

            this._position.add3f(0, dt * this._speed * (1 + this._power * 5 / this._maxPower), 0);
            let currentPos = this.node.getPosition();

            this._position = currentPos.lerp(this._position, dt);
            this.node.setPosition(this._position)
        }
    }

}


