# TypeScript Event Tracking API Documentation

This document provides instructions on how to integrate our event tracking service into your TypeScript application. We provide two main functions: `identifyCustomer` for user identification, and `trackEvent` for tracking specific events.

## Setup

First, ensure you have the necessary authentication token. This token should be securely stored as an environment variable in your application.

```typescript
// In your .env file or environment configuration
EVENT_TRACKING_AUTH_TOKEN = your_auth_token_here;
```

## API Functions

### 1. identifyCustomer

Use this function when a user signs in, signs up, or completes onboarding. It helps to associate user information with subsequent events.

```typescript
/**
 * Identifies a customer with their details and additional properties.
 *
 * @param customerId - The unique identifier of the customer.
 * @param name - The name of the customer.
 * @param email - The email address of the customer.
 * @param properties - An object containing additional properties of the customer.
 * @returns A promise that resolves when the customer is successfully identified.
 * @throws Will throw an error if the API request fails.
 */
export async function identifyCustomer(
  customerId: string,
  name: string,
  email: string,
  properties: Record<string, unknown>
): Promise<void> {
  try {
    const IDENTIFY_API_URL = "https://events.obsidianlaunch.co/customer/test";
    const token = process.env.EVENT_TRACKING_AUTH_TOKEN;

    if (!token) {
      console.error("Event tracking auth token is not set");
      return;
    }

    const initOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      customer_id: customerId,
      name: name,
      email: email,
      properties: properties,
    };

    initOptions.body = JSON.stringify(body);

    const res = await fetch(IDENTIFY_API_URL, initOptions);

    console.log(await res.json());

    if (!res.ok) {
      const message = `An error has occurred: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }
  } catch (err) {
    console.error("Failed to identify customer:", err);
    throw err;
  }
}
```

#### Usage

```typescript
import { identifyCustomer } from "./your-event-tracking-module";

// When a user signs up or logs in
try {
  await identifyCustomer("user123", "John Doe", "john@example.com", {
    plan: "premium",
    signupDate: "2023-06-25",
  });
  console.log("Customer identified successfully");
} catch (error) {
  console.error("Failed to identify customer:", error);
}
```

### 2. trackEvent

Use this function to track specific events anywhere in your code.

```typescript
/**
 * Tracks an event for a specific customer.
 *
 * @param customerId - The unique identifier of the customer.
 * @param eventName - The name of the event being tracked.
 * @returns A promise that resolves when the event is successfully tracked.
 * @throws Will throw an error if the API request fails.
 */
export async function trackEvent(
  customerId: string,
  eventName: string
): Promise<void> {
  try {
    const TRACKING_API_URL = "https://events.obsidianlaunch.co/events/test";
    const token = process.env.EVENT_TRACKING_AUTH_TOKEN;

    if (!token) {
      console.error("Event tracking auth token is not set");
      return;
    }

    const initOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      customer_id: customerId,
      event: eventName,
    };

    initOptions.body = JSON.stringify(body);

    const res = await fetch(TRACKING_API_URL, initOptions);

    console.log(await res.json());

    if (!res.ok) {
      const message = `An error has occurred: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }
  } catch (err) {
    console.error("Failed to track event:", err);
    throw err;
  }
}
```

#### Usage

```typescript
import { trackEvent } from "./your-event-tracking-module";

// Tracking a specific event
try {
  await trackEvent("user123", "button_click");
  console.log("Event tracked successfully");
} catch (error) {
  console.error("Failed to track event:", error);
}
```

## Best Practices

1. **User Identification**: Always call `identifyCustomer` when a user signs up, logs in, or completes onboarding. This ensures that all subsequent events are associated with the correct user profile.

2. **Consistent Naming**: Use consistent naming conventions for your events across your application. This will make analysis easier later on.

3. **Relevant Data**: When tracking events, include all relevant information in the event name. For the `identifyCustomer` function, use the `properties` object to include any additional user information that might be useful for analysis.

4. **Error Handling**: Both functions will throw an error if the API request fails. Always wrap the function calls in a try-catch block to handle potential errors gracefully.

5. **Asynchronous Operations**: Both functions return a Promise. Use `async/await` or `.then()/.catch()` to handle the asynchronous operations properly.

6. **Security**: Never expose your authentication token in client-side code. If you're using these functions in a browser environment, consider setting up a proxy server to handle the API calls and token management securely.

## Troubleshooting

If you encounter any issues:

1. Ensure your authentication token is correctly set and valid.
2. Check your network connection.
3. Verify that you're passing the correct parameters to the functions.
4. Review the error messages logged to the console for more information.

For any additional help or questions, please contact our support team at shankha@obsidianlaunch.co
