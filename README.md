#myFlix-client
MyFlix is a small app that showcases various informations from a small database (REST API) of movies. Users can register, update/add information about themselves (securely via password hashing) and add/remove movie titles to a list of their favourites. 

##The client-side for myFlix is developed using REACT, HTML5, and SCSS
##The server-side development for myFlix can be accessed [here]https://github.com/valvegan/movie_api

##Build tools: Parcel

##App features
Essential Views and Features:
Main view
● Returns a list of ALL movies to the user (each listed item with an image, title, and description)
● Sorting and filtering
● Ability to select a movie for more details
Single movie view
● Returns data (description, genre, director, image) about a single movie to the user
● Allows users to add a movie to their list of favorites
Login view
● Allows users to log in with a username and password
● Registration view
● Allows new users to register (username, password, email, birthday)
Genre view
● Returns data about a genre, with a name and description
● Displays example movies
Director view
● Returns data about a director (name, bio, birth year, death year)
● Displays example movies
Page 2
Profile view
● Allows users to update their user info (username, password, email, date of birth)
● Allows existing users to deregister
● Displays favorite movies
● Allows users to remove a movie from their list of favorites
Optional Views and Features:
Single movie view and all movies views
● Allow users to see which actors star in which movies
● Allow users to view more information about different movies, such as the release date and
the movie rating
Actors view
● Allows users to view information about different actors
Profile view, single movie view, and all movies view
● Allow users to create a “To Watch” list in addition to their “Favorite Movies” list

##Launch
1)
1) Install parcel globally and fix vulnerabilities
>npm install -g parcel-bundler

2) Run parcel build
>parcel src/index.html

3) Navigate to http://localhost:1234 
