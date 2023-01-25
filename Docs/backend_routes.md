# API-Routes (backend routes)

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Questions

- A logged in user may delete, edit or create one of their own Question, however every users can view all questions or a specific question.

  - `GET /api/questions/:id`
  - `GET /api/questions`
  - `POST /api/questions`
  - `PUT /api/questions/:id`
  - `DELETE /api/questions/:id`

## Answers

- A logged in user may delete, edit or create one of their own answer to a question, however every users can view all answers of a specific question.

  - `GET /api/answers/:id`
  - `GET /api/answers`
  - `POST /api/answers`
  - `PUT /api/answers/:id`
  - `DELETE /api/answers/:id`

## Search

- A logged in user may search for questions through a search bar.

(use .like to search for questions in database with keywords from the search bar, for those questions that includes the keywords, we'll return the question ids and render all the questions on browser.)

- `GET /api/questions/search`

## Up-votes / Down-votes to an Answer

- A logged in user may up-vote or down-vote and delete the vote from an answer.

(use association table with answerId and userId)

- `GET /api/votes/:id`
- `POST /api/votes`
- `DELETE /api/votes/:id`

<!-- ## Bonus - Categories to Questions

- A logged in user can post questions in different categories

  - `GET /api/categories/:id`
  - `GET /api/categories` -->

<!-- ## Bonus - Comments to Questions and Answers

- A logged in user may comment on questions and other users answers.

  - `GET /api/answers/:id`
  - `POST /api/answers`
  - `PUT /api/answers/:id`
  - `DELETE /api/answers/:id` -->
