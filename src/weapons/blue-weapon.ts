import { Collider, CollisionContact, Engine, Side, Vector } from "excalibur";
import { BlueBullet } from "../actors/bullets/player/blue-bullet";
import { Player } from "../actors/player";
import { BaseWeapon } from "./base-weapons";

export class BlueWeapon extends BaseWeapon {
  constructor() {
    super();
  }

  public shoot(player: Player, engine: Engine, power = 0) {
    const nosePos = new Vector(0, -40);
    switch (power) {
      case 0:
        this.cooldown = 500;
        engine.add(
          new BlueBullet(player.pos.x + nosePos.x, player.pos.y + nosePos.y)
        );
        break;
      case 1:
        this.cooldown = 200;
        engine.add(
          new BlueBullet(player.pos.x + nosePos.x, player.pos.y + nosePos.y)
        );
        break;
      case 2:
        this.cooldown = 100;
        engine.add(
          new BlueBullet(player.pos.x + nosePos.x, player.pos.y + nosePos.y)
        );
        break;
      case 3:
        this.cooldown = 50;
        engine.add(
          new BlueBullet(player.pos.x + nosePos.x, player.pos.y + nosePos.y)
        );
        break;
    }
  }
}
