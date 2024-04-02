import { Resources } from "../../resources";
import { BlueWeapon } from "../../weapons/blue-weapon";
import { BasePowerup } from "./base-powerup";
import { BaseWeaponPowerup } from "./base-weapon-powerup";

export class Weapon01Powerup extends BaseWeaponPowerup {
  constructor(x: number, y: number) {
    super(x, y, BlueWeapon, Resources.PowerupBlue);
  }
}
