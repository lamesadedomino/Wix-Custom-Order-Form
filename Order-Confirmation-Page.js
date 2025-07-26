

import { session } from 'wix-storage';
import wixLocation from 'wix-location';

$w.onReady(() => {
  // === PRODUCT OPTIONS ===
  $w('#valueLegStyle').text = session.getItem('legStyle') || 'Not selected';
  $w('#valueCupHolder').text = session.getItem('cupHolder') || 'Not selected';
  $w('#valueLogo').text = session.getItem('logoOption') || 'Not selected';
  $w('#valueStainColor').text = session.getItem('stainColor') || 'Not selected';
  $w('#valuePurchaseLocation').text = session.getItem('purchaseLocation') || 'Not selected';

  // === PRICES ===
  $w('#valueShipping').text = session.getItem('shippingCost') || '$0.00';
  $w('#valueTotalPrice').text = session.getItem('totalPrice') || '$0.00';

  // === BUYER INFO ===+
  $w('#valueFirstName').text = session.getItem('firstName') || '';
  $w('#valueLastName').text = session.getItem('lastName') || '';
  $w('#valueEmail').text = session.getItem('email') || '';
  $w('#valuePhone').text = session.getItem('phone') || '';
  $w('#valueStreet').text = session.getItem('street') || '';
  $w('#valueCity').text = session.getItem('city') || '';
  $w('#valueState').text = session.getItem('state') || '';
  $w('#valueZip').text = session.getItem('zip') || '';

  // === ORDER ID ===
  const orderNumber = `DOM-${Date.now()}`;
  $w('#valueOrderNumber').text = orderNumber;

  // === EDIT BUTTON ===
  $w("#buttonEditOrder").onClick(() => {
    wixLocation.to("/copy-of-order-page-submission");
  });

// === SHOW UPLOADED IMAGE ONLY IF IT EXISTS ===
const uploadedImageUrl = session.getItem('uploadedImageUrl');
if (uploadedImageUrl && uploadedImageUrl.length > 0) {
  $w("#imageUploadedPreview").src = uploadedImageUrl;
  $w("#imageUploadedPreview").show();
} else {
  $w("#imageUploadedPreview").hide();
}

});
