---
outline: deep
---

# Quickstart

The quickest way to get started with Obsidian is to connect your bank account and set up Segment webhook. If you don't use Segment, setting up Obsidian API triggers should take about 30 minutes.

## Segment Webhook

Segment is a popular CDP tool and if your company already uses it, you'd benefit from setting up a webhook on Segment to Obsidian. It's quick and should take about 5 minutes max. Follow the guide [here](/guides/segment)

If you'd like to learn more about Segment's webhook and their documentation, please follow [this link](https://segment.com/docs/connections/destinations/catalog/actions-webhook/)

## Obsidian API

Obsidian provides REST API for you to send events and data. The setup is fairly simple. There are 2 endpoints at your disposal -

#### Identify

This endpoint is used to `create` a user and ideally should be placed at the entry / login point.

#### Event

This endpoint is open for you to send your user actions and any properties you'd like to include

Follow [this link](/guides/rest) to get started with setting up Obsidian API in your product and start sending events.
