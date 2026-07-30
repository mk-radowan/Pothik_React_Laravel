import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import CustomerDashboard from './components/CustomerDashboard';
import CustomerHistory from './components/CustomerHistory';
import CustomerProfile from './components/CustomerProfile';
import AuthLogin from './components/AuthLogin';
import AuthRegister from './components/AuthRegister';
import HomePage from './components/HomePage';
import CarsPage from './components/CarsPage';
import CarDetailsPage from './components/CarDetailsPage';

const dashboardRoot = document.getElementById('customer-dashboard-root');
const historyRoot = document.getElementById('customer-history-root');
const profileRoot = document.getElementById('customer-profile-root');
const loginRoot = document.getElementById('login-root');
const registerRoot = document.getElementById('register-root');
const homeRoot = document.getElementById('home-root');
const carsRoot = document.getElementById('cars-root');
const carDetailsRoot = document.getElementById('car-details-root');

if (dashboardRoot) {
	const data = JSON.parse(dashboardRoot.dataset.dashboard || '{}');
	createRoot(dashboardRoot).render(
		React.createElement(
			React.StrictMode,
			null,
			React.createElement(CustomerDashboard, { data })
		)
	);
}

if (historyRoot) {
	const data = JSON.parse(historyRoot.dataset.history || '{}');
	createRoot(historyRoot).render(
		React.createElement(
			React.StrictMode,
			null,
			React.createElement(CustomerHistory, { data })
		)
	);
}

if (profileRoot) {
	const data = JSON.parse(profileRoot.dataset.profile || '{}');
	createRoot(profileRoot).render(
		React.createElement(
			React.StrictMode,
			null,
			React.createElement(CustomerProfile, { data })
		)
	);
}

if (loginRoot) {
	const data = JSON.parse(loginRoot.dataset.login || '{}');
	createRoot(loginRoot).render(
		React.createElement(
			React.StrictMode,
			null,
			React.createElement(AuthLogin, { data })
		)
	);
}

if (registerRoot) {
	const data = JSON.parse(registerRoot.dataset.register || '{}');
	createRoot(registerRoot).render(
		React.createElement(
			React.StrictMode,
			null,
			React.createElement(AuthRegister, { data })
		)
	);
}

if (homeRoot) {
	const data = JSON.parse(homeRoot.dataset.home || '{}');
	createRoot(homeRoot).render(
		React.createElement(
			React.StrictMode,
			null,
			React.createElement(HomePage, { data })
		)
	);
}

if (carsRoot) {
	const data = JSON.parse(carsRoot.dataset.cars || '{}');
	createRoot(carsRoot).render(
		React.createElement(
			React.StrictMode,
			null,
			React.createElement(CarsPage, { data })
		)
	);
}

if (carDetailsRoot) {
	const data = JSON.parse(carDetailsRoot.dataset.car || '{}');
	createRoot(carDetailsRoot).render(
		React.createElement(
			React.StrictMode,
			null,
			React.createElement(CarDetailsPage, { data })
		)
	);
}
