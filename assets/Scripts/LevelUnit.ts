import { _decorator, Component, Node } from 'cc';
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
        for (let i = 0; i < this.lstBox.length; i++) {
            this.lstBox[i].startGame();
        }
    }
    protected update(dt: number): void {
        this.CheckWin();
    }

    GetInstanceId() {
        for (let i = 0; i < this.listItem.length; i++) {
            this.listItem[i].instanceId = i;
        }

    }
    CheckWin() {
        if (GameManager.getInstance().GameState == GAME_STATE.Play) {

            for (let i = 0; i < this.lstBox.length; i++) {
                if (!this.lstBox[i].CheckWin()) {
                    return;
                }
            }
            if (!this.check) {
                GameManager.getInstance().Win()
            }
        }

    }

}


