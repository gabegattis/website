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
git clone https://github.com/counterpointhackers/website.git
cd website
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

Administration
--------------

To add events and other content to the website, you can use the `cpadmin` 
program bundled with this package. First link the program to your `$PATH`.

```bash
cd website && npm link
```

Now you can use the admin script to add dynamic content. See the help for 
details.

```bash
cpadmin --help
```

License
-------

- Code is licensed under the GNU GPL Version 3.0.
- Assets are licensed under CC0 except where noted.
