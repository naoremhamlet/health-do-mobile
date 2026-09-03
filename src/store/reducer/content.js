import { createSlice } from '@reduxjs/toolkit'

const contentSlice = createSlice({
    name: 'content',
    initialState: {
        faqs: [
            {
                id: 1,
                question: "How long does delivery take?",
                answer: "Most orders arrive within 30-45 minutes, depending on your location and how busy the kitchen is. You'll see a live estimate as soon as you check out."
            },
            {
                id: 2,
                question: "Can I customize my bowl's ingredients?",
                answer: "Yes. On any product page, open 'Ingredients Customization' to add or remove items so the bowl fits your dietary needs."
            },
            {
                id: 3,
                question: "Is there a subscription plan?",
                answer: "Healthy+ membership is launching soon — it'll include free delivery and 10% off every order. You can preview it from your Profile tab."
            },
            {
                id: 4,
                question: "How do I cancel an order?",
                answer: "You can cancel free of charge within 2 minutes of placing it, from the Orders tab. After that, the kitchen has already started preparing it."
            },
            {
                id: 5,
                question: "What payment methods are accepted?",
                answer: "Credit/debit cards, UPI, and Cash on Delivery are all supported — pick whichever you prefer at checkout."
            },
            {
                id: 6,
                question: "Can I save more than one delivery address?",
                answer: "Yes — go to Profile > Address to add, edit, or remove as many saved addresses as you need, and choose one at checkout."
            },
            {
                id: 7,
                question: "How do I track an order?",
                answer: "Open Orders from your Profile tab for live status on anything active, plus full details on past orders."
            }
        ],
        privacy: {
            lastUpdated: "April 19, 2026",
            sections: [
                {
                    heading: "1. Data We Collect",
                    body: "We collect the essentials needed to get your food to you: your name, delivery address, and phone number. We also look at your browsing activity within the app so we can suggest bowls you're more likely to enjoy."
                },
                {
                    heading: "2. How We Use It",
                    body: "Your data is used to fulfil orders, keep the app running smoothly, and — only if you've opted in — to send you occasional offers."
                },
                {
                    heading: "3. Keeping It Secure",
                    body: "Sensitive data is protected with industry-standard encryption, and payments are handled entirely by secure third-party gateways (Razorpay/Stripe) — we never store your card details ourselves."
                }
            ]
        }
    },
    reducers: {}
})

export default contentSlice.reducer
