import {
  Scene,
  Random,
  Engine,
  Timer,
  SceneActivationContext,
  ImageSource,
} from "excalibur";
import { Player } from "../actors/player";
import { WIDTH } from "../constants";
import { EnemyShip01 } from "../actors/enemies/enemy01";
import { EnemyShip02 } from "../actors/enemies/enemy02";
import { EnemyShip03 } from "../actors/enemies/enemy03";
import { EnemyShip04 } from "../actors/enemies/enemy04";
import { EnemyShip05 } from "../actors/enemies/enemy05";
import { EnemyShip06 } from "../actors/enemies/enemy06";
import { Weapon01Powerup } from "../actors/powerups/weapon01-powerup";
import { Weapon02Powerup } from "../actors/powerups/weapon02-powerup";
import { WavesManager } from "../waves-manager";
import { Resources } from "../resources";

class SlotUI {
  private domElement: HTMLElement;
  private images: ImageSource[] = [];

  constructor(_domElement: HTMLElement | null, private slotNbr: number) {
    if (_domElement == null) throw new Error("UI Dom not found");
    this.domElement = _domElement;
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

export class Game extends Scene {
  random = new Random(); // seeded random
  waveManager = new WavesManager();
  timer = new Timer({
    fcn: () => this.newWave(),
    repeats: true,
    interval: 8000,
  });

  public slotsUi = new SlotUI(document.getElementById("slots"), 3);

  constructor() {
    super();
  }

  onActivate(context: SceneActivationContext<unknown>): void {
    this.slotsUi.constructUi();
  }

  onDeactivate() {
    this.slotsUi.destroyUi();
  }

  onInitialize(engine: Engine) {
    const player = new Player();
    this.add(player);
    this.add(this.timer);
    this.timer.start();

    // this.add(new EnemyShip02(300, 150));
    // this.add(new EnemyShip03(400, 150));
    // this.add(new EnemyShip04(550, 150));
    // this.add(new EnemyShip05(680, 150));
    // this.add(new Weapon02Powerup(100, 150));
  }

  onPreUpdate(engine: Engine<any>, delta: number): void {
    if (this.world.queryTags(["enemy"]).entities.length == 0) {
      this.newWave();
      this.timer.reset();
    }
  }

  newWave() {
    this.spawnPowerup();
    const enemies = this.waveManager.nextWave();
    for (const enemy of enemies) {
      this.add(new enemy(Math.random() * WIDTH, -50));
    }
  }

  spawnPowerup() {
    const powerup = this.waveManager.getPowerup();
    this.add(new powerup(Math.random() * WIDTH, -50));
  }
}
