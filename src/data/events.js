export const events = [
  {
    slug: 'town-hall-cost-of-living-ca-14',
    day: '24',
    month: 'MAY',
    date: 'May 24, 2026',
    title: 'Town Hall: Cost of Living in CA-14',
    when: 'Saturday · 10:00 AM',
    where: 'Oakwood Community Center',
    address: '1240 Civic Way, Oakwood, CA 94601',
    type: 'Town Hall',
    excerpt:
      'Morgan answers your questions on housing, healthcare, and the cost of living. Bring your neighbors — coffee is on us.',
    image:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80',
    schedule: [
      ['9:30 AM', 'Doors open · coffee + light breakfast'],
      ['10:00 AM', 'Welcome from local organizers'],
      ['10:15 AM', 'Morgan delivers opening remarks'],
      ['10:45 AM', 'Q&A with the audience'],
      ['12:00 PM', 'Closing & volunteer signup'],
    ],
  },
  {
    slug: 'volunteer-canvass-launch',
    day: '31',
    month: 'MAY',
    date: 'May 31, 2026',
    title: 'Volunteer Canvass Launch',
    when: 'Saturday · 9:30 AM',
    where: 'Field HQ · Riverside Ave',
    address: '412 Riverside Ave, Oakwood, CA 94602',
    type: 'Field',
    excerpt:
      'Kick off our biggest weekend of door-knocking yet. Training provided. Materials provided. Snacks provided.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    schedule: [
      ['9:30 AM', 'Coffee + training huddle'],
      ['10:00 AM', 'Walk packets handed out'],
      ['10:30 AM', 'Canvassers hit the doors'],
      ['1:00 PM', 'Lunch back at HQ + debrief'],
    ],
  },
  {
    slug: 'climate-and-jobs-roundtable',
    day: '07',
    month: 'JUN',
    date: 'June 7, 2026',
    title: 'Climate & Jobs Roundtable',
    when: 'Saturday · 1:00 PM',
    where: 'Solartech Workshop, Bayview',
    address: '88 Industrial Pkwy, Bayview, CA 94604',
    type: 'Policy',
    excerpt:
      'A working conversation with union leaders, clean-energy entrepreneurs, and community organizers on building the jobs of the next decade.',
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80',
    schedule: [
      ['1:00 PM', 'Welcome from Solartech'],
      ['1:15 PM', 'Panel discussion'],
      ['2:30 PM', 'Q&A with attendees'],
      ['3:30 PM', 'Networking + tour of the shop'],
    ],
  },
  {
    slug: 'coffee-with-morgan-pinegrove',
    day: '14',
    month: 'JUN',
    date: 'June 14, 2026',
    title: 'Coffee with Morgan',
    when: 'Saturday · 8:30 AM',
    where: 'Daybreak Café, Pinegrove',
    address: '201 Main St, Pinegrove, CA 94605',
    type: 'Meet & Greet',
    excerpt:
      'An intimate morning conversation over coffee. Bring your hopes, your questions, your ideas — Morgan brings the listening.',
    image:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80',
    schedule: [
      ['8:30 AM', 'Coffee + pastries on the house'],
      ['9:00 AM', 'Morgan joins the conversation'],
      ['10:00 AM', 'Open mic — your questions'],
      ['10:30 AM', 'Wrap & volunteer signup'],
    ],
  },
]

export function getEvent(slug) {
  return events.find((e) => e.slug === slug)
}
