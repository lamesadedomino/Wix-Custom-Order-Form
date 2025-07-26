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
## Code Reference

### 🧩 Element IDs (Wix Page Elements)

#### Dropdowns
- `#dropdownLeg` – Leg Style
- `#dropdownCup` – Cup Holder
- `#dropdownLogo` – Logo/Decal Option
- `#dropdownStain` – Stain Color
- `#dropdownLocation` – Purchase Location

#### Input Fields (Customer Info)
- `#inputFirstName`
- `#inputLastName`
- `#inputEmail`
- `#inputPhone`
- `#inputStreet`
- `#inputCity`
- `#inputState`
- `#inputZip`

#### Pricing
- `#inputShippingCost` – Displays calculated shipping based on ZIP
- `#textTotalPrice` – Displays total price

#### Buttons
- `#buttonSubmit` – Final submission
- `#buttonContinue` – From Buyer Info to Confirmation
- `#editOrderButton` – Edit My Order (on Confirmation Page)

#### Image Preview
- `#imageStainPreview` – Shows stain color preview
- `#uploadButton` – Upload custom image

---

### 📦 Session Storage Keys

These store values between pages:

- `legStyle`
- `cupHolder`
- `logoOption`
- `deliveryOption` (replaced by ZIP logic)
- `stainColor`
- `purchaseLocation`
- `firstName`, `lastName`, `email`, `phone`
- `street`, `city`, `state`, `zip`
- `totalPrice`
- `shippingCost`
- `uploadedImage`

---

### 🧠 Key Functions

- `calculateTotal()` – Recalculates base + add-ons + shipping
- `submitOrder()` – Collects all inputs and saves to session
- `restoreSession()` – Pre-populates form on page load
- `calculateShipping(zip)` – Determines cost based on ZIP code
- `generateOrderId()` – Creates order ID like `DOM-12345678`
## 🚧 Roadmap / To-Do

These are the remaining tasks and features currently in development:

- [ ] 🔄 **Fix "Proceed to Confirmation" button** on the Buyer Information page  
  - Should collect all customer input fields  
  - Should store data in session and/or CMS  
  - Should redirect to `/order-confirmation-page`  
  - Currently not functional or not saving correctly

- [ ] 💰 **Integrate PayPal Checkout** on the confirmation page  
  - Use final total price  
  - Ensure correct order ID is passed

- [ ] 🖼️ **Show uploaded logo image** (if provided) on confirmation page

- [ ] 🧾 **Save all order data** to the `Sales_Orders` CMS collection

- [ ] 🛠️ **Admin Dashboard for Order Tracking**  
  - Ability to filter by purchase location, delivery status, and commission paid

- [ ] ✉️ **Send order confirmation email** to customer after payment (optional)

---

