---
outline: deep
---

# Segment webhook setup


### Steps

1. Go to your 'Destinations' link on your sidebar and click on 'Add destination'
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step1.png)
2. Search for 'webhook' in destinations search box & Select 'Webhooks (Actions)'
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step2.png)
3. Click on 'Add destination'
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step3.png)
4. Select your website/app/product data source and click on next
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step5.png)
5. Give the destination a name and opt for 'Fill in settings manually' and click 'Create Destination'
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step6.png)
6. Enter the webhook shared secret a the settings page and click 'Save Changes'
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step7.png)
7. Go to the 'Mappings' tab and create a new mapping
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step8.png)
8. Select 'Send' as the type
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step9.png)
9. Add 2 event types as 'any' condition like shown for the 1st step
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step11.png)
10. Paste 
{
	"messageId": "segment-test-message-exnwfe",
	"timestamp": "2024-05-06T11:44:22.078Z",
	"type": "track",
	"email": "test@example.org",
	"properties": {
		"property1": 1,
		"property2": "test",
		"property3": true
	},
	"userId": "test-user-p4b8mg",
	"event": "test_event"
} as a sample event to test later
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step12.png)
11. Get your segment URL from Obsidian app's settings (Settings and Members right side navbar)
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/ob-settings-segment-url.png)
12. Paste the URL in step 3
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step13.png)
13. Send a test event to verify the webhook integration. You should see a "Success" message and status 200 . Hit 'Save' to finish creating the mapping.
![Alt text for screen readers](https://obsidian-production.ams3.cdn.digitaloceanspaces.com/unmess-docs-images/step14.png)
14. Enable both the mapping you've just created (the toggle on the 'Mappings tab') & the destination (the toggle on the 'Settings' tab). Finally click on 'Save Changes' to finish the process.

Your Segment webhook integration with Obsidian is now live.