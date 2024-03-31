import { ImageSource, Loader } from "excalibur";
import playerShip from "./images/playerShip1_blue.png";
import laserBlue from "./images/laserBlue04.png";
import enemyBlack1 from "./images/enemyBlack1.png";
import enemyBlack2 from "./images/enemyBlack2.png";

export const Resources = {
  PlayerShip: new ImageSource(playerShip),
  LaserBlue: new ImageSource(laserBlue),
  EnemyBlack1: new ImageSource(enemyBlack1),
  EnemyBlack2: new ImageSource(enemyBlack2),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
