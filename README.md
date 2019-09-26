# Back-End

WEB API FOR THE DEVDESK-QUEU WEB APPLICATION:

                ## WEB URL ##
### https://devdeskbackend.herokuapp.com/ ###

## DESCRIPTION
    Api configured to consume data from front end devdesk application

## MAIN DATA TYPES
    - Users
        - requires: fullName, email, password, role
        - can have 1 : Many relationship
    - Tickets
        - requires: title, description, category, user_id
    - Comments
        - requires: comments, user_id, ticket_id

## ENDPOINTS
    - The following endpoints are available for the DB
        ## GET REQUESTS
            - GET /API/USERS - Retrieves a list of all current users in the database
            - GET /API/USERS/:ID - Retrieves user information for user with given id
            - GET /API/USERS/:ID/TICKETS - Retrieves all current tickets assigned to user with given id
            - GET /API/TICKETS - Retrieves a list of all current tickets in the database
            - GET /API/TICKETS/:ID/COMMENTS - Retrieves a list of all current comments assigned to a ticket
            - GET /API/COMMENTS - Retrieves a list of all current comments in the database

        ## POST REQUESTS
            - POST /API/AUTH/REGISTER - Adds a new user to the database
            - POST /API/AUTH/LOGIN - Logs user into the database, creates a token to be used to verify a user is        logged in
            - POST /API/USERS/:ID/TICKETS - Adds a new ticket to a users current tickets
            - POST /API/TICKETS - Adds a new ticket to the database
            - POST /API/TICKETS/:ID/COMMENTS - Adds a comment to the current ticket 

        ## DELETE REQUESTS
            - DELETE /API/USERS/:ID - Removes a user with given id from the database
            - DELETE /API/TICKETS/:ID - Removes a ticket with given id from the database
            - DELETE /API/COMMENTS/:ID - Removes a comments with given id from the database
        
        ## UPDATE REQUESTS
            - PUT /API/USERS/:ID - Updates user information of user with given id
            - PUT /API/TICKETS/:ID - Updates ticket information of ticket with given id
            - PUT /API/COMMENTS/:ID - Updates comment information of comments with given id
