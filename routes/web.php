<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Route;

Route::middleware('inertia.public')->group(function () {
    Route::get('/', [CarController::class, 'home'])->name('home');

    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
    Route::get('/car/{id}', [CarController::class, 'show'])->name('cars.show');

    Route::match(['get', 'post'], '/payments/sslcommerz/success/{booking}', [BookingController::class, 'sslCommerzSuccess'])
        ->withoutMiddleware([
            VerifyCsrfToken::class,
            StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        ])
        ->name('payments.ssl.success');
    Route::match(['get', 'post'], '/payments/sslcommerz/fail/{booking}', [BookingController::class, 'sslCommerzFail'])
        ->withoutMiddleware([
            VerifyCsrfToken::class,
            StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        ])
        ->name('payments.ssl.fail');
    Route::match(['get', 'post'], '/payments/sslcommerz/cancel/{booking}', [BookingController::class, 'sslCommerzCancel'])
        ->withoutMiddleware([
            VerifyCsrfToken::class,
            StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        ])
        ->name('payments.ssl.cancel');
    Route::match(['get', 'post'], '/payments/bkash/callback/{booking}', [BookingController::class, 'bkashCallback'])
        ->withoutMiddleware([
            VerifyCsrfToken::class,
            StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        ])
        ->name('payments.bkash.callback');
    Route::get('/payments/result/{booking}', [BookingController::class, 'paymentResult'])->name('payments.result');
});

Route::prefix('customer')->middleware(['auth', 'inertia.public'])->group(function () {
    Route::get('/dashboard', [BookingController::class, 'dashboard'])->name('dashboard');
    Route::post('/book/{id}', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/{booking}/payment', [BookingController::class, 'showPayment'])->name('bookings.payment.show');
    Route::post('/bookings/{booking}/payment', [BookingController::class, 'processPayment'])->name('bookings.payment.process');
    Route::get('/bookings/{booking}/invoice', [BookingController::class, 'invoice'])->name('bookings.invoice');
    Route::get('/bookings/{booking}/invoice/download', [BookingController::class, 'downloadInvoice'])->name('bookings.invoice.download');
    Route::get('/bookings/history', [BookingController::class, 'history'])->name('bookings.history');
    Route::get('/reviews', [ProfileController::class, 'reviews'])->name('reviews.index');

    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::post('/car/{id}/review', [ProfileController::class, 'storeReview'])->name('reviews.store');
    Route::post('/reviews', [ProfileController::class, 'storeReview'])->name('reviews.submit');
    Route::put('/reviews/{review}', [ProfileController::class, 'updateReview'])->name('reviews.update');
    Route::delete('/reviews/{review}', [ProfileController::class, 'destroyReview'])->name('reviews.destroy');
});

Route::prefix('admin')->middleware(['auth', 'admin', 'inertia.admin'])->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    })->name('admin.home');

    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/cars', [AdminController::class, 'cars'])->name('admin.cars');
    Route::get('/cars/create', [AdminController::class, 'createCar'])->name('admin.cars.create');
    Route::post('/cars', [AdminController::class, 'storeCar'])->name('admin.cars.store');
    Route::get('/cars/{id}/edit', [AdminController::class, 'editCar'])->name('admin.cars.edit');
    Route::put('/cars/{id}', [AdminController::class, 'updateCar'])->name('admin.cars.update');
    Route::post('/cars/{id}/toggle', [AdminController::class, 'toggleCarStatus'])->name('admin.cars.toggle');
    Route::delete('/cars/{id}', [AdminController::class, 'destroyCar'])->name('admin.cars.destroy');
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/users/create', [AdminController::class, 'createUser'])->name('admin.users.create');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('admin.users.store');
    Route::get('/users/{id}/edit', [AdminController::class, 'editUser'])->name('admin.users.edit');
    Route::put('/users/{id}', [AdminController::class, 'updateUser'])->name('admin.users.update');
    Route::post('/users/{id}/toggle', [AdminController::class, 'toggleUserStatus'])->name('admin.users.toggle');
    Route::delete('/users/{id}', [AdminController::class, 'destroyUser'])->name('admin.users.destroy');
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('admin.bookings');
    Route::get('/bookings/create-car', [AdminController::class, 'createBookingForCustomer'])->name('admin.booking-car.create');
    Route::post('/bookings/create-car', [AdminController::class, 'storeBookingForCustomer'])->name('admin.booking-car.store');
    Route::get('/bookings/{id}', [AdminController::class, 'viewBooking'])->name('admin.bookings.view');
    Route::get('/bookings/{id}/invoice', [AdminController::class, 'invoice'])->name('admin.bookings.invoice');
    Route::get('/bookings/{id}/invoice/download', [AdminController::class, 'downloadInvoice'])->name('admin.bookings.invoice.download');
    Route::post('/bookings/approve/{id}', [AdminController::class, 'approveBooking'])->name('admin.bookings.approve');
    Route::post('/bookings/reject/{id}', [AdminController::class, 'rejectBooking'])->name('admin.bookings.reject');
    Route::get('/reviews', [AdminController::class, 'customerReviews'])->name('admin.reviews');
    Route::get('/analytics', [AdminController::class, 'analytics'])->name('admin.analytics');
});
