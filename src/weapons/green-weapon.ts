import { Collider, CollisionContact, Engine, Side, Vector } from "excalibur";
import { BlueBullet } from "../actors/bullets/player/blue-bullet";
import { Player } from "../actors/player";
import { BaseWeapon } from "./base-weapons";
import { GreenBullet } from "../actors/bullets/player/green-bullet";

export class GreenWeapon extends BaseWeapon {
  private switchSide = true;
  constructor() {
    super();
  }

  public shoot(player: Player, engine: Engine, power = 0) {
    switch (power) {
      case 1:
        this.cooldown = 200;
        if (this.switchSide) {
          engine.add(new GreenBullet(player.pos.x + 25, player.pos.y));
        } else {
          engine.add(new GreenBullet(player.pos.x - 25, player.pos.y));
        }
        this.switchSide = !this.switchSide;
        break;
    }
  }
}
