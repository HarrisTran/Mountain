import { _decorator, Component, Node } from 'cc';
import { GamePopupCode } from '../Enum';
import { Enum } from 'cc';
import { Vec3 } from 'cc';
import { UIOpacity } from 'cc';
import { Tween } from 'cc';
import { tween } from 'cc';
import { CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PopupBase')
export abstract class PopupBase extends Component {
    @property({ group: { name: "Base Popup Components", id: "1", displayOrder: 1 }, type: Node })
    protected background: Node;
    @property({ group: { name: "Base Popup Components", id: "1", displayOrder: 1 }, type: Node })
    protected panel: Node;
    @property({ group: { name: "Animation Params", id: "1", displayOrder: 2 }, type: CCFloat })
    protected animTime: number = 0.5;

    @property({ group: { name: "Functional params", id: "2", displayOrder: 1 }, type: Enum(GamePopupCode) })
    protected popupCode: GamePopupCode;

    protected _isShown: boolean;
    protected _isTransiting: boolean;

    public getPopupCode(): GamePopupCode
    {
        return this.popupCode;
    }

    protected onLoad(): void
    {
        this._isShown = false;
    }

    protected start(): void
    {
        
    }

    // Animation

    protected animateShow()
    {
        this.node.active = true;
        this.panel.scale = Vec3.ZERO;
        this.background.getComponent(UIOpacity).opacity = 0;
        this.onShowStart();

        // TODO: Animate
        this.TweenShowScalePopUp(this.panel, this.animTime, 1).start();
        this.TweenShowAlpha(this.background, this.animTime).start();


        this._isTransiting = true;
        // TEMP: Timing with schedule for now, i'm tired
        this.scheduleOnce(() => 
        {
            this.onShowEnd();
            this._isShown = true;
            this._isTransiting = false;
        }, this.animTime);
    }

    protected animateHide()
    {
        this.onHideStart();

        // TODO: Animate
        this.TweenHideScalePopUp(this.panel, this.animTime, 0).start();
        this.TweenHideAlpha(this.background, this.animTime).start();

        this._isTransiting = true;
        // TEMP: Timing with schedule for now, i'm tired
        this.scheduleOnce(() => 
        {
            this.onHideEnd();
            this._isShown = false;
            this._isTransiting = false;
            this.node.active = false;
        }, this.animTime);
    }

    protected abstract onShowStart() : void
    
    protected abstract onShowEnd() : void

    protected  abstract onHideStart() : void

    protected abstract onHideEnd() : void

    /**
     * Show popup
     */
    public show()
    {
        if (this._isShown || this._isTransiting)
            return;
        
        // console.log(this.node.name + " should show");
        this.animateShow();
    }

    /**
     * Hide popup
     */
    public hide()
    {
        if (!this._isShown || this._isTransiting)
            return;
        
        // console.log(this.node.name + " should hide");

        this.animateHide();
    }

    /**
     * Toggle popup
     */
    public toggle()
    {
        if (!this._isShown)
        {
            this.show();
        }
        else
        {
            this.hide();
        }
    }

    public showImmediately()
    {
        this._isShown = true;
        this.node.active = true;
    }

    public hideImmediately()
    {
        this._isShown = false;
        this.node.active = false;
    }


    protected TweenShowScalePopUp(target: Node, time: number, scale: number): Tween<Node>
    {
        let a = tween(target).to(time, { scale: new Vec3(scale, scale, scale) }, { easing: 'backOut' });
        return a;
    }

    protected TweenHideScalePopUp(target: Node, time: number, scale: number): Tween<Node>
    {
        let b = tween(target).to(time, { scale: new Vec3(0, 0, 0) }, { easing: 'backIn' });
        return b;
    }

    protected TweenShowAlpha(target: Node, time: number): Tween<UIOpacity>
    {
        let b = tween(target.getComponent(UIOpacity)).to(time, { opacity: 255 }, { easing: 'quadOut' });
        return b;
    }

    protected TweenHideAlpha(target: Node, time: number): Tween<UIOpacity>
    {
        let b = tween(target.getComponent(UIOpacity)).to(time, { opacity: 0 }, { easing: 'quadOut' });
        return b;
    }
}


