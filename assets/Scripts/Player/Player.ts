import { Collider2D, Component, Contact2DType, IPhysics2DContact, _decorator, game } from "cc";
import { HelmetBooster } from "../Entity/Booster/HelmetBooster";
import { MagicPocketBooster } from "../Entity/Booster/MagicPocketBooster";
import { MagnetBooster } from "../Entity/Booster/MagnetBooster";
import { SpeedUpBooster } from "../Entity/Booster/SpeedUpBooster";
import { x2Booster } from "../Entity/Booster/x2Booster";
import { ENUM_COLLIDER_TAG, ENUM_GAME_EVENT } from "../Enum";
import { GameManager } from "../Manager/GameManager";
import { PlayerControl } from "./PlayerControl";
import { BoosterBase } from "../Manager/PlayerDataManager";
import { Node } from "cc";
import { DestroyableNode } from "../Entity/DestroyableNode";


const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(Node)
    bubbleShield: Node = null;

    @property(Node)
    magnetArea : Node = null;

    private _scoreMultiplier: number = 1;
    private _shieldActive : boolean = false;

    protected onLoad(): void {
        this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    

    onBeginContact(self: Collider2D, other: Collider2D, contact : IPhysics2DContact)
    {
        let data = GameManager.instance.playerDataManager
        switch (other.tag) {
            case ENUM_COLLIDER_TAG.B1:
                data.addScore(5*this._scoreMultiplier);
                GameManager.instance.uiManager.setGameScore();
                break;
            case ENUM_COLLIDER_TAG.B2:
                data.addScore(50*this._scoreMultiplier);
                GameManager.instance.uiManager.setGameScore();
                break;
            case ENUM_COLLIDER_TAG.B3:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                this._scoreMultiplier = 2;
                data.addBooster(new x2Booster())
                break;
            case ENUM_COLLIDER_TAG.B4:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                this.bubbleShield.active = true;
                this._shieldActive = true;
                data.addBooster(new HelmetBooster())
                break;
            case ENUM_COLLIDER_TAG.B5:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                
                setTimeout(() => {
                    this.magnetArea.active = true;
                }, 50);

                data.addBooster(new MagnetBooster())
                break;
            case ENUM_COLLIDER_TAG.B6:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                this.getComponent(PlayerControl).updateSpeed();
                data.addBooster(new SpeedUpBooster())
                break;
            case ENUM_COLLIDER_TAG.B7:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                game.emit(ENUM_GAME_EVENT.MAGIC_POCKET_EFFECT);
                data.addBooster(new MagicPocketBooster())
                break;
            case ENUM_COLLIDER_TAG.O1:
            case ENUM_COLLIDER_TAG.O2:
            case ENUM_COLLIDER_TAG.O3:
            case ENUM_COLLIDER_TAG.O4:
            case ENUM_COLLIDER_TAG.T4:
                game.emit(ENUM_GAME_EVENT.GAME_OVER);
                break;
            case ENUM_COLLIDER_TAG.T1:
                break;
            case ENUM_COLLIDER_TAG.T2:
                break;
            case ENUM_COLLIDER_TAG.T3:
            case ENUM_COLLIDER_TAG.T5:
                game.emit(ENUM_GAME_EVENT.PLAYER_FALL);
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
                this.removeBooster(booster);
            }
        }
    }

    private removeBooster(booster: BoosterBase){
        if(booster instanceof x2Booster){
            this._scoreMultiplier = 1;
        }
        else if(booster instanceof HelmetBooster){
            this._shieldActive = false;
            this.bubbleShield.active = false;
        }
        else if(booster instanceof MagnetBooster){
            this.magnetArea.active = false;
        }
        else if(booster instanceof SpeedUpBooster){
            this.getComponent(PlayerControl).resetSpeed();
        }
        else if(booster instanceof MagicPocketBooster){

        }
    }

    public get isShieldActive(){
        return this._shieldActive;
    }

    // private executeBooter(){
    //     for(let booster of GameManager.instance.playerDataManager.getActiveBoosters()){
    //         if(booster instanceof HelmetBooster){

    //         }
    //         else if(booster instanceof MagicPocketBooster){

    //         }
    //         else if(booster instanceof MagnetBooster){

    //         }
    //         else if(booster instanceof SpeedUpBooster){

    //         }
    //         else if(booster instanceof x2Booster){

    //         }
    //     }
    // }

    
}


