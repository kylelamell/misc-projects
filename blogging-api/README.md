# Blogging API
- this is a blogging api that utilizes restful api concepts and http methods
- this should allow users to create bloggin platform and connect with this apit to store and interact with their blog posts

# enviornment variables
make sure to have the following enviornment variables set so that you can connect your mongodb cluster to the api:
  - MONGO_CONNECTION_STRING = \<your mongodb connection string>
  - MONGO_POST_DATABASE = \<your database name>
  - MONGO_POST_COLLECTION = \<your collection name>
  - PORT = \<your port>>

# http methods
 GET /\<api url>/posts
  - returns all posts

***

GET /\<api url>/posts/\<post id>
  - returns the post at the specified id

***

POST /\<api url>/posts
  - creates a new post with the speicifed fields in the request body
  - body expects an object with {title, content, category, tags} fields
    - {title, content, category} are strings
    - {tags} is an array of strings
  - example object: 
    - {
    - title: "some title, 
    - content: "some content", 
    - category: "some category, 
    - tags: ["tag 1", "tag 2"]
    - }

***

PUT /\<api url>/posts/<post id>
  - updates post at the specified post id with the speicifed fields in the request body
  - body expects an object with {title, content, category, tags} fields
    - {title, content, category} are strings
    - {tags} is an array of strings
- example object: 
  - {
  - title: "some updated title, 
  - content: "some updated content", 
  - category: "some updated category, 
  - tags: ["updated tag 1", "updated tag 2"]
  - }
- note that not all fields have to be updated, but all must be included in the request body

***

DELETE /\<api url>/posts/\<post id>
  - deletes the post at the specified id