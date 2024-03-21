
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from './PaymentForm'

const PUBLIC_KEY = 'pk_test_51Owb2KJlIu71PUx8vuBDP7HcKwtsMJ1j1guLkXYuEl7U3wPMiVawZWsFUCx7pZKf1Zeq1lDXMzynSGQpCGIv3kYN00czzZhtrw'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

function StripeContainer() {
    return ( 
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />

        </Elements> 
    );
}

export default StripeContainer;