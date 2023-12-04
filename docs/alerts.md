
# ⚠️ Alerts ⚠️

## Getting Started

This guide provides step-by-step instructions on how to set up alerts and contact points Siglens.

### 📌 Accessing Alerts and Contact Points

- Demo for creating alert rules :
[Video](../static/img/alert-overview.mp4)

### ⭐ Creating Alert Rules ⭐

1. **Define Alert Rule and Query:**
   - Enter the details for your alert rule and the corresponding query.

      ![alert-1](../static/img/alert-1.png)

2. **Set Conditions and Contact Points:**
   - Specify the conditions for triggering the alert.

      ![alert-2](../static/img/alert-2.png)

   - Select an existing contact point for notifications or create a new one if necessary.

      ![alert-3](../static/img/alert-3.png)

   - Write a message using the template vars.

      ![alert-3.1](../static/img/alert-3.1.png)

3. **Custom Labels (Optional):**
   - Add a custom label to your notification for easy identification.

      ![alert-4](../static/img/alert-4.png)

4. **Save and Verify:**
   - Save your alert rule. The alert status should now be set to 'firing'.

      ![alert-5](../static/img/alert-5.png)

5. **Notification Confirmation:**
   - For Webhook notifications, confirm message received on the webhook site.

      ![alert-7](../static/img/alert-7.png)

   - To receive Slack notifications, you need to provide channel id and slack token. To get channel id and slack token you can refer this documentation -> https://api.slack.com/tutorials/tracks/getting-a-token

      ![alert-6](../static/img/alert-6.png)

   - Check the designated Slack channel for notification.

      ![alert-8](../static/img/alert-8.png)

### ✏️ Editing and Deleting

1. **Editing Alert Rules:**
   - To edit an alert rule, click on alert rule name or press the edit button.

      ![alert-9](../static/img/alert-9.png)

      ![alert-10](../static/img/alert-10.png)

   - Make changes and save them.

      ![alert-11](../static/img/alert-11.png)

2. **Deleting Alert Rules:**
   - To delete an alert rule, press delete button for the alert to be deleted.

      ![alert-12](../static/img/alert-12.png)

      ![alert-13](../static/img/alert-13.png)


3. **Managing Contact Points:**
   - To delete a contact point, ensure it is not linked to any active alert rules. You can not delete contact point associated with any of the alert rules

      ![alert-14](../static/img/alert-14.png)

      ![alert-15](../static/img/alert-15.png)

      ![alert-16](../static/img/alert-16.png)































