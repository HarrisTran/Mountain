import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_COLLIDER_TAG } from '../../Enum';
import { CCInteger } from 'cc';
import { Contact2DType } from 'cc';
import { Collider2D, IPhysics2DContact, Label } from 'cc';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Booster')
export class Booster extends Component {
    @property(CCInteger)
    protected timeLength: number;

    private timerTimePassed : number = 0;
    protected active : boolean = false;

    protected onLoad(): void {
        this.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    protected update(dt: number): void {
        if(this.active)
        {
            this.timerTimePassed += dt;
            if(this.timerTimePassed >= this.timeLength)
            {
                this.timerTimePassed = 0;
                this.active = false;
            }
        }
        console.log(this.active);
        
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact : IPhysics2DContact)
    {
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            this.active = true;
            this.node.active = false;
        }
    }
}




