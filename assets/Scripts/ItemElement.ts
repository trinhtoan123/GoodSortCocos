import { _decorator, BoxCollider, CCFloat, CCInteger, Component, director, geometry, math, Node, PhysicsRayResult, PhysicsSystem, tween, v3, Vec3 } from 'cc';
import { BoxElement } from './BoxElement';
import { LayerItem } from './LayerItem';
const { ccclass, property } = _decorator;

@ccclass('ItemElement')
export class ItemElement extends Component {
    isSelectItem: boolean;
    @property(CCFloat) tweenDuration: number = 0.2;
    isSelected:boolean;
    public currentLayer:LayerItem;

    @property(CCInteger)id:Number;

    @property(CCInteger)
    instanceId:Number;

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
        const startPoint :Vec3 = new Vec3(this.node.getWorldPosition().x, this.node.getWorldPosition().y, this.node.getWorldPosition().z);
        const target:Vec3 = new Vec3(startPoint.x, startPoint.y, startPoint.z - 5);
        const outRay = geometry.Ray.create(this.node.getWorldPosition().x, this.node.getWorldPosition().y, this.node.getWorldPosition().z
            , target.x, target.y, target.z );
        if (PhysicsSystem.instance.raycastClosest(outRay)) {
            var raycastResult = PhysicsSystem.instance.raycastClosestResult;
            let item = raycastResult;
            if (item.collider.node.getComponent(BoxCollider) != null  ) {
                if(item.collider.node.getComponent(BoxElement)){
                    item.collider.node.getComponent(BoxElement).AddItem(this);
                    console.log(item.collider.node.getComponent(BoxCollider).name);
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
        tween(this.node.position).to(this.tweenDuration, new Vec3(target.children[0].position.x, target.children[0].position.y, 0),
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.node.position = target;
                }
            }).start();
    }
    MoveToPosOrigin() {
        tween(this.node.position).to(this.tweenDuration, Vec3.ZERO,
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.node.position = target;
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


