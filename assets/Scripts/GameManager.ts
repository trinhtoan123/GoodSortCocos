import { _decorator, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
export enum GAME_STATE {
    Init,
    Play,
    Selling,
    Over
}
@ccclass('GameManager')
export class GameManager extends Component {
    private static instance: GameManager;

    GameState: GAME_STATE = null;

    TimePlay: number;

    @property(Sprite)
    winNode: Sprite;

    @property(Sprite)
    HomeUI:Sprite;

    @property(Label)
    TimeCountDownText: Label;

   

    private constructor() {
        super();
    }
    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }
    start() {
        this.GameState = GAME_STATE.Init; 
    }
    StartGame() {
        console.log('[StartGame]');
        GameManager.instance = this;
        this.GameState = GAME_STATE.Play; 
        this.HomeUI.node.active = false;


    }
    update(deltaTime: number) {
        // if (this.GameState != GAME_STATE.Play)
        //     return;
        // if (this.TimePlay > 0) {
        //     this.winNode.node.active = false;
        //     this.TimePlay -= deltaTime;
        // } else {

        //     this.GameState = GAME_STATE.Over;
        //     this.TimeCountDownText.string = "0s";
        //     console.log("[GameEnd]");
        //     return;
        // }
        // this.TimeCountDownText.string = Math.ceil(this.TimePlay).toString() + "s";
    }
    DownLoadGame(){
        console.log('[CTA]');
    }

}


