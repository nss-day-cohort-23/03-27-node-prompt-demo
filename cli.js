var prompt = require("prompt");
var colors = require("colors/safe");
// Show this before each prompt, in place of the default string 'prompt'
prompt.message = colors.rainbow("Please enter your ");
// Add this string before and after the prompt name
prompt.delimiter = colors.green("::");

prompt.start();

// Set up properties for each prompt
const userProps = [
  {
    name: "username",
    description: "User Name", //displayed after prompt.message. Not required. Will use the 'name' property if 'description' is not here
    pattern: /^[a-zA-Z\s\-]+$/,
    message: "Username must only be letters, spaces, or dashes" //error to show if pattern doesn't match
  },
  {
    name: "password",
    description: "password, friend",
    type: "string",
    pattern: /^\w+$/,
    message: 'Password must be letters',
    hidden: true, // obscures the password chars
    replace: '*', // replaces the chars with this
    required: true,
    before: (value) => `Your password is ${value}` // Kinda like middleware. Changes the prompt's return value any way you designate
  }
];

prompt.get(userProps, (err, result) => {
  if( err) { return onError(err)}
  console.log('Command line input received:', 'Username:', result.username, result.password);
});

function onError(err) {
  console.error(err);
  // return
}

// Example of taking an object and using prompt to augment it
let myObj = {
  password: 'lamepassword',
  mindset: 'NY'
}

console.log('my obj', myObj); // see what it looks like before we add new properties

// Takes 3 args: The object to augment, array of prompts, callback function
// Adds the prompts' results to the object automagically
prompt.addProperties(myObj, [userProps[0], 'email'], (err) => {
  console.log('updated object', myObj);
});

