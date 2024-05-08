import { _decorator, CCInteger, Collider2D, Component, Contact2DType, IPhysics2DContact, ParticleSystem } from 'cc';
import { ENUM_ADUDIO_CLIP, ENUM_COLLIDER_TAG } from '../Enum';
import { DestroyableNode } from './DestroyableNode';
import { GameManager } from '../Manager/GameManager';
import { tween } from 'cc';
import { math } from 'cc';
import { Vec3 } from 'cc';
import PoolManager from '../Manager/PoolManager';
import { delay, playParticleSystemRecursively } from '../Utils';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Component {
    @property(ParticleSystem)
    claimEffect: ParticleSystem = null;

    private _picked: boolean = false;
    
    protected onLoad(): void {
        this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    async onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact) {
        if (other.tag === ENUM_COLLIDER_TAG.PLAYER) {
            playParticleSystemRecursively(this.claimEffect);
            GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.COIN);
            await delay(100);
            this.node.getComponent(DestroyableNode).isDestroyable = true;
        }

        if(other.tag === ENUM_COLLIDER_TAG.Magnet){
            this._picked = true;
        }
    }

    protected update(dt: number){
        if(this._picked){
            let playerTarget = GameManager.instance.player.getWorldPosition();
            let a = this.node.worldPosition.lerp(playerTarget,dt*5);
            this.node.setWorldPosition(a);
            
        }
    }


}


