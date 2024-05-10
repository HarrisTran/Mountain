import { Collider2D, Component, Contact2DType, IPhysics2DContact, _decorator, game } from "cc";
import { HelmetBooster } from "../Entity/Booster/HelmetBooster";
import { MagicPocketBooster } from "../Entity/Booster/MagicPocketBooster";
import { MagnetBooster } from "../Entity/Booster/MagnetBooster";
import { SpeedUpBooster } from "../Entity/Booster/SpeedUpBooster";
import { x2Booster } from "../Entity/Booster/x2Booster";
import { ENUM_ADUDIO_CLIP, ENUM_COLLIDER_TAG, ENUM_GAME_EVENT } from "../Enum";
import { GameManager } from "../Manager/GameManager";
import { PlayerControl } from "./PlayerControl";
import { BoosterBase } from "../Manager/PlayerDataManager";
import { Node } from "cc";
import { DestroyableNode } from "../Entity/DestroyableNode";
import { delay } from "../Utils";
import { Fragment } from "../Fragment";


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

    

    async onBeginContact(self: Collider2D, other: Collider2D, contact : IPhysics2DContact)
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
                GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.ITEM_x2);
                break;
            case ENUM_COLLIDER_TAG.B4:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                this.bubbleShield.active = true;
                this._shieldActive = true;
                data.addBooster(new HelmetBooster())
                GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.ITEM_HELMET);
                break;
            case ENUM_COLLIDER_TAG.B5:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                await delay(50);
                this.magnetArea.active = true;
                data.addBooster(new MagnetBooster())
                GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.ITEM_MAGNET);
                break;
            case ENUM_COLLIDER_TAG.B6:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                this.getComponent(PlayerControl).updateSpeed();
                data.addBooster(new SpeedUpBooster())
                GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.ITEM_SPEED);
                break;
            case ENUM_COLLIDER_TAG.B7:
                other.node.getComponent(DestroyableNode).isDestroyable = true;
                GameManager.instance.findFragmentPlayerClimbing().getComponent(Fragment).magicPocketAffect();
                data.addBooster(new MagicPocketBooster())
                GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.ITEM_SWAP)
                break;
            case ENUM_COLLIDER_TAG.O1:
            case ENUM_COLLIDER_TAG.O2:
            case ENUM_COLLIDER_TAG.O3:
            case ENUM_COLLIDER_TAG.O4:
            case ENUM_COLLIDER_TAG.T4:
                GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.IMPACT_HARD)
                game.emit(ENUM_GAME_EVENT.GAME_OVER);
                break;
            case ENUM_COLLIDER_TAG.T1:
            case ENUM_COLLIDER_TAG.T2:
            case ENUM_COLLIDER_TAG.T3:
            case ENUM_COLLIDER_TAG.T5:
                GameManager.instance.audioManager.playSfx(ENUM_ADUDIO_CLIP.IMPACT_SOFT)
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


