# natrank

## Project status

The project has been retired in its alpha stage.

## What is it?
Natrank was a national football team ranking web application using a modified version of the [Elo rating system](http://en.wikipedia.org/wiki/Elo_rating_system). The goal of the project has been to create software which would power a website serving the same purpose as [World Football Elo Ratings](http://eloratings.net/), but with more data to explore and much improved user experience.

## Screenshots
* [Match results](/screenshots/match-results.png?raw=true)
* [Full world ranking](/screenshots/full-world-ranking.png?raw=true)
* [Abridged ranking for an arbitrary date](/screenshots/abridged-ranking.png?raw=true)
* [Team profile](/screenshots/team-profile.png?raw=true)
* [Admin panel](/screenshots/admin-panel.png?raw=true)

## Modules
### Backend module (incl. Admin module)
Provides access to match and ranking data through REST-like endpoints. The Admin module makes it possible for the administrator to, among other tasks, import match data using a web interface.

Some of the technologies and tools used: Java 8, Spring Boot, Spring Web MVC, Jackson, Spring Security, MySQL, Hibernate 5, Spring Data JPA, JSP, JSTL, Bootstrap 3, Maven.

### Frontend module
The Frontend module is a single-page application that accesses the data provided by the backend module via AJAX requests and presents a web interface for the user to browse the data.

Some of the technologies and tools used: TypeScript, React, MobX, Sass, yarn, webpack, Highcharts.

In the old iteration ([frontend-old](/frontend-old/)): JavaScript (ES5), AngularJS, Less, Bootstrap 3, Bower, npm, Grunt, Yeoman, generator-cg-angular, Highcharts.

## Running instructions
### Backend
The database Docker container is so set up that the database is prepopulated with match data up to the 1950 World Cup.
#### a) Run both the database and the server within Docker containers
1. `cd natrank/backend`
2. `docker-compose up`
#### b) Only run the database within a Docker container
1. `cd natrank/backend`
2. `docker build --tag natrank-db db`
3. `docker run -d -p 3306:3306 --rm natrank-db`
4. `DB_HOST=localhost:3306 ./mvnw spring-boot:run` (remember to use Java 8)
#### c) Run both the database and the server without Docker
1. `cd natrank/backend`
2. Start MySQL
3. `mysql -h localhost:3306 -u <USER> -p <PASSWORD> < db/schema.sql`
4. Configure DB username and password in `src/main/resources/application.yml`
5. `DB_HOST=localhost:3306 ./mvnw spring-boot:run` (remember to use Java 8)
### Frontend
1. `cd natrank/frontend`
2. `yarn && yarn start`

## Planned work
* Split backend into `core` `api` and `admin` modules
* Ranking algorithm refinements (switch to Glicko-2?)
* More of fun historical charts/graphs/listings etc.
* Improved tooling for data importing and maintenance
* Automatic match database and ranking updates
* Regional rankings
* Performance investigation and potential improvements
* ...

## Licensing
See the [COPYING.md](https://github.com/fauu/natrank/blob/master/COPYING.md) file.
