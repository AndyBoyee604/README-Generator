// Packages
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./src/generateMarkdown.js')

// Questions
const questions = [

  // Project name
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    validate: titleInput => {
      if (titleInput) {
        return true;
      } else {
        console.log('Title required!');
        return false;
      }
    }
  },

  // Description
  {
    type: 'input',
    name: 'description',
    message: 'Describe your project:',
    validate: descriptionInput => {
      if (descriptionInput) {
        return true;
      } else {
        console.log('Description required!');
        return false;
      }
    }
  },

  // Installation Instructions, Confirmation if there is an installation process or not
  {
    type: 'confirm',
    name: 'confirmInstallation',
    message: 'Do you need to install this project or is there any packages that needs installation for it to work?'
  },
  // If confirmed or not
  {
    type: 'input',
    name: 'installation',
    message: 'Enter instructions for installation:',
    when: ({ confirmInstallation }) => {
      if (confirmInstallation) {
        return true;
      }
    }
  },

  // Usage Information
  {
    type: 'input',
    name: 'usage',
    message: 'How do you use this project?',
    validate: usageInput => {
      if (usageInput) {
        return true;
      } else {
        console.log('Usage information required!');
        return false;
      }
    }
  },

  // Contribution Guidlines
  {
    type: 'input',
    name: 'contribution',
    message: 'How to contribute to this project?',
    validate: contributionInput => {
      if (contributionInput) {
        return true;
      } else {
        console.log('Contribution info required!');
        return false;
      }
    }
  },

  // Test Instructions 
  {
    type: 'input',
    name: 'testing',
    message: 'How can someone test this project?',
    validate: testingInput => {
      if (testingInput) {
        return true;
      } else {
        console.log('Testing instructions required!');
        return false;
      }
    }
  },

  // License
  {
    type: 'checkbox',
    name: 'license',
    message: 'Choose your license',
    choices: ['Apache', 'MIT', 'None'],
    validate: licenseInput => {
        if (licenseInput) {
            return true;
        } else {
            console.log('License required!');
            return false;
        }
    }
},

  // Github Username
  {
    type: 'input',
    name: 'github',
    message: 'Enter GitHub username:',
    validate: githubInput => {
      if (githubInput) {
        return true;
      } else {
        console.log('GitHub username required!');
        return false;
      }
    }
  },

  // Email Address
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email:',
    validate: emailInput => {
      if (emailInput) {
        return true;
      } else {
        console.log('Email required!');
        return false;
      }
    }
  },
];

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err)
      throw err;
    console.log('Success! README.md created!')
  });
};

// Function to initialize app
function init() {
  inquirer.prompt(questions)
    .then(function (userInput) {
      console.log(userInput)
      writeToFile("README.md", generateMarkdown(userInput));
    });
};

// Function call to initialize app
init();