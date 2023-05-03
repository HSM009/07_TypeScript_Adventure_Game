#! /usr/bin/env node

console.clear();

//------------------------------------------------------------------------------
//IMPORTS HERE
//------------------------------------------------------------------------------

import inquirer from "inquirer";
import chalk from "chalk"; 
import chalkAnimation from "chalk-animation";
//------------------------------------------------------------------------------
//CLASSES/CONSTRUCTORS/OOPs HERE
//------------------------------------------------------------------------------

const stopTime = ()=>{
    return new Promise((res:any)=>{
        setTimeout(res,3500);
    })
};
//Enemies variables
let enemies:string[] = ['Skeleton','Zombie','Warrior','Assassin'];
let maxEnemyHealth:number = 75;
let enemyAttackDamage:number = 25;

//Player variables
let playerHealth:number = 100;
let playerAttackDamage:number = 50;
let playerNumHealthPotion:number = 3;
let healthPotionHealAmount:number = 30;
let healtPotionDropChance:number = 50; // In percentage ammount i.e. 50 percentage
//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------

async function welcomeFunc(welcomeMessage:string ) {
    let rainbowTitle = chalkAnimation.neon(chalk.blueBright("Welcome To "+ welcomeMessage +" App!\n\nCoded By Hosein Sirat Mohammad\n"));
    await stopTime();
    rainbowTitle.stop();
};

function randomNumber (num:number){
    return Math.floor(Math.random() * num);
}

async function mainMenuFunc() {
    await inquirer.prompt([
        {
            type:   "list",
            name:   "optionMain",
            message:"Chose the main menu option",
            choices: [
            {
                name:   'Run the game'
            },
            {
                name:   'Bye',
                value:  'Bye'
            }
        ]
        }            
    ]).then((selected)=>{
        if (selected.optionMain == 'Bye')
        {
            console.log("\n#######################");
            console.log("# THANKS FOR PLAYING! #");
            console.log("#######################\n");
            console.log(selected.optionMain);
        }
        else
        {
            gameRunFunc();
        }
    });
};

async function gameRunFunc(){
    let running:boolean = true
    console.log('\n*-----------------------------------------------------------*');
    console.log('               Welcome to the Dungeon!');
    
    Game:
    while(running == true) {
        console.log('\n*-----------------------------------------------------------*');
        let enemyHealth:number = randomNumber(maxEnemyHealth);
        let enemy:string = enemies[randomNumber(enemies.length)];
        console.log("\t# " + enemy + " has appeared!" + " #\n" );

        while(enemyHealth > 0)
        {
            console.log("\t# Player's HP:" + playerHealth + ' #');
            console.log("\t# " + enemy + "'s HP:"  + enemyHealth + " #\n");

            let selected = await inquirer.prompt([{
                type:   "list",
                name:   "actionOption",
                message:"What would you like to do?",
                choices:[
                    {
                        name:   'Attack',
                        value:  'Attack'
                    },
                    {
                        name:   'Drink health potion',
                        value:  'Potion'
                    },
                    {
                        name:   'Run',
                        value:  'Run'   
                    }
                ]
            }
            ]);    
            if(selected.actionOption == 'Attack')
            {
                let damageDealt:number = randomNumber(playerAttackDamage);
                let damageTaken:number = randomNumber(enemyAttackDamage);
                enemyHealth -= damageDealt;
                playerHealth -= damageTaken;
                console.log("\n\t>Player strike the " + enemy + " for " + damageDealt + " damage.");
                console.log("\t>Player recieve " + damageTaken + " for retaliation." );

                if(playerHealth < 1)
                {
                    console.log("\t>Player is weak and can not go on.");
                    break;                 
                }
            }
            else if(selected.actionOption == 'Potion')
            {
                if(playerNumHealthPotion > 0)
                {
                    playerHealth += healthPotionHealAmount;
                    playerNumHealthPotion--;
                    console.log("\n\t>Player drink a health potion, healing player for " + healthPotionHealAmount + "." + "\n\t>Player now have " + playerHealth + " health.\n\t>Player have " + playerNumHealthPotion +" healing potion/s remaining.");
                }
                else
                {
                    console.log("\n\t>Player have no healing potion remaining. Defeat the enemy with a chance to get one potion.");
                }
            }
            else 
            {
                console.log("\n\t>Player run away from the " + enemy + "!");
                continue Game;
            }
        };

        if(playerHealth<1)
        {
            console.log("\n\t>Player limp out of dungeon, weak from battle.");
            break;
        }
        console.log("\n\t>Player have the defeated the " + enemy + ".");
        console.log("\t>Player have "+ playerHealth + " HP left.");
        if(randomNumber(100) > healtPotionDropChance)
        {
            playerNumHealthPotion++;
            console.log("\n\t# The " + enemy + " has dropped a healing potion. # ");
            console.log("\t# Player now have " + playerNumHealthPotion + " health potion/s. #\n ");
        }
        
        let selected2 = await inquirer.prompt([
            {
                type:   "list",
                name:   "actionOption2",
                message:"What would you like to do?",
                choices:[
                    {
                        name:   "Continue the adventure",
                        value:  "Continue"
                    },
                    {
                        name:   "Exit",
                        value:  "Exit"
                    }
                ]

            }
        ]);
        if(selected2.actionOption2 == "Continue")
        {
            console.log("\n\t>Player continue the adventure.");
        }
        else
        {
            console.log("\n\tPlayer left the dungeon, succesffully from adventure!");
            break;
        }
    };

    await mainMenuFunc();
};

//------------------------------------------------------------------------------
//MAIN HERE
//------------------------------------------------------------------------------

let appName:string = "Text Based Adventure Game";
await welcomeFunc(appName);

await mainMenuFunc();