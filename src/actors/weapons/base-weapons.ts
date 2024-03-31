import { Collider, CollisionContact, Engine, Side, Vector } from "excalibur";
import { BasicBullet } from "../bullets/bullet";
import { Player } from "../player";

export abstract class BaseWeapon {
  private actualCooldown: number = 0;

  constructor(protected cooldown: number) {}

  public reduceCooldown(value: number) {
    if (this.actualCooldown == 0) return;

    this.actualCooldown = Math.max(0, this.actualCooldown - value);
  }

  public tryToShoot(player: Player, engine: Engine) {
    if (this.actualCooldown > 0) return;
    this.actualCooldown = this.cooldown;
    this.shoot(player, engine);
  }

  protected abstract shoot(player: Player, engine: Engine): void;
}
