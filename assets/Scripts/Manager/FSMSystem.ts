import { MAIN_GAMESTATE } from "../Enum";

export class FSMSystem {
    private _state: MAIN_GAMESTATE = MAIN_GAMESTATE.INIT;

    public get state() {
        return this._state;
    }

    public set state(value: MAIN_GAMESTATE) {
        if (this._state !== value) {
            if (this.onStateExit && this._state !== MAIN_GAMESTATE.INIT) this.onStateExit.apply(this._target, [this._state]);
            this._state = value;
            if (this.onStateEnter && this._state !== MAIN_GAMESTATE.INIT) this.onStateEnter.apply(this._target, [this._state]);
        }
    }

    public onStateEnter: Function = null;
    public onStateStay: Function = null;
    public onStateExit: Function = null;

    private _target: any = null;

    constructor(target?: any) {
        this._target = target;
    }
    
    public start(initState: MAIN_GAMESTATE) {
        this.state = initState;
    }
    
    public update() {
        if (this.onStateStay && this._state !== MAIN_GAMESTATE.INIT) {
            this.onStateStay.apply(this._target, [this._state]);
        }
    }
}





