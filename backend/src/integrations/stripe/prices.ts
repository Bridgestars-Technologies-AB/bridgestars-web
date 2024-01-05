type StripeResource = {
  name: string;
  priceId: string;
}

export type Product = StripeResource;

export type Plan = StripeResource; 


export const PREMIUM_PLAN = {
  name: "premium",
  priceId: "price_1O00WeLLMIdX4WQ7iAunsTQy",
} as Plan 

export const PLANS = {
  premium: PREMIUM_PLAN,
}
