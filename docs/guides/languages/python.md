# Python Event Tracking API Documentation

This document provides instructions on how to integrate our event tracking service into your Python application. We provide two main functions: `identify_customer` for user identification, and `track_event` for tracking specific events.

## Setup

First, ensure you have the necessary authentication token. This token should be securely stored as an environment variable in your application.

```bash
# In your environment or .env file
EVENT_TRACKING_AUTH_TOKEN=your_auth_token_here
```

Make sure you have the `requests` library installed:

```bash
pip install requests
```

## API Functions

### 1. identify_customer

Use this function when a user signs in, signs up, or completes onboarding. It helps to associate user information with subsequent events.

```python
import os
import requests

IDENTIFY_API_URL = 'https://events.obsidianlaunch.co/customer/test'

def identify_customer(customer_id: str, name: str, email: str, properties: dict):
    """
    Identifies a customer with their details and additional properties.

    Args:
        customer_id (str): The unique identifier of the customer.
        name (str): The name of the customer.
        email (str): The email address of the customer.
        properties (dict): A dictionary containing additional properties of the customer.

    Raises:
        Exception: If the API request fails.
    """
    body = {
        'customer_id': customer_id,
        'name': name,
        'email': email,
        'properties': properties
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f"Bearer {os.environ.get('EVENT_TRACKING_AUTH_TOKEN')}"
    }

    response = requests.post(IDENTIFY_API_URL, json=body, headers=headers)

    if response.status_code == 200:
        print(f"Customer identified successfully: {response.json()}")
    else:
        raise Exception(f"Failed to identify customer: {response.status_code} - {response.text}")
```

#### Usage

```python
try:
    identify_customer(
        'user123',
        'John Doe',
        'john@example.com',
        {'plan': 'premium', 'signup_date': '2023-06-25'}
    )
    print('Customer identified successfully')
except Exception as error:
    print(f'Failed to identify customer: {error}')
```

### 2. track_event

Use this function to track specific events anywhere in your code.

```python
import os
import requests

TRACKING_API_URL = 'https://events.obsidianlaunch.co/events/test'

def track_event(customer_id: str, event_name: str):
    """
    Tracks an event for a specific customer.

    Args:
        customer_id (str): The unique identifier of the customer.
        event_name (str): The name of the event being tracked.

    Raises:
        Exception: If the API request fails.
    """
    body = {
        'customer_id': customer_id,
        'event': event_name
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f"Bearer {os.environ.get('EVENT_TRACKING_AUTH_TOKEN')}"
    }

    response = requests.post(TRACKING_API_URL, json=body, headers=headers)

    if response.status_code == 200:
        print(f"Event tracked successfully: {response.json()}")
    else:
        raise Exception(f"Failed to track event: {response.status_code} - {response.text}")
```

#### Usage

```python
try:
    track_event('user123', 'button_click')
    print('Event tracked successfully')
except Exception as error:
    print(f'Failed to track event: {error}')
```

## Best Practices

1. **User Identification**: Always call `identify_customer` when a user signs up, logs in, or completes onboarding. This ensures that all subsequent events are associated with the correct user profile.

2. **Consistent Naming**: Use consistent naming conventions for your events across your application. This will make analysis easier later on.

3. **Relevant Data**: When tracking events, include all relevant information in the event name. For the `identify_customer` function, use the `properties` dictionary to include any additional user information that might be useful for analysis.

4. **Error Handling**: Both functions will raise an exception if the API request fails. Always wrap the function calls in a try-except block to handle potential errors gracefully.

5. **Environment Variables**: Ensure that the `EVENT_TRACKING_AUTH_TOKEN` environment variable is set securely and not exposed in your source code.

6. **Security**: If you're using these functions in a web application, consider setting up a backend proxy to handle the API calls and token management securely.

## Troubleshooting

If you encounter any issues:

1. Ensure your authentication token is correctly set and valid.
2. Check your network connection.
3. Verify that you're passing the correct parameters to the functions.
4. Review the error messages for more information.

For any additional help or questions, please contact our support team at shankha@obsidianlaunch.co
