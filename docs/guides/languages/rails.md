# Ruby on Rails Event Tracking

require 'net/http'
require 'uri'
require 'json'

class EventTracker
IDENTIFY_API_URL = 'https://events.obsidianlaunch.co/customer/test'
TRACKING_API_URL = 'https://events.obsidianlaunch.co/events/test'

def self.identify_customer(customer_id, name, email, properties)
body = {
customer_id: customer_id,
name: name,
email: email,
properties: properties
}

    send_request(IDENTIFY_API_URL, body)

end

def self.track_event(customer_id, event_name)
body = {
customer_id: customer_id,
event: event_name
}

    send_request(TRACKING_API_URL, body)

end

private

def self.send_request(url, body)
uri = URI(url)
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

    request = Net::HTTP::Post.new(uri)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = "Bearer #{ENV['EVENT_TRACKING_AUTH_TOKEN']}"
    request.body = body.to_json

    response = http.request(request)

    if response.is_a?(Net::HTTPSuccess)
      puts "Request successful: #{response.body}"
    else
      raise "Request failed: #{response.code} - #{response.message}"
    end

end
end

# Usage:

# EventTracker.identify_customer('user123', 'John Doe', 'john@example.com', { plan: 'premium' })

# EventTracker.track_event('user123', 'button_click')
