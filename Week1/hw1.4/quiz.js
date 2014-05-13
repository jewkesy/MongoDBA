mbp:hw1.4 Daryl$ mongo < quiz.js 

use pcat
db.products.find({},{name:1,_id:0}).sort({name:1})

{ "name" : "AC3 Case Black" }
{ "name" : "AC3 Case Green" }
{ "name" : "AC3 Case Red" }
{ "name" : "AC3 Phone" }
{ "name" : "AC3 Series Charger" }
{ "name" : "AC7 Phone" }
{ "name" : "Cable TV Basic Service Package" }
{ "name" : "Phone Extended Warranty" }
{ "name" : "Phone Service Basic Plan" }
{ "name" : "Phone Service Core Plan" }
{ "name" : "Phone Service Family Plan" }

Result: Invalid

use pcat
var c = db.products.find({},{name:1,_id:0}).sort({name:1}); while( c.hasNext() ) print( c.next().name);

AC3 Case Black
AC3 Case Green
AC3 Case Red
AC3 Phone
AC3 Series Charger
AC7 Phone
Cable TV Basic Service Package
Phone Extended Warranty
Phone Service Basic Plan
Phone Service Core Plan
Phone Service Family Plan

Result: Valid

use pcat
var c = db.products.find({}).sort({name:1}); c.forEach( function(doc){ print(doc.name) } );

AC3 Case Black
AC3 Case Green
AC3 Case Red
AC3 Phone
AC3 Series Charger
AC7 Phone
Cable TV Basic Service Package
Phone Extended Warranty
Phone Service Basic Plan
Phone Service Core Plan
Phone Service Family Plan

Result: Valid

use pcat
var c = db.products.find({}).sort({name:-1}); while( c.hasNext() ) print( c.next().name);

Phone Service Family Plan
Phone Service Core Plan
Phone Service Basic Plan
Phone Extended Warranty
Cable TV Basic Service Package
AC7 Phone
AC3 Series Charger
AC3 Phone
AC3 Case Red
AC3 Case Green
AC3 Case Black

Result: Invalid

bye



	db.products.find({},{name:1,_id:0}).sort({name:1})
X	var c = db.products.find({},{name:1,_id:0}).sort({name:1}); while( c.hasNext() ) print( c.next().name);
X	var c = db.products.find({}).sort({name:1}); c.forEach( function(doc){ print(doc.name) } );
	var c = db.products.find({}).sort({name:-1}); while( c.hasNext() ) print( c.next().name);
