export class PlayerData {
    public score : number;
    public hasX2Booster : boolean;
    public hasHelmetBooster : boolean;
    public hasMagnetBooster : boolean;
    public hasSpeedBooster: boolean;
    constructor(){
        this.score = 0;
        this.hasX2Booster = false;
        this.hasHelmetBooster = false;
        this.hasMagnetBooster = false;
        this.hasSpeedBooster = false;
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

    triggedX2Booster() : boolean {
        return this._playerData.hasX2Booster;
    }

    activeX2Booster(active : boolean){
        this._playerData.hasX2Booster = active
    }

    triggedHelmetBooster() : boolean {
        return this._playerData.hasHelmetBooster;
    }

    activeHelmetBooster(active : boolean){
        this._playerData.hasHelmetBooster = active
    }

    triggedMagnetBooster() : boolean {
        return this._playerData.hasMagnetBooster;
    }

    activeMagnetBooster(active : boolean){
        this._playerData.hasMagnetBooster = active
    }

    triggedSpeedBooster() : boolean {
        return this._playerData.hasSpeedBooster;
    }

    activeSpeedBooster(active : boolean){
        this._playerData.hasSpeedBooster = active
    }
}


