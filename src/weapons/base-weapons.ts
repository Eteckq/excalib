import { Collider, CollisionContact, Engine, Side, Vector } from "excalibur";
import { BlueBullet } from "../actors/bullets/player/blue-bullet";
import { Player } from "../actors/player";

export abstract class BaseWeapon {
  private actualCooldown: number = 0;

  constructor(protected cooldown: number = 500) {}

  public reduceCooldown(value: number) {
    if (this.actualCooldown == 0) return;

    this.actualCooldown = Math.max(0, this.actualCooldown - value);
  }

  public tryToShoot(player: Player, engine: Engine, power = 1) {
    if (this.actualCooldown > 0) return;
    this.actualCooldown = this.cooldown;
    this.shoot(player, engine, power);
  }

  protected abstract shoot(player: Player, engine: Engine, power: number): void;
}
