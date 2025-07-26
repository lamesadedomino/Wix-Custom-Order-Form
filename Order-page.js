
import { session } from 'wix-storage';
import wixLocation from 'wix-location';

// === SETUP PROTECTED SESSION STORAGE ===
const originalSetItem = session.setItem;
session.setItem = function (key, value) {
  if (typeof value === "object") {
    console.warn(`⚠️ Cannot store object in session: ${key}`, value);
  } else {
    originalSetItem.call(session, key, value);
  }
};

$w.onReady(() => {
  restoreSession();
  calculateTotal();
  setupImagePreview();
  handleLogoUploadPermission(); // ✅ Initial check for upload permission

  // === Triggers for recalculating price ===
  $w("#dropdownLeg").onChange(() => calculateTotal());
  $w("#dropdownCup").onChange(() => calculateTotal());
  $w("#dropdownLogo").onChange(() => {
    calculateTotal();
    handleLogoUploadPermission(); // ✅ Enable/disable upload based on logo choice
  });
  $w("#dropdownStain").onChange(() => calculateTotal());
  $w("#dropdownLocation").onChange(() => saveValue("purchaseLocation", $w("#dropdownLocation").value));
  $w("#inputZip").onChange(() => calculateTotal());

  // === Image Upload Handler ===
  $w("#uploadButton").onChange(() => {
    const file = $w("#uploadButton").value[0];
    if (!file) return;

    $w("#uploadButton").startUpload()
      .then(uploadedFile => {
        const fileUrl = uploadedFile.url;
        session.setItem("uploadedImageUrl", fileUrl);
        $w("#imagePreview").src = fileUrl;
        $w("#imagePreview").show();
      })
      .catch(err => {
        console.error("Upload failed:", err);
      });
  });

  // === Submit Button ===
  $w("#buttonSubmit").onClick(() => {
    saveAllToSession();
    wixLocation.to("/order-customer-info");
  });
});

// === SESSION RESTORE ===
function restoreSession() {
  const keys = [
    "legStyle", "cupHolder", "logoOption", "deliveryOption",
    "stainColor", "purchaseLocation", "zip", "totalPrice"
  ];
  keys.forEach(key => {
    const el = getElementByKey(key);
    const value = session.getItem(key);
    if (el && value) el.value = value;
  });

  const previewUrl = session.getItem("uploadedImageUrl");
  if (previewUrl) {
    $w("#imagePreview").src = previewUrl;
    $w("#imagePreview").show();
  } else {
    $w("#imagePreview").hide();
  }
}

// === IMAGE PREVIEW ON LOAD ===
function setupImagePreview() {
  const previewUrl = session.getItem("uploadedImageUrl");
  if (previewUrl) {
    $w("#imagePreview").src = previewUrl;
    $w("#imagePreview").show();
  } else {
    $w("#imagePreview").hide();
  }
}

// === ELEMENT MAPPER ===
function getElementByKey(key) {
  switch (key) {
    case "legStyle": return $w("#dropdownLeg");
    case "cupHolder": return $w("#dropdownCup");
    case "logoOption": return $w("#dropdownLogo");
    case "deliveryOption": return $w("#dropdownDelivery");
    case "stainColor": return $w("#dropdownStain");
    case "purchaseLocation": return $w("#dropdownLocation");
    case "zip": return $w("#inputZip");
    case "totalPrice": return $w("#textTotalPrice");
    default: return null;
  }
}

// === SAVE ALL TO SESSION ===
function saveAllToSession() {
  session.setItem("legStyle", $w("#dropdownLeg").value);
  session.setItem("cupHolder", $w("#dropdownCup").value);
  session.setItem("logoOption", $w("#dropdownLogo").value);
  session.setItem("stainColor", $w("#dropdownStain").value);
  session.setItem("purchaseLocation", $w("#dropdownLocation").value);
  session.setItem("zip", $w("#inputZip").value);
  session.setItem("totalPrice", $w("#textTotalPrice").text);
}

// === SAVE INDIVIDUAL VALUE ===
function saveValue(key, value) {
  if (value) session.setItem(key, value);
}

// === PRICE CALCULATOR ===
function calculateTotal() {
  const basePrice = 400;

  // Legs
  const legValue = ($w("#dropdownLeg").value || "").toLowerCase();
  let legPrice = 0;
  switch (legValue) {
    case "metal folding": legPrice = 35; break;
    case "tapered": legPrice = 50; break;
    case "pedestal": legPrice = 150; break;
  }

  // Cup Holders
  const cupValue = ($w("#dropdownCup").value || "").toLowerCase();
  const cupPrice = (cupValue === "yes") ? 50 : 0;

  // Logo
  const logoValue = ($w("#dropdownLogo").value || "").toLowerCase();
  const logoPrice = (logoValue === "yes") ? 75 : 0;

  // ZIP for Shipping
  const zip = $w("#inputZip").value || "";
  let shippingCost = 0;
  if (zip.startsWith("104")) {
    shippingCost = 150;
  } else if (zip.startsWith("32")) {
    shippingCost = 0;
  }

  const total = basePrice + legPrice + cupPrice + logoPrice + shippingCost;
  $w("#inputShippingCost").value = shippingCost.toFixed(2);
  $w("#textTotalPrice").text = `$${total.toFixed(2)}`;

  // Store
  session.setItem("totalPrice", `$${total.toFixed(2)}`);
  session.setItem("shippingCost", shippingCost.toFixed(2));
}

// === LOGO UPLOAD PERMISSION ===
function handleLogoUploadPermission() {
  const logoValue = ($w("#dropdownLogo").value || "").toLowerCase();
  if (logoValue === "yes") {
    $w("#uploadButton").enable();
  } else {
    $w("#uploadButton").disable();
  }
}
