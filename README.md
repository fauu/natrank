#Natrank

##What is it?
Natrank is a national football team ranking web application which uses modified [Elo algorithm](http://en.wikipedia.org/wiki/Elo_rating_system). The goal of the project is to create software which will power a yet-to-be-named website serving the same purpose as [World Football Elo Ratings](http://eloratings.net/) but with more data to explore and much improved user experience. Starting early 2015.

##Modules
###Backend module (incl. Admin module)
Provides access to match and ranking data through REST-like endpoints. The Admin module makes it possible for the administrator to, among other tasks, import match data using a web interface.
####Utilised technologies
* **Java** programming language
* **Spring Core**
* **Spring Web MVC** and **Jackson** JSON library for REST-like data endpoints
* **Spring Security** for Admin module authentication and authorization
* **MySQL** database engine with **Hibernate** JPA implementation and **Spring Data JPA** for data access layer
* **JSP** with **JSTL** and **Bootstrap** for Admin module web interface templating
* **Maven** build system

... and other utility libraries

###Frontend module
The Frontend module is a web application that accesses the data provided by the backend module via AJAX requests and constructs a web interface for the user to browse that data.
####Utilised technologies
* **JavaScript** programming language
* **AngularJS** framework
* **HTML**
* **LESS** CSS pre-processor with **Bootstrap** presentation layer framework
* **Yeoman** for project scaffolding
* **Bower** package manager
* **Grunt** build system

... and other utility libraries

##Current version
The application is technically in its beta stage, but we do not plan on having an official release before the website starts in early 2015.

##Screenshots
* [Match results](http://i.imgur.com/IJDEbyD.png)
* [Full world ranking](http://i.imgur.com/IixtpwK.png)
* [Short ranking for an arbitrary date](http://i.imgur.com/dT0NbBn.png)
* [Team view](http://i.imgur.com/DkPpLXX.png)
* [Admin panel](http://i.imgur.com/1xTOnmS.png)

##Future plans
* Match result view redesign
* Ranking algorithm refinements
* Performance tuning
* More of fun historical charts/graphs/listings etc.
* More data importing process helpers
* Automatic match database updates along with ranking updates triggered by them
* ...

##Licensing
See the [COPYING](https://github.com/fauu/natrank/blob/master/COPYING) file.

##Authors
See the [AUTHORS](https://github.com/fauu/natrank/blob/master/AUTHORS) file.
