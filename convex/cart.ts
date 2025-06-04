import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add product to cart
export const addToCart = mutation({
  args: {
    userId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("cart", {
      userId: args.userId,
      productId: args.productId,
      quantity: args.quantity,
    });
  },
});

// Get cart items for a user
export const getCart = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cart")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

// Remove from cart
export const removeFromCart = mutation({
  args: {
    id: v.id("cart"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
