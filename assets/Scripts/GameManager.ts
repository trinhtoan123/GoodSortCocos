import { _decorator, Component, director, instantiate, Label, Node, Sprite } from 'cc';
import { LevelUnit } from './LevelUnit';
const { ccclass, property } = _decorator;
export enum GAME_STATE {
    Init,
    Play,
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
    loseNode: Sprite;

    @property(Sprite)
    HomeUI:Sprite;

    @property(Label)
    TimeCountDownText: Label;

    @property(Sprite)
    btnDownLoad:Sprite;

    @property(Sprite)
    btnReplay:Sprite;

    @property(Node)
    level:Node;

    @property(Node)
    levelCurr:Node;


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
        this.winNode.node.active = false;
        this.loseNode.node.active = false;
        this.btnReplay.node.active = false;
        this.SpawnLevel();
    }
    StartGame() {
        console.log('[StartGame]');
        GameManager.instance = this;
        this.GameState = GAME_STATE.Play; 
        this.HomeUI.node.active = false;
        this.TimePlay = 15;
        this.level.getComponent(LevelUnit).StartLevel();
    }
    SpawnLevel(){
        // if(this.levelCurr!=null){
        //     this.levelCurr.destroy();
        // }
        // let node = instantiate(this.level);
        // node.setPosition(0.5, 0,0);
        // this.levelCurr = node;
    }
    update(deltaTime: number) {
        if (this.GameState != GAME_STATE.Play)
        return;
    if (this.TimePlay > 0) {
        this.loseNode.node.active = false;
        this.TimePlay -= deltaTime;
    } else {
        this.Lose();
        this.TimeCountDownText.string = "0s";

        return;
    }
    this.TimeCountDownText.string = Math.ceil(this.TimePlay).toString() + "s";
    }

    Lose(){
        this.loseNode.node.active = true;
        // this.btnReplay.node.active = true;
        this.GameState = GAME_STATE.Over;
        console.log("[GameEnd_Lose]");
    }
    Win(){
        this.winNode.node.active = true;
        this.GameState = GAME_STATE.Over;
        // this.btnReplay.node.active = true;
        console.log("[GameEnd_Win]");
    }
    // BtnReaplay(){
    //     this.winNode.node.active = false;
    //     this.loseNode.node.active = false;
    //     this.btnReplay.node.active = false;
    //     this.StartGame();
    // }

    DownLoadGame(){
        console.log('[CTA]');
    }
   
  
}


