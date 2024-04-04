import { _decorator, Component, Node } from 'cc';
import EventManager from './EventManager';
import { ENUM_GAME_EVENT, MAIN_GAMESTATE } from '../Enum';
import { Prefab } from 'cc';
import PoolManager from './PoolManager';
import { Vec3 } from 'cc';
import { Fragment } from '../Fragment';
import { instantiate } from 'cc';
import ResourceManager from './ResourceManager';
import { UITransform } from 'cc';
import { Enum } from 'cc';
import { PlayerDataManager } from './PlayerDataManager';
import { LayerManager } from './LayerManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	private static _instance: GameManager;
	public static get instance(): GameManager
	{
		return this._instance;
	}
	
	@property({ type: Enum(MAIN_GAMESTATE) }) public defaultState: MAIN_GAMESTATE = MAIN_GAMESTATE.INIT;
	@property(LayerManager) uiManager: LayerManager = null;
    @property(Node) fragmentContainer: Node = null;
    @property(Prefab) fragment: Prefab = null;

	private _playerDataManager: PlayerDataManager;
	private _state: MAIN_GAMESTATE;

	public get playerDataManager(): PlayerDataManager
	{
		return this._playerDataManager;
	}

	public get state(){
		return this._state;
	}
    
    protected onLoad(): void {
		
		GameManager._instance = this;
        EventManager.instance.on(ENUM_GAME_EVENT.GAME_START,this.onGameStart,this);
    }

	protected start(): void {
		this.setState(MAIN_GAMESTATE.INIT)
	}

	public setState(newState: MAIN_GAMESTATE){
		this._state = newState;
		if(newState === MAIN_GAMESTATE.INIT)
		{
			this._playerDataManager = new PlayerDataManager();
		}
		else if (newState === MAIN_GAMESTATE.START)
		{
			this.fragmentContainer.removeAllChildren();
			let dataSet = ResourceManager.instance.getFragmentData()
			Array.from(dataSet.keys()).forEach((key, index) => {
				let fragmentNode = instantiate(this.fragment);
				fragmentNode.parent = this.fragmentContainer;
				let fragmentCmp = fragmentNode.getComponent(Fragment);
				fragmentCmp.init({
					id: index,
					line1: dataSet.get(key).line1,
					line2: dataSet.get(key).line2,
					line3: dataSet.get(key).line3
				})
				fragmentCmp.rendor();
				fragmentNode.setPosition(new Vec3(0, fragmentNode.getComponent(UITransform).height * index));
			})
		}
	}

    private onGameStart(){
        this.setState(MAIN_GAMESTATE.START);
    }

}


