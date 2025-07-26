


import { session } from 'wix-storage';
import wixLocation from 'wix-location';
import wixData from 'wix-data';

$w.onReady(() => {
  console.log("🟢 Page ready");
  restoreSession();

  $w("#buttonContinue").onClick(() => {
    console.log("✅ Continue button clicked");
    saveOrderToCMS();
  });
});

// === Restore input values from session
function restoreSession() {
  $w("#inputFirstName").value = session.getItem("firstName") || "";
  $w("#inputLastName").value = session.getItem("lastName") || "";
  $w("#inputEmail").value = session.getItem("email") || "";
  $w("#inputPhone").value = session.getItem("phone") || "";
  $w("#inputStreet").value = session.getItem("street") || "";
  $w("#inputCity").value = session.getItem("city") || "";
  $w("#inputState").value = session.getItem("state") || "";
  $w("#inputZip").value = session.getItem("zip") || "";
}

// === Save order to CMS collection
function saveOrderToCMS() {
  // Get inputs from the form
  const firstName = $w("#inputFirstName").value;
  const lastName = $w("#inputLastName").value;
  const email = $w("#inputEmail").value;
  const phone = $w("#inputPhone").value;
  const streetAddress = $w("#inputStreet").value;
  const city = $w("#inputCity").value;
  const state = $w("#inputState").value;
  const zipCode = $w("#inputZip").value;

  // Save to session
  session.setItem("firstName", firstName);
  session.setItem("lastName", lastName);
  session.setItem("email", email);
  session.setItem("phone", phone);
  session.setItem("street", streetAddress);
  session.setItem("city", city);
  session.setItem("state", state);
  session.setItem("zip", zipCode);

  // Build order ID
  const generatedOrderId = `DOM-${Date.now()}`;
  session.setItem("orderId", generatedOrderId);

  // Build data object for CMS
  const orderData = {
    title: `${firstName} ${lastName} - ${generatedOrderId}`,
    Orderid: generatedOrderId,
    firstName,
    lastName,
    email,
    phone,
    streetAddress,
    city,
    state,
    zipCode,
    legStyle: session.getItem("legStyle"),
    cupholder: session.getItem("cupHolder"),
    logoOption: session.getItem("logoOption"),
    stainColor: session.getItem("stainColor"),
    purchaseLocation: session.getItem("purchaseLocation"),
    deliveryPrice: session.getItem("shippingCost"),
    totalPrice: session.getItem("totalPrice"),
    commissionStatus: "Pending",
    ImageUrl: session.getItem("ImageUrl") || null,
    createdAt: new Date(),
    dateSubmitted: new Date()
  };

  // Save to Wix CMS
  wixData.insert("Sales_Orders", orderData)
    .then(() => {
      console.log("✅ Order saved to CMS");
      wixLocation.to("/order-confirmation-page");
    })
    .catch((err) => {
      console.error("❌ Failed to save to CMS:", err);
      // Optionally show error message on page
      // $w("#errorMessage").text = "Something went wrong. Please try again.";
      // $w("#errorMessage").show();
    });
}

