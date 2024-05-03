import { Contact2DType, game } from 'cc';
import { IPhysics2DContact } from 'cc';
import { Collider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_COLLIDER_TAG, ENUM_GAME_EVENT } from '../../Enum';
import { Color } from 'cc';
import { Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('T2')
export class T2 extends Component {
    private _playerInTrap : boolean = false;
    private _trapTimer: number = 0;
    private _trapDuration: number =  0.2;
    private _changedColor: boolean = false;

    

    protected onLoad(): void {
        let collider = this.node.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact,this);
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact) {
        if (other.tag === ENUM_COLLIDER_TAG.PLAYER) {
            this._playerInTrap = true;
            this._trapTimer = 0;
            this._changedColor = false;
        }
    }

    onEndContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            this._playerInTrap = false;
            this._trapTimer = 0;
            this.node.getComponent(Sprite).color = Color.WHITE
        }
    }

    protected update(dt: number): void {
        if(this._playerInTrap){
            this._trapTimer += dt
            if(this._trapTimer >= this._trapDuration && !this._changedColor){
                this.node.getComponent(Sprite).color = Color.RED
                game.emit(ENUM_GAME_EVENT.PLAYER_FALL);
                this._changedColor = true
            }
        }
    }
}


