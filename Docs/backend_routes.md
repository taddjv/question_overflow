# API-Routes (backend routes)

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Questions

- A logged in user may delete, edit or create their own Question, however every user can view all questions or a specific question, logged in or not.

  - `GET /api/questions/:id`
  - `GET /api/questions`
  - `POST /api/questions`
  - `PUT /api/questions/:id`
  - `DELETE /api/questions/:id`

## Answers

- A logged in user may delete, edit or create their own Answers to a Question, however every user can view all answers of a specific question, logged in or not.

  - `GET /api/answers/:id`
  - `GET /api/answers/questions/:id`
  - `POST /api/answers/questions/:id`
  - `PUT /api/answers/:id`
  - `DELETE /api/answers/:id`

## Search

- A logged in user may search for questions through a search bar with the use of pythons '.like', users can search for questions in database with keywords from the search bar. Questions whose title or body match the included the keywords will return the questions' I.D and render all the question results on browser.



- `GET /api/questions/search`

## Reactions (Up-votes / Down-votes to an Answer)

- A logged in user may up-vote, down-vote, switch between or completely undo their vote from an answer using the two provided icons which fetch data from an association attached to the answerId and userId.

- `GET /api/reactions/:id`
- `POST /api/reactions/:id/up-vote`
- `POST /api/reactions/:id/down-vote`

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
