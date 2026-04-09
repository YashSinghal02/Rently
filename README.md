# Rently — Premium Car Rental (React + Redux Toolkit + Tailwind + GSAP)

This is a production-style demo car rental web app built with:

- **React (functional components + hooks)**
- **Redux Toolkit** (mock auth, cars, bookings)
- **React Router** (Home, Cars listing, Car details, Dashboard)
- **Tailwind CSS** with **dark/light mode** persisted to `localStorage`
- **GSAP** (page transitions, scroll reveals, micro-interactions)
- **react-hot-toast** for notifications

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Features

- **Home** hero with animated headline + search (location, pickup, return) + featured cars
- **Car Listing** filters (price/type/brand), sorting, responsive grid, skeleton loading
- **Car Details** gallery, pricing, and **booking form** with real-time total calculation
- **Dashboard** shows and manages the user’s mock bookings (cancel confirmed bookings)

