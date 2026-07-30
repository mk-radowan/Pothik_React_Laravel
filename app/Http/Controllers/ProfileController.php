<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        $user = auth()->user();
        $photoUrl = $user->avatar ? asset('storage/' . $user->avatar) : null;

        $profileData = [
            'userName' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'gender' => $user->gender,
            'address' => $user->address,
            'roleLabel' => ucfirst($user->role),
            'userPhotoUrl' => $photoUrl,
            'dashboardUrl' => route('dashboard'),
            'historyUrl' => route('bookings.history'),
            'reviewsUrl' => route('reviews.index'),
            'profileUrl' => route('profile'),
            'logoutUrl' => route('logout'),
            'updateUrl' => route('profile.update'),
            'passwordUpdateUrl' => route('profile.password.update'),
            'csrfToken' => csrf_token(),
        ];

        return Inertia::render('Customer/Profile', [
            'profileData' => $profileData,
            'data' => $profileData,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'email' => ['sometimes', 'nullable', 'email', Rule::unique(User::class, 'email')->ignore($user->id)],
            'phone' => ['sometimes', 'nullable', 'digits:11'],
            'gender' => ['sometimes', 'nullable', Rule::in(['male', 'female', 'other'])],
            'address' => ['sometimes', 'nullable', 'string', 'max:500'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $updates = [];

        if (array_key_exists('name', $validated) && $validated['name'] !== $user->name) {
            $updates['name'] = $validated['name'];
        }

        if (array_key_exists('email', $validated) && $validated['email'] !== $user->email) {
            $updates['email'] = $validated['email'];
        }

        if (array_key_exists('phone', $validated) && $validated['phone'] !== $user->phone) {
            $updates['phone'] = $validated['phone'];
        }

        if (array_key_exists('gender', $validated) && $validated['gender'] !== $user->gender) {
            $updates['gender'] = $validated['gender'];
        }

        if (array_key_exists('address', $validated) && $validated['address'] !== $user->address) {
            $updates['address'] = $validated['address'];
        }

        if (!empty($updates)) {
            $user->fill($updates);
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        }

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $user->password = Hash::make($validated['password']);
        $user->save();

        return back()->with('success', 'Password changed successfully.');
    }

    public function reviews()
    {
        $user = auth()->user();
        $approvedCars = Booking::where('user_id', $user->id)
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get(['car_id', 'car_name'])
            ->unique('car_id')
            ->values();

        $myReviews = Review::with('car')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $reviewsData = [
            'userName' => $user->name,
            'userPhotoUrl' => $user->avatar ? asset('storage/' . $user->avatar) : null,
            'eligibleCars' => $approvedCars->map(fn($car) => [
                'car_id' => $car->car_id,
                'car_name' => $car->car_name,
            ])->values(),
            'myReviews' => $myReviews->map(fn($review) => [
                'id' => $review->id,
                'car_id' => $review->car_id,
                'car_name' => $review->car?->display_name ?? 'N/A',
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => optional($review->created_at)->format('d M Y, h:i A'),
                'update_url' => route('reviews.update', $review->id),
                'delete_url' => route('reviews.destroy', $review->id),
            ])->values(),
            'submitUrl' => route('reviews.submit'),
            'dashboardUrl' => route('dashboard'),
            'historyUrl' => route('bookings.history'),
            'reviewsUrl' => route('reviews.index'),
            'profileUrl' => route('profile'),
            'logoutUrl' => route('logout'),
            'csrfToken' => csrf_token(),
        ];

        return Inertia::render('Customer/Reviews', [
            'reviewsData' => $reviewsData,
            'data' => $reviewsData,
        ]);
    }

    public function storeReview(Request $request, ?string $carId = null)
    {
        $selectedCarId = $carId ?? (string) $request->input('car_id', '');

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:500'],
            'car_id' => ['nullable', 'integer', 'exists:cars,id'],
        ]);

        if ($selectedCarId === '') {
            return back()->with('error', 'Please select a car first.');
        }

        $hasApprovedBooking = Booking::where('user_id', auth()->id())
            ->where('car_id', (int) $selectedCarId)
            ->where('status', 'approved')
            ->exists();

        if (!$hasApprovedBooking) {
            return back()->with('error', 'You can review only approved bookings.');
        }

        Review::updateOrCreate([
            'user_id' => auth()->id(),
            'car_id' => (int) $selectedCarId,
        ], [
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'user_name' => auth()->user()->name,
        ]);

        return back()->with('success', 'Review saved successfully. Thank you!');
    }

    public function updateReview(Request $request, Review $review)
    {
        if ($review->user_id !== auth()->id()) {
            return back()->with('error', 'Unauthorized review update attempt.');
        }

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:500'],
        ]);

        $hasApprovedBooking = Booking::where('user_id', auth()->id())
            ->where('car_id', (int) $review->car_id)
            ->where('status', 'approved')
            ->exists();

        if (!$hasApprovedBooking) {
            return back()->with('error', 'You can review only approved bookings.');
        }

        $review->update([
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return back()->with('success', 'Review updated successfully.');
    }

    public function destroyReview(Review $review)
    {
        if ($review->user_id !== auth()->id()) {
            return back()->with('error', 'Unauthorized review delete attempt.');
        }

        $review->delete();

        return back()->with('success', 'Review deleted successfully.');
    }
}
