import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getMonitors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("uptimeMonitors").collect();
  },
});

export const addMonitor = mutation({
  args: { url: v.string(), name: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await ctx.db.insert("uptimeMonitors", {
      url: args.url,
      name: args.name,
      status: "pending",
    });
  },
});

export const getLogs = query({
  args: { monitorId: v.id("uptimeMonitors") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("uptimeLogs")
      .withIndex("by_monitor", (q) => q.eq("monitorId", args.monitorId))
      .order("desc")
      .take(50);
  },
});
