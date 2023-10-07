import { _decorator, BoxCollider, CCFloat, CCInteger, Component, director, geometry, math, Node, PhysicsRayResult, PhysicsSystem, tween, v3, Vec3 } from 'cc';
import { BoxElement } from './BoxElement';
import { LayerItem } from './LayerItem';
const { ccclass, property } = _decorator;

@ccclass('ItemElement')
export class ItemElement extends Component {
    isSelectItem: boolean;
    @property(CCFloat) tweenDuration: number = 0.0;
    isSelected:boolean;
    public currentLayer:LayerItem;

    @property(CCInteger)id:Number;

    @property(CCInteger)
    instanceId:Number;
    posCurrent:Vec3;

    currentBox:BoxElement;
    layercurr:LayerItem ;
    boxTarget:BoxElement;
    
    protected start(): void {
    }

    InitItem(layer:LayerItem,box:BoxElement){
        this.layercurr = layer;
        this.currentBox = box;
    }

    CheckSelectedBox() {
        let startPoint: Vec3 = new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, this.node.worldPosition.z);
        let target: Vec3 = new Vec3(this.node.worldPosition.x, this.node.worldPosition.y,this.node.worldPosition.z-5);
        const outRay = new geometry.Ray();
        geometry.Ray.fromPoints(outRay,startPoint,target);
        if (PhysicsSystem.instance.raycastClosest(outRay)) {
            var raycastResult = PhysicsSystem.instance.raycastClosestResult;
            let item = raycastResult;
            if (item.collider.node.getComponent(BoxCollider) != null) {
                if (item.collider.node.getComponent(BoxElement)) {
                    item.collider.node.getComponent(BoxElement).AddItem(this);
                }
                else{
                    this.MoveToPosOrigin();
                }
            }
        }
        else{
            this.MoveToPosOrigin();
        }
    }

    public SelectItem() {
        this.isSelected = true;
        this.posCurrent = this.node.getWorldPosition();

        this.node.setPosition(this.node.position.x, this.node.position.y, 2);
    }
    public UnSelectItem() {
        this.isSelectItem = false;
        this.CheckSelectedBox();
    }
    UpdateCurrentBox(box: BoxElement )
    {
        this.currentBox.RemoveItem(this);
        this.currentBox = box;
    }
    
    MoveToPosTarget(target: Node) {
        console.log(new Vec3(target.children[0].worldPosition.x, target.children[0].worldPosition.y, 0));
        tween(this.node.worldPosition).to(this.tweenDuration, new Vec3(target.children[0].worldPosition.x, target.children[0].worldPosition.y,+0.586),
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.node.worldPosition = target;
                 
                },
            }).start();
    }
    MoveToPosOrigin() {
        tween(this.node.worldPosition).to(this.tweenDuration, this.posCurrent,
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.node.worldPosition = target;
                },
            }).start();
    }
    MatchTween(){
        tween(this.node).to(0.2, 
            {scale:new Vec3(0.1,0.1,0.1),}, 
            {
                onComplete: ()=>{
                    this.node.active = false;
                }
            }).start();
    }
}


