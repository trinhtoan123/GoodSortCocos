import { _decorator, BoxCollider, Camera, CCFloat, Component, EventMouse, EventTouch, geometry, input, Input, math, Node, PhysicsSystem, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemElement')
export class ItemElement extends Component {

    isSelectItem:boolean;
    posOriginIem :Vec3;
    @property(CCFloat)tweenDuration:number;
    // private _ray: geometry.Ray;

    protected onLoad(): void {
        
    }
    protected update(dt: number): void {
        this.CheckSelectedBox();
    }

    StartGame(){
        this.posOriginIem  = this.node.getPosition();
    }
    CheckSelectedBox(){
        // let outRay = new geometry.Ray();
        // geometry.Ray.fromPoints(outRay, this.node.position, math.Vec3.RIGHT);
        const worldRay = new geometry.Ray(0, -1, 0, 0, 0, 0);
        const mask = 0xffffffff;
        const maxDistance = 10000000;
        const queryTrigger = true;
        if (PhysicsSystem.instance.raycastClosest(worldRay,mask,maxDistance,queryTrigger)) {
            var raycastResult = PhysicsSystem.instance.raycastClosestResult;
            let item = raycastResult;
            if (item.collider.node.getComponent(BoxCollider)!=null ) {
                console.log("item" + item.collider.node.name);
             }
        }
    }


    public SelectItem(){
        this.node.setPosition(this.node.position.x, this.node.position.y, -1);
    }



    MoveToPosTarget(target:Node){
        this.TweenMove(new Vec3(target.position.x, target.position.y, 0));
    }
    MoveToPosOrigin(){
        this.TweenMove(this.posOriginIem);
    }

    TweenMove(targetPos:Vec3){
        tween(this.node.position).to(this.tweenDuration,targetPos,
            {
                onUpdate: (target:Vec3, radius:number)=>{
                    this.node.position = target;
                }
            }).start();
    }
     
}


