// Go Event Tracking

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

func IdentifyCustomer(customerID, name, email string, properties map[string]interface{}) error {
body := map[string]interface{}{
"customer_id": customerID,
"name": name,
"email": email,
"properties": properties,
}
return sendRequest(IdentifyAPIURL, body)
}

func TrackEvent(customerID, eventName string) error {
body := map[string]interface{}{
"customer_id": customerID,
"event": eventName,
}
return sendRequest(TrackingAPIURL, body)
}

// Usage:
// err := IdentifyCustomer("user123", "John Doe", "john@example.com", map[string]interface{}{"plan": "premium"})
// if err != nil {
// log.Fatal(err)
// }
//
// err = TrackEvent("user123", "button_click")
// if err != nil {
// log.Fatal(err)
// }
