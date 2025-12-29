# Album Collection Hybrid Mobile Application

**Dublin Business School**  
**MSc in Information Systems with Computing**  
**Web and Mobile Technologies - B9IS126**  
**Year 1, Semester 1**  
**Continuous Assessment 1**

**Lecturer name:** Ehtisham Yasin

**Student Name:** Mateus Fonseca Campos  
**Student Number:** 20095949  
**Student Email:** 20095949@mydbs.ie

**Submission date:** 29 December 2025

This repository contains an "Album Collection Hybrid Mobile Application" developed for my Web and Mobile Technologies CA 1 at Dublin Business School - MSc in Information Systems with Computing, Year 1, Semester 1.

## Part 1: Background

The goal of this assignment was to develop a hybrid mobile application for a business of my choice. The application should be built using several familiar web technologies such as HTML5, CSS and Javascript and then seamlessly deployed to platforms such as iOS, Android, and Windows Phone (at least one). It should be touch friendly and provide actual functionality which users can take advantage of. Use of UI frameworks such as jQuery Mobile, Sencha Touch, Kendo UI, or any other platforms discussed in the module, was allowed.

The below is the list of the assignment's tasks:

- [x] A completed hybrid mobile application, using the technologies discussed in the lectures. This must have all the necessary configurations and folder structures.

- [x] Include at least TWO appropriate plugins in your mobile app available from the plugin repositories discussed in the class.

- [x] Add a Splash Screen to your app suitable for your chosen platform.

- [x] Add icons to your app suitable for your chosen platform.

- [x] Using the frameworks discussed in the class, prepare a build for the mobile application platform that you’ve chosen. Deploy and test the resulting build file on an actual device or an emulator.

- [x] The application should be user friendly, consistent, error free and touch friendly when installed on a mobile platform or viewed on an emulator.

## Part 2: System Requirements and Design

The choice of application was an app the allows users to keep track of music albums they have listened to by adding them to a personal collection.

Music data is retrieved from Discogs via their public API. User data and authentication is managed via Firebase.

Based on the requirements gathered and the assignment's instructions, the following implementation plan was devised:

1. Backend:
    - Role: server-side services used to manage the application's data via API calls.
    - Music database: Discogs.
    - User database: Firebase Cloud Firestore.
    - User authentication: Firebase Authentication.
2. Frontend:
    - Role: a client-side, reactive application whose components are redenred natively to the running platform.
    - Language: TypeScript.
    - Library: React.
    - Framework: Ionic.
    - Native runtime: Capacitor.
    - Build tool: Vite.

The following flowchart presents a basic overview of the application's core operations:

| ![flowchart.png](screenshots/flowchart.png) |
| :-: |
| *App's basic operations* |

## Part 3: Setup



## Part 4: Proof of Concept

Following the plan established in the previous section, a prototype was developed. Being only a proof of concept, the application has, as of now, limited functionalities. Extra features would have included: artist tracking, song tracking, multiple data sources (AllMusic, Last.fm, MusicBrainz, Rate Your Music, etc.), in-app user communication (messaging, sharing, tagging, etc.), integration with music streaming services (Spotify, Apple Music, Amazon Music, Tidal, Deezer, YouTube Music, etc.), user-level manual addition/editing (for content that may be unavailable/incorrect from data sources), among others.

The below is a breakdown of the project’s file structure:

```

```
The following are some screenshots of the application in use, showcasing core operations and native functionalities:

| ![authentication.png](screenshots/authentication.png) | ![collection.png](screenshots/collection.png) |
| :-: | :-: |
| *Authentication* | *Collection* |

| ![album-details.png](screenshots/album-details.png) | ![search-form.png](screenshots/search-form.png) |
| :-: | :-: |
| *Album details* | *Search form* |

| ![search-results.png](screenshots/search-results.png) | ![account-details.png](screenshots/account-details.png) |
| :-: | :-: |
| *Search results* | *Account details* |

| ![about.png](screenshots/about.png) |
| :-: |
| *About* |

## Part 5: Technology Stack and External Resources

Below is a table listing the technologies and the external resources used in this assignment:

|Technology Stack|External Resources|
| :-: | :-: |
|||

## Part 6: References

Below is the list of references used in this assignment:

- **[]()**
    - []()

## Part 7: Copyright Disclaimer

Discogs...

SVG Repo...

This project may feature content that is copyright protected. Please, keep in mind that this is a student's project and has no commercial purpose whatsoever. Having said that, if you are the owner of any content featured here and would like for it to be removed, please, contact me and I will do so promptly.

Thank you very much,  
Mateus Campos.