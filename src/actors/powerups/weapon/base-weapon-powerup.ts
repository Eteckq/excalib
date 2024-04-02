import { ImageSource } from "excalibur";
import { BasePowerup } from "../base-powerup";
import { BaseWeapon } from "../../../weapons/base-weapons";
import { Player } from "../../player";

export abstract class BaseWeaponPowerup extends BasePowerup {
  constructor(
    x: number,
    y: number,
    public weaponType: typeof BaseWeapon,
    image: ImageSource
  ) {
    super(x, y, image);
  }

  public abstract onPlayerUse(player: Player): void;
}
