import { Resources } from "../../../resources";
import { BlueWeapon } from "../../../weapons/blue-weapon";
import { Player } from "../../player";
import { BaseWeaponPowerup } from "./base-weapon-powerup";

export class BluePowerup extends BaseWeaponPowerup {
  constructor(x: number, y: number) {
    super(x, y, BlueWeapon, Resources.PowerupBlue);
  }

  public onPlayerTake(player: Player): void {
    player.pushWeaponUpgrade(this);
  }

  public onPlayerUse(player: Player): void {
    console.log("special action");
  }
}
