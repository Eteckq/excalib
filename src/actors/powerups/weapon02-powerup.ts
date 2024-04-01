import { Resources } from "../../resources";
import { GreenWeapon } from "../../weapons/green-weapon";
import { BaseWeaponPowerup } from "./base-weapon-powerup";

export class Weapon02Powerup extends BaseWeaponPowerup {
  constructor(x: number, y: number) {
    super(x, y, GreenWeapon);

    this.graphics.add(Resources.PowerupGreen.toSprite());
  }
}
