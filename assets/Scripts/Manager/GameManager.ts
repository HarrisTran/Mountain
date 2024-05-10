import { _decorator, Component, Enum, game, Node, Prefab, UITransform, Vec3 } from 'cc';
import { ENUM_ADUDIO_CLIP, ENUM_GAME_EVENT, MAIN_GAMESTATE } from '../Enum';
import { Fragment, IFragment } from '../Fragment';
import { delay } from '../Utils';
import { AudioManager } from './AudioManager';
import { IManager } from './IManager';
import { LayerManager } from './LayerManager';
import { PlayerDataManager } from './PlayerDataManager';
import PoolManager from './PoolManager';
import ResourceManager from './ResourceManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	private static _instance: GameManager;
	public static get instance(): GameManager {
		return this._instance;
	}
	@property({ type: Enum(MAIN_GAMESTATE) }) public defaultState: MAIN_GAMESTATE = MAIN_GAMESTATE.MENU;
	@property(LayerManager) uiManager: LayerManager = null;
	@property(AudioManager) audioManager: AudioManager = null;
	@property(Node) fragmentContainer: Node = null;
	@property(Node) player: Node = null;
	@property(Prefab) fragment: Prefab = null;

	private _state: MAIN_GAMESTATE;

	// all managers
	private _allManagers: IManager[] = [];
	public resouceManager: ResourceManager;
	public playerDataManager: PlayerDataManager;

	private allFragment : string[];
	private dataSet : Map<string, IFragment>;
	

	public get state() {
		return this._state;
	}

	protected onLoad(): void {
		GameManager._instance = this;
		this._initializeGameEvent();
		this.setState(MAIN_GAMESTATE.LOADING);
	}

	private _initializeGameEvent() {
		game.on(ENUM_GAME_EVENT.GAME_START, this.onGameStart, this);
		game.on(ENUM_GAME_EVENT.GAME_OVER, this.onGameOver, this);
		game.on(ENUM_GAME_EVENT.NEW_FRAGMENT,this.newFragmentHandler, this);
	}

	private _initializeAllManagers(): void {
		this._allManagers = [];

		this.resouceManager = new ResourceManager();
		this.playerDataManager = new PlayerDataManager();

		this._allManagers.push(this.resouceManager);

		for (let managers of this._allManagers) {
			managers.initialize();
		}
	}


	public setState(newState: MAIN_GAMESTATE) {
		if (this._state == newState) return;
		this._state = newState;

		this.uiManager.changeState(newState);
		switch (this._state) {
			case MAIN_GAMESTATE.LOADING:
				this._initializeAllManagers();
				break;
			case MAIN_GAMESTATE.MENU: 

				break;
			case MAIN_GAMESTATE.START:
				this.fragmentContainer.removeAllChildren();
				this.dataSet = ResourceManager.instance.getFragmentData()
				this.allFragment = ResourceManager.instance.getLevelData();
				PoolManager.instance.getNode(this.fragment, this.fragmentContainer, new Vec3(0, 2340 * -2))
				PoolManager.instance.getNode(this.fragment, this.fragmentContainer, new Vec3(0, 2340 * -1))
				
				let y = 0;
				while (y < 2) {
					let i = this.allFragment.shift();
					let fragmentNode = PoolManager.instance.getNode(this.fragment, this.fragmentContainer, new Vec3(0, 2340 * y))
					let fragmentCmp = fragmentNode.getComponent(Fragment);
					fragmentCmp.init({
						line1: this.dataSet.get(i).line1,
						line2: this.dataSet.get(i).line2,
						line3: this.dataSet.get(i).line3,
					})
					fragmentCmp.rendor();
					y++;
				}
				break;
			case MAIN_GAMESTATE.GAME_OVER:
				this.uiManager.gameOverPanel.shows();
				break;
			default:
				break;
		}

	}

	private onGameStart() {
		this.setState(MAIN_GAMESTATE.START);
		this.audioManager.playSfx(ENUM_ADUDIO_CLIP.BUTTON_PLAY)
	}

	private async onGameOver() {
		await delay(1000);
		this.setState(MAIN_GAMESTATE.GAME_OVER);
	}

	protected update(dt: number): void {
		if (this.state == MAIN_GAMESTATE.LOADING) {
			let total = this._allManagers.reduce((acc,manager)=>{
				return acc + manager.progress();
			},0)
			this.uiManager.loadingPanel.setLoadingProgress(total/this._allManagers.length);
			if(this._allManagers.every(manager => manager.initializationCompleted()) && this._state == MAIN_GAMESTATE.LOADING) this.setState(MAIN_GAMESTATE.MENU);
		}
	}

	public findFragmentPlayerClimbing(){
		for(let i of this.fragmentContainer.children){
			let playerPosition = this.player.getWorldPosition();
			if(playerPosition.y > i.worldPosition.y - 1170 && playerPosition.y < i.worldPosition.y + 1170){
				return i;
			}
		}
	}

	public async newFragmentHandler() {
		let i = this.allFragment.shift();
		let lastFragment = this.fragmentContainer.children.slice(-1)[0];
		await delay(100);
		let fragmentNode = PoolManager.instance.getNode(this.fragment, this.fragmentContainer, new Vec3(lastFragment.position.x,lastFragment.position.y+2340))
		let fragmentCmp = fragmentNode.getComponent(Fragment);
		fragmentCmp.init({
			line1: this.dataSet.get(i).line1,
			line2: this.dataSet.get(i).line2,
			line3: this.dataSet.get(i).line3,
		})
		await delay(100);
		fragmentCmp.rendor();

		await delay(100);
		this.fragmentContainer.children[0].removeFromParent();
	}
}


