import { _decorator, BoxCollider, CCInteger, Component, EventKeyboard, input, Input, InstancedBuffer, KeyCode, Node, tween, Vec3 } from 'cc';
import { ItemElement } from './ItemElement';
import { BoxElement } from './BoxElement';
import { GAME_STATE, GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('LevelUnit')
export class LevelUnit extends Component {

    private static instance: LevelUnit;

    check: boolean = false;


    @property([ItemElement])
    listItem: ItemElement[];


    @property(ItemElement)
    itemTutorila: ItemElement;


    @property([BoxElement])
    lstBox: BoxElement[];


    public static getInstance(): LevelUnit {
        if (!LevelUnit.instance) {
            LevelUnit.instance = new LevelUnit();
        }

        return LevelUnit.instance;
    }

    StartLevel(){
        this.GetInstanceId();
    }
    protected update(dt: number): void {
        this.CheckWin();
    }

    GetInstanceId() {
        for (let i = 0; i < this.listItem.length; i++) {
            this.listItem[i].instanceId = i+100;
        }


    }
    LevelTutorial(isActive: boolean){
        for (let i = 0; i < this.listItem.length;i++) {
            this.listItem[i].getComponent(BoxCollider).enabled = isActive;
        }
        if(this.itemTutorila.node.active){
            this.itemTutorila.getComponent(BoxCollider).enabled = true;
        }
    }
    CheckWin() {
        if (GameManager.getInstance().countMatch>=4){
            GameManager.getInstance().Win()
        }
       

    }
  

}


