import {
  Scene,
  Random,
  Engine,
  Timer,
  SceneActivationContext,
} from "excalibur";
import { Player } from "../actors/player";
import { WIDTH } from "../constants";
import { WavesManager } from "../waves-manager";
import { SlotUI } from "./ui/slot-ui";
import { ScoreUI } from "./ui/score-ui";

export class Game extends Scene {
  random = new Random(); // seeded random
  waveManager = new WavesManager();
  timer = new Timer({
    fcn: () => this.newWave(),
    repeats: true,
    interval: 8000,
  });

  public score = 0;

  private queryEnemies = this.world.queryTags(["enemy"]);

  public slotsUi = new SlotUI("slots", 3);
  public scoreUi = new ScoreUI("score");

  constructor() {
    super();
  }

  onActivate(context: SceneActivationContext<unknown>): void {
    this.slotsUi.constructUi();
    this.scoreUi.constructUi();
  }

  onDeactivate() {
    this.slotsUi.destroyUi();
    this.scoreUi.destroyUi();
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
    const enemiesLength = this.queryEnemies.entities.length;
    if (enemiesLength == 0) {
      this.newWave();
      this.timer.reset();
    } else if (enemiesLength > 16) {
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
