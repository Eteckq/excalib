import { Collider, CollisionContact, Engine, Side, Vector } from "excalibur";
import { Bullet } from "../bullets/bullet";
import { Player } from "../player";


export class Weapon {
    protected BulletType: typeof Bullet = Bullet
    protected cooldown: number = 500

    private actualCooldown: number = 0

    constructor() {

    }

    public reduceCooldown (value: number) {
        if (this.actualCooldown == 0) return

        this.actualCooldown = Math.max(0, this.actualCooldown - value)
    }

    public shoot (player: Player, engine: Engine) {
        if (this.actualCooldown > 0) return

        const nosePos = new Vector(0, -40)
        engine.add(new Bullet(player.pos.x + nosePos.x, player.pos.y + nosePos.y))
        this.actualCooldown = this.cooldown
    }

    onPostCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        
        console.log("evt");
    }
}