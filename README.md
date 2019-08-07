# Node JS server for website

This server will allow you to serve only files that you want to serve to the user. Rather that giving the user everything that they ask for, you can set what files they see, and everything that they try to access will return as a 404 error.

## Installation

To try out the server, open the folder in terminal and type:
```
npm install
```
Then to launch the server, type:
```
node server
```
Then go to your browser and open up `localhost:3000`

#### Usage

Notice that there is a file called `blockedFile.html` in the repo. This file is imposable to open inside `localhost`. To see the server in action, you need to add `blockedFile.html` to the `alowedFiles` variable inside `server.js` in this format.
```js
{
  file: './blockedFile.html',
  url: '/blockedFile.html',
  type: 'text/html'
}
```

Any other file additions to the `alowedFiles` variable need to follow that format otherwise they wont be served to the user.

#### Supported file types

This system should work for all of the MIME media types. The most common types can be found here [https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)