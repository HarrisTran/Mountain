import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../../Manager/GameManager';
import { Booster } from './Booster';
const { ccclass, property } = _decorator;

@ccclass('B4')
export class B4 extends Booster {
    protected update(dt: number): void {
        super.update(dt);
        GameManager.instance.playerDataManager.activeHelmetBooster(this.active)
    }

    protected onCollisionEnter (other: BoxCollider2D, self: BoxCollider2D) {
        super.onCollisionEnter(other, self);
    }
}


