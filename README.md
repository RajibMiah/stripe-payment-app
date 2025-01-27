# Stripe Payment App

## Overview

The **Stripe Payment App** is a test project designed to demonstrate the integration of Stripe's payment API for various payment scenarios, including **one-time payments**, **subscriptions**, and **trial subscriptions**. It uses **Next.js** for the frontend, **Express** for the backend, and **MongoDB** for data storage. The app also uses **Docker** for containerization, making it easy to set up and deploy.

This project serves as an example for testing and development purposes, showcasing how to integrate Stripe’s API for handling payments and subscriptions.

## Features

-   **One-Time Payment**: Process single payments using Stripe's API.
-   **Subscription Payments**: Implement subscription billing with recurring payments.
-   **Trial Subscriptions**: Allow users to start a trial period before being charged for a subscription.
-   **Dockerized**: The project is containerized using Docker for easy deployment and management.
-   **MongoDB Integration**: Store user and transaction data securely in MongoDB.
-   **Express Backend**: RESTful API built with Express to manage payments and subscriptions.
-   **Next.js Frontend**: React-based frontend for handling the user interface.

## Frontend Preview

Here is a preview of the homepage of the Stripe Payment App:

![Home Page Screenshot](public/images/home-page.png)

## Tech Stack

-   **Frontend**:
    -   Next.js (React)
    -   Stripe Elements (for securely handling payment details)
-   **Backend**:
    -   Express.js (Node.js framework for the API)
    -   Stripe Node.js SDK
-   **Database**:

    -   MongoDB (NoSQL database to store user and transaction data)

-   **Containerization**:
    -   Docker (for easy deployment)

## Prerequisites

-   Docker installed on your machine
-   Node.js and npm installed
-   Stripe account (sign up at [Stripe](https://stripe.com))

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stripe-payment-app.git
cd stripe-payment-app
```

~
