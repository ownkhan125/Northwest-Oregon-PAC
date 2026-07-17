// Northwest Oregon PAC — FAQ content.
// Sourced verbatim from the FAQ Page content document.
// Answers may be a string (plain paragraph) or an array of parts where each
// entry is either a string or an object { link, href } for an inline link.

export const faqs = [
  {
    q: 'Which areas do you serve?',
    a: 'Our work focuses on Northwest Oregon, supporting candidates and communities throughout the region while concentrating resources where they can have the greatest local impact.',
  },
  {
    q: 'How does the PAC support candidates?',
    a: 'Support may include fundraising, messaging, volunteer organization, voter outreach, and assistance building a stronger campaign operation.',
  },
  {
    q: 'Can I recommend someone for PAC support?',
    a: [
      'Yes. Use the question form and select ',
      { link: 'Candidate Support', href: '/ask?category=Candidate%20support' },
      '. Include the candidate’s name, office sought, district, campaign website if available, and the reason you believe the candidate should be considered.',
    ],
  },
  {
    q: 'How donations are used?',
    a: 'Contributions are pooled locally and invested in candidate support, fundraising, and messaging across Northwest Oregon. Federal and state law require us to collect the employer name and employer city/state for individual contributors, and we cannot accept contributions from foreign nationals',
  },
  {
    q: 'Can I contact the PAC about running for office?',
    a: [
      'Yes. Select ',
      { link: 'Run for Office', href: '/ask?category=Running%20for%20office' },
      ' in the form field. Tell us which office or community you are considering and what has motivated you to explore public service.',
    ],
  },
]
