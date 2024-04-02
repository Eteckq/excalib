import { Actor, CollisionType, ImageSource, vec } from "excalibur";
import { Resources } from "../../resources";
import { PlayerCollisionMask, PowerUpCanCollideWith } from "../../colliders";
import { BasePowerup } from "./base-powerup";
import { BaseWeapon } from "../../weapons/base-weapons";

export abstract class BaseWeaponPowerup extends BasePowerup {
  constructor(
    x: number,
    y: number,
    public weaponType: typeof BaseWeapon,
    public image: ImageSource
  ) {
    super(x, y);
    this.graphics.add(image.toSprite());
  }
}
