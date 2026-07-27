// Shared constants for GHL-connected forms. See .claude/Rule/ghl-forms-webhooks.md
// for the source of these values and the payload contract.

// Original A2P consent labels — used by the primary Contact / Ask workflows
// and the shared SMS Opt-in workflow. Each checkbox maps to a discrete GHL
// field name (sms_updates + sms_promo). Do not rename these fields.
export const A2P_SMS_UPDATES_LABEL =
  'I agree to receive SMS updates from Northwest Oregon PAC regarding campaign updates, candidate announcements, fundraising updates, and important organizational news. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe or HELP for help.'

export const A2P_SMS_PROMO_LABEL =
  'I agree to receive promotional SMS messages from Northwest Oregon PAC, including fundraising requests, donation drives, and special promotions. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe or HELP for help.'

// Ask form category options — "What is your question about?"
export const ISSUE_CATEGORIES = [
  'The PAC and its mission',
  'Policy priorities',
  'Supported candidates',
  'Candidate support',
  'Running for office',
  'Events',
  'Contributions',
  'Media or interview request',
  'Website assistance',
  'Something else',
]
