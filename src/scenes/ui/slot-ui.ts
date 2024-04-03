import { ImageSource } from "excalibur";
import { BaseUI } from "./base-ui";
import { BaseWeaponPowerup } from "../../actors/powerups/weapon/base-weapon-powerup";

export class SlotUI extends BaseUI {
  constructor(_domElement: HTMLElement | null, private slotNbr: number) {
    super(_domElement);
  }

  public constructUi() {
    this.domElement.classList.add("BonusUI");
    for (let slotId = 0; slotId < this.slotNbr; slotId++) {
      this.createSlot(slotId);
    }
  }

  private createSlot(id: number) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.id = `slot-${id}`;

    this.domElement.appendChild(slot);
    return slot;
  }

  public destroyUi() {
    this.domElement.classList.remove("BonusUI");
    this.domElement.innerHTML = "";
  }

  private setIcon(slot: number, image: ImageSource) {
    let slotElement = this.domElement.querySelector(`#slot-${slot}`);
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
