# User Stories

## Users

### Sign Up

- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on the `/signup` page:
    - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the sign-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I'm on the `/login` page:
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the log-in form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the log-in form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      - So that I can try again without needing to refill forms I entered valid data into.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  - I can click on a Demo User button to log me in and allow me to access as a normal user.
    - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to log-out via an easy to find log out button on the navigation bar.
  - While on any page of the site:
    - I can log out of my account and be redirected to a page displaying recent Questions.
      - So that I can easily log out to keep my information secure.

# Questions

### Create Questions

- As a logged in user, I want to be able to post new Questions.
  - When I'm on the `/` page:
    - I can write and submit a new Question.

### Viewing Questions

- As a logged in _or_ logged out user, I want to be able to view a selection of the most recent Questions.

  - When I'm on the `/` page:
    - I can view all posted Questions.

### Updating Questions

- As a logged in user, I want to be able to edit my Question by clicking an Edit button associated with the Question.
  - When I'm on the `/questions/:id` page:
    - I can click "Edit" to make permanent changes to Question I have posted.
      - So that I can fix any errors I make in my Question.

### Deleting Questions

- As a logged in user, I want to be able to delete my Question by clicking a Delete button associated with the Questions.
  - When I'm on the `/questions/:id` page:
    - I can click "Delete" to permanently delete a Question that I have posted and all answers associated with this question.
      - So that when I realize I shouldn't have publicly ask something, I can easily remove it.

# Answers


### Create Answer

- As a logged in user, I want to be able to post answer to questions.
  - When I'm on the `/questions/:id` page:
    - I can view all posted answers to the specific question.

### Edit Answer

- As a logged in user and the author of the answer, I am able to edit the answer by clicking on the "Edit" button associated with the Answer.

### Delete Answer

- As a logged in user and the author of the answer, I am able to delete the answer by clicking on the "Delete" button associated with the Answer.
