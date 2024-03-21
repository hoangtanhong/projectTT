
import React, { useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import axios from "axios";

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: '#fce883'},
            "::placeholder": { color: '#87bbfd' }

        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

function PaymentForm () {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const [error, paymentMethod] = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const res = await axios.post('http://localhost:40001/payment', {
                    amount: 1000,
                    id
                })
                
                if (res.data.success) {
                    console.log("successful payment")
                    setSuccess(true)
                }

            } catch (e) {
                console.log("Error: ", e)
            }
        } else {
            console.log(error.message)
        }
    }



    return ( 
        <div>
            { !success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>

                    <button>Pay</button>
                </form>
                :
                <div>
                    <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
                </div>
            }

        </div>
     );
}

export default PaymentForm;