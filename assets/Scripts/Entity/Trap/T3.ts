import { Contact2DType } from 'cc';
import { Sprite } from 'cc';
import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_COLLIDER_TAG, ENUM_GAME_EVENT } from '../../Enum';
import { Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('T3')
export class T3 extends Component {
    @property(BoxCollider2D)
    trapCollider: BoxCollider2D = null;

    @property(BoxCollider2D)
    viewCollider: BoxCollider2D = null;

    @property(Sprite)
    warningSymbol: Sprite = null;

    protected onLoad(): void {
        this.viewCollider.on(Contact2DType.BEGIN_CONTACT,this.inViewColliderHandle,this);
        this.viewCollider.on(Contact2DType.END_CONTACT,this.outViewColliderHandle,this);
    }

    protected start(): void {
        this.warningSymbol.node.active = false;
    }
    

    private inViewColliderHandle(self: Collider2D, other: Collider2D, contact: IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            this.warningSymbol.node.active = true;
        }
    }

    private outViewColliderHandle(self: Collider2D, other: Collider2D, contact: IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            this.warningSymbol.node.active = false;
        }
    }

    protected onDestroy(): void {
        this.viewCollider.off(Contact2DType.BEGIN_CONTACT,this.inViewColliderHandle,this);
        this.viewCollider.off(Contact2DType.END_CONTACT,this.outViewColliderHandle,this);
    }
    
}


