import { DisplayMode, Engine } from "excalibur";
import { loader } from "./resources";
import { HEIGHT, WIDTH } from "./constants";
import { Game } from "./scenes/game";
import { DevTool } from "@excaliburjs/dev-tools";

class Shooter extends Engine {
  constructor() {
    super({ width: WIDTH, height: HEIGHT, displayMode: DisplayMode.FitScreen });
  }
  initialize() {
    this.on("hidden", () => {
      // this.stop();
    });

    this.add("game", new Game());
    this.start(loader);
    this.goToScene("game");
  }
}

export const shooter = new Shooter();
shooter.initialize();
shooter.showDebug(true);
