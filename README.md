# choccoto-ticket

This is a web application for managing and selling tickets for various events.

This web application features basic functionalities like:

* User authentication (login/logout)
* User registration
* Event creation and management
* Ticket creation and management
* Ticket purchasing system
* QR code generation for tickets
* Ticket validation at event entry
* User dashboard for purchased tickets
* Admin dashboard for event and ticket management

## Prefece
This application is intended to be used on Mac OS  or Linux (probably available on Windows, unconfirmed).

And following instructions are only for Mac OS , sorry.

## Usage
First of all, you need to clone this repository.  
Move to your directory that you want to set this repository.
```
git clone git@github.com:gurico0516/choccoto-ticket.git
```

This application is used `Sail`, so you must need to install `Docker`.  
Install `composer package` if you already installed Docker, create minimum container including php and composer.
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
```

After that, create `.env`, change `DB_HOST` to connect mysql container.
```
DB_HOST=mysql
```

Set up sail when you finished above procedure.
```
# Start in the background
./vendor/bin/sail up -d

# Update APP_KEY
sail artisan key:generate

# Create and migrate your database
sail artisan migrate

# Insert initial data
sail artisan db:seed
```

Lastly, build `Laravel-Mix`.
```
# Install Node.js
sail npm install

# Build
sail npm run dev
```

Now you can visit `http://localhost/` from your browser.  

And you can login `admin page` by user admin01@example.com password `Admin!01`.

Walkthrough
1. Register as a new user or log in if you already have an account.
2. As an event organizer, create a new event and set up tickets for sale.
3. As a customer, browse available events and purchase tickets.
4. Use the QR code generated for your ticket when attending the event.
5. Event staff can use the ticket validation feature to check attendees in.
6. Enjoy a streamlined ticket management and purchasing experience!

## Built Using
* PHP 8.1
* Laravel 10
* TypeScript 5.2.2
* React 18.2.0
* Tailwind 3.3.5
* Vite 4.2.1
* MySQL 8.0
* Docker 20.10.17
* Figma 112.2
* Devise
* VSCode
