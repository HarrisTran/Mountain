import { Animation, Contact2DType, tween, v2, v3 } from 'cc';
import { Sprite } from 'cc';
import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_ADUDIO_CLIP, ENUM_COLLIDER_TAG, ENUM_GAME_EVENT } from '../../Enum';
import { Collider2D, IPhysics2DContact } from 'cc';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('T3')
export class T3 extends Component {
    @property(BoxCollider2D)
    trapCollider: BoxCollider2D = null;

    @property(BoxCollider2D)
    viewCollider: BoxCollider2D = null;

    @property(Animation)
    warningSymbol: Animation = null;

    protected onLoad(): void {
        this.viewCollider.on(Contact2DType.BEGIN_CONTACT,this.inViewColliderHandle,this);
        this.viewCollider.on(Contact2DType.END_CONTACT,this.outViewColliderHandle,this);
    }


    private inViewColliderHandle(self: Collider2D, other: Collider2D, contact: IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            
            this.warningSymbol.node.active = true;
            this.warningSymbol.play("warning_appear")
            

            GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.ACTIVE_LIGHTNING)
        }
    }

    private outViewColliderHandle(self: Collider2D, other: Collider2D, contact: IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            this.warningSymbol.node.active = false;
            this.warningSymbol.play("warning_disappear")
        }
    }

    protected onDestroy(): void {
        this.viewCollider.off(Contact2DType.BEGIN_CONTACT,this.inViewColliderHandle,this);
        this.viewCollider.off(Contact2DType.END_CONTACT,this.outViewColliderHandle,this);
    }
    
}


