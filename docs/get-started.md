---
outline: deep
---

# Documentation for Obsidian REST APIs

**Introduction**

This document provides an overview of the REST APIs offered by Obsidian, a platform designed to help companies track and manage customer events.

**Base URL and Headers**

- **Base URL:** `https://connect.obsidianlaunch.co`
- **Headers:**
  - `Authorization: Bearer <PROJECT TOKEN>`: Replace `<PROJECT TOKEN>` with your unique project token obtained from Obsidian dashboard.
  - `Content-Type: application/json`

**API Endpoints**

### 1. Events

- **URL:** `POST https://connect.obsidianlaunch.co/events`
- **Method:** POST
- **Body:** JSON
  - **Required Keys:**
    - `customer_id`: String (Unique identifier for the customer)
    - `event`: String (Unique identifier for the event)
    - `category`: String (Unique identifier for the event category)
  - **Optional Key:**
    - `property`: JSON Object (Additional properties associated with the event)
- **Sample Request:**

```json
{
  "customer_id": "10de5bb1-46e2-4b57-9ceb-3048cee29df6",
  "event": "OpenAI API Call",
  "category": "Tech",
  "property": {
    "path": "/dashboard"
  }
}
```

**Description:** Use this endpoint to track customer events on your platform.

### 2. Customers

- **URL:** `POST https://connect.obsidianlaunch.co/customer`
- **Method:** POST
- **Body:** JSON
  - **Required Key:**
    - `customer_id`: String (Unique identifier for the customer)
  - **Optional Keys:**
    - `name`: String (Customer name)
    - `created`: Timestamp (Customer creation timestamp)
    - `email`: String (Customer email address)
    - `plan`: String (Customer's plan details)
    - `planValue`: String (Plan value)
    - `planCurrency`: String (Plan currency)
    - `planInterval`: String (Plan billing interval)
    - `companyName`: String (Customer's company name)
- **Sample Request:**

```json
{
  "customer_id": "2bac0e00-7a67-4cba-b1d0-ca806c3e0432",
  "created": 1708258507,
  "companyName": "Obsidian",
  "name": "Shankha Dutta",
  "email": "shankha@obsidianlaunch.co",
  "plan": "Lite(£50/mo)",
  "planValue": 50,
  "planCurrency": "GBP",
  "planInterval": "monthly"
}
```

**Description:** Use this endpoint to create or update customer information on your platform.

**Best Practices**

- Update customer information whenever a customer signs up or logs in to your platform.
- Avoid calling the API on unauthenticated pages or screens where the `customer_id` is not available.
- Store the base URL and API endpoints in variables and create functions or methods to handle API calls.

**Development Environment**

While developing your integration, use the following URLs to avoid modifying production data:

- **Events URL:** `https://connect.obsidianlaunch.co/events/test`
- **Customers URL:** `https://connect.obsidianlaunch.co/customer/test`

**Additional Notes**

- Reach out to use at [anil@obsidianlaunch.co](mailto:anil@obsidianlaunch.co) or [shankha@obsidianlaunch.c](mailto:shankha@obsidianlaunch.c)o
- Ensure proper error handling and validation in your code when interacting with the APIs.
