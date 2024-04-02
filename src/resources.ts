import { ImageSource, Loader, SpriteSheet } from "excalibur";
import playerShip from "./images/playerShip1_blue.png";
import laserBlue from "./images/laserBlue04.png";
import laserGreen from "./images/laserGreen13.png";
import enemy1 from "./images/enemy1.png";
import enemy2 from "./images/enemy2.png";
import enemy3 from "./images/enemy3.png";
import enemy4 from "./images/enemy4.png";
import enemy5 from "./images/enemy5.png";
import ufo from "./images/ufo.png";
import bullet from "./images/bullet.png";
import powerUpBlue from "./images/powerupBlue_star.png";
import powerUpGreen from "./images/powerupGreen_star.png";
import powerUpSlot from "./images/powerupSlot.png";

export const Resources = {
  PlayerShip: new ImageSource(playerShip),
  LaserBlue: new ImageSource(laserBlue),
  LaserGreen: new ImageSource(laserGreen),
  Enemy1: new ImageSource(enemy1),
  Enemy2: new ImageSource(enemy2),
  Enemy3: new ImageSource(enemy3),
  Enemy4: new ImageSource(enemy4),
  Enemy5: new ImageSource(enemy5),
  Enemy6: new ImageSource(ufo),
  BulletSheet: new ImageSource(bullet),
  PowerupBlue: new ImageSource(powerUpBlue),
  PowerupGreen: new ImageSource(powerUpGreen),
  PowerUpSlot: new ImageSource(powerUpSlot),
} as const;

export const BulletSheet = SpriteSheet.fromImageSource({
  image: Resources.BulletSheet,
  grid: {
    rows: 1,
    columns: 3,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
