import { _decorator, Component, Game } from 'cc';
import { PopupBase } from './PopupBase';
import { GamePopupCode } from '../Enum';

const { ccclass, property } = _decorator;


@ccclass('PopUpManager')
export class PopUpManager extends Component
{
    @property({ type: PopupBase })
    private popupArray: PopupBase[] = [];

    private _popupMap: Map<GamePopupCode, PopupBase>;

    public initialize()
    {
        this._popupMap = new Map<GamePopupCode, PopupBase>();
        for (let popup of this.popupArray)
        {
            this._popupMap.set(popup.getPopupCode(), popup);
            popup.hideImmediately();
        }
    }

    public showPopUp(code: GamePopupCode,cb? : ()=>void)
    {
        this._popupMap.get(code).show();
        cb && cb()
    }

    public getPopupNode(code : GamePopupCode){
        return this._popupMap.get(code);
    }


    public hidePopUp(code: GamePopupCode,cb? : ()=>void)
    {
        this._popupMap.get(code).hide();
        cb && cb()
    }

}

