<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'car_id',
        'pickup_date',
        'return_date',
        'pickup_location',
        'dropoff_location',
        'rental_days',
        'total_amount',
        'status',
        'payment_method',
        'payment_status',
        'payment_reference',
        'paid_at',
        'customer_name',
        'car_name',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    public static function hasOverlappingBooking(int $carId, string $pickup, string $return, ?int $excludeId = null): bool
    {
        $pickupDt = \Carbon\Carbon::createFromFormat('d/m/Y', $pickup);
        $returnDt = \Carbon\Carbon::createFromFormat('d/m/Y', $return);

        $bookings = static::where('car_id', $carId)
            ->whereIn('status', ['pending', 'approved'])
            ->whereIn('payment_status', ['paid', 'processing'])
            ->when($excludeId, fn ($q) => $q->where('id', '!=', $excludeId))
            ->get();

        foreach ($bookings as $booking) {
            $bPickup = \Carbon\Carbon::createFromFormat('d/m/Y', $booking->pickup_date);
            $bReturn = \Carbon\Carbon::createFromFormat('d/m/Y', $booking->return_date);
            if ($pickupDt <= $bReturn && $returnDt >= $bPickup) {
                return true;
            }
        }

        return false;
    }
}
