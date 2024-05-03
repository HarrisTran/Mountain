import { _decorator, Component, Node } from 'cc';
import { ENUM_UI_TYPE, MAIN_GAMESTATE } from '../Enum';
import LayerBase from './LayerBase';
import { MenuPanel } from '../Layer/MenuPanel';
import { GamePanel } from '../Layer/GamePanel';
import { LoadingPanel } from '../Layer/LoadingPanel';
import { GameOverPanel } from '../Layer/GameOverPanel';
const { ccclass, property } = _decorator;


@ccclass('LayerManager')
export class LayerManager extends Component {
    @property(MenuPanel) menuPanel: MenuPanel = null
    @property(GamePanel) gamePanel: GamePanel = null
    @property(LoadingPanel) loadingPanel: LoadingPanel = null
    @property(GameOverPanel) gameOverPanel: GameOverPanel = null

    public changeState(state : MAIN_GAMESTATE)
    {
        this.menuPanel.hide();
        this.gamePanel.hide();
        this.gameOverPanel.hide();
        this.loadingPanel.hide();

        switch (state) {
            case MAIN_GAMESTATE.LOADING:
                this.loadingPanel.show();
                break;
            case MAIN_GAMESTATE.GAME_OVER:
                this.gameOverPanel.show();
                break;
            case MAIN_GAMESTATE.MENU:
                this.menuPanel.show();
                break;
            case MAIN_GAMESTATE.START:
                this.gamePanel.show();
                break;
        }
    }

    setGameScore(){
        this.gamePanel.setScore();
    }

}


