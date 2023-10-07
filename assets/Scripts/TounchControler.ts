import { _decorator, BoxCollider, Camera, Component, EventMouse, EventTouch, geometry, input, Input, Node, PhysicsSystem, Vec3 } from 'cc';
import { ItemElement } from './ItemElement';
import { GAME_STATE, GameManager } from './GameManager';

const { ccclass, property } = _decorator;

@ccclass('TounchControler')
export class TounchControler extends Component {
    @property(Camera)
    cma: Camera;

    target: Node;
    private _ray: geometry.Ray;
    private offset: Vec3 = new Vec3();
    isDraging: boolean = false;
    onLoad() {
        // Register a touch or mouse event listener
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        // You can also use 'MOUSE_DOWN' event for mouse input
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
    onTouchStart(event: EventTouch) {
        if (GameManager.getInstance().GameState != GAME_STATE.Play)
            return;
        this.target = null;
        var touch = event.touch!;
        this._ray = new geometry.Ray();
        this.cma.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        if (PhysicsSystem.instance.raycastClosest(this._ray)) {
            var raycastResult = PhysicsSystem.instance.raycastClosestResult;
            let item = raycastResult;
            console.log()
            if (item.collider.node.getComponent(BoxCollider) != null && item.collider.node.getComponent(ItemElement) != null) {
                this.isDraging = true;
                this.target = item.collider.node;
                this.target.getComponent(ItemElement).SelectItem();
            }
            if(item.collider.node.getComponent(BoxCollider) ==null){
                console.log("Null boxCollider");
            }
            if(item.collider.node.getComponent(ItemElement) ==null){
                console.log("Null ItemElement");
            }
        }
    }
    onTouchMove(event: EventTouch) {
        if (GameManager.getInstance().GameState != GAME_STATE.Play)
            return;
        if (!this.isDraging)
            return;
        // let touches = event.getTouches();
        // let touch1 = touches[0];
        // let delta1 = touch1.getDelta();

        // this.offset.x = delta1.x / 40;
        // this.offset.y = delta1.y / 40;
        // let cam_pos = this.target.position.clone();
        // let newPos = new Vec3(
        //     cam_pos.x + this.offset.x,
        //     cam_pos.y + this.offset.y,
        //     this.target.position.z
        // );

        // this.target.position = newPos;


        var touch = event.touch!;
        this._ray = new geometry.Ray();
        let mousePos = new Vec3(touch.getLocationX(), touch.getLocationY(), 0);

        let pos = new Vec3();
        this.cma.screenToWorld(mousePos, pos);
        this.target.worldPosition = new Vec3(pos.x, pos.y, 3);
    }

    onTouchEnd(event: EventTouch) {
        if (this.target == null||GameManager.getInstance().GameState != GAME_STATE.Play)
            return;
        this.isDraging = false;
        this.target.getComponent(ItemElement).UnSelectItem();
    }

}


