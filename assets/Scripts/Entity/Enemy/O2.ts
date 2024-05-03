import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, HingeJoint2D, IPhysics2DContact } from 'cc';
import { ENUM_COLLIDER_TAG } from '../../Enum';
import { tween } from 'cc';
import { Node } from 'cc';
import { v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('O2')
export class O2 extends Component {

    @property(BoxCollider2D)
    viewCollider: BoxCollider2D = null;

    @property(Node)
    tree: Node = null;

    protected onLoad(): void {
        this.viewCollider.on(Contact2DType.BEGIN_CONTACT,this.inViewColliderHandle,this);
    }

    private inViewColliderHandle(self: Collider2D, other: Collider2D,contact: IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            if(this.node.parent.position.x > 0){
                tween(this.tree)
                .to(1,{eulerAngles: v3(0,0,90)})
                .start()
            }
            else{
                tween(this.tree)
                .to(1,{eulerAngles: v3(0,0,-90)})
                .start()
            }
        }
    }
    
}


