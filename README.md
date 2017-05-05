# natrank

## What is it?
Natrank is a national football team ranking web application which uses modified version of [Elo rating system](http://en.wikipedia.org/wiki/Elo_rating_system). The goal of the project is to create software which will power a yet-to-be-named website serving the same purpose as [World Football Elo Ratings](http://eloratings.net/), but with more data to explore and much improved user experience. 

## Screenshots
* [Match results](/screenshots/match-results.png?raw=true)
* [Full world ranking](/screenshots/full-world-ranking.png?raw=true)
* [Abridged ranking for an arbitrary date](/screenshots/abridged-ranking.png?raw=true)
* [Team profile](/screenshots/team-profile.png?raw=true)
* [Admin panel](/screenshots/admin-panel.png?raw=true)

## Modules
### Backend module (incl. Admin module)
Provides access to match and ranking data through REST-like endpoints. The Admin module makes it possible for the administrator to, among other tasks, import match data using a web interface.
#### Technologies and tools
* **Java 8**
* **Spring Boot**
* **Spring Web MVC** and **Jackson** for REST-like endpoints
* **Spring Security** for Admin module authentication and authorization
* **MySQL** database engine with **Hibernate ORM 5** and **Spring Data JPA** for data access layer
* **JSP** with **JSTL** and **Bootstrap 3** for Admin module web interface templating
* **Maven** build system

... and other utility libraries

### Frontend module
The Frontend module is a single-page application that accesses the data provided by the backend module via AJAX requests and presents a web interface for the user to browse the data.
#### Technologies and tools
* **JavaScript (ES5)**
* **AngularJS 1**
* **HTML**
* **Less** CSS pre-processor with **Bootstrap 3** presentation layer framework
* **Bower** for front-end dependency management
* **npm** for development dependency management
* **Grunt** for development tasks
* **Yeoman** with **generator-cg-angular** for project scaffolding

... and other utility libraries

## Building and running
### Tested with
* Arch Linux with Linux 4.7.3-5-ck
* MySQL 15.1 (MariaDB 10.1.17 distribution)
* Maven 3.3.9
* Node.js 6.5.0
* npm 3.10.7
* grunt-cli 1.2.0
* bower 1.7.9
* Firefox Nightly 51.0a1

### Instructions
1. Clone the repository: `git clone https://github.com/fauu/natrank.git`.
2. Change to project root directory: `cd natrank`.
3. Start a MySQL instance.
4. Create natrank MySQL schema: `mysql -h <HOSTNAME> -u <USER> -p <PASSWORD> < natrank-backend/schema.sql`.
5. Configure database access properties in `natrank-backend/src/main/resources/spring/data-access.properties` (see `data-access.properties-TEMPLATE` file).
6. Change to Backend module root directory: `cd natrank-backend`.
7. Run the backend module on an embedded Tomcat server instance: `mvn tomcat7:run`.
8. Change to Frontend module root directory: `cd ../natrank-frontend`.
9. Install grunt and bower globally: `npm install -g grunt bower`.
10. Install development dependencies: `npm install`.
11. Instal front-end dependencies: `bower install`.
12. Run the frontend module on a HTTP server: `grunt serve`.
13. Go to `localhost:9001` for the client application.
14. Go to `localhost:8080/natrank/admin` for the administration area.

## Current version
The application is currently in alpha stage.

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
