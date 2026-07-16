const GHL_BASE_URL = 'https://services.leadconnectorhq.com'
const GHL_API_KEY = process.env.GHL_API_KEY
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID

const headers = {
  Authorization: `Bearer ${GHL_API_KEY}`,
  Version: '2021-07-28',
  Accept: 'application/json',
}

const EVENTS_SCHEMA_KEY = 'custom_objects.events'

const TIME_LABELS = {
  '600_am': '6:00 AM',
  '630_am': '6:30 AM',
  '700_am': '7:00 AM',
  '730_am': '7:30 AM',
  '800_am': '8:00 AM',
  '830_am': '8:30 AM',
  '900_am': '9:00 AM',
  '930_am': '9:30 AM',
  '1000_am': '10:00 AM',
  '1030_am': '10:30 AM',
  '1100_am': '11:00 AM',
  '1130_am': '11:30 AM',
  '1200_pm': '12:00 PM',
  '1230_pm': '12:30 PM',
  '100_pm': '1:00 PM',
  '130_pm': '1:30 PM',
  '200_pm': '2:00 PM',
  '230_pm': '2:30 PM',
  '300_pm': '3:00 PM',
  '330_pm': '3:30 PM',
  '400_pm': '4:00 PM',
  '430_pm': '4:30 PM',
  '500_pm': '5:00 PM',
  '530_pm': '5:30 PM',
  '600_pm': '6:00 PM',
  '630_pm': '6:30 PM',
  '700_pm': '7:00 PM',
  '730_pm': '7:30 PM',
  '800_pm': '8:00 PM',
  '830_pm': '8:30 PM',
  '900_pm': '9:00 PM',
}

const CATEGORY_LABELS = {
  rally: 'Rally',
  town_hall: 'Town Hall',
  fundraiser: 'Fundraiser',
  debate: 'Debate',
  press_conference: 'Press Conference',
  community_meetup: 'Community Meetup',
  volunteer_drive: 'Volunteer Drive',
  doortodoor_campaign: 'Door-to-Door Campaign',
  victory_celebration: 'Victory Celebration',
  protest__march: 'Protest / March',
  other: 'Other',
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const parseDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null
  const d = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(d.getTime())) return null
  return {
    month: MONTH_ABBR[d.getMonth()],
    day: String(d.getDate()).padStart(2, '0'),
    year: String(d.getFullYear()),
    raw: dateStr,
  }
}

const normalizeEvent = (record) => {
  const props = record?.properties ?? {}
  // GHL uses event_start_date/event_start_time in this location. The rule spec
  // listed event_date/select_time — fall back to those if a future schema swap
  // reintroduces them so we degrade gracefully rather than break.
  const startDateRaw = props.event_start_date ?? props.event_date
  const endDateRaw = props.event_end_date
  const timeSlug = props.event_start_time ?? props.select_time
  const endTimeSlug = props.event_end_time ?? props.end_time
  const categorySlug = props.event_category
  const imageArr = Array.isArray(props.event_image) ? props.event_image : []
  const firstImage = imageArr[0]?.url

  return {
    id: record?.id ?? '',
    title: props.event_name ?? '',
    description: props.event_description ?? '',
    date: parseDate(startDateRaw) ?? { month: '', day: '', year: '', raw: '' },
    endDate: parseDate(endDateRaw),
    time: TIME_LABELS[timeSlug] ?? timeSlug ?? '',
    endTime: TIME_LABELS[endTimeSlug] ?? endTimeSlug ?? '',
    location: props.event_location ?? '',
    address: props.event_location ?? '',
    image: firstImage || '/placeholder-event.svg',
    type: CATEGORY_LABELS[categorySlug] ?? categorySlug ?? '',
    source: 'ghl',
  }
}

const todayMidnight = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const effectiveEndDate = (event) => {
  // Prefer end date, fall back to start date. If neither parses, treat as
  // undated so the caller decides whether to drop or keep.
  const raw = event.endDate?.raw || event.date?.raw
  if (!raw) return null
  const d = new Date(`${raw}T00:00:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

const effectiveStartDate = (event) => {
  const raw = event.date?.raw || event.endDate?.raw
  if (!raw) return null
  const d = new Date(`${raw}T00:00:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

export const fetchGHLEvents = async () => {
  try {
    const res = await fetch(`${GHL_BASE_URL}/objects/${EVENTS_SCHEMA_KEY}/records/search`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        page: 1,
        pageLimit: 50,
        query: '',
        searchAfter: [],
      }),
      next: { revalidate: 60 },
    })

    if (!res.ok) return []

    const data = await res.json()
    const records = data.records ?? []
    const today = todayMidnight()

    return records
      .map(normalizeEvent)
      .filter((e) => {
        const end = effectiveEndDate(e)
        // Drop undated records — they can't be scheduled.
        if (!end) return false
        // Keep events that end today or later.
        return end.getTime() >= today.getTime()
      })
      .sort((a, b) => {
        const sa = effectiveStartDate(a)?.getTime() ?? Infinity
        const sb = effectiveStartDate(b)?.getTime() ?? Infinity
        return sa - sb
      })
  } catch {
    return []
  }
}

export const fetchGHLEvent = async (eventId) => {
  try {
    const res = await fetch(
      `${GHL_BASE_URL}/objects/${EVENTS_SCHEMA_KEY}/records/${eventId}`,
      { headers, next: { revalidate: 60 } },
    )

    if (!res.ok) return null

    const data = await res.json()
    const record = data.record ?? data
    if (!record?.id && !record?.properties) return null

    return normalizeEvent(record)
  } catch {
    return null
  }
}
