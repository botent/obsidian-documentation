---
outline: deep
---

# Segment Webhook

> [!NOTE]
> This page is being updated and will be published soon.

## Event Mappings and Required Data

You would need to map your `event` data and `identify` data in the webhook mappings for Obsidian to work.

## From Segment's Official Documentation

1. From the Segment web app, navigate to Connections > Catalog.
2. Search for Webhooks (Actions) in the Destinations Catalog, and select the destination.
3. Click Configure Webhooks (Actions).
4. Select the source that will send data to Webhooks (Actions) and follow the steps to name your destination.
5. If you require authentication, add in a shared secret on the Settings > Advanced Settings tab. If you provide a shared secret, Segment will sign requests with an HMAC in the “X-Signature” request header. The HMAC is a hex-encoded SHA1 hash generated using the shared secret and the request body.
6. Follow the steps in the Destinations Actions documentation on Customizing mappings. You can create up to 5 mappings, each of which can send to a different webhook URL.
7. Enable the destination and configured mappings.
