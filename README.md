# Instant search
## Setup
1. Clone the repository
2. Go to the root of the project and run 'npm install' command to install the package dependencies
3. Start the node server by 'npm run start' command. It'll start a node server on port 3000
4. Type 'localhost:3000' in your browser to access a nice search UI. Happy searching!
## REST Endpoints

### Search  
**Endpoint**:  
http://localhost:3000/search  

**Request Type**:  
GET  

**Params**:  
1. searchQuery - query string, minimum 3 characters  
2. maxResults - maximum number of results to be returned  

**Response Type**:  
application/json  

**Response**:  
Array of objects sorted descending by score  
_user.firstName_- First Name of the matched user  
_user.middleName_- Middle Name of the matched user  
_user.lastName_- Last Name of the matched user  
_score_- Search score  

**Sample JSON**:
```JSON
[
  {
    "user": {
      "firstName": "Kenna",
      "middleName": "Roxanne",
      "lastName": "Kenny"
    },
    "score": 16.491999999999997
  },
  {
    "user": {
      "firstName": "Kennith",
      "middleName": "Conner",
      "lastName": "Kenny"
    },
    "score": 15.754740524781338
  },
  {
    "user": {
      "firstName": "Kenny",
      "middleName": "Jennyfer",
      "lastName": "Halie"
    },
    "score": 14.115203124999999
  }
]
```

