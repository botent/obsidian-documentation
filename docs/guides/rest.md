---
outline: deep
---

# Obsidian REST API

This document provides an overview of the REST APIs offered by Obsidian, a platform designed to help companies track and manage customer events.

## Base URL and Headers

Base URL: https://events.obsidianlaunch.co

Headers:

- Authorization: Bearer `PROJECT TOKEN`: Replace `PROJECT TOKEN` with your unique project token obtained from [Obsidian Config](https://app.obsidianlaunch.co/config)

- Content-Type: `application/json`

## API Endpoints

### <Badge type="info" text="POST" /> /events

Use this endpoint to track customer events on your platform.

**Body**: JSON

#### Required Attributes

- customer_id: String (Unique identifier for the customer)

- event: String (Unique identifier for the event)

#### Optional Attributes

- property: JSON Object (Additional properties associated with the event)

#### Sample Request Body

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

### 2. <Badge type="info" text="POST" /> /customer

Use this endpoint to create or update customer information on your platform.

**Body**: JSON

#### Required Attributes

- customer_id: String (Unique identifier for the customer)

#### Optional Attributes

- name: String (Customer name)
- created: Timestamp (Customer creation timestamp)
- email: String (Customer email address)
- plan: String (Customer's plan details)
- planValue: String (Plan value)
- planCurrency: String (Plan currency)
- planInterval: String (Plan billing interval)
- companyName: String (Customer's company name)

#### Sample Request

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
