import { Collider, CollisionContact, Engine, Side, Vector } from "excalibur";
import { BasicBullet } from "../bullets/bullet";
import { Player } from "../player";
import { BaseWeapon } from "./base-weapons";

export class Weapon extends BaseWeapon {
  protected BulletType: typeof BasicBullet = BasicBullet;

  constructor() {
    super(500);
  }

  public shoot(player: Player, engine: Engine) {
    const nosePos = new Vector(0, -40);
    engine.add(
      new BasicBullet(player.pos.x + nosePos.x, player.pos.y + nosePos.y)
    );
  }
}
