import { featureFlagEvents } from "@/app/features/flags";
import { client } from "./schematic";

export async function checkFeatureUsageLimit(userId: string, eventSubType: string): Promise<{ success: boolean, error?: string }> {
  try {
    const entitlements = await client.entitlements.getFeatureUsageByCompany({
      keys: { id: userId }
    });
    const feature = entitlements.data.features.find((entitlement) => entitlement.feature?.eventSubtype === eventSubType)
    if(!feature) {
      return {
        success: false,
        error: 'This is feature is unavailable in the current plan'
      }
    }

    const { usage, allocation } = feature;
    if(!usage || !allocation) {
      return {
        success: false,
        error: 'System Error - Contact Support'
      }
    }

    const hasExceededUsageLimit = (usage >= allocation);
    if(!hasExceededUsageLimit) {
      const featureName = Object.entries(featureFlagEvents).find(([, value]) => value.event === eventSubType)?.[0] || eventSubType;
      return {
        success: false,
        error: `You have reached your ${featureName} usage limit!!`
      }
    }
;
    return { success: true };
  }
  catch(error) {
    console.error('Error checking feature usage limit: ', error);
    return {
      success: false,
      error: 'Error checking feature usage limit'
    }
  }
}