import { NodeSpace } from 'cc';
import { Contact2DType } from 'cc';
import { IPhysics2DContact } from 'cc';
import { Collider2D } from 'cc';
import { BoxCollider2D } from 'cc';
import { Vec3 } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_ADUDIO_CLIP, ENUM_COLLIDER_TAG, ENUM_O3_STATUS } from '../../Enum';
import { v3 } from 'cc';
import { tween } from 'cc';
import { v2 } from 'cc';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('O3')
export class O3 extends Component {
    @property(BoxCollider2D)
    objectCollider: BoxCollider2D = null;

    @property(BoxCollider2D)
    viewCollider: BoxCollider2D = null;

    private _status : ENUM_O3_STATUS = ENUM_O3_STATUS.IDLE;
    private _rightLane : boolean;

    protected onLoad(): void {
        this.viewCollider.on(Contact2DType.BEGIN_CONTACT,this.inViewColliderHandle,this);
    }

    protected start(): void {
        this._rightLane = this.node.parent.position.x > 0;        
    }

    private inViewColliderHandle(self: Collider2D,other: Collider2D, contact: IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER && this._status === ENUM_O3_STATUS.IDLE){
            GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.CREATURE_BIRDBAT);
            this._status = ENUM_O3_STATUS.FLY
            let x = 340;
            const actMoveFarLeft = tween(this.node).by(1,{position: v3(-x*2,0)});
            const actMoveRight = tween(this.node).by(1,{position: v3(x,0)});
            const actMoveFarRight = tween(this.node).by(1,{position: v3(x*2,0)});
            const actMoveLeft = tween(this.node).by(1,{position: v3(-x,0)});
            let listAction = [actMoveFarLeft,actMoveFarRight,actMoveLeft,actMoveRight].sort((a,b)=>Math.random());
            tween(this.node)
            .then(listAction[0])
            .delay(1)
            .then(listAction[1])
            .delay(1)
            .then(listAction[2])
            .delay(1)
            .then(listAction[3])
            .delay(1)
            .start();
        }
    }
}


