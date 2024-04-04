import { Input } from 'cc';
import { KeyCode } from 'cc';
import { easing } from 'cc';
import { CCInteger } from 'cc';
import { Vec3 } from 'cc';
import { EventKeyboard } from 'cc';
import { input } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { MAIN_GAMESTATE, Speed } from '../Enum';
const { ccclass, property } = _decorator;


@ccclass('PlayerControl')
export class PlayerControl extends Component {

    private _position: Vec3 = new Vec3();
    private _speed : number = Speed;

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onKeyDown(event: EventKeyboard) : void {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this._position.add3f(-340,10,0)
                break;
            case KeyCode.KEY_D:
                this._position.add3f(340,10,0)
                break;
            default:
                break;
        }
        this.node.setPosition(this._position);
    }

    public updateSpeed(){
        this._speed = Speed*2;
    }

    private onKeyUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_A:

                break;
            case KeyCode.KEY_D:

                break;
            default:
                break;
        }
    }


    start() {

    }

    update(dt: number) {
        if(GameManager.instance.state === MAIN_GAMESTATE.INIT) return;
        this._position.add3f(0,dt*this._speed,0);
        let currentPos = this.node.getPosition();
        
        this._position = currentPos.lerp(this._position,dt);
        this.node.setPosition(this._position)
    }
}


