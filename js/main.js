/**
 * 
Title: Bully Bash
Dorsa Zare

"Bully Bash" is a game where players confront the challenges of getting bullied and grapple with the decision to seek revenge or forgive. 
Through a series of mini-games, each representing different stages of the bullying experience, players shape the destiny of their character. Choosing forgiveness leads to a quick happy ending, while seeking revenge leads to a more challenging journey through karma, dying, judgment, and eventual cooperation with former bullies in Hell.
The game offers players the opportunity to reconsider their choices with a second chance feature, encouraging reflection on the importance of forgiveness in navigating life's challenges.
*/

"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Title, BullyingInstructions, Bullying, Forgiveness, RevengeInstructions, Revenge, Limbo, Verdict, HellInstructions, Hell, SecondChance]
};

let game = new Phaser.Game(config);