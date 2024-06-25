# Python Event Tracking

import os
import requests
import json

IDENTIFY_API_URL = 'https://events.obsidianlaunch.co/customer/test'
TRACKING_API_URL = 'https://events.obsidianlaunch.co/events/test'

def send_request(url, body):
headers = {
'Content-Type': 'application/json',
'Authorization': f"Bearer {os.environ.get('EVENT_TRACKING_AUTH_TOKEN')}"
}

    response = requests.post(url, json=body, headers=headers)

    if response.status_code == 200:
        print(f"Request successful: {response.json()}")
    else:
        raise Exception(f"Request failed: {response.status_code} - {response.text}")

def identify_customer(customer_id, name, email, properties):
body = {
'customer_id': customer_id,
'name': name,
'email': email,
'properties': properties
}
send_request(IDENTIFY_API_URL, body)

def track_event(customer_id, event_name):
body = {
'customer_id': customer_id,
'event': event_name
}
send_request(TRACKING_API_URL, body)

# Usage:

# identify_customer('user123', 'John Doe', 'john@example.com', {'plan': 'premium'})

# track_event('user123', 'button_click')
