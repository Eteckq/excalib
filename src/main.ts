import { DisplayMode, Engine } from "excalibur";
import { loader } from "./resources";
import { HEIGHT, WIDTH } from "./constants";
import { Game } from "./scenes/game";

class Shooter extends Engine {
  constructor() {
    super({ width: WIDTH, height: HEIGHT, displayMode: DisplayMode.FitScreen });
  }
  async initialize() {
    this.on("hidden", () => {
      // this.stop();
    });

    this.add("game", new Game());
    await this.start(loader);
    await this.goToScene("game");
  }
}

export const shooter = new Shooter();

shooter.initialize();
shooter.showDebug(true);
