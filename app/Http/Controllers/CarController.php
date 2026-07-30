<?php
namespace App\Http\Controllers;
use App\Models\Car;
use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends Controller
{
    public const CITIES = [
        'Dhaka', 'Rajshahi', 'Barishal', 'Chittagong', 'Khulna', 'Sylhet',
        'Mymensingh', 'Comilla', 'Rangpur', 'Bogra', 'Jessore', 'Pabna', 'Narsingdi', 'Tangail', 'Cox\'s Bazar', 'Feni', 'Brahmanbaria', 'Dinajpur',
        'Noakhali', 'Gazipur', 'Narayanganj', 'Madaripur', 'Kushtia', 'Jamalpur', 'Patuakhali', 'Satkhira', 'Barguna', 'Bhola', 'Sirajganj', 'Kurigram', 'Thakurgaon',
        'Sherpur', 'Netrokona', 'Kishoreganj', 'Habiganj', 'Sunamganj', 'Lakshmipur', 'Jhalokathi', 'Pirojpur', 'Magura', 'Chuadanga', 'Meherpur', 'Narail', 'Jhenaidah', 'Bagerhat',   'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Kushtia', 'Pabna', 'Sirajganj', 'Rajbari', 'Faridpur', 'Gopalganj', 'Shariatpur', 'Munshiganj', 'Gazipur', 'Narsingdi', 'Tangail', 'Mymensingh', 'Jamalpur', 'Sherpur', 'Netrokona', 'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Pabna', 'Sirajganj', 'Rajshahi', 'Chapainawabganj', 'Kushtia', 'Jhenaidah', 'Magura', 'Narail', 'Jessore', 'Satkhira', 'Khulna', 'Bagerhat', 'Chuadanga', 'Meherpur', 'Kushtia', 'Jashore', 'Jhenaidah', 'Magura', 'Narail', 'Satkhira', 'Bagerhat', 'Chuadanga', 'Meherpur', 'Kushtia', 'Jashore', 'Jhenaidah', 'Magura', 'Narail', 'Satkhira', 'Bagerhat', 'Chuadanga', 'Meherpur',
    ];

    public const CATEGORIES = [
        'Hatchback', 'Sedan', 'SUV', 'Luxury', 'Sports', 'Electric',
    ];

    public function index(Request $request)
    {
        $query = Car::query()->enabled();

        if ($request->filled('location')) {
            $query->byLocation($request->location);
        }

        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        if ($request->filled('availability')) {
            $query->where('availability', $request->availability);
        } else {
            $query->where('availability', 'available');
        }

        if ($request->filled('min_price')) {
            $query->priceRange((int) $request->min_price, null);
        }

        if ($request->filled('max_price')) {
            $query->priceRange(null, (int) $request->max_price);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $cars = $query->orderBy('rating', 'desc')->paginate(12);

        $filters = $request->all();

        $carsData = [
            'cars' => $cars->map(fn($car) => [
                'id' => $car->id,
                'brand' => $car->brand,
                'model' => $car->model,
                'location' => $car->location,
                'category' => $car->category,
                'fuel_type' => $car->fuel_type,
                'transmission' => $car->transmission,
                'seats' => $car->seats,
                'rating' => $car->rating,
                'availability' => $car->availability,
                'formatted_price' => $car->formatted_price,
                'image_url' => $car->image_url,
                'fallback_image_url' => $car->fallback_image_url,
                'showUrl' => route('cars.show', $car->id),
            ])->values(),
            'total' => $cars->total(),
            'categories' => self::CATEGORIES,
            'filters' => $filters,
            'indexUrl' => route('cars.index'),
            'paginationHtml' => $cars->withQueryString()->links()->toHtml(),
        ];

        return Inertia::render('Home', [
            'homeData' => $carsData,
            'carsData' => $carsData,
        ]);
    }

    public function show(string $id)
    {
        $car = Car::query()->enabled()->findOrFail($id);
        $reviews = Review::where('car_id', $id)->orderBy('created_at', 'desc')->get();

        $user = auth()->user();
        $isCustomer = $user && $user->isCustomer();
        $canReview = (bool) ($isCustomer && Booking::where('user_id', $user->id)
            ->where('car_id', $car->id)
            ->where('status', 'approved')
            ->exists());
        $carDetailsData = [
            'car' => [
                'id' => $car->id,
                'brand' => $car->brand,
                'model' => $car->model,
                'display_name' => $car->display_name,
                'category' => $car->category,
                'availability' => $car->availability,
                'location' => $car->location,
                'formatted_price' => $car->formatted_price,
                'price_per_day' => $car->price_per_day,
                'rating' => $car->rating,
                'fuel_type' => $car->fuel_type,
                'transmission' => $car->transmission,
                'seats' => $car->seats,
                'description' => $car->description,
                'image_url' => $car->image_url,
                'fallback_image_url' => $car->fallback_image_url,
                'is_available' => $car->isAvailable(),
            ],
            'reviews' => $reviews->map(fn($review) => [
                'user_name' => $review->user_name,
                'rating' => $review->rating,
                'comment' => $review->comment,
            ])->values(),
            'isLoggedIn' => (bool) $user,
            'isCustomer' => (bool) $isCustomer,
            'canReview' => $canReview,
            'canBook' => (bool) ($isCustomer && $car->isAvailable()),
            'homeUrl' => route('home'),
            'carsUrl' => route('cars.index'),
            'reviewUrl' => route('reviews.store', $car->id),
            'bookingUrl' => route('bookings.store', $car->id),
            'loginUrl' => route('login', ['redirect' => request()->getRequestUri()]),
            'csrfToken' => csrf_token(),
            'old' => [
                'pickup_date' => old('pickup_date', ''),
                'return_date' => old('return_date', ''),
                'pickup_location' => old('pickup_location', ''),
                'dropoff_location' => old('dropoff_location', ''),
            ],
            'errors' => [
                'pickup_date' => session('errors')?->first('pickup_date'),
                'return_date' => session('errors')?->first('return_date'),
                'pickup_location' => session('errors')?->first('pickup_location'),
                'dropoff_location' => session('errors')?->first('dropoff_location'),
            ],
        ];

        return Inertia::render('CarDetails', [
            'carDetailsData' => $carDetailsData,
        ]);
    }

    public function home()
    {
        $featuredCars = Car::where('availability', 'available')
            ->enabled()
            ->orderBy('rating', 'desc')
            ->limit(6)
            ->get();

        $homeData = [
            'categories' => self::CATEGORIES,
            'featuredCars' => $featuredCars->map(fn($car) => [
                'id' => $car->id,
                'brand' => $car->brand,
                'model' => $car->model,
                'location' => $car->location,
                'category' => $car->category,
                'fuel_type' => $car->fuel_type,
                'transmission' => $car->transmission,
                'seats' => $car->seats,
                'rating' => $car->rating,
                'availability' => $car->availability,
                'formatted_price' => $car->formatted_price,
                'image_url' => $car->image_url,
                'fallback_image_url' => $car->fallback_image_url,
                'showUrl' => route('cars.show', $car->id),
            ])->values(),
            'carsUrl' => route('cars.index'),
            'registerUrl' => route('register'),
        ];

        return Inertia::render('Home', compact('homeData'));
    }
}
