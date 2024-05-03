import { IManager } from "./IManager";

export class BoosterBase {
    public duration : number;
    public isActive : boolean;
    constructor(){
        this.isActive = false;
    }
}
export class PlayerData {
    public score : number;
    public currentFragmentIndex: number;
    public activeBooster: BoosterBase[];
    constructor(){
        this.score = 0;
        this.currentFragmentIndex = 0;
        this.activeBooster = [];
    }
}
export class PlayerDataManager{
    private _playerData : PlayerData;

    constructor(){
        this._playerData = new PlayerData();
    }
    
    public addScore(score: number){
        this._playerData.score += score;
    }

    public getScore(){
        return this._playerData.score;
    }

    public get currentFragmentIndex(){
        return this._playerData.currentFragmentIndex;
    }

    public set currentFragmentIndex(i : number){
        this._playerData.currentFragmentIndex = i;
    }

    public addBooster(booster: BoosterBase){
        this._playerData.activeBooster.push(booster);
    }

    public removeBooster(booster: BoosterBase){
        const index = this._playerData.activeBooster.indexOf(booster);
        if(index !== -1){
            this._playerData.activeBooster.splice(index,1);
        }
    }

    public getActiveBoosters() {
        return this._playerData.activeBooster;
    }

}


