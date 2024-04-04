import { _decorator, Component, Node } from 'cc';
import { Menu } from '../Layer/Menu';
import { Game } from '../Layer/Game';
import { ENUM_UI_TYPE } from '../Enum';
import LayerBase from './LayerBase';
const { ccclass, property } = _decorator;

@ccclass('LayerManager')
export class LayerManager extends Component {
   
    @property(Menu)
    menuLayer: Menu = null
    
    @property(Game)
    gameLayer: Game = null
   

    private uiMap = new Map<ENUM_UI_TYPE, LayerBase>()

    protected onLoad(): void {
        this.uiMap.set(ENUM_UI_TYPE.MENU_LAYER, this.menuLayer)
        this.uiMap.set(ENUM_UI_TYPE.GAME_LAYER, this.gameLayer)
    }

    setGameScore(){
        const layer: Game = this.uiMap.get(ENUM_UI_TYPE.GAME_LAYER) as Game;
        layer.setScore();
    }

}


