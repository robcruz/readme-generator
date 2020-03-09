
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

getGithubUserData();


async function getGithubUserData() {
    try {
        const { user } = await inquirer.prompt({
            message: "Enter your Github username:",
            name: "user"
        });

        console.log('username', user)
        const { data } = await axios.get(`https://api.github.com/users/${user}/events/public`);


        // console.log(config);
        const array = [];
        let avatarUrl;
        data.forEach((element, index) => {
            if (index === 0) { avatarUrl = element.actor.avatar_url }
            let repo = element.repo.name.split("/").pop();
            if (!array.includes(repo)) { array.push(repo) }

        });
        // console.log("===================================================================================== end")

        console.log("array", array);
        console.log("avatarUrl", avatarUrl);

    } catch (err) {
        console.log(err);
    }
}

