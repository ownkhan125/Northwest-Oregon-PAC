// Blog posts — dummy editorial content in the brand voice.
// Each post's `body` is an ordered list of blocks:
//   { type: 'heading', level: 2|3, id, text }
//   { type: 'paragraph', text }
//   { type: 'image', src, alt, caption? }
//   { type: 'quote', text, cite? }
// H2 + H3 headings are surfaced in the article TOC and get IDs
// so the scroll-spy can highlight the active section.

const img = (seed, w = 1600, h = 1000) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const blogCategories = ['Policy', 'Endorsements', 'Community', 'Field notes']

export const blogPosts = [
  {
    slug: 'reliable-first-energy-oregon',
    title: 'What reliable-first energy policy looks like in Oregon',
    excerpt:
      'The grid we inherited assumes cheap baseload and predictable weather. Neither still holds. Here is what a common-sense fix looks like for Northwest Oregon.',
    category: 'Policy',
    author: 'Cynthia Sawyer',
    authorRole: 'Program Director',
    date: '2026-06-18',
    readingMinutes: 7,
    heroImage: img('nwop-energy-hero'),
    heroAlt: 'Power transmission lines running through an evergreen valley at dusk.',
    body: [
      {
        type: 'paragraph',
        text: 'Ask a Portland grandmother what she thinks about the grid and she will not talk about megawatts. She will talk about the June afternoon her home lost power for eleven hours, the freezer she had to empty, and the second-story bedroom that stayed at eighty-nine degrees until well past midnight. That is the honest starting point for any energy conversation in Oregon: not a slide deck, but a house.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'grid-starts-at-home',
        text: 'The grid problem starts at home',
      },
      {
        type: 'paragraph',
        text: 'Our regional grid was designed for a very different Oregon. Baseload came from a mix of hydro and gas that ran predictably in every season. Peak demand followed a curve you could set your watch to. Neither assumption still holds. Hotter summers push cooling load into hours the system was never sized for, and hydro output is now shaped by a snowpack that arrives later and leaves faster than the operating plans assume.',
      },
      {
        type: 'paragraph',
        text: 'None of that is controversial. Any utility engineer in the region will describe the same picture. The controversial part is what to do about it, and that is where our PAC has spent the last six months listening to families, small business owners, and line workers up and down the valley.',
      },
      {
        type: 'quote',
        text: 'Reliability is a policy choice. When we stop treating it as an assumption, we start funding it as a priority.',
        cite: 'Northwest Oregon PAC energy working group',
      },
      {
        type: 'heading',
        level: 2,
        id: 'reliable-first',
        text: 'Reliable-first, not ideology-first',
      },
      {
        type: 'paragraph',
        text: 'A reliable-first energy policy does not pit clean generation against dispatchable generation. It orders them. Keep the lights on first, decarbonize on a schedule the grid can actually accept, and stop pretending those two goals are the same sentence.',
      },
      {
        type: 'heading',
        level: 3,
        id: 'what-the-grid-needs',
        text: 'What the grid actually needs',
      },
      {
        type: 'paragraph',
        text: 'Three things, in order. First, firm capacity that can be dispatched in the window between five and nine on a hot evening. Second, transmission that can move power from where it is generated to where it is consumed without the twelve-year permitting cycle we currently accept as normal. Third, storage — not as a talking point, but as a line item in a rate case with a defensible business model.',
      },
      {
        type: 'image',
        src: img('nwop-substation'),
        alt: 'A rural substation ringed by fir trees, low afternoon sun.',
        caption: 'Reliability lives here — not in policy statements.',
      },
      {
        type: 'heading',
        level: 3,
        id: 'where-the-capital-comes-from',
        text: 'Where the capital comes from',
      },
      {
        type: 'paragraph',
        text: 'Capital for the grid comes from ratepayers, from federal cost-share programs, and from private developers who need a predictable permitting environment to underwrite a twenty-year asset. All three sources are constrained today, and the constraint is usually political rather than financial. Fixing that is squarely a state-legislature problem, which is why we care who represents Northwest Oregon in Salem.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'three-year-path',
        text: 'A three-year path for Northwest Oregon',
      },
      {
        type: 'paragraph',
        text: 'We are not asking for a moonshot. We are asking for three things a state legislator can concretely support: a permitting timeline the courts respect, an interconnection queue with a real service-level commitment, and a rate structure that lets utilities recover the cost of firming capacity without waiting a decade for the outcome of a contested case.',
      },
      {
        type: 'paragraph',
        text: 'Each of those is a normal legislative product. Each has been solved in other states without abandoning environmental goals. The question is whether Northwest Oregon has the political representation willing to do the unglamorous work of writing the enabling statutes.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'ask-your-representative',
        text: 'What to ask your representative',
      },
      {
        type: 'paragraph',
        text: 'When you get the chance to ask a candidate about energy, skip the mission statement. Ask them what the interconnection queue looks like in their proposed bill. Ask them how many months a well-sited transmission upgrade should take from application to shovel. Ask them how ratepayers are protected during the transition. Those are the answers that separate a reliable-first legislator from a reliable-sounding one.',
      },
    ],
  },
  {
    slug: 'how-we-pick-candidates-2026',
    title: 'How we’re picking the candidates we back in 2026',
    excerpt:
      'A written record of the questions we ask, the answers that move us, and the specific tests a candidate has to pass before Northwest Oregon PAC endorses them.',
    category: 'Endorsements',
    author: 'Christina Buehler',
    authorRole: 'Board member',
    date: '2026-06-05',
    readingMinutes: 5,
    heroImage: img('nwop-endorsements-hero'),
    heroAlt: 'An empty conference room lit by low afternoon sun through tall windows.',
    body: [
      {
        type: 'paragraph',
        text: 'Endorsements have become a strange currency. National groups issue them by the dozen, most voters ignore them, and the ones that still carry weight tend to come from local operations that everyone knows put in the work. We would like to be one of those operations. This piece is our written record of how we get there.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'the-bar',
        text: 'The bar we set',
      },
      {
        type: 'paragraph',
        text: 'A Northwest Oregon PAC endorsement means we have done four things: interviewed the candidate for at least an hour, spoken to three references outside the candidate’s inner circle, read the last three public statements the candidate has made on our five priority issues, and confirmed the campaign has the operational capacity to accept the resources we would provide. If any of those steps fails, we do not endorse. It is that simple, and we intend to keep it that way.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'interview-process',
        text: 'The interview process',
      },
      {
        type: 'paragraph',
        text: 'The interview is not a quiz. We are not scoring candidates against a policy checklist. We are trying to learn how they think when they are asked a question they were not expecting, and whether the answer they give in a private room matches the answer they would give at a town hall the next night.',
      },
      {
        type: 'heading',
        level: 3,
        id: 'what-we-ask',
        text: 'What we ask',
      },
      {
        type: 'paragraph',
        text: 'The questions rotate but the categories stay constant. We ask about the last time the candidate changed their mind on a policy question and what caused the shift. We ask about the last constituent case that took more than three touches to close. We ask about a specific line item in their district’s budget and how they would defend it to a skeptical neighbor. Concrete beats abstract every time.',
      },
      {
        type: 'image',
        src: img('nwop-interview-room'),
        alt: 'A round wooden table with two chairs and a legal pad, morning light.',
        caption: 'An hour, a legal pad, and no consultants in the room.',
      },
      {
        type: 'heading',
        level: 3,
        id: 'what-we-listen-for',
        text: 'What we listen for',
      },
      {
        type: 'paragraph',
        text: 'Three signals tend to correlate with the candidates who go on to serve well. First, they name specific staff members and specific mistakes when they talk about their prior work. Second, they can describe the interest groups they disagree with in language those groups would recognize. Third, they treat the interview as a conversation rather than an audition, which usually means they have already done the same work with the other groups they are asking for support.',
      },
      {
        type: 'quote',
        text: 'We are not endorsing a platform. We are endorsing a person who will have to say hard things to people who trusted them.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'after-the-endorsement',
        text: 'What comes after the endorsement',
      },
      {
        type: 'paragraph',
        text: 'The endorsement is the beginning of the relationship, not the finish line. We commit to a follow-up conversation every quarter of the campaign, a debrief within two weeks of the election regardless of outcome, and a written note to the candidate identifying what we learned about our own process from working with them. Candidates who make it through the interview should expect a real partnership, not a press release.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'nominate-someone',
        text: 'How to nominate someone',
      },
      {
        type: 'paragraph',
        text: 'If you know a Northwest Oregon resident who is thinking about running — for a school board, a city council, a state house seat, or higher — send us their name. We will reach out, explain the process, and only move forward if they want us to. The people who make the best candidates are almost never the ones nominating themselves.',
      },
    ],
  },
  {
    slug: 'zip-code-and-your-school',
    title: 'How your ZIP code shapes what your school actually teaches',
    excerpt:
      'The state sets the standards. The district decides what happens inside the classroom. That gap is bigger than most parents realize — and it is where the real fight for education quality is happening.',
    category: 'Community',
    author: 'Helen Heller',
    authorRole: 'Communications',
    date: '2026-05-22',
    readingMinutes: 8,
    heroImage: img('nwop-school-hero'),
    heroAlt: 'Empty elementary school hallway with lockers and afternoon light.',
    body: [
      {
        type: 'paragraph',
        text: 'Oregon publishes a set of curriculum standards. Every district in the state is nominally teaching to them. Sit in three classrooms across three ZIP codes on the same Tuesday morning, though, and you would be hard pressed to guess they were operating under the same framework. That divergence is not an accident, and understanding it is the first step toward doing anything about it.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'map-problem',
        text: 'The map problem',
      },
      {
        type: 'paragraph',
        text: 'Oregon delegates enormous discretion to local districts. The standards are a floor, not a ceiling. What that means in practice is that a family that moves ten miles down the interstate may find their fourth-grader learning a different reading curriculum, using a different math sequence, and being assessed against a different set of benchmarks than the school they left behind. This is not hidden. It is simply not talked about.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'curriculum-by-district',
        text: 'Curriculum by district, not by state',
      },
      {
        type: 'paragraph',
        text: 'The formal legal framework grants districts the authority to adopt curriculum materials from an approved list, to design pacing guides that reflect local priorities, and to make hundreds of implementation choices that add up to what a child actually experiences in a classroom. In theory, this preserves local control. In practice, it means the quality gap between well-run districts and struggling ones widens every year.',
      },
      {
        type: 'heading',
        level: 3,
        id: 'where-discretion-lives',
        text: 'Where the discretion lives',
      },
      {
        type: 'paragraph',
        text: 'Three decisions matter more than the rest. First, the choice of adopted instructional materials, which happens on a rolling schedule and is set by district boards that most residents have never met. Second, the interpretation of the state assessment results, which determines what gets triaged for intervention and what gets ignored. Third, the hiring and retention of principals, which is the single largest predictor of what teaching looks like inside a given building.',
      },
      {
        type: 'image',
        src: img('nwop-school-board'),
        alt: 'An empty auditorium with rows of folding chairs facing a raised dais.',
        caption: 'School board meetings decide more than most parents realize.',
      },
      {
        type: 'heading',
        level: 3,
        id: 'what-ends-up-in-classroom',
        text: 'What ends up in the classroom',
      },
      {
        type: 'paragraph',
        text: 'Once those three decisions are made, teachers execute them within the constraints of the building they inherit. A talented teacher can partly compensate for weak materials or an absent principal. Very few can compensate for both at once, and asking them to try is why so many veteran educators are leaving the profession in the middle of otherwise successful careers.',
      },
      {
        type: 'quote',
        text: 'Local control was never meant to be a synonym for local silence. If we want the discretion, we have to do the oversight.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'practical-steps',
        text: 'Practical steps for parents this fall',
      },
      {
        type: 'paragraph',
        text: 'You do not have to run for the school board to influence what happens in your child’s classroom, though we would love it if you did. Three habits change more than most parents realize. Read the adopted materials list for your district each spring. Attend the board meeting where the annual assessment data is presented, and ask one specific question about your building. Introduce yourself to your principal in September, in person, and again in February.',
      },
      {
        type: 'paragraph',
        text: 'None of that is glamorous. All of it is the work that separates a district that improves from one that drifts. The parents who do it are usually the same ones the district ends up asking for help two years later when a hard decision has to be made publicly.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'what-were-asking',
        text: 'What we’re asking the district for',
      },
      {
        type: 'paragraph',
        text: 'On behalf of the families we have been talking to across Northwest Oregon, we are asking three things of the districts in our region. Publish the adopted materials list in one place, in plain English, at the start of each school year. Present assessment results at the building level, not just the district level, in a format a working parent can actually read. Commit to a written response to every substantive public comment made at a board meeting within thirty days. None of those requests cost money. All of them would move the region forward.',
      },
    ],
  },
]

export function getBlogBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null
}

export function getBlogNeighbors(slug) {
  const idx = blogPosts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? blogPosts[idx - 1] : null,
    next: idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null,
  }
}

export function getRelatedBlogs(slug, limit = 2) {
  const current = getBlogBySlug(slug)
  if (!current) return []
  const others = blogPosts.filter((p) => p.slug !== slug)
  const sameCategory = others.filter((p) => p.category === current.category)
  const rest = others.filter((p) => p.category !== current.category)
  return [...sameCategory, ...rest].slice(0, limit)
}

export function tocFromBody(body) {
  return body
    .filter((b) => b.type === 'heading' && b.id && (b.level === 2 || b.level === 3))
    .map((b) => ({ id: b.id, level: b.level, text: b.text }))
}

export function formatBlogDate(iso) {
  try {
    return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}
