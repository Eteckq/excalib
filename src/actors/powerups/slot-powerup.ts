import { Resources } from "../../resources";
import { Player } from "../player";
import { BasePowerup } from "./base-powerup";

export class SlotPowerup extends BasePowerup {
  constructor(x: number, y: number) {
    super(x, y, Resources.PowerUpSlot);
  }

  public onPlayerTake(player: Player): void {
    player.addSlot();
  }
}
