# TotalFootball

Total Football is a simple web app that aggregates and visualizes data from the top leagues in European football. 

[Live Demo](https://agile-hollows-39297.herokuapp.com/)


## Tools Used
* HTML, CSS
* Node.js 
* Heroku

## Folder Structure

_Folder Structure:_

    ├── controllers                                 
            ├── charts_controller                     # Handles chart.js logic and sets up chart object
            ├── requests_controller                   # Handles all requests made to public football AP
    ├── models                                     
            ├── league.js                             # Schema for leagues - currently not being used
            ├── users.js                              # Schema for users
    ├── public                                        # dir containing all design assets
    ├── models                                     
            ├── league.js                             # Schema for leagues - currently not being used
            ├── users.js                              # Schema for users
    ├── routes                                     
            ├── auth.js                               # routes for login/registration
            ├── data.js                               # routes for all requests
    ├── spec                                     
            ├── controllers_spec.js                   # Unit tests
    ├── views                                         # dir containing all text assets
    ├── app.js                                        # App entry point       
    ├── package.json
    └── README.md

## Deployment 
The application is hosted on Heroku. 
