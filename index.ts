#! /usr/bin/env node

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

async function mainMenuFunc() {
    
};

//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------

async function welcomeFunc(welcomeMessage:string ) {
    let rainbowTitle = chalkAnimation.neon(chalk.blueBright("Welcome To "+ welcomeMessage +" App!\n\nCoded By Hosein Sirat Mohammad\n"));
    await stopTime();
    rainbowTitle.stop();
};

//------------------------------------------------------------------------------
//MAIN HERE
//------------------------------------------------------------------------------

let appName:string = "Student Management System";
await welcomeFunc(appName);

await mainMenuFunc();