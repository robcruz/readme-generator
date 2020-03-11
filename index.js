
// ES6+ Homework: Good README Generator
// Create a command-line application that dynamically generates a README.md from a user's input.
// The application will be invoked with the following command:
//
// node index.js
// The user will be prompted for their GitHub username, which will be used to make a call to the GitHub API
// to retrieve their email and profile image. They will then be prompted with questions about their project.
//
//     The README will be populated with the following:
//
//     At least one badge
// Project title - done
// Description - done
// Table of Contents
// Installation
// Usage
// License
// Contributing
// Tests
// Questions
// User GitHub profile picture - done
// User GitHub email - done

// The user will be prompted for their GitHub username, which will be used to make a call to the GitHub API
// to retrieve their email and profile image. They will then be prompted with questions about their project.

const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");

createReadMe();



//  At least one badge
//  Project title
//  Description
//  Table of Contents
//  Installation
//  Usage
//  License
//  Contributing
//  Tests
//  Questions
//  User GitHub profile picture
//  User GitHub email

const varToString = varObj => Object.keys(varObj)[0]

async function createReadMe() {
    let readMe;

    try {
        let { username } = await inquirer.prompt({
            message: "Enter your Github username:",
            name: "username"
        });

        // let username = 'robcruz';

        // fetch user data on Github
        let response = await axios.get(`https://api.github.com/users/${username}`);
        let { name, avatar_url, html_url, login, company, email } = response.data;

        readMe = `# ${name}\n`;
        readMe += `![${name}](${avatar_url})\n`;
        readMe += `#### URL: [${html_url}](${html_url})\n`;
        readMe += `#### Username: ${login}\n`;
        if (company) {
            readMe += `#### Company: ${company}\n`;
        }
        if (email) {
            readMe += `#### Email: ${email}\n`;
        }
        readMe += `#### Github Repositories:\n\n`;
        readMe += '---\n';

        // fetch user repos on Github
        response = await axios.get(`https://api.github.com/users/${username}/repos`);

        //  Project title
        //  Description

        //  At least one badge
        //  Table of Contents - XXXXXXX
        //  Installation - XXXXXXX
        //  Usage - XXXXXXX
        //  License - XXXXXXX
        //  Contributing - XXXXXXX
        //  Tests - XXXXXXX
        //  Questions - XXXXXXX
        //  User GitHub profile picture
        //  User GitHub email



        for (const repo of response.data) {
            let { name, html_url, description, owner, license } = repo;
            let { login } = owner;
            readMe += `* ### ${name}\n`;
            readMe += `    * Description: ${description}\n`;
            readMe += `    * Email: ${email}\n`;
            readMe += `    * HTML URL: ${html_url}\n`;
            readMe += `    * Owner:\n`;
            readMe += `         * Login: ${login}\n`;

            if (license) {
                readMe += `    * License:\n`;
                readMe += `         * Name: ${license.name}\n`;
            }

            console.log('Repository: ', name);

            let tableOfContents = await inquirer.prompt({
                message: "Table of Contents:",
                name: "tableOfContents"
            });
            readMe += `    * Table of contents: ${ tableOfContents }\n`;

            let installation = await inquirer.prompt({
                message: "Installation:",
                name: "installation"
            });
            readMe += `    * Installation: ${installation}\n`;

            let usage = await inquirer.prompt({
                message: "Usage:",
                name: "usage"
            });
            readMe += `    * Usage: ${usage}\n`;

            let tests = await inquirer.prompt({
                message: "Tests:",
                name: "tests"
            });
            readMe += `    * Tests: ${tests}\n`;
        }
    } catch (err) {
        console.log(err);
    } finally {
        addNewReadme(readMe);
        console.log(readMe);
    }

}


function addNewReadme(str) {
    fs.writeFile("README.md", `${str}\n`, err => {
        if (err) {
            console.log(err);
        }
    })
}

function appendToReadMe(str) {
    fs.appendFile("README.md", `${str}\n`, err => {
        if (err) {
            console.log("\nThere was an error!\n")
            console.log(err);
        }
    })
}




// axios.get(`https://api.github.com/users/${username}`)
//     .then(response => {
//         let data = data;
//         readMe += `# ${data.name}\n`;
//         readMe += `![${data.name}](${data.avatar_url})\n`;
//         readMe += `#### URL: [${data.html_url}](${data.html_url})\n`;
//         readMe += `#### Github Username: ${data.login}\n`;
//         // readMe += `#### Email: ${email}\n`;
//         readMe += `#### Github Repositories:\n`;
//
//         fs.writeFile("README.md", readMe, err => {
//             if (err) {
//                 console.log(err);
//             }
//         })
//
//         console.log(readMe);
//     })





// const { data } = await axios.get(`https://api.github.com/users/${username}`);

// const { data } = await axios.get(`https://api.github.com/users/${username}/events/public`);
//
// const repos = [];
// let name;
// let avatarUrl;
// let email;
// let readMe = "";
//
// data.forEach((element) => {
//     let { actor, repo, payload } = element;
//     if (!name) name = payload.commits[0].author.name;
//     if (!email) email = payload.commits[0].author.email;
//     if (!avatarUrl) avatarUrl = actor.avatar_url;
//     let repoName = repo.name.split("/").pop();
//     if (!repos.includes(repoName)) { repos.push(repoName) }
//
// });
//
// readMe += `# ${name}\n`;
// readMe += `![${username}](${avatarUrl})\n`;
// readMe += `#### Github Username: ${username}\n`;
// readMe += `#### Email: ${email}\n`;
// readMe += `#### Github Repositories:\n`;

// repos.forEach(repo => {
//     readMe += `* ${repo}\n`;
// })
