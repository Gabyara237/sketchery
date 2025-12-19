# Sketchery

![Deployed](https://img.shields.io/badge/deployed-heroku-purple)
![Node.js](https://img.shields.io/badge/node.js-20.x-green)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/express-4.18-lightgrey)

**Sketchery** Sketchery is a creative platform where artists can share their artwork, explore new styles, follow other creators, and save pieces that inspire them.



## Description

This is an art sharing platform that allows users to upload their artwork, explore creations made by other artists, and connect through follows, likes, comments, and saved inspirations. The project implements authentication, authorization, and full CRUD functionality for artworks, ensuring a seamless and interactive experience for every user.


This application is deployed and can be [explored here](https://sketchery-1bbcf3a4aadb.herokuapp.com/)


You can find the planning for this project [here](https://trello.com/b/VFlsW23W/project-2-sketchery).

## Screenshots

![Sketchery welcome screen](https://i.imgur.com/zhV1hBF.png) 

*Landing page displaying Sketchery’s welcome message, artistic background, and sign-in/sign-up options*

## Features Showcase

### Sign Up page
![Sign Up page](https://i.imgur.com/IrnyUrV.png)
*User registration screen to create a new Sketchery account.*

### Sign In page
![Sign In page](https://i.imgur.com/xepckaM.png)
*Sign-in page for returning users.*

### Explore Page
![Explore Page](https://i.imgur.com/qUgsT3h.png)
*Explore page displaying community artwork with filters and interaction options.*

### Artwork Detail Page
![Artwork Detail Page](https://i.imgur.com/OiC2fYZ.png)
*Artwork detail page with comments and likes.*

### Profile Page
![Profile Page](https://i.imgur.com/rsAeksO.png)
*User profile showcasing personal artwork and stats.*

## Features

* User authentication with secure sign-in and sign-up
* Artwork upload with title, description, and image support
* Artwork detail pages with comments and likes
* Follow and unfollow functionality for artists
* Save artworks as inspirations for later viewing
* Explore page with artwork filtering by category / art type
* Dynamic navigation depending on authentication state
* Profile page displaying user artworks and stats
* Commenting system with timestamps using a time-ago formatter
* Like system with toggle (like/unlike)
* Inspiration system with toggle (save/unsave)
* Conditional UI rendering for empty states (no artworks, no inspirations, etc.)
* Responsive and accessible UI styling
* EJS templating with populated user and artwork data
* RESTful routes with CRUD operations for artworks
* Session management for authenticated users

## Technologies Used

* **Node.js** - backend runtime environment
* **Express.js** - server and routing framework
* **MongoDB** - NoSQL database
* **Mongoose** - ODM for data modeling and queries
* **EJS** - templating engine for dynamic views
* **CSS** - styling and layout
* **JavaScript** - client-side and server-side logic
* **bcrypt** - password hashing for authentication
* **Express-Session** - session management
* **Method-Override** - support for PUT/DELETE in forms

## Entity Relationship Diagram (ERD)

This ERD represents the core data model for Sketchery, including users, artworks, comments, and social features (likes, inspirations, and follows).

![Sketchery ERD](https://i.imgur.com/Bhipqzy.png)

*High-level ERD showing relationships between users, artworks, comments, saved inspirations, and follow connections.*

### Current Implementation

For simplicity and fast development, comments and likes are currently stored directly on the `Artwork` document:
* **Comments**: Embedded as an array of `commentSchema` subdocuments
* **Likes**: Stored as an array of user ObjectIds

### Future Scalability Considerations

In a production environment with high traffic, a refactor would move comments and likes into their own collections (`Comment` and `Like`/`Reaction`), each referencing `artworkId` and `userId`. This approach would provide:
- Efficient pagination for artworks with hundreds/thousands of interactions
- Better indexing and query performance
- Easier moderation and content management
- Support for additional metadata (timestamps, edit history, etc.)


## Getting Started

### 1. Clone this repository:

```bash
git clone https://github.com/Gabyara237/sketchery.git
cd sketchery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add:

> ***.env example***

```bash
MONGODB_URI=your-mongodb-connection-string-here
SESSION_SECRET=your-secret-key-here
```

### 4. Start the server

```bash
node server.js
```



## Future Improvements

* Allow users to navigate directly to artist profiles from the Followers & Following page.
* Allow multiple tags/categories per artwork instead of a single type. 
* Implement a keyword-based search for artwork titles or artist usernames.
* Improve user experience with drag-and-drop artwork uploads.
* Add user profile customization options (bio, profile picture).



## Attributions


* This project was built using ***MEN Stack Auth Template*** code provided by General Assembly.

* **Background Images:** 
Background assets were sourced from [Freepik](https://www.freepik.com) and are used under a valid Freepik Premium License.

* **Artwork Content (Seed Images):**  
Images sourced from [Unsplash](https://unsplash.com/) and used in accordance with the Unsplash License. Artwork images included in the project for demonstration and testing are not owned by me and remain the intellectual property of their respective creators.

