import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  uptimeMonitors: defineTable({
    url: v.string(),
    name: v.optional(v.string()),
    status: v.union(v.literal("up"), v.literal("down"), v.literal("pending")),
    lastChecked: v.optional(v.number()),
  }),
  uptimeLogs: defineTable({
    monitorId: v.id("uptimeMonitors"),
    status: v.union(v.literal("up"), v.literal("down")),
    timestamp: v.number(),
    responseTime: v.number(),
  }).index("by_monitor", ["monitorId"]),
});
