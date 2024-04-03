import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_COLLIDER_TAG } from '../../Enum';
import { CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Booster')
export class Booster extends Component {
    @property(CCInteger)
    protected timeLength: number;

    private timerTimePassed : number = 0;
    protected active : boolean = false;

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
    }

    protected onCollisionEnter (other: BoxCollider2D, self: BoxCollider2D) {
        if(other.tag == ENUM_COLLIDER_TAG.PLAYER)
        {
            console.log(123);
            
            this.active = true;
            this.node.active = false;
        }
    }
}


