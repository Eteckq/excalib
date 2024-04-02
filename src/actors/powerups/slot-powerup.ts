import { Resources } from "../../resources";
import { GreenWeapon } from "../../weapons/green-weapon";
import { BasePowerup } from "./base-powerup";
import { BaseWeaponPowerup } from "./base-weapon-powerup";

export class SlotPowerup extends BasePowerup {
  constructor(x: number, y: number) {
    super(x, y, Resources.PowerupGreen);
  }
}
