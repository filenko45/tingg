const checkoutType = 'redirect'; //  'modal' || 'redirect'
const serviceCode= "MYSDEV0684";
const encryptionURL = 'http://10.100.5.28:8000/encrypt';

Tingg.renderPayButton({
    className: 'tingg-express-checkout-button', 
    checkoutType: checkoutType
});

const payload = {
    merchantTransactionID: "123",
    customerFirstName: "John",
    customerLastName: "Doe",
    MSISDN: "+254207640437",
    customerEmail: "filenkoapriorit@gmail.com",
    requestAmount: "88",
    currencyCode: "KES",
    accountNumber: "10092019",
    serviceCode: serviceCode,
    dueDate: "2020-06-01 23:59:59",
    requestDescription: "Dummy merchant transaction",
    countryCode: "KE",
    languageCode: "en",
    successRedirectUrl: "http://10.100.5.28:8000/success",
    failRedirectUrl: "http://10.100.5.28:8000/fail",
    paymentWebhookUrl: "http://ar-diploma-work.de"
};

document.getElementById("tingg-express-checkout-button").addEventListener("click", async function () {

    let res = await fetch(encryptionURL, {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (res.ok) {         
        let json = await res.json(); 
        payload.accessKey = json.accessKey;
        payload.params = json.params;
    } else {
        console.log("HTTP-Error: " + res.status);
    }

    Tingg.renderCheckout({
        encryptionURL: encryptionURL,
        merchantProperties: payload,
        checkoutType: checkoutType
    })
});

document.getElementById("TransactionID").addEventListener("input", async function (e) {
    payload.merchantTransactionID = e.target.value;
});

document.getElementById("amount").addEventListener("input", async function (e) {
    payload.requestAmount = e.target.value;
});