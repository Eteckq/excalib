import { CollisionGroup, CollisionGroupManager } from "excalibur";

export const EnemyCollisionMask = CollisionGroupManager.create("enemy");
export const PlayerCollisionMask = CollisionGroupManager.create("player");

// export const playersCanCollideWith = CollisionGroup.collidesWith([
//     EnemyCollisionMask,
// ])
// export const enemiesCanCollideWith = CollisionGroup.collidesWith([
//     PlayerBulletCollisionMask,
// ])
