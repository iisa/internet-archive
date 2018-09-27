# internet-archive
Drawing page details from their metadata api

This client-side app is made with ReactJS, Redux, React Router, Webpack, Node.js

For a live example, click here: https://isa-internet-archive.now.sh/

To run this app locally, you will need to:

- clone repo
- go into directory

then,

if you want to use Node:
- in terminal, run `npm install`
- in terminal, run `node app.js`

if you want to use Docker:
- in terminal, execute script `./run-docker.sh`

finally,
- use browser to go to `http://localhost:3000/`

If you want to dev, in directory:
- go to `webpack.config.js`,
- comment out [line 21](https://github.com/iisa/internet-archive/blob/master/webpack.config.js#L21)
- in terminal, run `npm start`

To run tests:
- in terminal, go to directory and run `npm run test`

For debugging purposes, I am using:
- have Node version 8.9.4
- have NPM version 5.6.0

-------


