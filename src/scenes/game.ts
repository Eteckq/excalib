import { Scene, Random, Engine } from "excalibur";
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

export class Game extends Scene {
  random = new Random(); // seeded random
  waveManager = new WavesManager();
  constructor() {
    super();
  }

  onInitialize(engine: Engine) {
    const player = new Player();
    this.add(player);

    // this.add(new EnemyShip02(300, 150));
    // this.add(new EnemyShip03(400, 150));
    // this.add(new EnemyShip04(550, 150));
    // this.add(new EnemyShip05(680, 150));
    // this.add(new Weapon02Powerup(100, 150));
  }

  onPreUpdate(engine: Engine<any>, delta: number): void {
    if (this.world.queryTags(["enemy"]).entities.length == 0) {
      this.newWave();
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
