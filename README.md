# Super QA

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.3.0. A lot easier than version 4+.

## Getting `ted

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js and npm](nodejs.org) Node ^6
- [Bower](bower.io) (`npm install --global bower`)
- [Gulp](http://gulpjs.com) (`npm install --global gulp`)
- [MongoDB](https://mongodb.org)

### Developing

1. Run `npm install` to install server dependencies.
2. Run `bower install` to install front-end dependencies.
3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running
4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build and development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## API

### Questions

| Method | URL | Description
|----------------------------
| GET    | `/`    | Get all questions
| GET    | `/:id` | Get a question
| POST   | `/`    | Post a question
| PUT    | `/:id` | Update a question title/content
| PATCH  | `/:id` | Patch a question title/content
| DELETE | `/:id` | Delete a question
| GET    | `/users/:userId`       | Get my questions
| GET    | `/users/:userId/votes` | Get voted questions

### Answers

| Method | URL | Description
|---------------------------
| POST   | `/:id/answers`           | Create answer for a question
| PUT    | `/:id/answers/:answerId` | Update an answer in the question
| DELETE | `/:id/answers/:answerId` | Delete an answer in the question

### Votes

| Method | URL | Description
|----------------------------
| POST   | `/:id/vote` | Upvote a question
| DELETE | `/:id/vote` | Unvote a question
| POST   | `/:id/answers/:answerId/vote` | Upvote an answer
| DELETE | `/:id/answers/:answerId/unvote` | Unvote an answer
