import { Collider, CollisionContact, Engine, Side, Vector } from "excalibur";
import { Bullet } from "../bullets/bullet";
import { Player } from "../player";
import { BaseWeapon } from "./base-weapons";

export class Weapon extends BaseWeapon {
  protected BulletType: typeof Bullet = Bullet;

  constructor() {
    super(500);
  }

  public shoot(player: Player, engine: Engine) {
    const nosePos = new Vector(0, -40);
    engine.add(new Bullet(player.pos.x + nosePos.x, player.pos.y + nosePos.y));
  }
}
