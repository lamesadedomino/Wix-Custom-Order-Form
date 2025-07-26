# Wix-Custom-Order-Form
order page code 
## Installation & Usage

This project is developed entirely within Wix using Velo (formerly Corvid). To use or adapt this system:

1. Enable **Velo Dev Mode** in your Wix site.
2. Create the following pages:
   - `/domino-order-page` – for product customization
   - `/order-customer-info` – to collect buyer information
   - `/order-confirmation-page` – to display and edit the order before payment
3. Add corresponding input fields, dropdowns, and button elements with the correct IDs (see "Code Reference" below).
4. Use `wix-storage` for session data handling between pages.
5. Set up a **CMS collection** (e.g., `Sales_Orders`) to store order submissions.
6. Integrate PayPal via Wix Payments or custom PayPal buttons (code provided).
7. Test the flow thoroughly across all devices.

All code is modular, with clear logic separation between pricing, session handling, and submission.
