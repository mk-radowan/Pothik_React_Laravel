<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class Car extends Model
{
    protected static ?bool $hasIsEnabledColumn = null;

    protected $fillable = [
        'brand',
        'model',
        'category',
        'location',
        'is_enabled',
        'availability',
        'fuel_type',
        'transmission',
        'seats',
        'price_per_day',
        'rating',
        'image',
        'description',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
        'price_per_day' => 'integer',
        'seats' => 'integer',
        'rating' => 'float',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'car_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'car_id');
    }

    public function getDisplayNameAttribute(): string
    {
        return $this->brand . ' ' . $this->model;
    }

    public function getFormattedPriceAttribute(): string
    {
        return '৳' . number_format($this->price_per_day) . '/day';
    }

    // MAIN IMAGE URL
    public function getImageUrlAttribute(): string
    {
        if (!empty($this->image)) {
            if (preg_match('/^https?:\/\//i', $this->image)) {
                return $this->image;
            }

            if (str_starts_with($this->image, '/')) {
                return asset(ltrim($this->image, '/'));
            }

            return asset('storage/' . $this->image);
        }

        return asset($this->categoryImagePath());
    }

    // FALLBACK IMAGE
    public function categoryImagePath(): string
    {
        $slug = Str::slug($this->brand . '-' . $this->model);

        foreach (['jpg', 'png', 'webp'] as $ext) {
            $path = "images/cars/models/{$slug}.{$ext}";

            if (file_exists(public_path($path))) {
                return $path;
            }
        }

        return "images/cars/default.svg";
    }

    public function getFallbackImageUrlAttribute(): string
    {
        return asset($this->categoryImagePath());
    }

    public function isAvailable(): bool
    {
        return $this->availability === 'available';
    }

    public function isEnabled(): bool
    {
        if (!self::hasIsEnabledColumn()) {
            return true;
        }

        return (bool) $this->is_enabled;
    }

    public static function hasIsEnabledColumn(): bool
    {
        if (self::$hasIsEnabledColumn === null) {
            self::$hasIsEnabledColumn = Schema::hasColumn((new self())->getTable(), 'is_enabled');
        }

        return self::$hasIsEnabledColumn;
    }

    public function divisionMatches(?string $value): bool
    {
        $carDivision = $this->normalizeDivisionName($this->location);
        $inputDivision = $this->normalizeDivisionName($value);

        if ($carDivision === '' || $inputDivision === '') {
            return false;
        }

        $synonyms = [
            'chattogram' => 'chittagong',
            'chittagong' => 'chattogram',
            'barisal' => 'barishal',
            'barishal' => 'barisal',
            'maulvibazar' => 'moulvibazar',
            'moulvibazar' => 'maulvibazar',
            'netrokona' => 'netrakona',
        ];

        if (($synonyms[$carDivision] ?? null) === $inputDivision || ($synonyms[$inputDivision] ?? null) === $carDivision) {
            return true;
        }

        return $carDivision === $inputDivision
            || Str::contains($carDivision, $inputDivision)
            || Str::contains($inputDivision, $carDivision);
    }

    protected function normalizeDivisionName(?string $value): string
    {
        $normalized = trim(strtolower((string) ($value ?? '')));

        if ($normalized === '') {
            return '';
        }

        $normalized = preg_replace('/^division\s*:\s*/i', '', $normalized);
        $normalized = preg_replace('/[^a-z0-9]+/', ' ', (string) $normalized);
        $normalized = trim(preg_replace('/\s+/', ' ', $normalized) ?? '');

        return $normalized;
    }

    public function scopeAvailable($query)
    {
        return $query->where('availability', 'available');
    }

    public function scopeEnabled($query)
    {
        if (!self::hasIsEnabledColumn()) {
            return $query;
        }

        return $query->where('is_enabled', true);
    }

    public function scopeByLocation($query, ?string $location)
    {
        if (!$location) {
            return $query;
        }

        $normalized = trim($location);
        if ($normalized === '') {
            return $query;
        }

        $tokens = array_values(array_filter(array_map('trim', preg_split('/\s*,\s*/', preg_replace('/^Division\s*:\s*/i', '', $normalized))), function ($token) {
            return $token !== '';
        }));

        if (empty($tokens)) {
            return $query;
        }

        return $query->where(function ($q) use ($normalized, $tokens) {
            foreach ($tokens as $token) {
                $q->orWhere('location', 'like', '%' . $token . '%');
            }

            $q->orWhere('location', 'like', '%' . $normalized . '%');
        });
    }

    public function scopeByCategory($query, ?string $category)
    {
        if ($category) {
            return $query->where('category', $category);
        }

        return $query;
    }

    public function scopePriceRange($query, ?int $min, ?int $max)
    {
        if ($min) {
            $query->where('price_per_day', '>=', $min);
        }

        if ($max) {
            $query->where('price_per_day', '<=', $max);
        }

        return $query;
    }
}