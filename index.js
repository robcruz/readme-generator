
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

let readMe = "";
let username = 'robcruz';
console.log('username', username);

try {
    // const { username } = await inquirer.prompt({
    //     message: "Enter your Github username:",
    //     name: "username"
    // });

    axios.get(`https://api.github.com/users/${username}`)
        .then(response => {
            // console.log('response.data)', response.data);
            readMe += `# ${response.data.name}\n`;
            readMe += `![${response.data.name}](${response.data.avatar_url})\n`;
            readMe += `#### URL: [${response.data.html_url}](${response.data.html_url})\n`;
            readMe += `#### Username: ${response.data.login}\n`;
            if (response.data.company) {
                readMe += `#### Company: ${response.data.company}\n`;
            }
            if (response.data.email) {
                readMe += `#### Email: ${response.data.email}\n`;
            }
            readMe += `#### Github Repositories:\n`;

        })
        .catch(err => {
            console.log()
        })
        .finally(() => {
            addNewReadme(readMe);
            console.log(readMe);
        });

    const repos = [];
    axios.get(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            let { data } = response;
            let { name, description, url, owner } = data;

            response.data.forEach(repo => {
                let { name, html_url, description, owner } = repo;
                readMe += ``;
                readMe += ``;
                readMe += ``;
                readMe += ``;
                readMe += ``;
                readMe += ``;
                readMe += ``;
                readMe += ``;
                console.log('name', name);
                console.log('html_url', html_url);
                console.log('description', description);
                let { login, avatar_url } = owner;
                console.log('login', login);
                console.log('avatar_url', avatar_url);
            })


            // readMe += `# ${data.name}\n`;
            // readMe += `![${data.name}](${data.avatar_url})\n`;
            // readMe += `#### URL: [${data.html_url}](${data.html_url})\n`;
            // readMe += `#### Github Username: ${data.login}\n`;
            // // readMe += `#### Email: ${email}\n`;
            // readMe += `#### Github Repositories:\n`;
            //
            // addNewReadme(readMe);
            // console.log(readMe);
        })
        .catch(err => {
            console.log(err);
        }).finally(() => {
        console.log('repos', repos);

    })

} catch (err) {
    console.log(err);
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
//         let data = response.data;
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
