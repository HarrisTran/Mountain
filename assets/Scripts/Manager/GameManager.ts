import { _decorator, Component, Node } from 'cc';
import EventManager from './EventManager';
import { ENUM_GAME_EVENT } from '../Enum';
import { Prefab } from 'cc';
import PoolManager from './PoolManager';
import { Vec3 } from 'cc';
import { Fragment } from '../Fragment';
import { instantiate } from 'cc';
const { ccclass, property } = _decorator;

const test = {
	"id": "F1",
	"line1": [
		"",
		"T2",
		"",
		"",
		"",
		"",
		"",
		"B1",
		""
	],
	"line2": [
		"",
		"",
		"B1",
		"",
		"",
		"",
		"",
		"",
		""
	],
	"line3": [
		"",
		"",
		"",
		"",
		"",
		"",
		"B1",
		"",
		""
	]
}
@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node) fragmentContainer: Node = null;
    @property(Prefab) fragment: Prefab = null;

    
    protected onLoad(): void {
        EventManager.instance.on(ENUM_GAME_EVENT.GAME_START,this.onGameStart,this);
        this.onGameStart();
    }

    onGameStart(){
        this.initGame();
    }

    initGame(){
        this.fragmentContainer.removeAllChildren();
        let fragment = instantiate(this.fragment);
        fragment.setParent(this.fragmentContainer);
        fragment.setPosition(0,0);
        let fragmentCmp = fragment.getComponent(Fragment);
        fragmentCmp.init({
            id: 1,
            line1: test.line1,
            line2: test.line2,
            line3: test.line3
        })
        fragmentCmp.rendor();
    }
}


