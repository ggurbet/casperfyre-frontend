<p>
	<img src="https://api.casperfyre.com/logo.png" width="300">
</p>

# CasperFYRE Frontend

Dispensory API interface for Casper mainnet. This is the frontend repo for this project. To see the backend API repo, visit https://github.com/ledgerleapllc/casperfyre-backend

## Dependencies

The system requires the following softwares run a this frontend on top of the API server.

```
 1. Ubuntu 20+
 2. Apache2
 3. NodeJS version 16+
 4. NPM version 8+
 5. Yarn version 1+
```

Ubuntu 20+ and Apache2 are optional and can be switched out for other common platforms, but the backend interactive setup script will not work in that case. The setup of the operating system and HTTP server software should be handled by the dev. Note, the http document root is **casperfyre-frontend/build**

## Setup

We generally would use the latest version of Ubuntu for testing installs. Example hosting server: AWS ec2 t2 medium with at least 10Gb SSD. Before doing anything else, make sure you're up to date.

For Dev build, you can use Gitpod to launch. First, collect a backend API URL and insert it into .env.development where it says REACT_APP_BASE_URL. Then:

```bash
sudo apt-get update
yarn build
yarn dev
```

### Software for Production Build

Setup the repo according to our VHOST path using the instruction below. Note, the actual VHOST path in this case would be set to **/var/www/casperfyre-frontend/build**

```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt install nodejs -y
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
source ~/.bashrc
cd /var/www/
git clone https://github.com/ledgerleapllc/casperfyre-frontend.git
cd  casperfyre-frontend/
```

Install packages and setup environment. You will need to modify **.env.production** variables to fit the server on which you're deploying. **REACT_APP_BASE_URL** should specify the URL of your backend API.

```bash
yarn install
yarn build
```

The above commands will build **build/** on site using the variables from your .env.production file.

### VHOST

For this example, using an Ubuntu 20 Ec2 instance, our http vhost would look something like this

```
<VirtualHost *:80>
  ServerName casperfyre.com
  DocumentRoot /var/www/casperfyre-frontend/build
  <Directory /var/www/casperfyre-frontend/build>
    Options -MultiViews
    AllowOverride All
    Require all granted

    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-l
    RewriteRule . /index.html [L]

    Header set Access-Control-Allow-Origin "*"
  </Directory>

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

## Usage Guide

### Start here

After your admin account and credentials have been created and you have logged in, the first thing to see is the *Applications* tab. This is where new platform users wil appear for registration acceptance. As an admin, you can approve/deny users joining your API interface. The *API Keys* tab will show approved users, named *Keyholders* here. You can manage keyholders, their API keys, wallets, and settings here. The *API Logs* tab show a global view and API request history across all your keyholders. *Wallets* tab shows your keyholder's wallet details globally for management. *Settings* tab is for your admin account settings. You will find email/password/MFA settings here, as well as other admins you have assigned to manage your keyholders, known as *sub-admins*.

As shown in the dashboard settings and documentation, API users can use syntax like the example below to interact with the public facing API.

```bash
curl -X POST https://api.casperfyre.com/v1/dispense \
  -H 'Content-type: application/json' \
  -H 'Authorization: token API_KEY' \
  -d '{ "address": "CSPR_ADDRESS", "amount": 100 }'
```

This example curl request will dispense 100 token to the specified address. Please note, if you are deploying to your own instance and domain, the base URL will be your own URL that you setup, not **api.casperfyre.com**.

### Other notes

These features were scoped and determined to be the essential features needed for CasperFYRE. Email any questions to team@ledgerleap.com.

### Testing

Testing done with Cypress. Uses testing remote host. Pre-configured. If you have your own server, and user/admi accounts, modify **cypress.config.js**, adjust the following to fit your test account.

```
DEV_EMAIL: "user@email",
ADMIN_LOGIN_EMAIL: "admin@email",
ADMIN_LOGIN_PASSWORD: "admin-password",

baseUrl: 'https://casperfyre.com'
```

Then

```bash
yarn install
yarn run cypress open
```

And run E2E Testing.

### Documentation

We use PHPDoc in the backend codebase to generate new API documentation each time there are changes to the API. You will find the newly generated documentation at /docs/index.html

This documentation is also linked out and used to display to API users from the dashboard settings page.
