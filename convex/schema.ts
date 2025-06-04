import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.float64(),
    img: v.string(),
  }),

  cart: defineTable({
    userId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
  }),
});
