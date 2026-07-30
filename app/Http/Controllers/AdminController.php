<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Car;
use App\Models\Review;
use App\Models\User;
use App\Http\Controllers\CarController;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    private const DIVISIONS = [
        'Dhaka',
        'Barisal',
        'Chattogram',
        'Khulna',
        'Mymensingh',
        'Rajshahi',
        'Rangpur',
        'Sylhet',
    ];

    public function dashboard()
    {
        $stats = [
            'total_users' => User::where('role', 'customer')->count(),
            'total_cars' => Car::count(),
            'total_bookings' => Booking::count(),
            'pending' => Booking::whereIn('status', ['pending', 'pending_payment'])->count(),
            'approved' => Booking::where('status', 'approved')->count(),
            'rejected' => Booking::where('status', 'rejected')->count(),
        ];

        $recentBookings = Booking::orderBy('created_at', 'desc')->limit(10)->get();

        $availableCars = Car::where('availability', 'available')->count();
        $bookedCars = Car::where('availability', 'booked')->count();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings->map(fn (Booking $booking) => $this->mapBooking($booking))->values(),
            'availableCars' => $availableCars,
            'bookedCars' => $bookedCars,
        ]);
    }

    public function cars()
    {
        $cars = Car::orderBy('created_at', 'desc')->get();

        return Inertia::render('Cars/Index', [
            'cars' => $cars->map(fn (Car $car) => $this->mapCar($car))->values(),
        ]);
    }

    public function createCar()
    {
        return Inertia::render('Cars/Create', [
            'categories' => CarController::CATEGORIES,
            'divisions' => self::DIVISIONS,
        ]);
    }

    public function storeCar(Request $request)
    {
        $validated = $request->validate([
            'brand' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string'],
            'location' => ['required', 'string'],
            'fuel_type' => ['required', 'string'],
            'transmission' => ['required', 'string'],
            'seats' => ['required', 'integer', 'min:2', 'max:9'],
            'price_per_day' => ['required', 'integer', 'min:100'],
            'rating' => ['required', 'numeric', 'min:1', 'max:5'],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'description' => ['nullable', 'string'],
            'availability' => ['required', 'in:available,booked'],
        ]);

        $validated['image'] = $request->file('image')->store('cars', 'public');

        Car::create($validated);

        return redirect()->route('admin.cars')
            ->with('success', 'Car added successfully.');
    }

    public function editCar(string $id)
    {
        $car = Car::findOrFail($id);

        return Inertia::render('Cars/Edit', [
            'car' => $this->mapCarForm($car),
            'categories' => CarController::CATEGORIES,
            'divisions' => self::DIVISIONS,
        ]);
    }

    public function updateCar(Request $request, string $id)
    {
        $car = Car::findOrFail($id);

        $validated = $request->validate([
            'brand' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string'],
            'location' => ['required', 'string'],
            'fuel_type' => ['required', 'string'],
            'transmission' => ['required', 'string'],
            'seats' => ['required', 'integer', 'min:2', 'max:9'],
            'price_per_day' => ['required', 'integer', 'min:100'],
            'rating' => ['required', 'numeric', 'min:1', 'max:5'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'description' => ['nullable', 'string'],
            'availability' => ['required', 'in:available,booked'],
        ]);

        if ($request->hasFile('image')) {
            if ($car->image && Storage::disk('public')->exists($car->image)) {
                Storage::disk('public')->delete($car->image);
            }

            $validated['image'] = $request->file('image')->store('cars', 'public');
        } else {
            unset($validated['image']);
        }

        $car->update($validated);

        return redirect()->route('admin.cars')
            ->with('success', 'Car updated successfully.');
    }

    public function destroyCar(string $id)
    {
        $car = Car::findOrFail($id);
        $car->delete();

        return redirect()->route('admin.cars')
            ->with('success', 'Car deleted successfully.');
    }

    public function toggleCarStatus(string $id)
    {
        $car = Car::findOrFail($id);

        if (!Car::hasIsEnabledColumn()) {
            return back()->with('error', 'Car status column is missing. Please run migrations.');
        }

        $car->is_enabled = !$car->is_enabled;
        $car->save();

        return back()->with('success', 'Car ' . ($car->is_enabled ? 'enabled' : 'disabled') . ' successfully.');
    }

    public function users()
    {
        $users = User::orderBy('created_at', 'desc')->get();

        return Inertia::render('Users/Index', [
            'users' => $users->map(fn (User $user) => $this->mapUser($user))->values(),
        ]);
    }

    public function createUser()
    {
        return Inertia::render('Users/Create');
    }

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class, 'email')],
            'phone' => ['required', 'digits:11'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', Rule::in(['admin', 'customer'])],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'is_active' => true,
        ]);

        return redirect()->route('admin.users')->with('success', 'User created successfully.');
    }

    public function editUser(string $id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Edit', [
            'user' => $this->mapUserForm($user),
        ]);
    }

    public function updateUser(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class, 'email')->ignore($user->id)],
            'phone' => ['required', 'digits:11'],
            'role' => ['required', Rule::in(['admin', 'customer'])],
            'password' => ['nullable', 'string', 'min:6'],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->phone = $validated['phone'];
        $user->role = $validated['role'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->route('admin.users')->with('success', 'User updated successfully.');
    }

    public function toggleUserStatus(string $id)
    {
        $user = User::findOrFail($id);

        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot disable your own account.');
        }

        $user->is_active = !$user->is_active;
        $user->save();

        $statusMessage = $user->is_active ? 'enabled' : 'disabled';

        return back()->with('success', 'User ' . $statusMessage . ' successfully.');
    }

    public function destroyUser(string $id)
    {
        $user = User::findOrFail($id);

        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }

    public function bookings()
    {
        $bookings = Booking::orderBy('created_at', 'desc')->get();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings->map(fn (Booking $booking) => $this->mapBooking($booking))->values(),
        ]);
    }

    public function createBookingForCustomer()
    {
        $customers = User::where('role', 'customer')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        $cars = Car::where('availability', 'available')
            ->enabled()
            ->orderBy('brand')
            ->orderBy('model')
            ->get();

        return Inertia::render('Bookings/Create', [
            'customers' => $customers->map(fn (User $customer) => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
            ])->values(),
            'cars' => $cars->map(fn (Car $car) => [
                'id' => $car->id,
                'display_name' => $car->display_name,
                'formatted_price' => $car->formatted_price,
            ])->values(),
            'divisions' => self::DIVISIONS,
        ]);
    }

    public function storeBookingForCustomer(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'car_id' => ['required', 'exists:cars,id'],
            'pickup_date' => ['required', 'date', 'after_or_equal:today'],
            'return_date' => ['required', 'date', 'after:pickup_date'],
            'pickup_location' => ['required', 'string', 'max:255', 'regex:/^Division\s*:\s*.+,\s*.+(?:,\s*.+)?$/i'],
            'dropoff_location' => ['required', 'string', 'max:255', 'regex:/^Division\s*:\s*.+,\s*.+(?:,\s*.+)?$/i'],
            'pickup_city' => ['nullable', 'string', 'max:100'],
            'pickup_pourosova' => ['nullable', 'string', 'max:100'],
            'pickup_ward' => ['nullable', 'string', 'max:50'],
            'dropoff_city' => ['nullable', 'string', 'max:100'],
            'dropoff_pourosova' => ['nullable', 'string', 'max:100'],
            'dropoff_ward' => ['nullable', 'string', 'max:50'],
        ]);

        $user = User::findOrFail((int) $validated['user_id']);
        $car = Car::findOrFail((int) $validated['car_id']);

        if ($user->role !== 'customer' || !$user->is_active) {
            return back()->with('error', 'Please select a valid active customer.')->withInput();
        }

        if (!$car->isAvailable()) {
            return back()->with('error', 'Selected car is not available.')->withInput();
        }

        $pickup = Carbon::parse($validated['pickup_date'])->format('d/m/Y');
        $return = Carbon::parse($validated['return_date'])->format('d/m/Y');

        if (Booking::hasOverlappingBooking($car->id, $pickup, $return)) {
            return back()->with('error', 'This car is already booked for these dates.')->withInput();
        }

        $days = Carbon::parse($validated['pickup_date'])->diffInDays(Carbon::parse($validated['return_date'])) + 1;
        $total = $car->price_per_day * $days;

        $pickupLocation = $this->buildRouteLocation(
            $validated['pickup_location'],
            $validated['pickup_city'] ?? null,
            $validated['pickup_pourosova'] ?? null,
            $validated['pickup_ward'] ?? null
        );

        $dropoffLocation = $this->buildRouteLocation(
            $validated['dropoff_location'],
            $validated['dropoff_city'] ?? null,
            $validated['dropoff_pourosova'] ?? null,
            $validated['dropoff_ward'] ?? null
        );

        Booking::create([
            'user_id' => $user->id,
            'car_id' => $car->id,
            'pickup_date' => $pickup,
            'return_date' => $return,
            'pickup_location' => $pickupLocation,
            'dropoff_location' => $dropoffLocation,
            'rental_days' => $days,
            'total_amount' => '৳' . number_format($total),
            'status' => 'approved',
            'customer_name' => $user->name,
            'car_name' => $car->display_name,
        ]);

        $car->availability = 'booked';
        $car->save();

        return redirect()->route('admin.bookings')->with('success', 'Booking created successfully for customer.');
    }

    private function buildRouteLocation(string $baseLocation, ?string $city, ?string $pourosova, ?string $ward): string
    {
        $parts = [$baseLocation];

        if (!empty($city)) {
            $parts[] = 'City: ' . trim($city);
        }

        if (!empty($pourosova)) {
            $parts[] = 'Pourosova: ' . trim($pourosova);
        }

        if (!empty($ward)) {
            $parts[] = 'Ward: ' . trim($ward);
        }

        return implode(' | ', $parts);
    }

    public function approveBooking(string $id)
    {
        $booking = Booking::findOrFail($id);

        if (!in_array($booking->status, ['pending', 'pending_payment'], true)) {
            return back()->with('error', 'Only pending bookings can be approved.');
        }

        $car = Car::find($booking->car_id);
        if (!$car) {
            return back()->with('error', 'Car not found.');
        }

        if (Booking::hasOverlappingBooking($booking->car_id, $booking->pickup_date, $booking->return_date, $id)) {
            return back()->with('error', 'Cannot approve: overlapping booking exists for these dates.');
        }

        $booking->status = 'approved';
        $booking->save();

        $car->availability = 'booked';
        $car->save();

        return back()->with('success', 'Booking approved. Car marked as booked.');
    }

    public function rejectBooking(string $id)
    {
        $booking = Booking::findOrFail($id);

        if (!in_array($booking->status, ['pending', 'pending_payment'], true)) {
            return back()->with('error', 'Only pending bookings can be rejected.');
        }

        $booking->status = 'rejected';
        $booking->save();

        return back()->with('success', 'Booking rejected. Car remains available.');
    }

    public function viewBooking(string $id)
    {
        $booking = Booking::findOrFail($id);
        $car = Car::find($booking->car_id);

        return Inertia::render('Bookings/Show', [
            'booking' => $this->mapBookingDetails($booking),
            'car' => $car ? $this->mapCar($car) : null,
        ]);
    }

    public function invoice(string $id)
    {
        $booking = Booking::findOrFail($id);

        return Inertia::render('Bookings/Invoice', [
            'booking' => [
                'id' => $booking->id,
                'customer_name' => $booking->customer_name,
                'car_name' => $booking->car_name,
                'pickup_date' => $booking->pickup_date,
                'return_date' => $booking->return_date,
                'pickup_location' => $booking->pickup_location,
                'dropoff_location' => $booking->dropoff_location,
                'rental_days' => $booking->rental_days,
                'total_amount' => $booking->total_amount,
                'payment_status' => $booking->payment_status ?? 'unpaid',
                'payment_reference' => $booking->payment_reference,
                'payment_method' => $booking->payment_method,
                'created_at_label' => optional($booking->created_at)->format('d M Y, h:i A'),
            ],
            'downloadUrl' => route('admin.bookings.invoice.download', $booking),
            'historyUrl' => route('admin.bookings'),
        ]);
    }

    public function downloadInvoice(string $id)
    {
        $booking = Booking::findOrFail($id);

        $filename = 'invoice-' . $booking->id . '.pdf';
        $pdf = Pdf::loadView('bookings.invoice-download', compact('booking'))
            ->setPaper('a4');

        return $pdf->download($filename);
    }

    public function analytics()
    {
        $bookingsByStatus = [
            'pending' => Booking::whereIn('status', ['pending', 'pending_payment'])->count(),
            'approved' => Booking::where('status', 'approved')->count(),
            'rejected' => Booking::where('status', 'rejected')->count(),
        ];

        $categoryStats = Car::query()
            ->selectRaw('category, COUNT(*) as total')
            ->groupBy('category')
            ->pluck('total', 'category')
            ->toArray();

        $cityStats = Car::all()->groupBy('location')->map->count()->toArray();

        return Inertia::render('Analytics', [
            'bookingsByStatus' => $bookingsByStatus,
            'categoryStats' => $categoryStats,
            'cityStats' => $cityStats,
        ]);
    }

    public function customerReviews(Request $request)
    {
        $validated = $request->validate([
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'car_id' => ['nullable', 'integer', 'exists:cars,id'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date', 'after_or_equal:date_from'],
        ]);

        $reviewsQuery = Review::with('car')
            ->orderBy('created_at', 'desc')
            ->when(!empty($validated['rating']), fn($query) => $query->where('rating', (int) $validated['rating']))
            ->when(!empty($validated['car_id']), fn($query) => $query->where('car_id', (int) $validated['car_id']))
            ->when(!empty($validated['date_from']), fn($query) => $query->whereDate('created_at', '>=', $validated['date_from']))
            ->when(!empty($validated['date_to']), fn($query) => $query->whereDate('created_at', '<=', $validated['date_to']));

        $reviews = $reviewsQuery->get();
        $cars = Car::orderBy('brand')->orderBy('model')->get();

        return Inertia::render('Reviews/Index', [
            'reviews' => $reviews->map(fn(Review $review) => [
                'id' => $review->id,
                'customer_name' => $review->user_name,
                'car_name' => $review->car?->display_name ?? 'N/A',
                'rating' => (int) $review->rating,
                'comment' => $review->comment,
                'created_at' => optional($review->created_at)->format('d M Y, h:i A'),
            ])->values(),
            'cars' => $cars->map(fn(Car $car) => [
                'id' => $car->id,
                'name' => $car->display_name,
            ])->values(),
            'filters' => [
                'rating' => (string) ($validated['rating'] ?? ''),
                'car_id' => (string) ($validated['car_id'] ?? ''),
                'date_from' => (string) ($validated['date_from'] ?? ''),
                'date_to' => (string) ($validated['date_to'] ?? ''),
            ],
            'indexUrl' => route('admin.reviews'),
        ]);
    }

    private function mapBooking(Booking $booking): array
    {
        $status = $this->normalizedStatus($booking->status);

        return [
            'id' => $booking->id,
            'customer_name' => $booking->customer_name,
            'car_name' => $booking->car_name,
            'pickup_date' => $booking->pickup_date,
            'return_date' => $booking->return_date,
            'status' => $status,
            'status_label' => $this->statusLabel($status),
            'payment_status' => $booking->payment_status ?? 'unpaid',
        ];
    }

    private function mapBookingDetails(Booking $booking): array
    {
        $status = $this->normalizedStatus($booking->status);

        return [
            'id' => $booking->id,
            'customer_name' => $booking->customer_name,
            'car_name' => $booking->car_name,
            'pickup_date' => $booking->pickup_date,
            'return_date' => $booking->return_date,
            'pickup_location_clean' => $this->cleanDivisionPrefix($booking->pickup_location),
            'dropoff_location_clean' => $this->cleanDivisionPrefix($booking->dropoff_location),
            'rental_days' => $booking->rental_days,
            'total_amount' => $booking->total_amount,
            'status' => $status,
            'status_label' => $this->statusLabel($status),
            'payment_status' => $booking->payment_status ?? 'unpaid',
        ];
    }

    private function normalizedStatus(string $status): string
    {
        return $status === 'pending_payment' ? 'pending' : $status;
    }

    private function statusLabel(string $status): string
    {
        if ($status === 'approved') {
            return 'Approve';
        }

        if ($status === 'rejected') {
            return 'Reject';
        }

        return 'Pending';
    }

    private function mapCar(Car $car): array
    {
        return [
            'id' => $car->id,
            'brand' => $car->brand,
            'model' => $car->model,
            'display_name' => $car->display_name,
            'category' => $car->category,
            'location' => $car->location,
            'price_per_day' => $car->price_per_day,
            'formatted_price' => $car->formatted_price,
            'availability' => $car->availability,
            'availability_label' => ucfirst($car->availability),
            'is_enabled' => (bool) $car->is_enabled,
            'fuel_type' => $car->fuel_type,
            'transmission' => $car->transmission,
            'seats' => $car->seats,
            'rating' => $car->rating,
            'image' => $car->image,
            'image_url' => $car->image_url,
            'fallback_image_url' => $car->fallback_image_url,
            'description' => $car->description,
        ];
    }

    private function mapCarForm(Car $car): array
    {
        return [
            'id' => $car->id,
            'brand' => $car->brand,
            'model' => $car->model,
            'category' => $car->category,
            'location' => $car->location,
            'availability' => $car->availability,
            'fuel_type' => $car->fuel_type,
            'transmission' => $car->transmission,
            'seats' => $car->seats,
            'price_per_day' => $car->price_per_day,
            'rating' => $car->rating,
            'image' => $car->image,
            'description' => $car->description,
        ];
    }

    private function mapUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
            'role_label' => ucfirst($user->role),
            'is_active' => (bool) $user->is_active,
            'created_at_label' => $user->created_at?->format('d/m/Y'),
        ];
    }

    private function mapUserForm(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
        ];
    }

    private function cleanDivisionPrefix(?string $value): string
    {
        if (!$value) {
            return 'N/A';
        }

        return preg_replace('/^Division\s*:\s*/i', '', $value) ?: 'N/A';
    }
}
