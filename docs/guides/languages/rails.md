# Ruby on Rails Event Tracking API Documentation

This document provides instructions on how to integrate our event tracking service into your Ruby on Rails application. We provide two main methods: `identify_customer` for user identification, and `track_event` for tracking specific events.

## Setup

First, ensure you have the necessary authentication token. This token should be securely stored as an environment variable in your application.

```bash
# In your environment or .env file
EVENT_TRACKING_AUTH_TOKEN=your_auth_token_here
```

## API Methods

Create a new file `app/services/event_tracker.rb` with the following content:

```ruby
require 'net/http'
require 'uri'
require 'json'

class EventTracker
  IDENTIFY_API_URL = 'https://events.obsidianlaunch.co/customer/test'
  TRACKING_API_URL = 'https://events.obsidianlaunch.co/events/test'

  class << self
    def identify_customer(customer_id, name, email, properties)
      body = {
        customer_id: customer_id,
        name: name,
        email: email,
        properties: properties
      }

      send_request(IDENTIFY_API_URL, body)
    end

    def track_event(customer_id, event_name)
      body = {
        customer_id: customer_id,
        event: event_name
      }

      send_request(TRACKING_API_URL, body)
    end

    private

    def send_request(url, body)
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true

      request = Net::HTTP::Post.new(uri)
      request['Content-Type'] = 'application/json'
      request['Authorization'] = "Bearer #{ENV['EVENT_TRACKING_AUTH_TOKEN']}"
      request.body = body.to_json

      response = http.request(request)

      if response.is_a?(Net::HTTPSuccess)
        Rails.logger.info "Request successful: #{response.body}"
      else
        raise "Request failed: #{response.code} - #{response.message}"
      end
    end
  end
end
```

### 1. identify_customer

Use this method when a user signs in, signs up, or completes onboarding. It helps to associate user information with subsequent events.

#### Usage

```ruby
begin
  EventTracker.identify_customer(
    'user123',
    'John Doe',
    'john@example.com',
    { plan: 'premium', signup_date: '2023-06-25' }
  )
  Rails.logger.info 'Customer identified successfully'
rescue StandardError => e
  Rails.logger.error "Failed to identify customer: #{e.message}"
end
```

### 2. track_event

Use this method to track specific events anywhere in your code.

#### Usage

```ruby
begin
  EventTracker.track_event('user123', 'button_click')
  Rails.logger.info 'Event tracked successfully'
rescue StandardError => e
  Rails.logger.error "Failed to track event: #{e.message}"
end
```

## Best Practices

1. **User Identification**: Always call `identify_customer` when a user signs up, logs in, or completes onboarding. This ensures that all subsequent events are associated with the correct user profile.

2. **Consistent Naming**: Use consistent naming conventions for your events across your application. This will make analysis easier later on.

3. **Relevant Data**: When tracking events, include all relevant information in the event name. For the `identify_customer` method, use the `properties` hash to include any additional user information that might be useful for analysis.

4. **Error Handling**: Both methods will raise an exception if the API request fails. Always wrap the method calls in a begin-rescue block to handle potential errors gracefully.

5. **Environment Variables**: Ensure that the `EVENT_TRACKING_AUTH_TOKEN` environment variable is set securely, preferably using Rails' credentials system or a gem like `dotenv-rails`.

6. **Security**: If you're using these methods in a web application, consider setting up a backend job to handle the API calls asynchronously and manage token securely.

## Troubleshooting

If you encounter any issues:

1. Ensure your authentication token is correctly set and valid.
2. Check your network connection.
3. Verify that you're passing the correct parameters to the methods.
4. Review the error messages in your Rails logs for more information.

For any additional help or questions, please contact our support team at support@yourcompany.com.
