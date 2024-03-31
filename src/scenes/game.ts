import { Scene, Random, Engine } from "excalibur";
import { Player } from "../actors/player";
import { WIDTH } from "../constants";
import { EnemyShip01 } from "../actors/enemies/enemy01";
import { EnemyShip02 } from "../actors/enemies/enemy02";

export class Game extends Scene {
  random = new Random(); // seeded random

  constructor() {
    super();
  }

  onInitialize(engine: Engine) {
    const paddle = new Player();
    this.add(paddle);
    // this.add(new EnemyShip01(this.random.integer(0, WIDTH), 150));
    this.add(new EnemyShip02(this.random.integer(0, WIDTH), 150));
  }
}
