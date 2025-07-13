// app.js

const fs = require('fs');
const readline = require('readline');

// Step 1: Setup readline to get input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Step 2: Ask for user input
rl.question('Enter your name: ', (name) => {
  rl.question('Enter your phone number: ', (phone) => {
    const contact = { name, phone };

    // Step 3: Load existing contacts or create new array
    let contacts = [];
    if (fs.existsSync('contacts.json')) {
      const data = fs.readFileSync('contacts.json', 'utf8');
      contacts = JSON.parse(data);
    }

    // Step 4: Add new contact and save
    contacts.push(contact);
    fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));

    console.log('✅ Contact saved successfully!');
    rl.close();
  });
});
