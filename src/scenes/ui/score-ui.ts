import { ImageSource } from "excalibur";
import { BaseUI } from "./base-ui";
import { BaseWeaponPowerup } from "../../actors/powerups/weapon/base-weapon-powerup";

export class ScoreUI extends BaseUI {
  constructor(id: string) {
    super(id);
  }

  public constructUi(): void {}

  public setScore(score: number) {
    this.domElement.innerHTML = score;
  }
}
