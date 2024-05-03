import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact } from 'cc';
import { ENUM_COLLIDER_TAG, ENUM_GAME_EVENT } from '../../Enum';
import { RigidBody2D } from 'cc';
import { ERigidBody2DType } from 'cc';
import { tween } from 'cc';
import { Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('T5')
export class T5 extends Component {
    @property(BoxCollider2D)
    selfCollider: BoxCollider2D = null;

    @property(BoxCollider2D)
    viewCollider: BoxCollider2D = null;

    protected onLoad(): void {
        this.viewCollider.on(Contact2DType.BEGIN_CONTACT,this.viewColliderHandle,this);
    }


    private viewColliderHandle(self: Collider2D, other: Collider2D, contact : IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0,-20);
        }
    }
    


    protected onDestroy(): void {
        this.viewCollider.off(Contact2DType.BEGIN_CONTACT,this.viewColliderHandle,this);
    }

    
}


