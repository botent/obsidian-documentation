# Go Event Tracking API Documentation

This document provides instructions on how to integrate our event tracking service into your Go application. We provide two main functions: `IdentifyCustomer` for user identification, and `TrackEvent` for tracking specific events.

## Setup

First, ensure you have the necessary authentication token. This token should be securely stored as an environment variable in your application.

```bash
# In your environment or .env file
export EVENT_TRACKING_AUTH_TOKEN=your_auth_token_here
```

## API Functions

Create a new file `eventtracking.go` with the following content:

```go
package eventtracking

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

const (
    IdentifyAPIURL = "https://events.obsidianlaunch.co/customer/test"
    TrackingAPIURL = "https://events.obsidianlaunch.co/events/test"
)

func sendRequest(url string, body interface{}) error {
    jsonBody, err := json.Marshal(body)
    if err != nil {
        return fmt.Errorf("error marshaling JSON: %v", err)
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
    if err != nil {
        return fmt.Errorf("error creating request: %v", err)
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer "+os.Getenv("EVENT_TRACKING_AUTH_TOKEN"))

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return fmt.Errorf("error sending request: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("request failed: %s", resp.Status)
    }

    fmt.Println("Request successful")
    return nil
}

// IdentifyCustomer identifies a customer with their details and additional properties.
func IdentifyCustomer(customerID, name, email string, properties map[string]interface{}) error {
    body := map[string]interface{}{
        "customer_id": customerID,
        "name":        name,
        "email":       email,
        "properties":  properties,
    }
    return sendRequest(IdentifyAPIURL, body)
}

// TrackEvent tracks an event for a specific customer.
func TrackEvent(customerID, eventName string) error {
    body := map[string]interface{}{
        "customer_id": customerID,
        "event":       eventName,
    }
    return sendRequest(TrackingAPIURL, body)
}
```

### 1. IdentifyCustomer

Use this function when a user signs in, signs up, or completes onboarding. It helps to associate user information with subsequent events.

#### Usage

```go
package main

import (
    "log"
    "your_project/eventtracking"
)

func main() {
    properties := map[string]interface{}{
        "plan":        "premium",
        "signup_date": "2023-06-25",
    }

    err := eventtracking.IdentifyCustomer("user123", "John Doe", "john@example.com", properties)
    if err != nil {
        log.Printf("Failed to identify customer: %v", err)
    } else {
        log.Println("Customer identified successfully")
    }
}
```

### 2. TrackEvent

Use this function to track specific events anywhere in your code.

#### Usage

```go
package main

import (
    "log"
    "your_project/eventtracking"
)

func main() {
    err := eventtracking.TrackEvent("user123", "button_click")
    if err != nil {
        log.Printf("Failed to track event: %v", err)
    } else {
        log.Println("Event tracked successfully")
    }
}
```

## Best Practices

1. **User Identification**: Always call `IdentifyCustomer` when a user signs up, logs in, or completes onboarding. This ensures that all subsequent events are associated with the correct user profile.

2. **Consistent Naming**: Use consistent naming conventions for your events across your application. This will make analysis easier later on.

3. **Relevant Data**: When tracking events, include all relevant information in the event name. For the `IdentifyCustomer` function, use the `properties` map to include any additional user information that might be useful for analysis.

4. **Error Handling**: Both functions return an error if the API request fails. Always check the returned error and handle it appropriately.

5. **Environment Variables**: Ensure that the `EVENT_TRACKING_AUTH_TOKEN` environment variable is set securely and not exposed in your source code.

6. **Security**: If you're using these functions in a web application, consider setting up a backend service to handle the API calls and token management securely.

## Troubleshooting

If you encounter any issues:

1. Ensure your authentication token is correctly set and valid.
2. Check your network connection.
3. Verify that you're passing the correct parameters to the functions.
4. Review the error messages for more information.

For any additional help or questions, please contact our support team at support@yourcompany.com.
