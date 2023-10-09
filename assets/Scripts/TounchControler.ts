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
            if (item.collider.node.getComponent(BoxCollider) != null && item.collider.node.getComponent(ItemElement) != null) {
                this.isDraging = true;
                this.target = item.collider.node;
                this.target.getComponent(ItemElement).SelectItem();
            }
        }
    }
    onTouchMove(event: EventTouch) {
        if (GameManager.getInstance().GameState != GAME_STATE.Play)
            return;
        if (!this.isDraging)
            return;
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


