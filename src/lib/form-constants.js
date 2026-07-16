// Shared constants for GHL-connected forms. See .claude/Rule/ghl-forms-webhooks.md
// for the source of these values and the payload contract.

// A2P consent labels — required verbatim on every form that collects a phone
// number. Organization name adapted for this campaign.
export const A2P_SMS_UPDATES_LABEL =
  'By checking this box, I consent to receive campaign updates from Northwest Oregon PAC via automated text messages at the phone number provided. Message frequency may vary. Message and data rates may apply. Text STOP to opt out or HELP for help. View our Privacy Policy and Terms of Service.'

export const A2P_SMS_PROMO_LABEL =
  'By checking this box, I consent to receive promotional messages, event invitations, and fundraising communications from Northwest Oregon PAC via automated text messages. Message frequency may vary. Message and data rates may apply. Text STOP to opt out or HELP for help.'

// Volunteer form options — see rule spec.
export const OREGON_COUNTIES = [
  'Baker',
  'Benton',
  'Clackamas',
  'Clatsop',
  'Columbia',
  'Coos',
  'Crook',
  'Curry',
  'Deschutes',
  'Douglas',
  'Gilliam',
  'Grant',
  'Harney',
  'Hood River',
  'Jackson',
  'Jefferson',
  'Josephine',
  'Klamath',
  'Lake',
  'Lane',
  'Lincoln',
  'Linn',
  'Malheur',
  'Marion',
  'Morrow',
  'Multnomah',
  'Polk',
  'Sherman',
  'Tillamook',
  'Umatilla',
  'Union',
  'Wallowa',
  'Wasco',
  'Washington',
  'Wheeler',
  'Yamhill',
]

export const OREGON_REGIONS = [
  'Portland Metro',
  'Willamette Valley',
  'Oregon Coast',
  'Central Oregon',
  'Eastern Oregon',
  'Southern Oregon',
]

export const CAMPAIGN_EXPERIENCE_OPTIONS = [
  'None',
  'Some Volunteering',
  'Regular Volunteer',
  'Campaign Staff',
  'Campaign Management',
  'Elected/Appointed Office',
]

export const VOLUNTEER_HELP_OPTIONS = [
  'Host a Fundraiser',
  'Phone Banking',
  'Volunteer Coordination',
  'Digital/Social Media',
  'Door Knocking',
  'Host a Meet & Greet',
  'Event Planning',
  'Media',
]

export const AVAILABILITY_OPTIONS = [
  '1-2 hours/week',
  '3-5 hours/week',
  '5-10 hours/week',
  '10-20 hours/week',
  'Full-time',
  'Remote Help Only',
]

export const HELP_FREQUENCY_OPTIONS = [
  'One-time opportunity',
  'Occasionally',
  'A few hours each month',
  'Regularly during election season',
  'Not sure yet',
]

export const VOLUNTEER_ACKNOWLEDGMENT_LABEL =
  'I understand that submitting this form expresses interest and does not guarantee a specific volunteer assignment.'

export const VOLUNTEER_EMAIL_CONSENT_LABEL =
  'I agree to receive volunteer and organizational updates from Northwest Oregon PAC.'

// Ask form category options — "What is your question about?"
export const ISSUE_CATEGORIES = [
  'The PAC and its mission',
  'Policy priorities',
  'Supported candidates',
  'Candidate support',
  'Running for office',
  'Volunteering',
  'Events',
  'Contributions',
  'Media or interview request',
  'Website assistance',
  'Something else',
]
