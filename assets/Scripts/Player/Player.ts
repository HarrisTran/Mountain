import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_COLLIDER_TAG } from '../Enum';
import { GameManager } from '../Manager/GameManager';
import { Label } from 'cc';
import { PhysicsSystem2D, Contact2DType } from 'cc';
import { IPhysics2DContact } from 'cc';
import { Collider2D } from 'cc';
import { Coin } from '../Entity/Coin';
import { x2Booster } from '../Entity/Booster/x2Booster';
import { HelmetBooster } from '../Entity/Booster/HelmetBooster';
import { MagnetBooster } from '../Entity/Booster/MagnetBooster';
import { SpeedUpBooster } from '../Entity/Booster/SpeedUpBooster';
import { MagicPocketBooster } from '../Entity/Booster/MagicPocketBooster';
import { PlayerControl } from './PlayerControl';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private _scoreMultiplier: number = 1;

    protected onLoad(): void {
        this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact : IPhysics2DContact)
    {
        let data = GameManager.instance.playerDataManager
        switch (other.tag) {
            case ENUM_COLLIDER_TAG.B1:
                data.addScore(5*this._scoreMultiplier);
                break;
            case ENUM_COLLIDER_TAG.B2:
                data.addScore(50*this._scoreMultiplier);
                break;
            case ENUM_COLLIDER_TAG.B3:
                other.node.active = false;
                data.addBooster(new x2Booster())
                break;
            case ENUM_COLLIDER_TAG.B4:
                other.node.active = false;
                data.addBooster(new HelmetBooster())
                break;
            case ENUM_COLLIDER_TAG.B5:
                other.node.active = false;
                data.addBooster(new MagnetBooster())
                break;
            case ENUM_COLLIDER_TAG.B6:
                other.node.active = false;
                data.addBooster(new SpeedUpBooster())
                break;
            case ENUM_COLLIDER_TAG.B7:
                other.node.active = false;
                data.addBooster(new MagicPocketBooster())
                break;
            default:
                break;
        }
    }

    protected update(dt: number): void {
        for(let booster of GameManager.instance.playerDataManager.getActiveBoosters()){
            booster.duration -= dt;
            if(booster.duration <= 0){
                GameManager.instance.playerDataManager.removeBooster(booster)
            }
        }
        if(GameManager.instance.playerDataManager.getActiveBoosters().length > 0) return;
        for(let booster of GameManager.instance.playerDataManager.getActiveBoosters()){
            if(booster instanceof HelmetBooster){

            }
            if(booster instanceof MagicPocketBooster){

            }
            if(booster instanceof SpeedUpBooster){
                this.getComponent(PlayerControl).updateSpeed();
            }
            if(booster instanceof MagnetBooster){

            }
            if(booster instanceof x2Booster){
                this._scoreMultiplier = 2;
            }
        }
    }

    
}


