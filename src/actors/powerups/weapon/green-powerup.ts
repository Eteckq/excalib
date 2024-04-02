import { Resources } from "../../../resources";
import { GreenWeapon } from "../../../weapons/green-weapon";
import { Player } from "../../player";
import { BaseWeaponPowerup } from "./base-weapon-powerup";

export class GreenPowerup extends BaseWeaponPowerup {
  constructor(x: number, y: number) {
    super(x, y, GreenWeapon, Resources.PowerupGreen);
  }

  public onPlayerTake(player: Player): void {
    player.pushWeaponUpgrade(this);
  }

  public onPlayerUse(player: Player): void {
    console.log("special action");
  }
}
