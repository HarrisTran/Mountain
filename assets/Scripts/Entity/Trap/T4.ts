import { Contact2DType } from 'cc';
import { Collider2D, IPhysics2DContact } from 'cc';
import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_ADUDIO_CLIP, ENUM_COLLIDER_TAG, ENUM_GAME_EVENT } from '../../Enum';
import { RigidBody2D } from 'cc';
import { ERigidBody2DType } from 'cc';
import { Vec2 } from 'cc';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('T4')
export class T4 extends Component {
    @property(BoxCollider2D)
    trapCollider: BoxCollider2D = null;

    @property(BoxCollider2D)
    viewCollider: BoxCollider2D = null;

    protected onLoad(): void {
        this.viewCollider.on(Contact2DType.BEGIN_CONTACT,this.viewColliderHandle,this);
    }


    private viewColliderHandle(self: Collider2D, other: Collider2D, contact: IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.ACTIVE_STALACTILE)
            this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0,-20);
        }
    }

    protected onDestroy(): void {
        this.viewCollider.off(Contact2DType.BEGIN_CONTACT,this.viewColliderHandle,this);
    }
}


