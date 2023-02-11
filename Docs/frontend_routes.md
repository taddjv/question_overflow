# User-facing routes (frontend routes)

## `/login`

### Log in page

This page displays a log in form

- `GET /login`
- `POST /login`

## `/signup`

This page displays a signup form.

### Sign up page

- `GET /signup`
- `POST /signup`

## `/`

Homepage

This page displays the questions, as well as a navigation bar with login/signup or logout buttons.
Logged in users get navigation bar access to a "Ask a Question" button that displays a form with which the user can use to craft a new question

Each question has an update and delete button _if it belongs to the currently logged in user_.

- `GET /`
- `POST /questions`


## `/questions/:id`

This page displays individual question with associated answers and votes, as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the question, this page also displays an update and delete button. Logged in users can upvote or downvote the answers on this page. The logged in owners of those answers can update or delete them.

--Questions--
- `GET /questions/:id`
- `PUT /questions/:id`
- `DELETE /questions/:id`

--Answers--
  - `GET /api/answers/questions/:id`
  - `POST /api/answers/questions/:id`
  - `PUT /api/answers/:id`
  - `DELETE /api/answers/:id`

  --Reactions--
  - `GET /api/reactions/:id`
- `POST /api/reactions/:id/up-vote`
- `POST /api/reactions/:id/down-vote`


## Search

- A logged in user may search for questions through a search bar using pythons '.like'. Users can search for questions in database with keywords from the search bar. Questions whose title or body match the included the keywords will return the questions' I.D and render all the question results on browser.
- All users can search for questions

- `GET api/search/question/:searchParams`
