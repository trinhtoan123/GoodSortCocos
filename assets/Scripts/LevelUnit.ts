import { _decorator, Component, Node } from 'cc';
import { BoxElement } from './BoxElement';
import { ItemElement } from './ItemElement';
const { ccclass, property } = _decorator;

@ccclass('LevelUnit')
export class LevelUnit extends Component {

    @property([BoxElement])
    lstItemContainer:BoxElement[];

    @property([ItemElement])
    listItem:ItemElement[];
    start() {
        this.GetInstanceId();
    }

    update(deltaTime: number) {
        
    }
    GetInstanceId(){
       for (let i = 0; i < this.listItem.length; i++) {
        this.listItem[i].instanceId = i;
       }

    }
    
}


