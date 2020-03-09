
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
// Project title
// Description
// Table of Contents
// Installation
// Usage
// License
// Contributing
// Tests
// Questions
// User GitHub profile picture
// User GitHub email

// The user will be prompted for their GitHub username, which will be used to make a call to the GitHub API
// to retrieve their email and profile image. They will then be prompted with questions about their project.
const axios = require("axios");
const inquirer = require("inquirer");

getGithubData();

async function getGithubData() {
    try {
        // const { username } = await inquirer.prompt({
        //     message: "Enter your Github username:",
        //     name: "username"
        // });

        let username = 'robcruz';
        console.log('username', username);
        const { data } = await axios.get(`https://api.github.com/users/${username}/events/public`);

        const array = [];
        let avatarUrl;
        let email;

        data.forEach((element) => {
            let { actor, repo, payload } = element;

            if (!email) email = payload.commits[0].author.email;

            if (!avatarUrl) avatarUrl = actor.avatar_url;

            let repoName = repo.name.split("/").pop();
            if (!array.includes(repoName)) { array.push(repoName) }

        });
        // console.log("===================================================================================== end")

        console.log("array", array);
        console.log("avatarUrl", avatarUrl);
        console.log("email", email);

    } catch (err) {
        console.log(err);
    }
}

