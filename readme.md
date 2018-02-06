#YelpCamp

The application is deployed on heroku:

https://rocky-mountain-82650.herokuapp.com/


The mongo database is hosted on mLab



Authentication  
authorization
Mongo DB
Express 
Router

CRUD for campgrounds 

Each campground has:
* Name
* Image link
* description
* comments


middleware to check for logged in

#Layout and basic styling
* Create header and footer partials
* bootstrap
* setup route to show form

#databases
Mongoose / MongoDB


#RESTFUL ROUTES


Name     Endpoint      Verb  Description
---
 INDEX   /dogs          GET   Display list of dogs

 NEW     /dogs/new      GET   displays form to make a new dog

 CREATE  /dogs          POST  add new dog to db

 SHOW    /dogs/:id      GET   shows info about one 
dog

 EDIT   /dogs/:id/edit  GET   shows form to edit a dog

 UPDATE  /dogs/:id      PUT   update dog then redirect   

 DESTROY   /dogs/:id   DELETE  deletes a dog.