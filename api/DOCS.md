# entreapp v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	- [Authenticate with Google](#authenticate-with-google)
	
- [Badge](#badge)
	- [Create badge](#create-badge)
	- [Delete badge](#delete-badge)
	- [Retrieve badge](#retrieve-badge)
	- [Retrieve badges](#retrieve-badges)
	- [Update badge](#update-badge)
	
- [Category](#category)
	- [Create category](#create-category)
	- [Delete category](#delete-category)
	- [Retrieve categories](#retrieve-categories)
	- [Retrieve category](#retrieve-category)
	- [Update category](#update-category)
	
- [Comment](#comment)
	- [Create comment](#create-comment)
	- [Delete comment](#delete-comment)
	- [Retrieve comment](#retrieve-comment)
	- [Retrieve comments](#retrieve-comments)
	- [Update comment](#update-comment)
	
- [Poi](#poi)
	- [Create poi](#create-poi)
	- [Delete poi](#delete-poi)
	- [Retrieve poi](#retrieve-poi)
	- [Retrieve pois](#retrieve-pois)
	- [Update poi](#update-poi)
	
- [Route](#route)
	- [Create route](#create-route)
	- [Delete route](#delete-route)
	- [Retrieve route](#retrieve-route)
	- [Retrieve routes](#retrieve-routes)
	- [Update route](#update-route)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# Badge

## Create badge



	POST /badges


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Badge's name.</p>							|
| points			| 			|  <p>Badge's points.</p>							|
| description			| 			|  <p>Badge's description.</p>							|
| icon			| 			|  <p>Badge's icon.</p>							|
| pois			| 			|  <p>Badge's pois.</p>							|

## Delete badge



	DELETE /badges/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve badge



	GET /badges/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve badges



	GET /badges


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update badge



	PUT /badges/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Badge's name.</p>							|
| points			| 			|  <p>Badge's points.</p>							|
| description			| 			|  <p>Badge's description.</p>							|
| icon			| 			|  <p>Badge's icon.</p>							|
| pois			| 			|  <p>Badge's pois.</p>							|

# Category

## Create category



	POST /categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Category's name.</p>							|
| parent			| 			|  <p>Category's parent.</p>							|

## Delete category



	DELETE /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve categories



	GET /categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve category



	GET /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Update category



	PUT /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Category's name.</p>							|
| parent			| 			|  <p>Category's parent.</p>							|

# Comment

## Create comment



	POST /comments


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| rating			| 			|  <p>Comment's rating.</p>							|
| content			| 			|  <p>Comment's content.</p>							|
| poi			| 			|  <p>Comment's poi.</p>							|
| photos			| 			|  <p>Comment's photos.</p>							|

## Delete comment



	DELETE /comments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve comment



	GET /comments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve comments



	GET /comments


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update comment



	PUT /comments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| rating			| 			|  <p>Comment's rating.</p>							|
| content			| 			|  <p>Comment's content.</p>							|
| poi			| 			|  <p>Comment's poi.</p>							|
| photos			| 			|  <p>Comment's photos.</p>							|

# Poi

## Create poi



	POST /pois


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Poi's name.</p>							|
| categories			| 			|  <p>Categories's ids.</p>							|
| coordinates			| 			|  <p>Poi's coordinates.</p>							|
| qrCode			| 			|  <p>Poi's qrCode.</p>							|
| audioguides			| 			|  <p>Poi's audioguides.</p>							|
| description			| 			|  <p>Poi's description.</p>							|
| coverImage			| 			|  <p>Poi's images.</p>							|
| images			| 			|  <p>Poi's images.</p>							|
| year			| 			|  <p>Poi's year.</p>							|
| creator			| 			|  <p>Poi's creator.</p>							|
| status			| 			|  <p>Poi's status.</p>							|
| schedule			| 			|  <p>Poi's schedule.</p>							|
| price			| 			|  <p>Poi's price.</p>							|

## Delete poi



	DELETE /pois/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve poi



	GET /pois/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve pois



	GET /pois


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update poi



	PUT /pois/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Poi's name.</p>							|
| categories			| 			|  <p>Categories's ids.</p>							|
| coordinates			| 			|  <p>Poi's coordinates.</p>							|
| qrCode			| 			|  <p>Poi's qrCode.</p>							|
| audioguides			| 			|  <p>Poi's audioguides.</p>							|
| description			| 			|  <p>Poi's description.</p>							|
| coverImage			| 			|  <p>Poi's images.</p>							|
| images			| 			|  <p>Poi's images.</p>							|
| year			| 			|  <p>Poi's year.</p>							|
| creator			| 			|  <p>Poi's creator.</p>							|
| status			| 			|  <p>Poi's status.</p>							|
| schedule			| 			|  <p>Poi's schedule.</p>							|
| price			| 			|  <p>Poi's price.</p>							|

# Route

## Create route



	POST /routes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| pois			| 			|  <p>Route's pois.</p>							|
| name			| 			|  <p>Route's name.</p>							|

## Delete route



	DELETE /routes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve route



	GET /routes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve routes



	GET /routes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update route



	PUT /routes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| pois			| 			|  <p>Route's pois.</p>							|
| name			| 			|  <p>Route's name.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


