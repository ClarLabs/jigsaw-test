# Introduction

This document shall serve as a living change document to ensure all changes are captured as I make them so you can get the feel of my thinking process.

Ethical AI Statement: No code or document has been written or touched using AI and no AI program has been used outside of this project, besides where would the challenge be if I did ;D

First step I am gone through the code and decided to setup Docker and Typescript, Docker will allow me to test this locally and see what breaks while typescript will warn me of any issues.

For clean code I have also configured eslint and prettier.

As for my tool chain I am using VS Code and Docker, my OS is Qubes OS and this is being development in a disposable qube.

I have added .gitignore to ignore developer resources such as .env and data folder.

I have copied over my .prettierrc, tsconfig.json and .eslintrc.json - Reason: I am not wasting time looking it up

Installed missing types and converted code to Typescript

Added Swagger docs so I can test without Insomnia (Insomnia would be useful if the API was bigger and more complex)

Fix delete posts so it checks if it's a valid Monogo Id

Changed mongo so it now takes care of the updatedAt and createdAt for us, no need to manually set anymore.

Added route to search for title or content, delete by tag and improved get to return page and result count.

I have added unit tests current coverage is:

Statements   : 84.51% ( 202/239 )
Branches     : 62.5% ( 25/40 )
Functions    : 94.73% ( 18/19 )
Lines        : 83.98% ( 194/231 )

I am not going to improve this, as it's just a test, but proof of concept at very least.

Added basic redis cache to cache results

Added Sentry logging for better visibility and centralised error handling