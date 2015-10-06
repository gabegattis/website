Counterpoint Website
====================

This is the repository for the Counterpoint website and includes our payment 
processing, event calendar, and other important information relating to our 
operations.

Setup
-----

You'll need to have the following tools installed to work on the website.

* [Git](http://www.git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.org/)

First, clone this repository and install dependencies.

```bash
git clone https://github.com/counterpointhackers/counterpointhackers.git
cd coutnerpointhackers
npm install --no-optional
```

Then, copy the example configuration file to your `$HOME` directory.

```bash
cp config.example.json ~/.counterpoint.json
```

Set up a sandbox account with [Braintree](https://sandbox.braintreegateway.com/login) 
if you need to test payments, and add your keys to the configuration file.

```bash
vim ~/.counterpoint.json
```

Start the server and party.

```bash
npm start
```

License
-------

- Code is licensed under the GNU GPL Version 3.0.
- Assets are licensed under CC0 except where noted.
