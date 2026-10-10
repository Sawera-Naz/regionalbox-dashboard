# RegionalBox — Live Subscription Product Dashboard

## Project Overview

RegionalBox is a responsive dashboard concept for a regional
subscription box service. It displays product information retrieved
from a public REST API.

## Objectives

- Integrate a public REST API.
- Display product data dynamically.
- Provide product search and category filtering.
- Show loading, error, and empty-result states.
- Calculate summary statistics from product data.
- Build a responsive interface using Tailwind CSS.

## Technologies Used

- HTML
- JavaScript
- Tailwind CSS
- Vite
- DummyJSON Products API

## API Information

API: DummyJSON Products API

Endpoint: https://dummyjson.com/products

The dashboard uses product titles, categories, prices, stock levels,
ratings, and other available product information.

## Features

- Live product data fetching
- Dynamic product table
- Product search
- Category filtering
- Dashboard statistics
- Loading feedback
- API error handling
- Retry functionality
- Empty search-result feedback
- Responsive layout

## Run Locally

1. Install Node.js.
2. Open the project folder in a terminal.
3. Install dependencies:

   npm install

4. Start the development server:

   npm run dev

5. Open the local URL shown in the terminal.

## Testing

The application should be tested for successful API responses,
network/API failures, product searching, category filtering,
empty search results, and responsive layouts.

## Project Status

This project is an educational dashboard prototype.
Product information is provided by the public DummyJSON API.
It is not a real subscription or payment system.