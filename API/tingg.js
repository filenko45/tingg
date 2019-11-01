//transaction params
const merchantTransactionID = "564453143513"; //random number
const requestAmount = 87;
const currencyCode = "KES";
const accountNumber = "10092019";
const dueDate = "2020-06-01 23:59:59";
const requestDescription = "Dummy merchant transaction";

//customer params
const customerPhone = "+254712345678";
const customerFirstName = "John";
const customerLastName = "Doe";
const customerEmail = "john.doe@example.com";
const countryCode = "KE";
const languageCode = "en";

const redirectUrl = "http://localhost:8000/";

const account = {
    secret: "8gfGxtrMcJpWRTN2",
    IV: "djmt3P7hB8QwNXzy",
    accessKey: "$2a$08$nXC./aX0OwofaVxVZMQDXeQogCGbYI0dh/EL08ecRi1g8vHms50W6",
    client_id: "3d5773b4-eb37-4575-a76f-23d50f480021",
    client_secret: "wFoulQSykaeow9pB9PCLX9GXZrmGFoTd98jOhSP6",
    serviceCode: "MYSDEV0684",
    clientCode: "MYBDEV2393"
}


const url = "https://beep2.cellulant.com:9212/checkout/v2/custom/";

const api = {
    oauth: "oauth/token",
    init: "requests/initiate",
    charge: 'requests/charge',
    status: 'requests/query-status',
    options: 'requests/options',
    ackn: 'requests/acknowledge'
}

let access_token = null;
let checkoutRequestID = null;
let paymentOptions = null;

async function getAuthToken() {
    const payload = {
        "grant_type": "client_credentials",
        "client_id": account.client_id,
        "client_secret": account.client_secret
    };

    let res = await fetch(url + api.oauth, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        })
        .catch(error => console.log(error));
    let json = await res.json();  
    console.log("Auth", json);
    access_token = json.access_token;
}

async function initiateRequest() {
    const payload = {
        merchantTransactionID,
        customerFirstName,
        customerLastName,
        "MSISDN": customerPhone,
        customerEmail,
        requestAmount,
        currencyCode,
        accountNumber,
        dueDate,
        requestDescription,
        countryCode,
        languageCode,
        "successRedirectUrl": redirectUrl,
        "failRedirectUrl": redirectUrl,
        "paymentWebhookUrl": redirectUrl,
        "serviceCode": account.serviceCode
    };

    let res = await fetch(url + api.init, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify(payload),
        })
        .catch(error => console.log(error));
    let json = await res.json();  

    console.log("initiateRequest", json);
    checkoutRequestID = json.results.checkoutRequestID;
    paymentOptions = json.results.paymentOptions;
}

async function chargeRequest() {
    payload = {
        merchantTransactionID,
        checkoutRequestID,
        "chargeMsisdn": customerPhone,
        "chargeAmount": requestAmount,
        "currencyCode": currencyCode,
        "payerModeID": paymentOptions[0].payerModeID,
        "languageCode": languageCode
    };

    let res = await fetch(url + api.charge, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify(payload),
        })
        .catch(error => console.log(error));
    let json = await res.json();  

    console.log("chargeRequest", json);
    chargeRequestID = json.results.checkoutRequestID;
    paymentInstructions = json.results.paymentInstructions;
}

async function checkRequestStatus() {
    payload = {
        merchantTransactionID,
        checkoutRequestID
    };

    let res = await fetch(url + api.status, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify(payload),
        })
        .catch(error => console.log(error));
    let json = await res.json();  

    console.log("checkRequestStatus", json);
}
// status codes:
// 129 Expired request. The checkout request expired with no payment made to it at the
// point of expiry. No further payments will be accepted for this request
// 130 New request. The checkout request has not been paid for and has not yet expired
// 177 Partially paid request. A payment made for request but the payment amount is
// less than the originally requested amount
// 178 Fully paid request. A payment made for request and the payment amount is
// equal or more than the originally requested amount
// 179 Expired partially paid request. A payment made for request but the payment
// amount is less than the originally requested amount and the request has expired
// 180 Payments for the checkout request have been acknowledged and rejected by
// merchant.
// 183 Payments for the checkout request have been acknowledged and accepted by
// merchant.

async function getPaymentOptions() {

    let res = await fetch(`${url}${api.options}?merchantTransactionID=${merchantTransactionID}&checkoutRequestID=${checkoutRequestID}`, {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + access_token
        },
        })
        .catch(error => console.log(error));
    let json = await res.json();  

    console.log("getPaymentOptions", json);
}


//Acknowledgment can only be done on a request that is fully paid and is not yet acknowledged
async function acknowledgePayment() {
    payload = {
        "statusCode": '183',
        "receiptNumber": 1,  //A transaction ID indicating the receipt of the payments
        "statusDescription": 'The payment was accepted by the merchant',
        checkoutRequestID,
        merchantTransactionID,
    }

    let res = await fetch(url + api.ackn, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify(payload),
        })
        .catch(error => console.log(error));
    let json = await res.json();  

    console.log("acknowledgePayment", json);
}