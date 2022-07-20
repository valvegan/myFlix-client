# myFlix-client
MyFlix is a small Single Page Application (SPA) that showcases various informations from a small database (REST API) of movies. Users can register, update/add information about themselves (securely via password hashing) and add/remove movie titles to a list of their favourites. 

## Languages 
- React
- Html5
- Scss

## Technologies
- react-router-dom to navigate between views and 
- Build tools: Parcel
- react-bootstrap for the UI
- React Redux for state management (Flux pattern)
- Axios to connect to the API 

The server-side development for myFlix can be accessed [here](https://github.com/valvegan/movie_api)

## A live preview of the app can be accessed [here](https://valentina-my-flix-client.netlify.app/)

## App features
### Essential Views and Features:

### Main view
<img src="images/screenshot1.PNG" height="auto" width="500" alt="mainview"> <img src="images/screenshot2.PNG" height="auto" width="500" >
- [x] Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- [x] Sorting and filtering
- [x] Ability to select a movie for more details

### Single movie view
<img src="images/movie-view2.PNG" height="auto" width="500" alt="movie-view2">

- [x] Returns data (description, genre, director, image) about a single movie to the user
- [x] Allows users to add a movie to their list of favorites
- [x] Allow users to view more information about different movies, such as the release date and
the movie rating

### Login view
<img src="images/1.PNG" height="auto" width="500" alt="signin">

- [x] Allows users to log in with a username and password

### Registration view
<img src="images/signup.PNG" height="auto" width="500" alt="signup" >

- [x] Allows new users to register (username, password, email, birthday)

### Genre view
<img src="images/genre.PNG" height="auto" width="500" alt="genre">

- [x] Returns data about a genre, with a name and description
- [x] Displays example movies

### Director view
<img src="images/director.PNG" height="auto" width="500" alt="director">

- [x] Returns data about a director (name, bio, birth year, death year)
- [x] Displays example movies

### Actors view
<img src="images/actor.PNG" height="auto" width="500" alt="actor">

- [x] Allows users to view information about different actors

### Profile view
<img src="images/profile.PNG" height="auto" width="500" alt="profile">

- [x] Allows users to update their user info (username, password, email, date of birth)
- [x] Allows existing users to deregister
- [x] Displays favorite movies
- [x] Allows users to remove a movie from their list of favorites

## Setting up the development environment and dependencies
- Install parcel locally 
>npm install --save-dev parcel @parcel/transformer-sass
- Installing React
>npm install --save react react-dom
- Installing the Axios library to make asynchronous calls to the API
>npm install axios --save
- Installing React bootstrap
>npm install --save react-bootstrap
- Installing React-router (for state-routing)
>npm install react-router-dom
- Installing Redux
>npm install redux --save
>npm install react-redux --save

## Launch
- Run parcel build
>npm run start
- Navigate to http://localhost:1234 
