import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../../Manager/GameManager';
import { ENUM_GAME_STATUS, MAIN_GAMESTATE } from '../../Enum';
const { ccclass, property } = _decorator;

@ccclass('O4')
export class O4 extends Component {
    @property(Node)
    hand: Node = null;

    private _speed: number = 200;
    private _radian: number = 0;

    protected update(dt: number): void {
        if(GameManager.instance.state === MAIN_GAMESTATE.START){
            this._radian += dt * (this._speed / 100);
            let angle = this._radian / (Math.PI / 180);
            this.hand.angle = angle;
        }
    }
}


