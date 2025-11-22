import { RateLimiterPrisma } from "rate-limiter-flexible";
import {prisma} from "./db";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 5;
const PRO_POINTS = 100;
const DURATION = 30 * 24 * 60 * 60; // 30 days
const GENERATION_COST = 1;

export async function getUsageTracker() {
  const { has } = await auth();
  const hasProAccess = has({ plan: "pro" });
  
  try {
    const usageTracker = new RateLimiterPrisma({
      storeClient: prisma,
      tableName: "Usage",
      points: hasProAccess ? PRO_POINTS : FREE_POINTS,
      duration: DURATION,
      execEvenly: false,
    });
    return usageTracker;
  } catch (err) {
    console.error("Error creating usage tracker:", err);
    throw err;
  }
}

export async function consumeCredits() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const usageTracker = await getUsageTracker();
    const result = await usageTracker.consume(userId, GENERATION_COST);
    return result;
  } catch (err: any) {
    console.error("Error consuming credits:", err);
    // If it's a rate limiter error about insufficient points
    if (err?.message?.includes("insufficient") || err?.status === 429) {
      const error = new Error("insufficient points");
      throw error;
    }
    throw err;
  }
}

export async function getUsageStatus() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  
  try {
    const usageTracker = await getUsageTracker();
    const result = await usageTracker.get(userId);
    return result;
  } catch (err) {
    console.error("Error getting usage status:", err);
    // Return null if user has not consumed any credits yet
    return null;
  }
}