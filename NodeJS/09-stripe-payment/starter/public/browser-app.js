const purchase = [
  { id: "1", name: "t-shirt", price: 1999 },
  { id: "2", name: "shoes", price: 4999 },
];
const total_amount = 10998; //espressi in cents
const shipping_fee = 1099;

//public key
var stripe = Stripe(
  "pk_test_51PW1X0RtIUvq3rl48v7svHPKLMpxHojDFVeIlNjw6EKUhXpfcj19gkcOFbVPp1zdqa7I7bxIVJE2gfiT2yySP4PL00lnp8fjO2"
);

// The items the customer wants to buy

// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;

//!eseguita ad ogni esecuzione di questo file
fetch("/stripe", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ purchase, total_amount, shipping_fee }),
}) //!questa then trasforma la risposta in json e la passa al then successivo
  .then(function (result) {
    return result.json();
  })
  .then(function (data) {
    var elements = stripe.elements();

    var style = {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };

    //creo l'elemento card
    var card = elements.create("card", { style: style });
    //monto l'elemento card su un elemento del DOM per renderlo visibile
    card.mount("#card-element");
    //!controllo in tempo reale dei dati della carta che vengono inseriti
    card.on("change", function (event) {
      //Disabilita il pulsante di invio dati finchè tutti campi non sono compilati
      document.querySelector("button").disabled = event.empty;
      //se event.error = true viene mostrato event.error.message altrimenti viene mostrata la stringa vuota (è comunque possibile premere il button anche se ci sono errori ma non se mancano dei cmapi)
      document.querySelector("#card-error").textContent = event.error
        ? event.error.message
        : "";
    });

    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      //!Complete payment when the submit button is clicked
      payWithCard(stripe, card, data.clientSecret);
      //card contiene i dati della carta inseriti dall'utente senza esporli lato client
      //clientSecret è un token creato dal server e inserito nella risposta per avere il permesso di completare il pagamento.
    });
  });

// chiamata a stripe.confirmCardPayment
// se card richiede l'autenticazione Stripe mostra un pop-up nel prompt dell'utente
// per inserire i dettagli dell'autenticazione senza lasciare la pagina
var payWithCard = function (stripe, card, clientSecret) {
  loading(true); //funzione loading definita sotto
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    })
    .then(function (result) {
      if (result.error) {
        // mostra l'errore  
        showError(result.error.message);
      } else {
        // pagamento confermato
        orderComplete(result.paymentIntent.id);
      }
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
var orderComplete = function (paymentIntentId) {
  loading(false);
  document
    .querySelector(".result-message a")
    .setAttribute(
      "href",
      "https://dashboard.stripe.com/test/payments/" + paymentIntentId
    );
  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("button").disabled = true; //disabilito il button per evitare ulterioti invii
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function () {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
var loading = function (isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};
