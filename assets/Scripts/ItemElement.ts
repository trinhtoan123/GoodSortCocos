import { _decorator, BoxCollider, CCFloat, CCInteger, Component, director, geometry, Material, math, MeshRenderer, Node, PhysicsRayResult, PhysicsSystem, tween, v3, Vec3 } from 'cc';
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

    instanceId:Number;
    posCurrent:Vec3;

    currentBox:BoxElement;
    boxNext:BoxElement;
    layercurr:LayerItem ;
    boxTarget:BoxElement;
    
    boxOld:BoxElement;

    layerOld:LayerItem;
    
    @property(Material)
    materialOn:Material;

    @property(Material)
    materialOff:Material;

    @property(Node)
    Model:Node;



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
    UpdateCurrentBox(box: BoxElement,layer:LayerItem )
    {
        this.boxOld = this.currentBox;
        this.layerOld= this.layercurr
        this.currentBox.RemoveItem(this);
        this.InitItem(layer,box)
    }
    
    MoveToPosTarget(target: Node) {
        tween(this.node.worldPosition).to(this.tweenDuration, new Vec3(target.children[0].worldPosition.x, target.children[0].worldPosition.y,+0.586),
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.node.worldPosition = target;
                 
                },
                onComplete:() =>{
                    this.node.position = Vec3.ZERO;
                    this.boxOld.CheckLayer(this.layerOld);
                },
            }).start();
    }
    MoveToPosOrigin() {
        tween(this.node.worldPosition).to(this.tweenDuration, this.posCurrent,
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.node.worldPosition = target;
                },
                onComplete:() =>{
                    this.node.position = Vec3.ZERO;
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
    SetMaterialOn(){
        // if(this.Model!=null){
        //     this.node.scale = new Vec3(0.2,0.2,0.2);
        //     tween(this.node).to(0.2, 
        //         {scale:new Vec3(1,1,1),}, 
        //         {
        //         }).start();
        //     this.Model.getComponent(MeshRenderer).material = this.materialOn;
        // }
        // else{
        //     console.log("Model null On"+ this.id + this.currentBox.node.name);
        // }
    }
    SetMaterialOff(){
        // if(this.Model!=null){
        //     this.Model.getComponent(MeshRenderer).material = this.materialOff;

        // }
        // else{
        //     console.log("Model null OFF");
        // }
    }
    
}



