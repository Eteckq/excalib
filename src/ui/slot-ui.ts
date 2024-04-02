import { ImageSource } from "excalibur";
import { BaseUI } from "./base-ui";

export class SlotUI extends BaseUI {
  private images: ImageSource[] = [];

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

  public appendPowerup(image: ImageSource) {
    this.images.unshift(image);
    this.refreshUi();
  }

  public refreshUi() {
    for (let slotId = 0; slotId < this.slotNbr; slotId++) {
      this.setIcon(slotId, this.images[slotId]);
    }
  }

  public popPowerup() {
    this.images.pop();
  }

  public shiftPowerup() {
    this.images.shift();
    this.refreshUi();
  }

  public addSlot() {
    if (this.slotNbr == 8) return;
    this.slotNbr++;
    this.refreshUi();
  }
}
