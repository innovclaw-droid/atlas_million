import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

export const PLANS = {
  COURSE_ONLY: {
    name: "Course Only",
    price: 49700, // $497
    description: "All 8 modules, 40+ video lessons, templates & prompts, lifetime access",
  },
  COURSE_COMMUNITY: {
    name: "Course + Community",
    price: 49700, // $497 one-time + $49/mo
    monthlyPrice: 4900,
    description: "Everything in Course Only + private community, weekly office hours, monthly templates",
  },
  PREMIUM: {
    name: "Premium Bundle",
    price: 69700, // $697 one-time + $49/mo
    monthlyPrice: 4900,
    description: "Everything + full prompt marketplace access, 1-on-1 AI setup call, custom GPT",
  },
} as const;
