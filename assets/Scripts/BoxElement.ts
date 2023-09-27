import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoxElement')
export class BoxElement extends Component {
    @property([Node])layerFirst:Node[]=[];
    @property([Node])layerSecons:Node[]=[];

    start() {

    }

    update(deltaTime: number) {
        
    }
}


