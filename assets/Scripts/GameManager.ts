import { _decorator, CCInteger, Component, director, instantiate, Label, Node, Sprite, tween, v3, Vec3 } from 'cc';
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

    @property(Label)
    txtDownLoad: Label;

    @property(Sprite)
    btnDownLoad:Sprite;

    @property(Node)
    level:Node;

    @property(Node)
    levelCurr:Node;

    @property(Node)
    handTutorial:Node;

    @property(Boolean)
    isTutorial:boolean = false;

    countMatch: number;


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
        this.StartGame();
    }
    StartGame() {
        console.log('[StartGame]');
        GameManager.instance = this;
        this.GameState = GAME_STATE.Play; 
        this.HomeUI.node.active = false;
        this.TimePlay = 1500;
        this.countMatch=0;
        this.level.getComponent(LevelUnit).StartLevel();
        this.StartTutorial();
        this.AnimBtnDownload();

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
    // this.TimeCountDownText.string = Math.ceil(this.TimePlay).toString() + "s";
    }

    Lose(){
        this.loseNode.node.active = true;
        this.GameState = GAME_STATE.Over;
        console.log("[GameEnd_Lose]");
    }
    Win(){
        this.winNode.node.active = true;
        this.GameState = GAME_STATE.Over;
        console.log("[GameEnd_Win]");
    }
    StartTutorial(){
        this.isTutorial = false;
       this.level.getComponent(LevelUnit).LevelTutorial(false);
        let pos = this.handTutorial.position;
        if(this.handTutorial.active){
            tween(this.handTutorial.position).to(1, new Vec3(3.7,-2.5,2),
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.handTutorial.position = target;
                },
                onComplete:() =>{
                    this.handTutorial.position = new Vec3(3.7,0,2);
                },
            })
            .repeat(9999)
            .start();

        }
        
    }
    EndTutorial(){
        if(!this.isTutorial){
            this.level.getComponent(LevelUnit).LevelTutorial(true);
            this.handTutorial.active = false;
            this.isTutorial = true;
        }
     
    }

    SetCountMatch(){
        this.countMatch+=1;
        this.TimeCountDownText.string = Math.ceil(this.countMatch).toString() + "s";

    }
    AnimBtnDownload(){
        // tween(this.txtDownLoad.node).to(0.5, 
        //     {scale:new Vec3(1.1,1.1,1.1),}, 
        //     {
        //         easing: 'backOut',
        //         onComplete: ()=>{
        //            this.txtDownLoad.node.scale = Vec3.ONE;
        //         }
        //     })
        //     .repeatForever()
        //     .start();

    }

    DownLoadGame(){
        console.log('[CTA]');
    }


   
  
}


