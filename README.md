#Todo-List
This is a simple todo-list app, built using React.js, Node.js, Express, and MongoDB.  

This todo-list has the following features:
- Ability to add reminders
- Ability to mark reminders as completed / not completed
- Filter list by completed / not completed
- Todo-list items retained in the session via MongoDB
- Ability to categorize reminders
- Ability to sort reminders by description, category, date created, or date completed
- Ability to search reminders from the list
- Ability to delete reminders

## Requirements
- Node 7.10.0
- MongoDB 3.4.6

## Development
### Installing Project Dependencies
```
npm install
```

## Initialize Database

In the terminal, run: `sudo mongod`

In a separate terminal tab, run: `mongo`


## Running the App

IMPORTANT: ensure `mongoDB` is running before performing these steps.

To run webpack build: `npm run react-dev`

To run server: `npm run server-dev`
