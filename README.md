# Pothik — Car Rental Platform with Real-Time Availability

Production-ready Laravel MVC academic project for **Bangladesh** — MySQL, Blade + Bootstrap 5, BDT pricing.

## Tech Stack

- Laravel 11
- PHP 8.2+
- MySQL (`car_rental` database)
- Blade templates
- Bootstrap 5
- Custom CSS (glassmorphism UI)

## Prerequisites

1. **PHP 8.2+** with extensions: `pdo_mysql`, `openssl`, `mbstring`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`
2. **Composer**
3. **MySQL** running locally (XAMPP default is fine)

## Installation

```bash
cd C:\Users\91896\Projects\car-rental-platform

composer install

copy .env.example .env

php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan serve
```

Open: **http://127.0.0.1:8000**

## MySQL Configuration

`.env` settings:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=car_rental
DB_USERNAME=root
DB_PASSWORD=
```

### Tables

| Table | Purpose |
|------------|---------|
| `users` | Admin & Customer accounts |
| `cars` | Bangladesh market vehicles |
| `bookings` | Rental requests (pending/approved/rejected) |
| `reviews` | Customer car reviews |

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@pothik.com | admin123 |
| Customer | customer@pothik.com | customer123 |

## Routes

### Public
- `/` — Home
- `/login`, `/register`
- `/cars` — Browse & filter
- `/car/{id}` — Car details

### Customer (auth)
- `/dashboard`
- `/book/{id}` — Create booking (POST)
- `/bookings/history`
- `/profile`

### Admin (auth + admin middleware)
- `/admin/dashboard`
- `/admin/cars` — CRUD
- `/admin/users`
- `/admin/bookings`
- `/admin/bookings/approve/{id}`
- `/admin/bookings/reject/{id}`
- `/admin/analytics`

## Booking Workflow

1. Customer submits booking → status: **pending**
2. Admin **approves** → status: **approved**, car: **booked**
3. Admin **rejects** → status: **rejected**, car stays **available**
4. Double-booking prevented for overlapping dates

## Bangladesh Divisions

Dhaka, Chittagong, Khulna, Rajshahi, Sylhet, Barisal, Rangpur, Mymensingh

## Seeded Cars

Hatchback: Swift, i20, Altroz | Sedan: City, Verna, Ciaz | SUV: Scorpio, Harrier, Creta, XUV700 | Luxury: BMW X1, Mercedes C Class, Audi A4 | Sports: BMW Z4, Mini Cooper | Electric: Nexon EV, MG ZS EV

## Project Structure

```
app/
  Http/Controllers/  AuthController, CarController, BookingController, AdminController, ProfileController
  Http/Middleware/   AdminMiddleware
  Models/            User, Car, Booking, Review
resources/views/     Blade templates (customer + admin)
routes/web.php
database/seeders/    DatabaseSeeder.php
public/css/          style.css, admin.css
```

## License

IsDB BISEW — Internship Project 
