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

This page displays the questions, as well as a navigation bar with login/signup or logout buttons. Each question has an update and delete button _if it belongs to the currently logged in user_.

- `GET /`
- `POST /questions/:id/votes`
- `DELETE /questions/:id/votes`

## `/questions`

This page displays a form with which a logged in user can craft a new question, as well as a navigation bar with login/signup or logout buttons.

- `POST /questions`

## `/questions/:id`

This page displays individual question with associated answers and votes, as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the question, this page also displays an update and delete button. Logged in users can upvote or downvote the answers on this page. The logged in owners of those answers can update or delete them.

- `GET /questions/:id`
- `POST /questions/:id/votes`
- `DELETE /questions/:id/votes`

## `/answers`

This page displays a form with which a logged in user can craft a new answer, as well as a navigation bar with login/signup or logout buttons.

- `POST /answers`

## `/answers/:id`

This page displays individual question with associated answers and votes, as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the question, this page also displays an update and delete button. Logged in users can upvote or downvote the answers on this page. The logged in owners of those answers can update or delete them as well.

- `GET /answers/:id`
- `POST /answers/:id/votes`
- `DELETE /answers/:id/votes`
