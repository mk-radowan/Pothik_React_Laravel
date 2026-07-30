<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        if (auth()->check()) {
            return $this->redirectByRole();
        }

        $loginData = [
            'loginUrl' => route('login'),
            'registerUrl' => route('register'),
            'csrfToken' => csrf_token(),
            'redirect' => old('redirect', request('redirect')),
            'oldEmail' => old('email', ''),
            'errors' => [
                'email' => session('errors')?->first('email'),
                'password' => session('errors')?->first('password'),
            ],
        ];

        return Inertia::render('Auth/Login', [
            'loginData' => $loginData,
            'data' => $loginData,
        ]);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'redirect' => ['nullable', 'string'],
        ]);

        $credentials = [
            'email' => $validated['email'],
            'password' => $validated['password'],
        ];

        $redirect = $this->sanitizeRedirectPath($validated['redirect'] ?? null);

        if ($redirect) {
            $request->session()->put('url.intended', $redirect);
        }

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            if (!Auth::user()->is_active) {
                Auth::logout();

                return back()->with('error', 'Your account is disabled. Please contact admin.')->onlyInput('email');
            }

            $request->session()->regenerate();

            if (Auth::user()->isAdmin()) {
                return redirect()->route('admin.dashboard');
            }

            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors([
            'email' => 'Invalid email or password.',
        ])->onlyInput('email', 'redirect');
    }

    public function showRegister()
    {
        if (auth()->check()) {
            return $this->redirectByRole();
        }

        $registerData = [
            'registerUrl' => route('register'),
            'loginUrl' => route('login'),
            'csrfToken' => csrf_token(),
            'old' => [
                'name' => old('name', ''),
                'email' => old('email', ''),
                'phone' => old('phone', ''),
            ],
            'errors' => [
                'name' => session('errors')?->first('name'),
                'email' => session('errors')?->first('email'),
                'phone' => session('errors')?->first('phone'),
                'password' => session('errors')?->first('password'),
            ],
        ];

        return Inertia::render('Auth/Register', [
            'registerData' => $registerData,
            'data' => $registerData,
        ]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class, 'email')],
            'phone' => ['required', 'digits:11'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
            'role' => 'customer',
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return $this->redirectByRole()
            ->with('success', 'Registration successful! Welcome to Pothik Rentals.');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home')
            ->with('success', 'Logged out successfully.');
    }

    protected function redirectByRole()
    {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('dashboard');
    }

    private function sanitizeRedirectPath(?string $redirect): ?string
    {
        if (!$redirect) {
            return null;
        }

        $path = trim($redirect);

        if ($path === '' || strpos($path, '//') === 0 || strpos($path, '\\') === 0) {
            return null;
        }

        if (preg_match('/^[a-z][a-z0-9+.-]*:/i', $path)) {
            return null;
        }

        return str_starts_with($path, '/') ? $path : null;
    }
}
