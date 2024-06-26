import { Engine } from "excalibur";
import { Player } from "../actors/player";
import { BaseWeapon } from "./base-weapons";
import { GreenBullet } from "../actors/bullets/player/green-bullet";

export class GreenWeapon extends BaseWeapon {
  private switchSide = true;
  constructor() {
    super();
  }

  instance() {
    return GreenWeapon;
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
      case 2:
        this.cooldown = 100;
        if (this.switchSide) {
          engine.add(new GreenBullet(player.pos.x + 25, player.pos.y));
        } else {
          engine.add(new GreenBullet(player.pos.x - 25, player.pos.y));
        }
        this.switchSide = !this.switchSide;
        break;
      case 3:
        this.cooldown = 50;
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
