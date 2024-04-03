import { ImageSource } from "excalibur";
import { BaseUI } from "./base-ui";
import { BaseWeaponPowerup } from "../../actors/powerups/weapon/base-weapon-powerup";

export class SlotUI extends BaseUI {
  constructor(id: string, private slotNbr: number) {
    super(id);
  }

  constructUi() {
    for (let slotId = 0; slotId < this.slotNbr; slotId++) {
      this.createSlot(slotId);
    }
  }

  private createSlot(id: number) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.id = `slot-${id}`;

    this.getDomElement().appendChild(slot);
    return slot;
  }

  private setIcon(slot: number, image: ImageSource) {
    let slotElement = this.getDomElement().querySelector(`#slot-${slot}`);
    if (!slotElement) {
      slotElement = this.createSlot(this.slotNbr - 1);
    }
    if (!image) {
      slotElement.style.backgroundImage = ``;
    } else {
      slotElement.style.backgroundImage = `url('${image.path}')`;
    }
  }

  setPowerups(weaponUpgrades: BaseWeaponPowerup[]) {
    for (let i = 0; i < this.slotNbr; i++) {
      this.setIcon(i, weaponUpgrades[i]?.image);
    }
  }

  public addSlot() {
    if (this.slotNbr == 8) return;
    this.slotNbr++;
  }
}
