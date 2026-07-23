// Content plan for the Northwest Oregon PAC social library.
// EVERY user-facing string is copied verbatim from the client's
// PDF calendar ("NW - SM Calendar"). Do not paraphrase — the PDF is
// the single source of truth.

import { pac } from '../../src/data/pac.js'

export const DOMAIN = 'northwestoregon.com'
export const FILING = `Committee #${pac.pacId} · Est. ${pac.foundedYear}`
export const PAID_FOR = pac.disclaimers.paidFor.replace(/\.$/, '')

// Icon shorthand for the five PAC priorities, still used by the
// existing site iconography.
export const PRIORITY_META = {
  '01': { icon: 'skyline', short: 'Economic Prosperity & Small Business' },
  '02': { icon: 'balance', short: 'Government Accountability & Fiscal Responsibility' },
  '03': { icon: 'shield', short: 'Public Safety & Quality of Life' },
  '04': { icon: 'certificate', short: 'Education & Workforce Development' },
  '05': { icon: 'energy', short: 'Affordable, Reliable Energy' },
}

export const CANDIDATE_PHOTOS = {
  'mark-norman': 'mark-norman.jpg',
  'brian-schimmel': 'brian-schimmel.jpg',
  'barbara-kahl': 'barbara-kahl.jpg',
  'ciatta-thompson': 'ciatta-thompson.jpg',
  'randall-fryer': 'randall-fryer.jpg',
}

// Shared photography we already have on disk. Each post reuses one of
// these in a way that fits the specific message — cinematic drone,
// downtown/community, farm/forest, or working-hands documentary — and
// the templates layer editorial gradients/depth over them.
const IMG = {
  region: 'banner.jpg', // wide regional / drone
  community: 'hero.jpg', // people-first community
  working: 'who-we-are.jpg', // volunteers / doorstep
}

/* -------------------------------------------------------------------
   FEED — 60 posts, 1080×1080
   Content matches the PDF's STATIC POSTS #1–60 verbatim.
------------------------------------------------------------------- */
export const feed = [
  /* --------------------------------------------------------
     FEED 01 — A Stronger Voice for Northwest Oregon
     Creative direction: quarterly cover. Cinematic Oregon
     photograph on the top 60%, cream editorial plate below
     with issue flag, serif headline, and value ribbon.
  -------------------------------------------------------- */
  {
    id: 'feed-01-hero',
    tag: 'Introduction',
    title: 'A Stronger Voice for Northwest Oregon',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Northwest Oregon deserves leaders who listen, communities that thrive, and policies that put people first.\n\nNorthwest Oregon PAC exists to support candidates, strengthen local campaigns, and build lasting political infrastructure across our region.\n\nThis is not about one election. It's about creating a stronger future for Northwest Oregon.\n\nFollow along as we introduce the candidates, issues, and ideas shaping our communities.\n\n#NorthwestOregon #NorthwestOregonPAC #OregonPolitics #CommunityLeadership #Prosperity #Accountability #Opportunity #Leadership",
    data: {
      css: `
        .f01 { position:absolute; inset:0; z-index:10; display:flex; flex-direction:column; background:#f6f2e8; }
        .f01-photo { position:relative; height:60%; overflow:hidden; background:#0f1a13; }
        .f01-photo img { width:100%; height:100%; object-fit:cover; filter:saturate(.72) contrast(1.18) brightness(.86); }
        .f01-photo::after {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(110% 90% at 25% 15%, rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 100%),
            linear-gradient(180deg, rgba(15,26,19,.08) 0%, rgba(15,26,19,.32) 55%, rgba(15,26,19,.85) 100%);
        }
        .f01-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:20px; color:#e5dfcc; font-family:var(--font-mono); font-size:18px; letter-spacing:.36em; text-transform:uppercase; text-shadow:0 2px 20px rgba(0,0,0,.5); }
        .f01-mast img { height:66px; width:auto; filter:drop-shadow(0 2px 22px rgba(0,0,0,.5)); }
        .f01-photo-label { position:absolute; left:76px; bottom:52px; z-index:5; display:flex; align-items:baseline; gap:22px; color:#e5dfcc; text-shadow:0 2px 22px rgba(0,0,0,.55); }
        .f01-photo-label .kick { font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase; opacity:.9; }
        .f01-photo-label .place { font-family:var(--font-display); font-style:italic; font-size:34px; letter-spacing:-.01em; }
        .f01-flag {
          position:absolute; z-index:7; top:60%; right:70px; transform:translateY(-50%);
          padding:22px 28px 24px; background:#2e4538; color:#f6f2e8;
          font-family:var(--font-display); text-align:center;
          box-shadow:0 20px 46px -18px rgba(0,0,0,.55);
        }
        .f01-flag .no { display:block; font-size:64px; font-weight:500; font-style:italic; line-height:1; letter-spacing:-.02em; color:#e0d6bc; }
        .f01-flag .label { display:block; margin-top:6px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(246,242,232,.85); }
        /* Cream page */
        .f01-page { position:relative; flex:1; padding:44px 76px 130px; display:flex; flex-direction:column; gap:26px; }
        .f01-page::before { content:''; position:absolute; top:16px; left:76px; right:76px; height:1px; background:linear-gradient(90deg, rgba(46,69,56,.5), rgba(46,69,56,0)); }
        .f01-issue { display:flex; align-items:baseline; gap:20px; font-family:var(--font-mono); font-size:18px; letter-spacing:.42em; text-transform:uppercase; color:#4b6252; }
        .f01-issue .em { font-family:var(--font-display); font-style:italic; font-size:36px; letter-spacing:-.02em; color:#2e4538; text-transform:none; }
        .f01-issue .rule { display:inline-block; width:44px; height:1px; background:#4b6252; opacity:.6; }
        .f01-head { font-family:var(--font-display); font-weight:500; font-size:82px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; max-width:940px; }
        .f01-head em { font-style:italic; color:#5a7060; }
        .f01-values {
          margin-top:auto; padding-top:22px; border-top:1.5px solid rgba(46,69,56,.35);
          display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px;
        }
        .f01-values .v { display:flex; flex-direction:column; gap:4px; }
        .f01-values .v .n { font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f01-values .v .w { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:38px; letter-spacing:-.015em; color:#2e4538; line-height:1; }
        .f01-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.6); }
      `,
      body: (ctx) => `
        <div class="f01">
          <div class="f01-photo">
            <img src="${ctx.prefix}img/banner.jpg" alt="Northwest Oregon" />
            <div class="f01-mast">
              <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
              <span>Vol. 01 · The Region</span>
            </div>
            <div class="f01-photo-label">
              <span class="kick">— Cover story</span>
              <span class="place">A stronger voice.</span>
            </div>
          </div>
          <div class="f01-flag">
            <span class="no">01</span>
            <span class="label">The Manifesto</span>
          </div>
          <div class="f01-page">
            <div class="f01-issue"><span class="em">No. 01</span><span class="rule"></span><span>Northwest Oregon</span></div>
            <h1 class="f01-head">A Stronger Voice for <em>Northwest Oregon.</em></h1>
            <div class="f01-values">
              <div class="v"><span class="n">— i.</span><span class="w">Prosperity</span></div>
              <div class="v"><span class="n">— ii.</span><span class="w">Accountability</span></div>
              <div class="v"><span class="n">— iii.</span><span class="w">Opportunity</span></div>
            </div>
            <div class="f01-foot">
              <span>Paid for by Northwest Oregon PAC · #25045</span>
              <span>northwestoregon.com</span>
            </div>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 02 — Our Region. Our Voice.
     Creative direction: regional atlas plate. Stylized
     Northwest Oregon coast outline, five town markers with
     editorial labels, serif title lockup left-aligned.
  -------------------------------------------------------- */
  {
    id: 'feed-02-region-voice',
    tag: 'Introduction',
    title: 'Our Region. Our Voice.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "For too long, many Northwest Oregon communities have felt overlooked during election season.\n\nWe believe every community deserves competitive candidates, meaningful conversations, and leaders who understand local priorities.\n\nThat's why we're building something that lasts beyond Election Day.\n\nWhere do you call home? Tell us in the comments.\n\n#NorthwestOregon #CommunityFirst #Oregon #VoteLocal #StrongerTogether",
    data: {
      css: `
        .f02 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.6) 0%, transparent 55%),
            linear-gradient(180deg, #efe6cd 0%, #d9c99e 100%);
          color:#2e4538;
        }
        .f02::before {
          content:''; position:absolute; inset:0; opacity:.35; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .f02-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f02-mast img { height:56px; width:auto; }
        /* Left title lockup */
        .f02-title { position:absolute; top:190px; left:76px; right:520px; z-index:6; }
        .f02-title .kick { font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f02-title .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f02-title .head { margin-top:22px; font-family:var(--font-display); font-weight:500; font-size:104px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f02-title .head em { font-style:italic; color:#5a7060; display:block; }
        /* Atlas plate on right */
        .f02-atlas { position:absolute; top:150px; right:70px; z-index:5; width:440px; height:520px; padding:24px 26px; background:rgba(246,242,232,.7); border:1.5px solid rgba(46,69,56,.35); box-shadow:0 24px 60px -32px rgba(46,69,56,.4); }
        .f02-atlas::before { content:''; position:absolute; inset:8px; border:1px solid rgba(46,69,56,.28); pointer-events:none; }
        .f02-atlas .head { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:10px; border-bottom:1px solid rgba(46,69,56,.4); font-family:var(--font-mono); font-size:11px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f02-atlas .head .n { font-family:var(--font-display); font-style:italic; font-size:18px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f02-atlas svg { display:block; margin:12px auto; width:100%; height:280px; color:#2e4538; }
        .f02-atlas .marker { fill:#5a7060; }
        .f02-atlas .towns { margin-top:6px; display:grid; grid-template-columns:1fr 1fr; gap:6px 14px; font-family:var(--font-mono); font-size:11px; letter-spacing:.34em; text-transform:uppercase; color:rgba(46,69,56,.75); }
        .f02-atlas .towns span::before { content:'•'; margin-right:8px; color:#5a7060; }
        /* Bottom manifesto strip */
        .f02-manifesto { position:absolute; left:76px; right:76px; bottom:130px; z-index:5; display:flex; align-items:center; gap:22px; padding-top:20px; border-top:2px solid rgba(46,69,56,.4); }
        .f02-manifesto .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.65); flex:none; }
        .f02-manifesto .v { flex:1; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.22; letter-spacing:-.012em; color:#2e4538; }
        .f02-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f02">
          <div class="f02-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Plate 02 · Regional Atlas</span>
          </div>
          <div class="f02-title">
            <span class="kick">Our region</span>
            <h1 class="head">Our Region.<em>Our Voice.</em></h1>
          </div>
          <div class="f02-atlas">
            <div class="head"><span>Northwest Oregon</span><span class="n">Fig. 02</span></div>
            <svg viewBox="0 0 200 220" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
              <path d="M20 30 C 42 22 60 34 78 28 C 96 22 106 40 122 34 C 138 28 152 42 168 34 L 180 60 L 172 88 L 184 116 L 168 148 L 178 176 L 152 200 L 118 208 L 82 202 L 46 208 L 26 188 L 30 156 L 22 130 L 34 100 L 24 68 Z" fill="currentColor" fill-opacity=".08"/>
              <path d="M20 30 C 42 22 60 34 78 28 C 96 22 106 40 122 34 C 138 28 152 42 168 34 L 180 60 L 172 88 L 184 116 L 168 148 L 178 176 L 152 200 L 118 208 L 82 202 L 46 208 L 26 188 L 30 156 L 22 130 L 34 100 L 24 68 Z"/>
              <circle class="marker" cx="46" cy="62" r="4"/>
              <text x="55" y="66" font-family="Source Sans 3" font-size="9" fill="currentColor" stroke="none">ASTORIA</text>
              <circle class="marker" cx="72" cy="106" r="4"/>
              <text x="80" y="110" font-family="Source Sans 3" font-size="9" fill="currentColor" stroke="none">TILLAMOOK</text>
              <circle class="marker" cx="132" cy="90" r="4"/>
              <text x="140" y="94" font-family="Source Sans 3" font-size="9" fill="currentColor" stroke="none">FOREST GROVE</text>
              <circle class="marker" cx="152" cy="118" r="4"/>
              <text x="160" y="122" font-family="Source Sans 3" font-size="9" fill="currentColor" stroke="none">HILLSBORO</text>
              <circle class="marker" cx="98" cy="46" r="4"/>
              <text x="105" y="50" font-family="Source Sans 3" font-size="9" fill="currentColor" stroke="none">COLUMBIA CO.</text>
            </svg>
            <div class="towns"><span>Hillsboro</span><span>Forest Grove</span><span>Astoria</span><span>Tillamook</span><span>Columbia County</span></div>
          </div>
          <div class="f02-manifesto">
            <span class="k">The claim</span>
            <p class="v">Every community deserves competitive candidates, meaningful conversations, and leaders who understand local priorities.</p>
          </div>
          <div class="f02-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 03 — Prosperity Starts Here.
     Creative direction: bold typographic ledger. A single
     "Prosperity" fills the width in serif with sage italic
     stroke, "Starts Here." descends into a signed pledge.
  -------------------------------------------------------- */
  {
    id: 'feed-03-prosperity',
    tag: 'Issues',
    title: 'Prosperity Starts Here.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Strong communities begin with strong local economies.\n\nWhen small businesses succeed, families benefit.\n\nWhen entrepreneurs grow, communities grow.\n\nNorthwest Oregon PAC supports policies that encourage opportunity, investment, and economic growth across our region.\n\nTag your favorite local Northwest Oregon business.\n\n#SmallBusiness #NorthwestOregon #EconomicGrowth #SupportLocal',
    data: {
      css: `
        .f03 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 15% 5%, rgba(224,214,188,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #ecdfba 100%);
          color:#2e4538;
        }
        .f03::before {
          content:''; position:absolute; inset:0; opacity:.35; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .f03-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f03-mast img { height:56px; width:auto; }
        /* Ledger header */
        .f03-header { position:absolute; top:170px; left:76px; right:76px; z-index:6; padding-bottom:18px; border-bottom:2px double #2e4538; display:flex; align-items:baseline; justify-content:space-between; gap:22px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f03-header .title { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Big serif titles */
        .f03-title { position:absolute; top:260px; left:76px; right:76px; z-index:5; }
        .f03-title .prosperity {
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:198px; line-height:.92; letter-spacing:-.03em; color:#2e4538;
        }
        .f03-title .starts { display:block; margin-top:6px; font-family:var(--font-display); font-weight:500; font-size:96px; line-height:1; letter-spacing:-.025em; color:#5a7060; }
        /* Three columns of pledge */
        .f03-pledge { position:absolute; left:76px; right:76px; bottom:170px; z-index:5; display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
        .f03-pledge .cell { padding:20px 22px; }
        .f03-pledge .cell + .cell { border-left:1px solid rgba(46,69,56,.35); }
        .f03-pledge .cell .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:block; }
        .f03-pledge .cell .v { display:block; margin-top:10px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.012em; color:#2e4538; }
        .f03-pledge .cell .v em { font-style:normal; color:#6b5a42; }
        /* Signature line */
        .f03-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; padding-top:14px; border-top:1.5px solid rgba(46,69,56,.35); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f03-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f03-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f03">
          <div class="f03-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Chapter 03 · The Local Economy</span>
          </div>
          <div class="f03-header">
            <span>The Northwest Ledger</span>
            <span class="title">A note on prosperity</span>
            <span>Fol. 03</span>
          </div>
          <div class="f03-title">
            <span class="prosperity">Prosperity</span>
            <span class="starts">Starts Here.</span>
          </div>
          <div class="f03-pledge">
            <div class="cell"><span class="k">— i.</span><span class="v">When small businesses <em>succeed,</em> families benefit.</span></div>
            <div class="cell"><span class="k">— ii.</span><span class="v">When entrepreneurs <em>grow,</em> communities grow.</span></div>
            <div class="cell"><span class="k">— iii.</span><span class="v">Strong communities begin with strong <em>local economies.</em></span></div>
          </div>
          <div class="f03-sig"><span>The stamp of the region</span><span class="em">— Northwest Oregon PAC</span></div>
          <div class="f03-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 04 — Accountability Matters.
     Creative direction: audit certificate. Formal double
     frame, embossed seal top-right, italic serif headline,
     three pillar columns beneath, signed by the region.
  -------------------------------------------------------- */
  {
    id: 'feed-04-accountability',
    tag: 'Issues',
    title: 'Accountability Matters.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'We believe transparency, responsible spending, and measurable results help build public trust.\n\nGood government isn\'t about bigger government. It\'s about better government.\n\nWhat does accountability mean to you?\n\n#Accountability #Transparency #NorthwestOregon',
    data: {
      css: `
        .f04 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(224,214,188,.55) 0%, transparent 55%),
            linear-gradient(180deg, #e8dcbb 0%, #cebc85 100%);
          color:#2a2a26;
        }
        .f04::before {
          content:''; position:absolute; inset:0; opacity:.35; pointer-events:none;
          background:
            repeating-linear-gradient(45deg, rgba(46,69,56,.06) 0 1px, transparent 1px 8px);
        }
        /* Certificate frame */
        .f04-frame { position:absolute; top:70px; bottom:110px; left:70px; right:70px; z-index:4;
          background:#f9f0d5; border:4px double #2e4538;
          box-shadow:0 30px 60px -30px rgba(46,69,56,.5), inset 0 1px 0 rgba(255,255,255,.5);
        }
        .f04-frame::before { content:''; position:absolute; inset:14px; border:1px solid rgba(46,69,56,.5); pointer-events:none; }
        /* Header row inside frame */
        .f04-frame .head { position:absolute; top:44px; left:52px; right:52px; padding-bottom:18px; border-bottom:2px solid #2e4538; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.75); }
        .f04-frame .head .title { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Kicker + big title */
        .f04-frame .kick { position:absolute; top:150px; left:52px; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f04-frame .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f04-frame .headline { position:absolute; top:210px; left:52px; right:280px; font-family:var(--font-display); font-weight:500; font-size:88px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f04-frame .headline em { font-style:italic; color:#5a7060; }
        /* Embossed seal top-right */
        .f04-seal { position:absolute; top:170px; right:110px; z-index:5;
          width:140px; height:140px; border-radius:999px; border:3px double #2e4538;
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;
          font-family:var(--font-mono); font-size:10px; letter-spacing:.36em; text-transform:uppercase; color:#2e4538;
          transform:rotate(-4deg);
          box-shadow:inset 0 0 0 1px rgba(46,69,56,.3);
          background:radial-gradient(60% 60% at 50% 50%, rgba(246,242,232,.7) 0%, rgba(232,220,187,.4) 100%);
        }
        .f04-seal .star { font-family:var(--font-display); font-style:italic; font-size:34px; color:#5a7060; }
        .f04-seal .lbl { text-align:center; line-height:1.4; font-weight:500; }
        /* Three pillar columns */
        .f04-pillars { position:absolute; left:52px; right:52px; top:400px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
        .f04-pillars .col { padding:22px 22px; text-align:center; }
        .f04-pillars .col + .col { border-left:1px solid rgba(46,69,56,.4); }
        .f04-pillars .col .no { font-family:var(--font-display); font-style:italic; font-size:38px; color:rgba(46,69,56,.35); letter-spacing:-.02em; }
        .f04-pillars .col .word { display:block; margin-top:6px; font-family:var(--font-display); font-weight:500; font-size:46px; line-height:1; letter-spacing:-.022em; color:#2e4538; }
        .f04-pillars .col .word.italic { font-style:italic; color:#5a7060; }
        .f04-pillars .col .sub { display:block; margin-top:10px; font-family:var(--font-mono); font-size:11px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,69,56,.55); }
        /* Middle statement */
        .f04-mid { position:absolute; left:52px; right:52px; bottom:180px; padding-top:20px; border-top:1.5px solid rgba(46,69,56,.4); display:flex; align-items:baseline; justify-content:space-between; gap:22px; }
        .f04-mid .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.55); flex:none; }
        .f04-mid .v { flex:1; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:30px; line-height:1.22; letter-spacing:-.012em; color:#2e4538; text-align:right; }
        /* Signature */
        .f04-sig { position:absolute; left:52px; right:52px; bottom:60px; padding-top:18px; border-top:1px solid rgba(46,69,56,.4); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f04-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Mast + footer outside the frame */
        .f04-mast { position:absolute; top:24px; left:70px; right:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f04-mast img { height:36px; width:auto; }
        .f04-foot { position:absolute; left:76px; right:76px; bottom:34px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f04">
          <div class="f04-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Certificate 04 · Public Trust</span>
          </div>
          <div class="f04-frame">
            <div class="head"><span>The Northwest Register</span><span class="title">A civic certificate</span><span>No. 04</span></div>
            <span class="kick">Public trust</span>
            <h1 class="headline">Accountability <em>Matters.</em></h1>
            <div class="f04-seal"><span class="star">☘</span><span class="lbl">Northwest<br/>Oregon<br/>Audited</span></div>
            <div class="f04-pillars">
              <div class="col"><span class="no">i.</span><span class="word">Transparency</span><span class="sub">Every dollar accounted</span></div>
              <div class="col"><span class="no">ii.</span><span class="word italic">Responsibility</span><span class="sub">Priorities kept</span></div>
              <div class="col"><span class="no">iii.</span><span class="word">Results</span><span class="sub">Outcomes measured</span></div>
            </div>
            <div class="f04-mid"><span class="k">— The pledge</span><span class="v">Good government isn't about bigger government. It's about better government.</span></div>
            <div class="f04-sig"><span>Signed on behalf of the region</span><span class="em">— Northwest Oregon PAC</span></div>
          </div>
          <div class="f04-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 05 — Meet Northwest Oregon.
     Creative direction: mosaic profile card. A tessellated
     grid of three photographic panels (region + community +
     working) with editorial captions, "Meet Northwest Oregon."
     set in serif at the bottom as a title plate.
  -------------------------------------------------------- */
  {
    id: 'feed-05-meet-nw-oregon',
    tag: 'Introduction',
    title: 'Meet Northwest Oregon.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Our region is more than a place on the map.\n\nIt's working families. Small businesses. Farmers. Teachers. Veterans. Students. Volunteers. Communities like ours deserve to be heard.\n\nShare this if you're proud to call Northwest Oregon home.\n\n#NorthwestOregon #Community #LocalVoices #Oregon",
    data: {
      css: `
        .f05 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f0e6cd 0%, #d6c493 100%);
          color:#2e4538;
        }
        .f05-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f05-mast img { height:56px; width:auto; }
        /* Kicker */
        .f05-kick { position:absolute; top:170px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f05-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Photographic grid — three panels */
        .f05-grid { position:absolute; top:220px; left:76px; right:76px; height:460px; z-index:5; display:grid; grid-template-columns:1.4fr 1fr; grid-template-rows:1fr 1fr; gap:14px; }
        .f05-grid .panel { position:relative; overflow:hidden; background:#0f1a13; box-shadow:0 20px 40px -20px rgba(46,69,56,.4); }
        .f05-grid .panel img { width:100%; height:100%; object-fit:cover; filter:saturate(.78) contrast(1.14) brightness(.88); }
        .f05-grid .panel::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 100%);
        }
        .f05-grid .panel.tall { grid-row:1 / span 2; }
        .f05-grid .panel .lbl { position:absolute; left:14px; bottom:14px; z-index:2; font-family:var(--font-mono); font-size:11px; letter-spacing:.4em; text-transform:uppercase; color:#f0e6cd; text-shadow:0 2px 12px rgba(0,0,0,.5); }
        .f05-grid .panel .no { position:absolute; right:14px; top:14px; z-index:2; font-family:var(--font-display); font-style:italic; font-size:26px; color:#e0d6bc; text-shadow:0 2px 12px rgba(0,0,0,.5); }
        /* Title plate */
        .f05-plate { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; padding-top:18px; border-top:2px double #2e4538; display:flex; align-items:flex-end; justify-content:space-between; gap:22px; }
        .f05-plate .title { font-family:var(--font-display); font-weight:500; font-size:76px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f05-plate .title em { display:block; font-style:italic; color:#5a7060; font-size:56px; }
        .f05-plate .callout { max-width:420px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.24; letter-spacing:-.012em; color:#2e4538; text-align:right; padding-bottom:12px; }
        .f05-plate .callout small { display:block; margin-top:8px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.55); font-style:normal; }
        .f05-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f05">
          <div class="f05-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Mosaic 05 · The Region</span>
          </div>
          <span class="f05-kick">Our region</span>
          <div class="f05-grid">
            <div class="panel tall">
              <img src="${ctx.prefix}img/banner.jpg" alt="Downtown Northwest Oregon" />
              <span class="no">i.</span>
              <span class="lbl">— Downtown</span>
            </div>
            <div class="panel">
              <img src="${ctx.prefix}img/hero.jpg" alt="Community" />
              <span class="no">ii.</span>
              <span class="lbl">— Community</span>
            </div>
            <div class="panel">
              <img src="${ctx.prefix}img/who-we-are.jpg" alt="Neighbors at work" />
              <span class="no">iii.</span>
              <span class="lbl">— Neighbors</span>
            </div>
          </div>
          <div class="f05-plate">
            <h1 class="title">Meet<em>Northwest Oregon.</em></h1>
            <p class="callout">More than a place on the map.<small>Families · Businesses · Neighbors</small></p>
          </div>
          <div class="f05-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 06 — We Exist For NorthWest Oregon
     Creative direction: mission letterhead. Forest ground,
     wax-seal, three numbered inscription rules, signed at
     the base.
  -------------------------------------------------------- */
  {
    id: 'feed-06-we-exist',
    tag: 'Introduction',
    title: 'We Exist For NorthWest Oregon',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      'We believe every voter deserves a meaningful choice.\n\nThat\'s why Northwest Oregon PAC works to strengthen campaigns, recruit leaders, organize volunteers, and support candidates prepared to serve.\n\nBuilding a stronger region starts long before Election Day.\n\nLearn more at our website. Click the link in bio and learn more about us.\n\n#Leadership #NorthwestOregonPAC #CommunityLeadership',
    data: {
      css: `
        .f06 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 10%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f06-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:20px; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f06-mast img { height:56px; width:auto; filter:brightness(1.05); }
        /* Ceremonial preamble */
        .f06-preamble { position:absolute; top:180px; left:76px; right:76px; z-index:6; padding-bottom:16px; border-bottom:1.5px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; gap:22px; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.65); }
        .f06-preamble .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        /* Big statement */
        .f06-title { position:absolute; top:250px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:96px; line-height:.98; letter-spacing:-.028em; color:#f6f2e8; max-width:900px; }
        .f06-title em { font-style:italic; color:#e0d6bc; display:block; }
        /* Three numbered inscription rules */
        .f06-clauses { position:absolute; left:76px; right:76px; bottom:200px; z-index:6; display:flex; flex-direction:column; gap:22px; }
        .f06-clauses .clause { display:flex; align-items:baseline; gap:24px; padding-bottom:16px; border-bottom:1px solid rgba(246,242,232,.28); }
        .f06-clauses .clause .n { flex:none; width:56px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); }
        .f06-clauses .clause .txt { flex:1; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:30px; line-height:1.16; letter-spacing:-.015em; color:rgba(246,242,232,.94); }
        .f06-clauses .clause .txt em { font-style:normal; color:#e0d6bc; }
        /* Wax seal — icon on top, label centered beneath with tight gap */
        .f06-seal {
          position:absolute; right:76px; top:170px; z-index:7;
          width:132px; height:132px; border-radius:999px;
          background:radial-gradient(circle at 32% 30%, #e0d6bc 0%, #6b5a42 90%);
          border:3px solid rgba(224,214,188,.75);
          display:flex; align-items:center; justify-content:center; flex-direction:column;
          gap:6px;
          color:#2e4538; font-family:var(--font-mono); font-size:10px; letter-spacing:.32em; text-transform:uppercase;
          transform:rotate(-8deg);
          box-shadow:0 20px 40px -18px rgba(0,0,0,.5), inset 0 -6px 12px rgba(0,0,0,.2);
        }
        .f06-seal .icon { font-family:var(--font-display); font-style:italic; font-size:28px; line-height:1; }
        .f06-seal .lbl { padding-top:4px; border-top:1px solid rgba(46,69,56,.35); }
        /* Signed footer */
        .f06-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f06-sig .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f06-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f06">
          <div class="f06-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Charter 06 · Our Mission</span>
          </div>
          <div class="f06-preamble"><span>The Charter</span><span class="em">Signed by the region</span><span>No. 06</span></div>
          <h1 class="f06-title">We Exist For<em>NorthWest Oregon</em></h1>
          <div class="f06-seal"><span class="icon">☘</span><span class="lbl">Est. 2026</span></div>
          <div class="f06-clauses">
            <div class="clause"><span class="n">01</span><span class="txt">We believe every voter deserves a <em>meaningful choice.</em></span></div>
            <div class="clause"><span class="n">02</span><span class="txt">That's why Northwest Oregon PAC works to strengthen campaigns, recruit leaders, organize volunteers, and support <em>candidates prepared to serve.</em></span></div>
            <div class="clause"><span class="n">03</span><span class="txt">Building a stronger region starts long <em>before Election Day.</em></span></div>
          </div>
          <div class="f06-sig"><span>Learn more at our website</span><span class="em">— northwestoregon.com</span></div>
          <div class="f06-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 07 — Small Actions. Big Impact.
     Creative direction: infographic balance scale. Left pan
     holds the four small-action tokens; right pan holds the
     "impact" tokens; the beam tips right toward community.
  -------------------------------------------------------- */
  {
    id: 'feed-07-small-actions',
    tag: 'Get involved',
    title: 'Small Actions. Big Impact.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Every conversation. Every volunteer. Every donation. Every supporter.\n\nTogether, these small actions create stronger campaigns and stronger communities.\n\nThank you for helping shape Northwest Oregon's future.\n\nTag someone who always shows up for their community.\n\n#Volunteer #Community #NorthwestOregon",
    data: {
      css: `
        .f07 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(224,214,188,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e2d4a8 100%);
          color:#2e4538;
        }
        .f07-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f07-mast img { height:56px; width:auto; }
        /* Editorial title top-right */
        .f07-title { position:absolute; top:180px; left:76px; right:76px; z-index:6; display:flex; align-items:flex-end; justify-content:space-between; gap:22px; }
        .f07-title .kick { font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f07-title .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f07-title .h { font-family:var(--font-display); font-weight:500; font-size:92px; line-height:.98; letter-spacing:-.028em; color:#2e4538; text-align:right; }
        .f07-title .h em { display:block; font-style:italic; color:#5a7060; }
        /* Balance beam */
        .f07-scale { position:absolute; left:76px; right:76px; top:420px; height:340px; z-index:5; }
        .f07-scale .fulcrum { position:absolute; left:calc(50% - 12px); top:60px; width:24px; height:190px; background:linear-gradient(180deg, #2e4538 0%, #1c2b23 100%); border-radius:2px; }
        .f07-scale .beam {
          position:absolute; left:6%; right:6%; top:66px; height:6px; background:#2e4538; border-radius:3px;
          transform:rotate(-3deg); transform-origin:center;
          box-shadow:0 6px 14px -6px rgba(46,69,56,.5);
        }
        .f07-scale .pan {
          position:absolute; top:56px;
          width:280px; padding:20px 22px;
          background:rgba(246,242,232,.65); border:1.5px solid rgba(46,69,56,.4);
          box-shadow:0 20px 40px -22px rgba(46,69,56,.4);
        }
        .f07-scale .pan.left { left:10px; transform:translateY(-6px) rotate(-3deg); transform-origin:top center; }
        .f07-scale .pan.right { right:10px; transform:translateY(30px) rotate(-3deg); transform-origin:top center; }
        .f07-scale .pan::before { content:''; position:absolute; left:calc(50% - 1px); top:-56px; width:2px; height:56px; background:rgba(46,69,56,.5); }
        .f07-scale .pan .lbl { font-family:var(--font-mono); font-size:11px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.55); margin-bottom:10px; }
        .f07-scale .pan.right .lbl { color:rgba(46,69,56,.6); }
        .f07-scale .pan .stack { display:flex; flex-direction:column; gap:6px; }
        .f07-scale .pan .stack .chip {
          padding:8px 12px; background:rgba(46,69,56,.08); border:1px solid rgba(46,69,56,.35);
          font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:#2e4538; text-align:center;
        }
        .f07-scale .pan.right .big {
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:36px;
          line-height:1.02; letter-spacing:-.015em; color:#2e4538; text-align:center; padding:8px 6px;
        }
        .f07-scale .pan.right .big em { font-style:normal; color:#5a7060; }
        /* Legend under scale */
        .f07-legend { position:absolute; left:76px; right:76px; bottom:160px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); display:flex; align-items:baseline; justify-content:space-between; gap:22px; }
        .f07-legend .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.55); flex:none; }
        .f07-legend .v { flex:1; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.22; letter-spacing:-.012em; color:#2e4538; text-align:right; }
        .f07-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f07">
          <div class="f07-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Figure 07 · The Balance</span>
          </div>
          <div class="f07-title">
            <span class="kick">Together we build</span>
            <h1 class="h">Small Actions.<em>Big Impact.</em></h1>
          </div>
          <div class="f07-scale">
            <div class="beam"></div>
            <div class="fulcrum"></div>
            <div class="pan left">
              <span class="lbl">— Small actions</span>
              <div class="stack">
                <span class="chip">Every conversation</span>
                <span class="chip">Every volunteer</span>
                <span class="chip">Every donation</span>
                <span class="chip">Every supporter</span>
              </div>
            </div>
            <div class="pan right">
              <span class="lbl">— Big impact</span>
              <div class="big">Stronger <em>campaigns.</em></div>
              <div class="big">Stronger <em>communities.</em></div>
            </div>
          </div>
          <div class="f07-legend"><span class="k">— Thank you</span><span class="v">For helping shape Northwest Oregon's future.</span></div>
          <div class="f07-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 08 — Building Tomorrow. Starting Today.
     Creative direction: diagonal split diptych. Left half
     "Today" — mono construction-note aesthetic on cream;
     right half "Tomorrow" — italic serif rising into forest
     ground. Central time-stamp seal at the diagonal seam.
  -------------------------------------------------------- */
  {
    id: 'feed-08-building-tomorrow',
    tag: 'Introduction',
    title: 'Building Tomorrow. Starting Today.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Strong political organizations aren't built overnight.\n\nThey grow through relationships, trust, community involvement, and people willing to step forward.\n\nThat's exactly what we're building across Northwest Oregon.\n\nFollow our journey.\n\n#NorthwestOregon #Leadership #CommunityFirst #Future",
    data: {
      css: `
        .f08 { position:absolute; inset:0; z-index:10; overflow:hidden; background:#f6f2e8; color:#2e4538; }
        /* Diagonal split — forest wedge, steep so left half breathes */
        .f08-wedge {
          position:absolute; inset:0; z-index:2;
          background:linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          clip-path:polygon(100% 0, 100% 100%, 30% 100%, 62% 0);
        }
        .f08-wedge::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(90% 60% at 100% 20%, rgba(90,112,96,.4) 0%, transparent 55%),
            radial-gradient(90% 80% at 0% 100%, rgba(14,22,17,.9) 0%, transparent 55%);
        }
        /* Mast */
        .f08-mast { position:absolute; top:56px; left:76px; right:76px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; }
        .f08-mast img { height:56px; width:auto; }
        .f08-mast .l { color:rgba(46,69,56,.7); }
        .f08-mast .r { color:rgba(246,242,232,.75); text-shadow:0 2px 12px rgba(0,0,0,.4); }
        /* Today block (left, cream) — kept within 40% column */
        .f08-today { position:absolute; left:60px; top:200px; width:400px; z-index:6; }
        .f08-today .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f08-today .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f08-today .word { margin-top:14px; font-family:var(--font-display); font-weight:500; font-size:88px; line-height:.95; letter-spacing:-.028em; color:#2e4538; }
        .f08-today .stats { margin-top:30px; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); display:flex; flex-direction:column; gap:10px; }
        .f08-today .stats .row { display:flex; flex-direction:column; gap:2px; font-family:var(--font-mono); font-size:11px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f08-today .stats .row .n { font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Tomorrow block (right, forest) */
        .f08-tomorrow { position:absolute; right:76px; bottom:180px; width:52%; z-index:6; text-align:right; }
        .f08-tomorrow .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.7); display:inline-flex; align-items:center; gap:16px; }
        .f08-tomorrow .kick::after { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f08-tomorrow .word { margin-top:16px; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:132px; line-height:.95; letter-spacing:-.028em; color:#e0d6bc; text-shadow:0 6px 30px rgba(0,0,0,.5); }
        .f08-tomorrow .note { margin-top:22px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:28px; line-height:1.24; letter-spacing:-.015em; color:rgba(246,242,232,.9); max-width:520px; margin-left:auto; }
        /* Central time-stamp seal */
        .f08-seal {
          position:absolute; left:calc(50% - 88px); top:calc(50% - 88px); width:176px; height:176px; z-index:9;
          border-radius:999px; background:#e0d6bc;
          border:3px solid #2e4538;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          box-shadow:0 30px 60px -20px rgba(0,0,0,.6), inset 0 -6px 16px rgba(107,90,66,.3);
        }
        .f08-seal .starting { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f08-seal .today { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:42px; line-height:1; letter-spacing:-.02em; color:#2e4538; margin-top:4px; }
        .f08-seal .date { margin-top:6px; padding-top:8px; border-top:1px solid rgba(46,69,56,.4); font-family:var(--font-mono); font-size:10px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.6); width:70%; text-align:center; }
        /* Footer bar — solid ground for legibility across the wedge seam */
        .f08-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:9; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; }
        .f08-foot span:first-child { color:rgba(46,69,56,.7); background:rgba(246,242,232,.7); padding:6px 12px; }
        .f08-foot span:last-child { color:rgba(246,242,232,.85); background:rgba(28,43,35,.7); padding:6px 12px; }
      `,
      body: (ctx) => `
        <div class="f08">
          <div class="f08-wedge"></div>
          <div class="f08-mast">
            <span class="l"><img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" /></span>
            <span class="r">Diptych 08 · The Two Days</span>
          </div>
          <div class="f08-today">
            <span class="kick">A movement in progress</span>
            <h2 class="word">Building</h2>
            <div class="stats">
              <div class="row"><span>Foundations</span><span class="n">Relationships & trust</span></div>
              <div class="row"><span>Materials</span><span class="n">People willing to step forward</span></div>
              <div class="row"><span>Method</span><span class="n">Community involvement</span></div>
            </div>
          </div>
          <div class="f08-seal">
            <span class="starting">Starting</span>
            <span class="today">Today.</span>
            <span class="date">Est. 2026</span>
          </div>
          <div class="f08-tomorrow">
            <span class="kick">The horizon</span>
            <h2 class="word">Tomorrow.</h2>
            <p class="note">Strong political organizations aren't built overnight. That's exactly what we're building across Northwest Oregon.</p>
          </div>
          <div class="f08-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 09 — NorthWest Oregon. What Matters Most?
     Creative direction: field clipboard. Metal clip pinning
     a tan sheet with the poll question, ruled lines, five
     checkbox items, "vote below" call at base.
  -------------------------------------------------------- */
  {
    id: 'feed-09-what-matters',
    tag: 'Values',
    title: 'What Matters Most?',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Every community has different priorities.\n\nWe want to hear yours.\n\nWhich issue matters most?\n\n✔ Public Safety\n✔ Small Business\n✔ Education\n✔ Affordable Energy\n✔ Government Accountability\n\nVote below in the comments.\n\n#CommunityVoice #NorthwestOregon #YourVoiceMatters',
    data: {
      css: `
        .f09 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(224,214,188,.55) 0%, transparent 55%),
            linear-gradient(180deg, #d6c493 0%, #b5a067 100%);
          color:#2a2a26;
        }
        .f09::before {
          content:''; position:absolute; inset:0; opacity:.45; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.22  0 0 0 0 0.12  0 0 0 0.32 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .f09-mast { position:absolute; top:56px; left:76px; right:76px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.4em; text-transform:uppercase; color:rgba(42,42,38,.7); }
        .f09-mast img { height:46px; width:auto; }
        /* Clipboard body */
        .f09-clip { position:absolute; top:130px; bottom:130px; left:80px; right:80px; z-index:5;
          background:linear-gradient(180deg, #3d2f14 0%, #241a08 100%);
          border-radius:8px;
          box-shadow:0 30px 60px -30px rgba(0,0,0,.6), inset 0 -8px 20px rgba(0,0,0,.3);
          padding:22px;
        }
        /* Metal clip */
        .f09-metalclip {
          position:absolute; top:-14px; left:calc(50% - 90px); z-index:8;
          width:180px; height:60px;
          background:linear-gradient(180deg, #cfcfcf 0%, #7c7c7c 60%, #4a4a4a 100%);
          border-radius:8px;
          box-shadow:0 8px 14px -4px rgba(0,0,0,.5), inset 0 -3px 6px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.5);
        }
        .f09-metalclip::before {
          content:''; position:absolute; left:calc(50% - 22px); top:16px; width:44px; height:20px;
          background:#2a2a26; border-radius:3px;
        }
        /* Paper sheet on clipboard */
        .f09-sheet { position:relative; background:#f6f2e8; height:100%; padding:34px 40px 26px; box-shadow:inset 0 0 0 1px rgba(0,0,0,.05); display:flex; flex-direction:column; }
        /* Sheet header row */
        .f09-sheet .head { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid #2e4538; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f09-sheet .head .title { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Question block */
        .f09-sheet .kick { margin-top:18px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f09-sheet .q { margin-top:10px; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f09-sheet .q em { font-style:italic; color:#5a7060; }
        .f09-sheet .sub { margin-top:8px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; letter-spacing:-.012em; color:rgba(46,69,56,.75); }
        /* Ruled options */
        .f09-sheet .opts { margin-top:20px; display:flex; flex-direction:column; gap:12px; }
        .f09-sheet .opt { display:flex; align-items:center; gap:20px; padding:10px 14px; border-bottom:1px dashed rgba(46,69,56,.4); }
        .f09-sheet .opt .box { flex:none; width:30px; height:30px; border:2px solid #2e4538; display:flex; align-items:center; justify-content:center; }
        .f09-sheet .opt .box .mark { display:none; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:24px; color:#2e4538; line-height:1; margin-top:-2px; }
        .f09-sheet .opt.ticked .box .mark { display:inline; }
        .f09-sheet .opt .lbl { flex:1; font-family:var(--font-display); font-weight:500; font-size:32px; letter-spacing:-.015em; color:#2a2a26; }
        .f09-sheet .opt .n { font-family:var(--font-mono); font-size:11px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.5); }
        /* Vote-below strip */
        .f09-sheet .vote { margin-top:auto; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.4); display:flex; align-items:baseline; justify-content:space-between; gap:22px; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f09-sheet .vote .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Foot */
        .f09-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,42,38,.55); }
      `,
      body: (ctx) => `
        <div class="f09">
          <div class="f09-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Clipboard 09 · Community Poll</span>
          </div>
          <div class="f09-clip">
            <div class="f09-metalclip"></div>
            <div class="f09-sheet">
              <div class="head"><span>NorthWest Oregon</span><span class="title">A field poll</span><span>Sheet 09 / 60</span></div>
              <span class="kick">— The question</span>
              <h1 class="q">What Matters <em>Most?</em></h1>
              <p class="sub">Every community has different priorities. We want to hear yours.</p>
              <div class="opts">
                <div class="opt"><span class="box"><span class="mark">✓</span></span><span class="lbl">Public Safety</span><span class="n">A</span></div>
                <div class="opt"><span class="box"><span class="mark">✓</span></span><span class="lbl">Small Business</span><span class="n">B</span></div>
                <div class="opt"><span class="box"><span class="mark">✓</span></span><span class="lbl">Education</span><span class="n">C</span></div>
                <div class="opt"><span class="box"><span class="mark">✓</span></span><span class="lbl">Affordable Energy</span><span class="n">D</span></div>
                <div class="opt"><span class="box"><span class="mark">✓</span></span><span class="lbl">Government Accountability</span><span class="n">E</span></div>
              </div>
              <div class="vote"><span>Vote below</span><span class="em">— Tell us in the comments</span></div>
            </div>
          </div>
          <div class="f09-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 10 — Economic opportunity isn't created by government
     Creative direction: editorial pull-quote spread. Oversized
     italic serif quote with a giant sage-italic opening quote
     glyph, hand-signed subhead beneath, folio numbered.
  -------------------------------------------------------- */
  {
    id: 'feed-10-economic-opportunity',
    tag: 'Beliefs',
    title: "Economic opportunity isn't created by government",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'A thriving economy starts with people who are willing to build, invest, and create opportunity.\n\nNorthwest Oregon PAC believes families and small businesses deserve an environment where hard work is rewarded, entrepreneurship is encouraged, and local communities can prosper.\n\nWhen businesses succeed, communities grow stronger.\n\nWhat local business inspires you? Tag them below.\n\n#NorthwestOregon #EconomicProsperity #SupportLocal #SmallBusiness #Opportunity #CommunityLeadership',
    data: {
      css: `
        .f10 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(224,214,188,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f10::before {
          content:''; position:absolute; inset:0; opacity:.28; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .f10-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f10-mast img { height:56px; width:auto; }
        /* Running head strip */
        .f10-runhead { position:absolute; top:170px; left:76px; right:76px; z-index:6; padding-bottom:14px; border-bottom:1.5px solid rgba(46,69,56,.4); display:flex; align-items:baseline; justify-content:space-between; gap:22px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f10-runhead .title { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Big italic quote glyph */
        .f10-qmark { position:absolute; top:200px; left:70px; z-index:4; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:520px; line-height:.62; letter-spacing:-.08em; color:rgba(90,112,96,.22); user-select:none; }
        /* Pull quote */
        .f10-quote { position:absolute; top:280px; left:200px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:64px; line-height:1.04; letter-spacing:-.02em; color:#2e4538; max-width:820px; }
        .f10-quote em { font-style:normal; color:#5a7060; }
        /* Signed subhead */
        .f10-sign { position:absolute; left:200px; right:76px; bottom:220px; z-index:6; padding-top:22px; border-top:1.5px solid rgba(46,69,56,.4); }
        .f10-sign .k { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); }
        .f10-sign .v { margin-top:10px; font-family:var(--font-display); font-weight:500; font-size:44px; line-height:1.06; letter-spacing:-.022em; color:#2e4538; }
        .f10-sign .v em { font-style:italic; color:#6b5a42; }
        /* Author line */
        .f10-author { position:absolute; left:200px; right:76px; bottom:150px; z-index:6; display:flex; align-items:center; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f10-author::before { content:''; width:40px; height:1px; background:currentColor; opacity:.55; }
        .f10-author .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Folio */
        .f10-folio { position:absolute; left:76px; bottom:112px; z-index:6; font-family:var(--font-display); font-style:italic; font-size:26px; color:rgba(46,69,56,.6); letter-spacing:-.01em; }
        .f10-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f10">
          <div class="f10-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Pull-quote 10 · Economic Prosperity</span>
          </div>
          <div class="f10-runhead">
            <span>The Northwest Reader</span>
            <span class="title">A belief, set in serif</span>
            <span>Fol. 10</span>
          </div>
          <span class="f10-qmark">"</span>
          <p class="f10-quote">Economic opportunity <em>isn't created by government,</em> it is created by the people willing to work hard, take risks, and build something meaningful.</p>
          <div class="f10-sign">
            <span class="k">— The job at hand</span>
            <p class="v">Our job is to <em>remove barriers</em> so they can succeed.</p>
          </div>
          <span class="f10-author"><span>Signed</span><span class="em">— Northwest Oregon PAC</span></span>
          <span class="f10-folio">— 10 —</span>
          <div class="f10-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 11 — Responsible government / stewardship
     Creative direction: public ledger. Two-column ledger
     book with dated entries flanking the pull-quote,
     running-total footer, editorial hairline rules.
  -------------------------------------------------------- */
  {
    id: 'feed-11-responsible-government',
    tag: 'Beliefs',
    title: 'Responsible government starts with responsible stewardship.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Public trust grows when government is transparent, accountable, and focused on delivering results.\n\nNorthwest Oregon PAC believes every public dollar should be managed responsibly, with clear priorities and measurable outcomes.\n\nGood government earns trust through accountability.\n\nWhat does government accountability mean to you?\n\n#Accountability #FiscalResponsibility #NorthwestOregon #Leadership #Transparency',
    data: {
      css: `
        .f11 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 10%, rgba(224,214,188,.5) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e4d7b3 100%);
          color:#2a2a26;
        }
        .f11-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f11-mast img { height:56px; width:auto; }
        /* Ledger book */
        .f11-book { position:absolute; top:170px; bottom:120px; left:76px; right:76px; z-index:5;
          background:#f9f1d4; border:1.5px solid rgba(46,69,56,.4);
          box-shadow:0 30px 60px -30px rgba(46,69,56,.4);
          padding:28px 30px 24px;
          display:flex; flex-direction:column;
        }
        /* Center gutter */
        .f11-book::before { content:''; position:absolute; left:50%; top:12px; bottom:12px; width:1px; background:linear-gradient(180deg, rgba(46,69,56,.35), rgba(46,69,56,.05)); }
        /* Header row */
        .f11-book .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:12px; border-bottom:2px double #2e4538; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f11-book .header .title { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Body: two columns */
        .f11-body { flex:1; display:grid; grid-template-columns:1fr 1fr; gap:30px; padding-top:20px; }
        .f11-body .col { display:flex; flex-direction:column; gap:16px; }
        .f11-body .col .colhead { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); display:flex; align-items:baseline; justify-content:space-between; }
        .f11-body .col .colhead::after { content:''; flex:1; height:1px; background:currentColor; margin-left:14px; opacity:.35; }
        .f11-body .col .entry { display:flex; flex-direction:column; gap:2px; padding-bottom:12px; border-bottom:1px dashed rgba(46,69,56,.4); }
        .f11-body .col .entry .k { font-family:var(--font-mono); font-size:11px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f11-body .col .entry .v { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; line-height:1.14; letter-spacing:-.012em; color:#2e4538; }
        .f11-body .col.right .quote { font-family:var(--font-display); font-weight:500; font-size:52px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; }
        .f11-body .col.right .quote em { font-style:italic; color:#5a7060; }
        .f11-body .col.right .sub { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.22; letter-spacing:-.012em; color:rgba(46,69,56,.85); }
        /* Book footer — running total */
        .f11-book .totals { margin-top:16px; padding-top:14px; border-top:2px double #2e4538; display:flex; align-items:baseline; justify-content:space-between; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f11-book .totals .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f11-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f11">
          <div class="f11-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Ledger 11 · Government Accountability</span>
          </div>
          <div class="f11-book">
            <div class="header"><span>Public Ledger</span><span class="title">Government accountability</span><span>Fol. 11</span></div>
            <div class="f11-body">
              <div class="col left">
                <div class="colhead"><span>Debit · what taxpayers give</span></div>
                <div class="entry"><span class="k">— Line 01</span><span class="v">Transparency</span></div>
                <div class="entry"><span class="k">— Line 02</span><span class="v">Measurable results</span></div>
                <div class="entry"><span class="k">— Line 03</span><span class="v">Confidence in public dollars</span></div>
                <div class="entry"><span class="k">— Line 04</span><span class="v">Priorities that align</span></div>
              </div>
              <div class="col right">
                <div class="colhead"><span>Credit · what stewardship returns</span></div>
                <p class="quote">Responsible government starts with <em>responsible stewardship.</em></p>
                <p class="sub">Every taxpayer deserves transparency, measurable results, and confidence that public dollars are being spent wisely.</p>
              </div>
            </div>
            <div class="totals"><span>Running balance</span><span class="em">— Trust, kept.</span></div>
          </div>
          <div class="f11-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 12 — The Future Belongs to Those Who Show Up.
     Creative direction: attendance roster. Forest ground,
     big italic serif headline, a tallied roster of four
     ways to show up with hand-drawn tick marks.
  -------------------------------------------------------- */
  {
    id: 'feed-12-future-belongs',
    tag: 'Get involved',
    title: 'The Future Belongs to Those Who Show Up.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "Communities become stronger when people participate.\n\nWhether it's volunteering, supporting a candidate, attending an event, or simply staying informed, every action makes a difference.\n\nNorthwest Oregon's future will be built by the people who choose to be involved.\n\nAre you ready to get involved?\n\nVisit our website to volunteer or learn more.\n\n#GetInvolved #NorthwestOregonPAC #Volunteer #CommunityLeadership #OregonPolitics",
    data: {
      css: `
        .f12 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 10%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f12-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f12-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f12-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f12-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f12-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:88px; line-height:1; letter-spacing:-.028em; color:#f6f2e8; max-width:900px; }
        .f12-head em { display:block; font-style:italic; color:#e0d6bc; }
        /* Roster */
        .f12-roster { position:absolute; left:76px; right:76px; bottom:180px; z-index:6; padding:22px 26px; background:rgba(224,214,188,.06); border:1px solid rgba(246,242,232,.28); }
        .f12-roster .rhead { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid rgba(224,214,188,.5); font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(224,214,188,.7); }
        .f12-roster .rhead .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f12-roster ul { list-style:none; padding:0; margin:14px 0 0; display:flex; flex-direction:column; gap:6px; }
        .f12-roster li { display:grid; grid-template-columns:36px 1fr auto; align-items:center; gap:20px; padding:8px 0; border-bottom:1px dashed rgba(224,214,188,.22); font-family:var(--font-display); font-weight:500; font-size:32px; letter-spacing:-.015em; color:rgba(246,242,232,.95); }
        .f12-roster li:last-child { border-bottom:none; }
        .f12-roster li .tick { font-family:var(--font-display); font-style:italic; font-size:32px; color:#e0d6bc; line-height:1; text-align:center; }
        .f12-roster li .lbl em { font-style:italic; color:#e0d6bc; }
        .f12-roster li .mark { font-family:var(--font-mono); font-size:11px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.55); }
        /* Foot */
        .f12-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; padding-top:14px; border-top:1.5px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f12-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f12-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f12">
          <div class="f12-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Roster 12 · The Present</span>
          </div>
          <span class="f12-kick">Show up</span>
          <h1 class="f12-head">The Future Belongs<em>to Those Who Show Up.</em></h1>
          <div class="f12-roster">
            <div class="rhead"><span>The attendance sheet</span><span class="em">Marked present</span><span>Dated 2026</span></div>
            <ul>
              <li><span class="tick">✓</span><span class="lbl">Volunteering</span><span class="mark">Line 01</span></li>
              <li><span class="tick">✓</span><span class="lbl">Supporting <em>a candidate</em></span><span class="mark">Line 02</span></li>
              <li><span class="tick">✓</span><span class="lbl">Attending <em>an event</em></span><span class="mark">Line 03</span></li>
              <li><span class="tick">✓</span><span class="lbl">Staying <em>informed</em></span><span class="mark">Line 04</span></li>
            </ul>
          </div>
          <div class="f12-sig"><span>Every action makes a difference</span><span class="em">— Visit our website</span></div>
          <div class="f12-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 13 — Economic Prosperity & Small Business
     Creative direction: kraft swing-tag / merchandise label
     as if hand-attached to a "Northwest Made" product.
     Twine loop, punched hole, hand-typed spec block, price
     line at bottom.
  -------------------------------------------------------- */
  {
    id: 'feed-13-prosperity-policy',
    tag: 'Issues',
    title: 'Economic Prosperity & Small Business',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Strong communities are built by local business owners, skilled workers, entrepreneurs, farmers, and families who invest in their communities every day.\n\nOur goal is to help create the conditions where those efforts can succeed.\n\n#EconomicGrowth #NorthwestOregon #SmallBusiness #Entrepreneurship #Prosperity',
    data: {
      css: `
        .f13 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 10%, rgba(224,214,188,.55) 0%, transparent 55%),
            linear-gradient(180deg, #efe6cd 0%, #d9c99e 100%);
          color:#2a2a26;
        }
        .f13::before {
          content:''; position:absolute; inset:0; opacity:.3; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .f13-mast { position:absolute; top:56px; left:76px; right:76px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f13-mast img { height:56px; width:auto; }
        /* Twine loop from top edge into hole */
        .f13-twine {
          position:absolute; top:150px; left:calc(50% - 90px); width:180px; height:120px; z-index:5;
        }
        .f13-twine svg { width:100%; height:100%; }
        /* Swing tag body */
        .f13-tag {
          position:absolute; top:260px; left:80px; right:80px; bottom:180px; z-index:5;
          background:
            radial-gradient(120% 90% at 20% 15%, rgba(224,197,140,.9) 0%, rgba(184,144,86,.85) 100%);
          border:1.5px solid rgba(58,44,20,.4);
          box-shadow:0 26px 60px -26px rgba(58,44,20,.5), inset 0 -6px 20px rgba(58,44,20,.15);
          padding:80px 46px 34px;
          clip-path:polygon(0 8%, 50% 0, 100% 8%, 100% 100%, 0 100%);
        }
        /* Punched hole */
        .f13-hole {
          position:absolute; top:12px; left:calc(50% - 22px); width:44px; height:44px; z-index:6;
          background:radial-gradient(circle at 45% 40%, #a89162 0%, #6b4f24 70%, #4a3a1f 100%);
          border-radius:999px;
          box-shadow:inset 0 4px 8px rgba(0,0,0,.5), inset 0 -2px 4px rgba(255,255,255,.15);
        }
        /* Tag header rule */
        .f13-tag .head { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:12px; border-bottom:2px double #3d2f14; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(58,44,20,.75); }
        .f13-tag .head .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#3d2f14; text-transform:none; }
        /* Big serif title */
        .f13-tag .title { margin-top:22px; font-family:var(--font-display); font-weight:500; font-size:74px; line-height:.98; letter-spacing:-.028em; color:#3d2f14; }
        .f13-tag .title em { font-style:italic; color:#5a7060; }
        .f13-tag .subtitle { margin-top:8px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(58,44,20,.65); }
        /* Spec block */
        .f13-tag .spec { margin-top:22px; padding-top:16px; border-top:1.5px dashed rgba(58,44,20,.5); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.24; letter-spacing:-.012em; color:#3d2f14; }
        .f13-tag .spec em { font-style:normal; color:#5a7060; }
        /* Price/rev block */
        .f13-tag .rev { position:absolute; left:46px; right:46px; bottom:26px; padding-top:16px; border-top:1.5px solid rgba(58,44,20,.5); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(58,44,20,.7); }
        .f13-tag .rev .n { font-family:var(--font-display); font-style:italic; font-size:32px; letter-spacing:-.02em; color:#3d2f14; text-transform:none; }
        .f13-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f13">
          <div class="f13-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Swing-tag 13 · Made in Northwest Oregon</span>
          </div>
          <div class="f13-twine">
            <svg viewBox="0 0 180 120" fill="none" stroke="#5a4a20" stroke-width="4" stroke-linecap="round">
              <path d="M40 8 C 40 40, 90 40, 90 80" stroke-dasharray="6 4"/>
              <path d="M140 8 C 140 40, 90 40, 90 80" stroke-dasharray="6 4"/>
            </svg>
          </div>
          <div class="f13-hole"></div>
          <div class="f13-tag">
            <div class="head"><span>Northwest Made</span><span class="em">Fig. 13</span><span>Small business</span></div>
            <h1 class="title">Economic Prosperity<em>& Small Business</em></h1>
            <p class="subtitle">— A tag pinned to the region</p>
            <p class="spec">We support policies that encourage entrepreneurship, strengthen <em>local businesses,</em> reduce unnecessary barriers, and create an environment where innovation and hard work can thrive across Northwest Oregon.</p>
            <div class="rev">
              <span>Signed for the region</span>
              <span class="n">— Northwest Oregon PAC</span>
            </div>
          </div>
          <div class="f13-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 14 — Safe neighborhoods give children room to dream
     Creative direction: twilight streetlamp. Deep forest
     night ground with a warm sand pool of light center-frame,
     italic serif headline beneath the lamppost silhouette.
  -------------------------------------------------------- */
  {
    id: 'feed-14-safe-neighborhoods',
    tag: 'Issues',
    title: 'Safe neighborhoods give children room to dream.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      'People should feel safe where they live, work, and raise their families.\n\nWe believe public safety isn\'t just about responding to crime, it\'s about creating neighborhoods where businesses can invest, parks stay active, and communities flourish.\n\nBecause when people feel safe, opportunity follows.\n\n#NorthwestOregon #PublicSafety #QualityOfLife #CommunityFirst',
    data: {
      css: `
        .f14 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(60% 45% at 50% 42%, rgba(224,214,188,.32) 0%, rgba(224,214,188,0) 55%),
            radial-gradient(90% 60% at 20% 5%, rgba(46,69,56,.5) 0%, transparent 55%),
            linear-gradient(178deg, #1c2b23 0%, #0a1310 60%, #050a07 100%);
          color:#f6f2e8;
        }
        .f14::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(2px 2px at 20% 15%, rgba(224,214,188,.35), transparent 60%),
            radial-gradient(2px 2px at 78% 8%, rgba(224,214,188,.28), transparent 60%),
            radial-gradient(1.5px 1.5px at 62% 88%, rgba(224,214,188,.32), transparent 60%),
            radial-gradient(2px 2px at 8% 74%, rgba(224,214,188,.22), transparent 60%);
        }
        .f14-mast { position:absolute; top:56px; left:76px; right:76px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f14-mast img { height:56px; width:auto; filter:brightness(1.05); }
        /* Streetlamp SVG center */
        .f14-lamp {
          position:absolute; top:170px; left:calc(50% - 200px); width:400px; height:340px; z-index:5;
          pointer-events:none;
        }
        .f14-lamp .halo {
          position:absolute; left:calc(50% - 200px); top:60px; width:400px; height:280px;
          background:radial-gradient(circle at 50% 30%, rgba(255,236,192,.6) 0%, rgba(255,236,192,.15) 40%, rgba(255,236,192,0) 70%);
          filter:blur(6px);
        }
        .f14-lamp svg { position:relative; z-index:2; display:block; margin:0 auto; width:200px; height:100%; color:#e0d6bc; }
        /* Kicker */
        .f14-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f14-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Headline block */
        .f14-head { position:absolute; left:76px; right:76px; top:540px; z-index:6; padding-top:20px; border-top:1.5px solid rgba(246,242,232,.35); font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1.02; letter-spacing:-.022em; color:#f6f2e8; max-width:920px; }
        .f14-head em { font-style:italic; color:#e0d6bc; }
        /* Subhead */
        .f14-sub { position:absolute; left:76px; right:76px; bottom:190px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; gap:22px; padding-top:16px; border-top:1px solid rgba(246,242,232,.28); font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f14-sub .em { flex:1; font-family:var(--font-display); font-style:italic; font-size:32px; line-height:1.16; letter-spacing:-.015em; color:#e0d6bc; text-transform:none; text-align:right; }
        /* Foot */
        .f14-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f14">
          <div class="f14-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Lamp 14 · Public Safety</span>
          </div>
          <span class="f14-kick">Public safety</span>
          <div class="f14-lamp">
            <div class="halo"></div>
            <svg viewBox="0 0 200 340" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M100 330 L100 130"/>
              <path d="M100 130 L100 90"/>
              <path d="M80 90 Q100 60 120 90 L120 96 Q100 78 80 96 Z" fill="currentColor" fill-opacity=".22"/>
              <path d="M80 90 Q100 60 120 90 L120 96 Q100 78 80 96 Z"/>
              <path d="M100 40 L100 90" stroke-width="1.6" opacity=".6"/>
              <circle cx="100" cy="36" r="3" fill="currentColor"/>
              <path d="M90 330 L110 330" stroke-width="4"/>
            </svg>
          </div>
          <h1 class="f14-head">Safe neighborhoods give children room to <em>dream,</em> families peace of mind, and local businesses the confidence to grow.</h1>
          <div class="f14-sub"><span>The finding</span><span class="em">Public safety is where opportunity begins.</span></div>
          <div class="f14-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 15 — Be Part of Something Bigger for Oregon
     Creative direction: horizon poster. Sand ground rising
     to sage horizon rule, big italic serif title at the
     fold, four ways-to-participate chips beneath.
  -------------------------------------------------------- */
  {
    id: 'feed-15-something-bigger',
    tag: 'Get involved',
    title: 'Be Part of Something Bigger for Oregon',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Northwest Oregon's future belongs to the people who choose to participate.\n\nVolunteer. Support a candidate. Attend an event. Start a conversation.\n\nEvery action helps strengthen our communities and expand opportunities for future generations.\n\nLet's build that future, together.\n\nVisit our website to learn how you can get involved today.\n\n#NorthwestOregonPAC #Volunteer #CommunityLeadership #GetInvolved #OregonPolitics",
    data: {
      css: `
        .f15 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 8%, rgba(240,232,206,.6) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e2d4a8 40%, #7f9182 82%, #2e4538 100%);
          color:#2e4538;
        }
        .f15::before {
          content:''; position:absolute; inset:0; opacity:.25; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.25 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        /* Horizon line */
        .f15-horizon { position:absolute; left:0; right:0; top:62%; height:1px; background:linear-gradient(90deg, transparent 0%, rgba(46,69,56,.4) 15%, rgba(46,69,56,.4) 85%, transparent 100%); z-index:3; }
        .f15-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f15-mast img { height:56px; width:auto; }
        /* Kicker */
        .f15-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f15-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Big serif title */
        .f15-head { position:absolute; top:230px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:110px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f15-head em { display:block; font-style:italic; color:#5a7060; }
        /* Below-horizon ways-to-participate chips */
        .f15-ways { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:14px; }
        .f15-ways .chip {
          padding:14px 18px; text-align:center; background:rgba(246,242,232,.14); border:1.5px solid rgba(246,242,232,.6);
          font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:#f6f2e8;
        }
        .f15-ways .chip .em { display:block; margin-top:6px; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        /* Sub call-out */
        .f15-note { position:absolute; left:76px; right:76px; bottom:118px; z-index:6; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.012em; color:#e0d6bc; text-align:center; }
        /* Foot */
        .f15-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.75); }
      `,
      body: (ctx) => `
        <div class="f15">
          <div class="f15-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Horizon 15 · The Bigger Frame</span>
          </div>
          <span class="f15-kick">Get involved</span>
          <h1 class="f15-head">Be Part of Something<em>Bigger for Oregon.</em></h1>
          <div class="f15-horizon"></div>
          <div class="f15-ways">
            <div class="chip">Volunteer<span class="em">— show up</span></div>
            <div class="chip">Support<span class="em">— a candidate</span></div>
            <div class="chip">Attend<span class="em">— an event</span></div>
            <div class="chip">Start<span class="em">— a conversation</span></div>
          </div>
          <p class="f15-note">Let's build that future, together.</p>
          <div class="f15-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 16 — Practical solutions for public safety
     Creative direction: field-report tri-panel. Three
     "evidence" cards side-by-side — family / business / child
     — each with an icon and italic pledge. Manifesto below.
  -------------------------------------------------------- */
  {
    id: 'feed-16-practical-solutions',
    tag: 'Issues',
    title: 'Practical solutions for public safety',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Every family deserves to feel confident walking through their neighborhood.\n\nEvery business deserves customers who feel comfortable visiting.\n\nEvery child deserves safe parks, schools, and public spaces.\n\nNorthwest Oregon PAC supports policies that strengthen community partnerships, improve public safety, and preserve the quality of life that makes our region a great place to call home.\n\nSafe communities benefit everyone. Share this post if you agree.\n\n#NorthwestOregon #CommunitySafety #PublicSafety #StrongerCommunities #Leadership #Oregon",
    data: {
      css: `
        .f16 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(224,214,188,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f16-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f16-mast img { height:56px; width:auto; }
        .f16-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f16-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f16-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:74px; line-height:.98; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f16-head em { font-style:italic; color:#5a7060; }
        /* Three evidence cards */
        .f16-panels { position:absolute; left:76px; right:76px; top:430px; z-index:6; display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
        .f16-panel { padding:20px 20px 22px; background:rgba(246,242,232,.75); border:1.5px solid rgba(46,69,56,.35); box-shadow:0 20px 40px -22px rgba(46,69,56,.35); display:flex; flex-direction:column; gap:12px; }
        .f16-panel .head { display:flex; align-items:center; justify-content:space-between; padding-bottom:10px; border-bottom:1px solid rgba(46,69,56,.35); font-family:var(--font-mono); font-size:11px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f16-panel .head .n { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f16-panel svg { width:64px; height:64px; color:#5a7060; margin:6px 0; }
        .f16-panel .lbl { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f16-panel .v { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; line-height:1.16; letter-spacing:-.012em; color:#2e4538; }
        .f16-panel .v em { font-style:normal; color:#6b5a42; }
        /* Manifesto strip */
        .f16-mani { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:18px; border-top:1.5px solid rgba(46,69,56,.35); display:flex; align-items:baseline; gap:22px; }
        .f16-mani .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); flex:none; }
        .f16-mani .v { flex:1; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.2; letter-spacing:-.012em; color:#2e4538; }
        .f16-mani .v em { font-style:normal; color:#5a7060; }
        /* Foot */
        .f16-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f16">
          <div class="f16-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Report 16 · Public Safety</span>
          </div>
          <span class="f16-kick">Public safety</span>
          <h1 class="f16-head">Practical solutions for<em>public safety.</em></h1>
          <div class="f16-panels">
            <div class="f16-panel">
              <div class="head"><span>Every family</span><span class="n">01</span></div>
              <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="20" cy="20" r="6"/>
                <circle cx="40" cy="20" r="6"/>
                <path d="M8 48 C 8 38 15 34 20 34 C 25 34 32 38 32 48"/>
                <path d="M28 48 C 28 38 35 34 40 34 C 45 34 52 38 52 48"/>
              </svg>
              <span class="lbl">— Deserves</span>
              <p class="v">To feel <em>confident</em> walking through their neighborhood.</p>
            </div>
            <div class="f16-panel">
              <div class="head"><span>Every business</span><span class="n">02</span></div>
              <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 24 L10 50 L50 50 L50 24"/>
                <path d="M6 24 L14 12 L46 12 L54 24 Z"/>
                <path d="M24 50 L24 34 L36 34 L36 50"/>
              </svg>
              <span class="lbl">— Deserves</span>
              <p class="v">Customers who feel <em>comfortable</em> visiting.</p>
            </div>
            <div class="f16-panel">
              <div class="head"><span>Every child</span><span class="n">03</span></div>
              <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="30" cy="16" r="6"/>
                <path d="M30 22 L30 42"/>
                <path d="M18 34 L42 34"/>
                <path d="M30 42 L22 54"/>
                <path d="M30 42 L38 54"/>
                <circle cx="14" cy="46" r="4"/>
                <circle cx="46" cy="46" r="4"/>
              </svg>
              <span class="lbl">— Deserves</span>
              <p class="v">Safe <em>parks, schools,</em> and public spaces.</p>
            </div>
          </div>
          <div class="f16-mani"><span class="k">— The support</span><p class="v">We support practical solutions that help law enforcement, first responders, and local communities work together to <em>reduce crime,</em> improve public spaces, and keep Northwest Oregon a place where families and businesses can grow.</p></div>
          <div class="f16-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 17 — Education & Workforce Development
     Creative direction: diploma / parchment scroll. Cream
     parchment centered on sand ground, italic serif title,
     "Class of 2026" ribbon, tassel accent.
  -------------------------------------------------------- */
  {
    id: 'feed-17-education-workforce',
    tag: 'Issues',
    title: 'Education & Workforce Development',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Northwest Oregon's students need classrooms that inspire learning, career pathways that reflect today's economy, and the skills to succeed wherever their ambitions lead.\n\nBy connecting education with real-world opportunities, we can build a stronger workforce and a stronger region.\n\nWhat skill do you think every student should graduate with?\n\n#Education #NorthwestOregon #FutureReady #CareerPathways #WorkforceDevelopment",
    data: {
      css: `
        .f17 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 10%, rgba(224,214,188,.6) 0%, transparent 55%),
            linear-gradient(180deg, #ecdfb4 0%, #cfb87a 100%);
          color:#2e4538;
        }
        .f17::before {
          content:''; position:absolute; inset:0; opacity:.3; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .f17-mast { position:absolute; top:56px; left:76px; right:76px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f17-mast img { height:56px; width:auto; }
        /* Parchment */
        .f17-parch { position:absolute; top:170px; bottom:150px; left:80px; right:80px; z-index:5;
          background:
            radial-gradient(120% 90% at 20% 15%, rgba(255,250,235,.9) 0%, rgba(240,232,206,.9) 100%);
          border:1.5px solid rgba(46,69,56,.4);
          box-shadow:0 30px 60px -30px rgba(46,69,56,.5), inset 0 1px 0 rgba(255,255,255,.6);
          padding:34px 46px 40px;
          display:flex; flex-direction:column;
        }
        .f17-parch::before { content:''; position:absolute; inset:14px; border:1px double #2e4538; pointer-events:none; }
        /* Scroll top curl */
        .f17-parch::after {
          content:''; position:absolute; left:0; right:0; top:-4px; height:14px;
          background:linear-gradient(180deg, rgba(140,110,60,.3) 0%, transparent 100%);
        }
        /* Corner ornaments */
        .f17-corner { position:absolute; font-family:var(--font-display); font-style:italic; font-size:48px; color:#5a7060; letter-spacing:-.02em; }
        .f17-corner.tl { top:14px; left:22px; }
        .f17-corner.tr { top:14px; right:22px; }
        .f17-corner.bl { bottom:18px; left:22px; }
        .f17-corner.br { bottom:18px; right:22px; }
        /* Header row */
        .f17-parch .head { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid #2e4538; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f17-parch .head .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Priority kicker */
        .f17-parch .prio { margin-top:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f17-parch .prio::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Big title */
        .f17-parch .title { margin-top:14px; font-family:var(--font-display); font-weight:500; font-size:80px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f17-parch .title em { display:block; font-style:italic; color:#5a7060; }
        /* Subtitle */
        .f17-parch .sub { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:32px; line-height:1.16; letter-spacing:-.015em; color:rgba(46,69,56,.85); }
        /* Body paragraph */
        .f17-parch .body { margin-top:22px; padding-top:16px; border-top:1.5px dashed rgba(46,69,56,.45); font-family:var(--font-display); font-weight:500; font-size:26px; line-height:1.24; letter-spacing:-.012em; color:#2e4538; max-width:840px; }
        .f17-parch .body em { font-style:italic; color:#6b5a42; }
        /* Ribbon at bottom */
        .f17-parch .ribbon { margin-top:auto; padding-top:18px; border-top:1.5px solid rgba(46,69,56,.4); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f17-parch .ribbon .class {
          padding:8px 18px; background:#2e4538; color:#f6f2e8;
          font-family:var(--font-mono); font-weight:600; font-size:14px; letter-spacing:.4em;
        }
        .f17-parch .ribbon .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f17-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f17">
          <div class="f17-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Diploma 17 · Priority 04</span>
          </div>
          <div class="f17-parch">
            <span class="f17-corner tl">§</span>
            <span class="f17-corner tr">§</span>
            <span class="f17-corner bl">§</span>
            <span class="f17-corner br">§</span>
            <div class="head"><span>The Northwest Diploma</span><span class="em">Priority · 04</span><span>No. 17</span></div>
            <span class="prio">— Awarded to the next generation</span>
            <h1 class="title">Education & Workforce<em>Development</em></h1>
            <p class="sub">Preparing today's students for tomorrow's opportunities.</p>
            <p class="body">Northwest Oregon's students need classrooms that <em>inspire learning,</em> career pathways that reflect today's economy, and the skills to succeed wherever their ambitions lead.</p>
            <div class="ribbon"><span class="class">Class of 2026</span><span class="em">— A stronger workforce, a stronger region.</span></div>
          </div>
          <div class="f17-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 18 — Northwest Oregon is worth fighting for.
     Creative direction: planted field flag. Forest ground
     with a hand-drawn flag pole planted in the earth flying
     a rippled pennant carrying the manifesto.
  -------------------------------------------------------- */
  {
    id: 'feed-18-worth-fighting-for',
    tag: 'Beliefs',
    title: 'Northwest Oregon is worth fighting for.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "For years, Northwest Oregon has been treated like an afterthought.\n\nWhen races are considered \"unwinnable,\" investment disappears. Volunteers disappear. Candidates stop running.\n\nCommunities deserve better than that.\n\nNorthwest Oregon PAC exists because we believe every district deserves competition, every voter deserves a choice, and every community deserves someone willing to fight for it.\n\nWe're not waiting for someone else to invest in our region.\n\nWe're building it ourselves.",
    data: {
      css: `
        .f18 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 30%, rgba(90,112,96,.35) 0%, transparent 55%),
            radial-gradient(120% 100% at 50% 100%, rgba(14,22,17,.9) 0%, transparent 65%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f18::before {
          content:''; position:absolute; inset:0; opacity:.14; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.28  0 0 0 0 0.26  0 0 0 0 0.22  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:screen;
        }
        /* Earth line at bottom */
        .f18-earth { position:absolute; left:0; right:0; bottom:120px; height:1px; background:linear-gradient(90deg, transparent 5%, rgba(224,214,188,.5) 20%, rgba(224,214,188,.5) 80%, transparent 95%); z-index:3; }
        .f18-mast { position:absolute; top:56px; left:76px; right:76px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f18-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f18-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f18-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Flag composition — kept on left column only */
        .f18-flag { position:absolute; top:260px; left:64px; width:440px; height:360px; z-index:5; }
        .f18-flag svg { display:block; width:100%; height:100%; }
        /* Big italic serif manifesto — clear of the flag column */
        .f18-manifesto { position:absolute; top:270px; left:560px; right:76px; z-index:6; }
        .f18-manifesto .k { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); }
        .f18-manifesto .head { margin-top:14px; font-family:var(--font-display); font-weight:500; font-size:50px; line-height:1.04; letter-spacing:-.028em; color:#f6f2e8; }
        .f18-manifesto .head em { font-style:italic; color:#e0d6bc; }
        .f18-manifesto .sub { margin-top:22px; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:28px; line-height:1.22; letter-spacing:-.015em; color:rgba(246,242,232,.9); }
        .f18-manifesto .sub em { font-style:normal; color:#e0d6bc; }
        /* Building strip */
        .f18-sig { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f18-sig .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f18-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f18">
          <div class="f18-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Flag 18 · Our Commitment</span>
          </div>
          <span class="f18-kick">Our commitment</span>
          <div class="f18-flag">
            <svg viewBox="0 0 440 360" fill="none">
              <!-- Pole -->
              <line x1="70" y1="20" x2="70" y2="340" stroke="#e0d6bc" stroke-width="6" stroke-linecap="round"/>
              <circle cx="70" cy="18" r="9" fill="#e0d6bc"/>
              <!-- Pennant with wave -->
              <path d="M70 40 L340 60 L410 80 L340 100 L70 120 Z" fill="url(#f18grad)" stroke="#e0d6bc" stroke-width="2"/>
              <defs>
                <linearGradient id="f18grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#5a7060" stop-opacity="0.9"/>
                  <stop offset="50%" stop-color="#2e4538" stop-opacity="0.9"/>
                  <stop offset="100%" stop-color="#1c2b23" stop-opacity="0.9"/>
                </linearGradient>
              </defs>
              <!-- Text inside pennant -->
              <text x="95" y="90" font-family="Lora" font-style="italic" font-weight="500" font-size="34" fill="#f6f2e8" letter-spacing="-1">Worth fighting for.</text>
              <!-- Second smaller pennant below — resized to fit label -->
              <path d="M70 190 L300 210 L360 225 L300 240 L70 255 Z" fill="#e0d6bc" opacity="0.9"/>
              <text x="90" y="232" font-family="Source Sans 3" font-weight="600" font-size="11" fill="#2e4538" letter-spacing="3">EST. 2026 · PLANTED HERE</text>
              <!-- Pole shadow into ground -->
              <path d="M40 340 L100 340 L90 360 L50 360 Z" fill="#6b5a42" opacity="0.5"/>
              <!-- Small tuft grass -->
              <path d="M10 338 L16 320 M22 338 L26 328 M34 338 L42 324 M110 338 L118 328 M128 338 L138 324 M146 338 L154 330" stroke="#5a7060" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="f18-manifesto">
            <span class="k">The pledge</span>
            <h1 class="head">Northwest Oregon is<em>worth fighting for.</em></h1>
            <p class="sub">We're not waiting for someone else to invest in our region. <em>We're building it ourselves.</em></p>
          </div>
          <div class="f18-earth"></div>
          <div class="f18-sig"><span>Every district deserves competition</span><span class="em">— And a fight worth having.</span></div>
          <div class="f18-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 19 — Every dollar raised here…
     Creative direction: closed-loop diagram. Three nodes in
     a circular flow (dollar → campaigns → community → back),
     each with italic labels. Reinforces "stays here."
  -------------------------------------------------------- */
  {
    id: 'feed-19-every-dollar-here',
    tag: 'Support',
    title: 'Every dollar raised here...',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "This PAC wasn't created to send resources somewhere else.\n\nIt was created to keep them here.\n\nEvery contribution, volunteer hour, endorsement, and conversation helps strengthen Northwest Oregon, not just one candidate.\n\nThat's how lasting political infrastructure is built.",
    data: {
      css: `
        .f19 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f19-mast { position:absolute; top:56px; left:76px; right:76px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f19-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f19-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f19-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f19-head { position:absolute; top:220px; left:76px; right:520px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:1; letter-spacing:-.028em; color:#f6f2e8; }
        .f19-head em { display:block; font-style:italic; color:#e0d6bc; }
        /* Loop diagram right side */
        .f19-loop { position:absolute; top:200px; right:60px; width:440px; height:440px; z-index:5; }
        .f19-loop svg { display:block; width:100%; height:100%; }
        /* Three rows below */
        .f19-rows { position:absolute; left:76px; right:76px; bottom:180px; z-index:6; display:flex; flex-direction:column; gap:14px; }
        .f19-rows .row { display:grid; grid-template-columns:auto 1fr auto; gap:22px; align-items:baseline; padding-bottom:12px; border-bottom:1px solid rgba(246,242,232,.28); }
        .f19-rows .row .n { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.5); min-width:52px; }
        .f19-rows .row .k { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; line-height:1.2; letter-spacing:-.012em; color:#e0d6bc; }
        .f19-rows .row .v { font-family:var(--font-display); font-weight:500; font-size:22px; line-height:1.2; letter-spacing:-.012em; color:#f6f2e8; text-align:right; }
        .f19-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; padding-top:14px; border-top:1.5px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f19-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f19-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f19">
          <div class="f19-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Circuit 19 · Raised Here</span>
          </div>
          <span class="f19-kick">Raised here. Invested here.</span>
          <h1 class="f19-head">Every dollar raised here<em>stays here.</em></h1>
          <div class="f19-loop">
            <svg viewBox="0 0 440 440" fill="none" stroke="#e0d6bc" stroke-width="1.8">
              <!-- Circular flow -->
              <circle cx="220" cy="220" r="160" stroke-dasharray="6 6" opacity="0.5"/>
              <!-- Three nodes — enlarged to fit labels comfortably -->
              <g>
                <circle cx="220" cy="60" r="60" fill="#1c2b23" stroke="#e0d6bc"/>
                <text x="220" y="52" font-family="Source Sans 3" font-size="10" fill="#e0d6bc" text-anchor="middle" stroke="none" letter-spacing="2.5">DOLLAR</text>
                <text x="220" y="80" font-family="Lora" font-style="italic" font-size="26" fill="#f6f2e8" text-anchor="middle" stroke="none">$1</text>
              </g>
              <g>
                <circle cx="60" cy="320" r="60" fill="#1c2b23" stroke="#e0d6bc"/>
                <text x="60" y="312" font-family="Source Sans 3" font-size="9" fill="#e0d6bc" text-anchor="middle" stroke="none" letter-spacing="2">CAMPAIGNS</text>
                <text x="60" y="338" font-family="Lora" font-style="italic" font-size="15" fill="#f6f2e8" text-anchor="middle" stroke="none">built here</text>
              </g>
              <g>
                <circle cx="380" cy="320" r="60" fill="#1c2b23" stroke="#e0d6bc"/>
                <text x="380" y="312" font-family="Source Sans 3" font-size="9" fill="#e0d6bc" text-anchor="middle" stroke="none" letter-spacing="2">COMMUNITY</text>
                <text x="380" y="338" font-family="Lora" font-style="italic" font-size="15" fill="#f6f2e8" text-anchor="middle" stroke="none">forward</text>
              </g>
              <!-- Arrows on the ring -->
              <path d="M300 100 L316 88 L318 108" fill="#e0d6bc" stroke="none"/>
              <path d="M380 260 L392 244 L400 262" fill="#e0d6bc" stroke="none"/>
              <path d="M220 380 L204 372 L228 358" fill="#e0d6bc" stroke="none"/>
              <path d="M60 260 L48 244 L40 262" fill="#e0d6bc" stroke="none"/>
              <path d="M140 100 L124 108 L126 88" fill="#e0d6bc" stroke="none"/>
              <!-- Center note -->
              <text x="220" y="216" font-family="Source Sans 3" font-size="11" fill="rgba(246,242,232,0.6)" text-anchor="middle" stroke="none" letter-spacing="3">CLOSED LOOP</text>
              <text x="220" y="240" font-family="Lora" font-style="italic" font-size="20" fill="#e0d6bc" text-anchor="middle" stroke="none">the region</text>
            </svg>
          </div>
          <div class="f19-rows">
            <div class="row"><span class="n">01</span><span class="k">Every dollar raised here…</span><span class="v">helps build campaigns here.</span></div>
            <div class="row"><span class="n">02</span><span class="k">Every volunteer recruited here…</span><span class="v">helps strengthen communities here.</span></div>
            <div class="row"><span class="n">03</span><span class="k">Every conversation started here…</span><span class="v">helps Northwest Oregon move forward.</span></div>
          </div>
          <div class="f19-sig"><span>Not sent somewhere else</span><span class="em">— Kept here.</span></div>
          <div class="f19-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 20 — Northwest Oregon deserves more than campaign
     promises.
     Creative direction: growth-rings cross-section. Sand
     ground with concentric tree-rings on the right; each
     ring labeled with an outcome that grows across cycles.
     Manifesto lives on the left column.
  -------------------------------------------------------- */
  {
    id: 'feed-20-more-than-promises',
    tag: 'Beliefs',
    title: 'Northwest Oregon deserves more than campaign promises.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Election cycles come and go. Communities remain.\n\nThat's why our work isn't measured only by wins on Election Night.\n\nIt's measured by stronger local organizations...\n\nmore qualified candidates...\n\nmore engaged citizens...\n\nand communities that finally have a voice again.\n\nThat's the future we're building.",
    data: {
      css: `
        .f20 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(224,214,188,.5) 0%, transparent 55%),
            linear-gradient(180deg, #efe6cd 0%, #cfb87a 100%);
          color:#2e4538;
        }
        .f20::before {
          content:''; position:absolute; inset:0; opacity:.28; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .f20-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f20-mast img { height:56px; width:auto; }
        .f20-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f20-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Left manifesto column */
        .f20-manifesto { position:absolute; top:230px; left:76px; width:480px; z-index:6; }
        .f20-manifesto .head { font-family:var(--font-display); font-weight:500; font-size:64px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f20-manifesto .head em { display:block; font-style:italic; color:#5a7060; }
        .f20-manifesto .sub { margin-top:22px; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.24; letter-spacing:-.015em; color:rgba(46,69,56,.85); }
        /* Right growth-rings */
        .f20-rings { position:absolute; top:210px; right:60px; width:460px; height:460px; z-index:5; }
        .f20-rings svg { display:block; width:100%; height:100%; }
        /* Bottom manifesto strip */
        .f20-strip { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:18px; border-top:1.5px solid rgba(46,69,56,.4); display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:14px; }
        .f20-strip .c { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f20-strip .c .em { display:block; margin-top:6px; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f20-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; text-align:center; }
        .f20-sig em { font-style:normal; color:#5a7060; }
        .f20-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f20">
          <div class="f20-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Rings 20 · Beyond Election Day</span>
          </div>
          <span class="f20-kick">Beyond Election Day</span>
          <div class="f20-manifesto">
            <h1 class="head">Northwest Oregon deserves<em>more than campaign promises.</em></h1>
            <p class="sub">It deserves people willing to stay after Election Day.</p>
          </div>
          <div class="f20-rings">
            <svg viewBox="0 0 460 460" fill="none">
              <!-- Concentric growth rings (irregular for organic feel) -->
              <circle cx="230" cy="230" r="200" stroke="rgba(46,69,56,.42)" stroke-width="1.4" fill="none"/>
              <circle cx="232" cy="228" r="164" stroke="rgba(46,69,56,.45)" stroke-width="1.3" fill="none"/>
              <circle cx="228" cy="232" r="128" stroke="rgba(46,69,56,.5)" stroke-width="1.3" fill="none"/>
              <circle cx="230" cy="230" r="94" stroke="rgba(46,69,56,.55)" stroke-width="1.4" fill="none"/>
              <circle cx="232" cy="228" r="62" stroke="rgba(46,69,56,.6)" stroke-width="1.4" fill="none"/>
              <circle cx="230" cy="230" r="30" fill="#2e4538" stroke="#e0d6bc" stroke-width="1.4"/>
              <text x="230" y="228" font-family="Source Sans 3" font-size="10" fill="#e0d6bc" text-anchor="middle" letter-spacing="2.5">CORE</text>
              <text x="230" y="244" font-family="Lora" font-style="italic" font-size="14" fill="#e0d6bc" text-anchor="middle">2026</text>
              <!-- Ring labels -->
              <line x1="290" y1="230" x2="380" y2="180" stroke="rgba(46,69,56,.5)" stroke-width="1"/>
              <text x="384" y="178" font-family="Source Sans 3" font-size="10" fill="#2e4538" letter-spacing="2.5">STRONGER ORGS</text>
              <line x1="326" y1="230" x2="420" y2="240" stroke="rgba(46,69,56,.5)" stroke-width="1"/>
              <text x="424" y="244" font-family="Source Sans 3" font-size="10" fill="#2e4538" letter-spacing="2.5">MORE CANDIDATES</text>
              <line x1="358" y1="230" x2="410" y2="330" stroke="rgba(46,69,56,.5)" stroke-width="1"/>
              <text x="286" y="378" font-family="Source Sans 3" font-size="10" fill="#2e4538" letter-spacing="2.5">ENGAGED CITIZENS</text>
              <line x1="230" y1="380" x2="180" y2="430" stroke="rgba(46,69,56,.5)" stroke-width="1"/>
              <text x="20" y="440" font-family="Source Sans 3" font-size="10" fill="#2e4538" letter-spacing="2.5">A VOICE, RESTORED</text>
              <!-- Radial hairlines for growth grain -->
              <line x1="230" y1="30" x2="230" y2="430" stroke="rgba(46,69,56,.15)" stroke-width="0.8"/>
              <line x1="30" y1="230" x2="430" y2="230" stroke="rgba(46,69,56,.15)" stroke-width="0.8"/>
            </svg>
          </div>
          <div class="f20-strip">
            <div class="c">— Ring 01<span class="em">Local orgs</span></div>
            <div class="c">— Ring 02<span class="em">Qualified candidates</span></div>
            <div class="c">— Ring 03<span class="em">Engaged citizens</span></div>
            <div class="c">— Ring 04<span class="em">A voice again</span></div>
          </div>
          <p class="f20-sig">Election cycles come and go. <em>Communities remain.</em></p>
          <div class="f20-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 21 — Affordable energy isn't just an economic issue.
     Creative direction: utility bill / statement composed as
     an editorial invoice. Cream statement sheet with line
     items (affordability, reliability, resilience) and italic
     paid stamp.
  -------------------------------------------------------- */
  {
    id: 'feed-21-affordable-energy',
    tag: 'Issues',
    title: "Affordable energy isn't just an economic issue.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Energy touches nearly every part of our daily lives, from heating our homes to keeping small businesses open.\n\nNorthwest Oregon PAC believes families shouldn't have to choose between managing monthly expenses and keeping the lights on. We support practical energy policies that prioritize affordability, reliability, and long-term resilience for our communities.",
    data: {
      css: `
        .f21 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(224,214,188,.5) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2a2a26;
        }
        .f21-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f21-mast img { height:56px; width:auto; }
        /* Statement paper */
        .f21-bill { position:absolute; top:170px; bottom:130px; left:80px; right:80px; z-index:5;
          background:#f9f4de; border:1.5px solid rgba(46,69,56,.4);
          box-shadow:0 30px 60px -30px rgba(46,69,56,.4);
          padding:34px 40px 30px;
          display:flex; flex-direction:column;
        }
        .f21-bill .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid #2e4538; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f21-bill .header .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f21-bill .to { margin-top:20px; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f21-bill .to .n { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f21-bill .kick { margin-top:20px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f21-bill .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f21-bill .head { margin-top:10px; font-family:var(--font-display); font-weight:500; font-size:64px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f21-bill .head em { font-style:italic; color:#5a7060; }
        .f21-bill .sub { margin-top:12px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; letter-spacing:-.012em; color:rgba(46,69,56,.85); }
        /* Line items */
        .f21-bill .items { margin-top:22px; display:flex; flex-direction:column; gap:12px; }
        .f21-bill .item { display:grid; grid-template-columns:44px 1fr auto; gap:14px; align-items:baseline; padding-bottom:10px; border-bottom:1px dashed rgba(46,69,56,.4); font-family:var(--font-display); font-weight:500; font-size:22px; letter-spacing:-.012em; color:#2e4538; }
        .f21-bill .item .n { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); }
        .f21-bill .item .k { font-style:italic; }
        .f21-bill .item .k em { font-style:normal; color:#6b5a42; }
        .f21-bill .item .v { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        /* Total */
        .f21-bill .total { margin-top:auto; padding-top:16px; border-top:2px double #2e4538; display:flex; align-items:baseline; justify-content:space-between; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f21-bill .total .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Paid stamp */
        .f21-stamp {
          position:absolute; top:190px; right:40px; z-index:7;
          border:3px solid #5a7060; padding:10px 20px; border-radius:4px;
          transform:rotate(-6deg);
          font-family:var(--font-mono); font-weight:700; font-size:18px; letter-spacing:.36em; text-transform:uppercase;
          color:#5a7060;
        }
        .f21-stamp small { display:block; margin-top:2px; font-size:9px; letter-spacing:.4em; color:rgba(90,112,96,.85); }
        .f21-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f21">
          <div class="f21-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Statement 21 · Affordable Energy</span>
          </div>
          <div class="f21-bill">
            <div class="header"><span>The Northwest Statement</span><span class="em">Affordable Energy</span><span>No. 21</span></div>
            <div class="to"><span>Billed to</span><span class="n">Every household in Northwest Oregon</span></div>
            <span class="kick">Family issue, not just economic</span>
            <h1 class="head">Affordable energy isn't just an <em>economic issue.</em></h1>
            <p class="sub">It's a family issue. When utility bills rise, every household feels it.</p>
            <div class="items">
              <div class="item"><span class="n">01</span><span class="k">Affordability <em>— monthly bills that stay manageable</em></span><span class="v">— Required</span></div>
              <div class="item"><span class="n">02</span><span class="k">Reliability <em>— lights on, businesses open</em></span><span class="v">— Required</span></div>
              <div class="item"><span class="n">03</span><span class="k">Long-term resilience <em>— practical policy</em></span><span class="v">— Required</span></div>
            </div>
            <div class="total"><span>Total due to Oregon families</span><span class="em">— Both affordability and reliability.</span></div>
          </div>
          <span class="f21-stamp">Paid attention<small>— By Northwest Oregon PAC —</small></span>
          <div class="f21-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 22 — Powered by innovation
     Creative direction: horizontal era timeline. Five sectors
     plotted along a time-axis: hydropower → forestry →
     agriculture → manufacturing → emerging tech. Each node
     has an icon and mono era label.
  -------------------------------------------------------- */
  {
    id: 'feed-22-powered-by-innovation',
    tag: 'Issues',
    title: 'Northwest Oregon has always been powered by innovation.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "Northwest Oregon's strength has always come from its ability to adapt.\n\nOur communities have never relied on a single industry or a single solution. We believe the same approach should guide our energy future—supporting reliable infrastructure, encouraging innovation, and protecting affordability for the people and businesses that call this region home.\n\nA resilient future starts with balanced decisions. Share if you agree.",
    data: {
      css: `
        .f22 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f22-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f22-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f22-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f22-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f22-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1.02; letter-spacing:-.028em; color:#f6f2e8; max-width:900px; }
        .f22-head em { display:block; font-style:italic; color:#e0d6bc; }
        /* Timeline strip — pushed lower, more clearance from headline */
        .f22-timeline { position:absolute; left:76px; right:76px; top:520px; z-index:5; padding-top:24px; border-top:1.5px solid rgba(224,214,188,.55); }
        .f22-timeline .rail { position:relative; height:150px; }
        .f22-timeline .rail::before { content:''; position:absolute; left:0; right:0; top:20px; height:1px; background:linear-gradient(90deg, rgba(224,214,188,.6), rgba(224,214,188,.35)); }
        .f22-timeline .node { position:absolute; top:0; display:flex; flex-direction:column; align-items:center; gap:8px; width:16%; text-align:center; }
        .f22-timeline .node .dot { width:22px; height:22px; border-radius:999px; background:#e0d6bc; border:3px solid #2e4538; box-shadow:0 4px 8px rgba(0,0,0,.4); }
        .f22-timeline .node .year { font-family:var(--font-mono); font-size:10px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.5); }
        .f22-timeline .node .name { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:20px; line-height:1.14; letter-spacing:-.015em; color:#e0d6bc; margin-top:2px; min-height:44px; display:flex; align-items:center; justify-content:center; text-align:center; padding:0 4px; }
        .f22-timeline .node.n1 { left:0; }
        .f22-timeline .node.n2 { left:20%; }
        .f22-timeline .node.n3 { left:40%; }
        .f22-timeline .node.n4 { left:60%; }
        .f22-timeline .node.n5 { left:80%; }
        /* Body strip */
        .f22-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(224,214,188,.35); font-family:var(--font-display); font-weight:500; font-size:26px; line-height:1.24; letter-spacing:-.012em; color:rgba(246,242,232,.94); max-width:900px; }
        .f22-body em { font-style:italic; color:#e0d6bc; }
        .f22-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:flex; align-items:baseline; justify-content:space-between; }
        .f22-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f22-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f22">
          <div class="f22-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Timeline 22 · A Resilient Future</span>
          </div>
          <span class="f22-kick">A resilient future</span>
          <h1 class="f22-head">Northwest Oregon has always been<em>powered by innovation.</em></h1>
          <div class="f22-timeline">
            <div class="rail">
              <div class="node n1"><span class="dot"></span><span class="year">— Era 01</span><span class="name">Hydropower</span></div>
              <div class="node n2"><span class="dot"></span><span class="year">— Era 02</span><span class="name">Forestry</span></div>
              <div class="node n3"><span class="dot"></span><span class="year">— Era 03</span><span class="name">Agriculture</span></div>
              <div class="node n4"><span class="dot"></span><span class="year">— Era 04</span><span class="name">Manufacturing</span></div>
              <div class="node n5"><span class="dot"></span><span class="year">— Era 05</span><span class="name">Emerging tech</span></div>
            </div>
          </div>
          <p class="f22-body">From hydropower and forestry to agriculture, manufacturing, and emerging technologies, our region succeeds when we build on the resources that make <em>Oregon unique.</em></p>
          <div class="f22-sig"><span>Balanced decisions</span><span class="em">— A resilient future.</span></div>
          <div class="f22-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 23 — Our priorities aren't chosen in Salem.
     Creative direction: regional priorities compass. Sand
     ground with a compass rose SVG center, five priorities
     radiating outward, italic serif headline above.
  -------------------------------------------------------- */
  {
    id: 'feed-23-priorities-nw',
    tag: 'Issues',
    title: 'Our priorities aren\'t chosen in Salem.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Every priority we champion begins with listening.\n\nThe issues facing Astoria aren\'t always the same as those in Hillsboro or Tillamook—but across Northwest Oregon, we hear common themes: affordability, opportunity, safety, accountability, and a desire for practical leadership.\n\nThat\'s why these five priorities guide everything we do.',
    data: {
      css: `
        .f23 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f0e6cd 0%, #d6c493 100%);
          color:#2e4538;
        }
        .f23-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f23-mast img { height:56px; width:auto; }
        .f23-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f23-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f23-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1.02; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f23-head em { font-style:italic; color:#5a7060; }
        /* Compass center */
        .f23-compass { position:absolute; left:calc(50% - 200px); top:400px; width:400px; height:400px; z-index:5; }
        .f23-compass svg { display:block; width:100%; height:100%; }
        /* Priority label overlays around compass — pushed outward */
        .f23-lbl { position:absolute; z-index:6; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f23-lbl .em { display:block; margin-top:6px; font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2e4538; text-transform:none; line-height:1.14; }
        .f23-lbl.n { top:360px; left:calc(50% - 110px); width:220px; text-align:center; }
        .f23-lbl.ne { top:440px; right:44px; width:200px; text-align:left; }
        .f23-lbl.se { top:750px; right:44px; width:200px; text-align:left; }
        .f23-lbl.sw { top:750px; left:44px; width:200px; text-align:right; }
        .f23-lbl.nw { top:440px; left:44px; width:200px; text-align:right; }
        /* Footer */
        .f23-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f23">
          <div class="f23-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Compass 23 · Priorities Shaped Here</span>
          </div>
          <span class="f23-kick">Our priorities aren't chosen in Salem.</span>
          <h1 class="f23-head">They're shaped by conversations across<em>Northwest Oregon.</em></h1>
          <div class="f23-compass">
            <svg viewBox="0 0 400 400" fill="none" stroke="#2e4538" stroke-width="1.4">
              <circle cx="200" cy="200" r="180" opacity="0.35"/>
              <circle cx="200" cy="200" r="140" opacity="0.4"/>
              <circle cx="200" cy="200" r="100" opacity="0.5"/>
              <circle cx="200" cy="200" r="14" fill="#2e4538"/>
              <!-- Star points -->
              <path d="M200 40 L212 190 L360 200 L212 210 L200 360 L188 210 L40 200 L188 190 Z" fill="#5a7060" fill-opacity=".22" stroke="#2e4538" stroke-width="1.6"/>
              <text x="200" y="26" font-family="Source Sans 3" font-size="10" fill="#2e4538" text-anchor="middle" stroke="none" letter-spacing="3">N</text>
              <text x="384" y="204" font-family="Source Sans 3" font-size="10" fill="#2e4538" text-anchor="middle" stroke="none" letter-spacing="3">E</text>
              <text x="200" y="384" font-family="Source Sans 3" font-size="10" fill="#2e4538" text-anchor="middle" stroke="none" letter-spacing="3">S</text>
              <text x="16" y="204" font-family="Source Sans 3" font-size="10" fill="#2e4538" text-anchor="middle" stroke="none" letter-spacing="3">W</text>
            </svg>
          </div>
          <span class="f23-lbl n">— i.<span class="em">Supporting local businesses</span></span>
          <span class="f23-lbl ne">— ii.<span class="em">Responsible public spending</span></span>
          <span class="f23-lbl se">— iii.<span class="em">Safe communities</span></span>
          <span class="f23-lbl sw">— iv.<span class="em">Preparing students for tomorrow</span></span>
          <span class="f23-lbl nw">— v.<span class="em">Affordable, dependable energy</span></span>
          <div class="f23-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 24 — Building the foundation
     Creative direction: foundation plan / column diagram.
     Four load-bearing columns rise from a shared foundation
     slab, each labeled with a mission verb (Recruit /
     Strengthen / Organize / Ensure).
  -------------------------------------------------------- */
  {
    id: 'feed-24-foundation',
    tag: 'About',
    title: "We're building the foundation for Northwest Oregon's future.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Campaigns begin and end. Communities don't.\n\nThat's why Northwest Oregon PAC was created with a long-term vision: to develop leaders, support competitive candidates, invest in grassroots organization, and strengthen civic participation throughout our region.\n\nSuccess isn't measured only by Election Day.\n\nIt's measured by whether Northwest Oregon is stronger four years from now than it is today.\n\nIf you believe our region deserves long-term investment, not just election-season attention, follow along and be part of what's next.",
    data: {
      css: `
        .f24 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(224,214,188,.5) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f24-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f24-mast img { height:56px; width:auto; }
        .f24-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f24-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f24-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1.02; letter-spacing:-.028em; color:#2e4538; max-width:900px; }
        .f24-head em { display:block; font-style:italic; color:#5a7060; }
        /* Column diagram */
        .f24-cols { position:absolute; left:76px; right:76px; top:440px; height:280px; z-index:5; display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:22px; align-items:end; }
        .f24-col { position:relative; height:100%; display:flex; flex-direction:column; }
        .f24-col .cap { padding:14px 12px; background:#2e4538; color:#f6f2e8;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; text-align:center;
          margin-bottom:8px;
        }
        .f24-col .shaft { flex:1; background:linear-gradient(180deg, rgba(46,69,56,.2), rgba(46,69,56,.4)); border:1.5px solid rgba(46,69,56,.55); display:flex; align-items:center; justify-content:center; }
        .f24-col .shaft .word { transform:rotate(-90deg); font-family:var(--font-display); font-weight:500; font-style:italic; font-size:38px; line-height:1; letter-spacing:-.02em; color:#2e4538; white-space:nowrap; }
        .f24-col .base { padding:10px 12px; text-align:center; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); margin-top:8px; border-top:2px solid #2e4538; }
        /* Foundation slab */
        .f24-slab { position:absolute; left:76px; right:76px; top:720px; height:26px; z-index:4;
          background:repeating-linear-gradient(45deg, rgba(46,69,56,.28) 0 2px, transparent 2px 8px), #2e4538;
          border:1.5px solid #2e4538;
        }
        .f24-slab-lbl { position:absolute; left:76px; right:76px; top:750px; z-index:4; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f24-slab-lbl .em { font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Manifesto strip at bottom */
        .f24-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:14px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-weight:500; font-size:22px; line-height:1.24; letter-spacing:-.012em; color:#2e4538; max-width:920px; }
        .f24-body em { font-style:italic; color:#5a7060; }
        .f24-sig { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f24-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f24-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f24">
          <div class="f24-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Plan 24 · Foundation</span>
          </div>
          <span class="f24-kick">Our long-term vision</span>
          <h1 class="f24-head">We're building the foundation for<em>Northwest Oregon's future.</em></h1>
          <div class="f24-cols">
            <div class="f24-col"><span class="cap">Column 01</span><span class="shaft"><span class="word">Recruit</span></span><span class="base">— Leaders</span></div>
            <div class="f24-col"><span class="cap">Column 02</span><span class="shaft"><span class="word">Strengthen</span></span><span class="base">— Campaigns</span></div>
            <div class="f24-col"><span class="cap">Column 03</span><span class="shaft"><span class="word">Organize</span></span><span class="base">— Volunteers</span></div>
            <div class="f24-col"><span class="cap">Column 04</span><span class="shaft"><span class="word">Ensure</span></span><span class="base">— A voice</span></div>
          </div>
          <div class="f24-slab"></div>
          <div class="f24-slab-lbl"><span>Foundation slab</span><span class="em">— Northwest Oregon PAC</span></div>
          <p class="f24-body">Northwest Oregon PAC exists to recruit leaders, strengthen local campaigns, organize volunteers, and <em>ensure our communities have a stronger voice for years to come.</em></p>
          <div class="f24-sig"><span>Long-term investment</span><span class="em">— Not election-season attention.</span></div>
          <div class="f24-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 25 — Candidates standing up
     Creative direction: podium & spotlight stage. Forest
     ground with a warm spotlight ellipse illuminating a
     lectern silhouette; italic serif title beneath.
  -------------------------------------------------------- */
  {
    id: 'feed-25-candidates-intro',
    tag: 'Candidates',
    title: 'Candidates standing up for Northwest Oregon.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "Leadership is about earning trust, solving problems, and showing up for your community.\n\nOver the coming weeks, we'll introduce the candidates we're proud to support and the reasons we believe they're ready to serve Northwest Oregon.\n\nStay tuned and meet the candidates.\n\n#NorthwestOregonPAC #MeetTheCandidates #Election2026 #NorthwestOregon",
    data: {
      css: `
        .f25 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 50% at 50% 42%, rgba(224,214,188,.22) 0%, rgba(224,214,188,0) 55%),
            radial-gradient(90% 60% at 20% 5%, rgba(46,69,56,.5) 0%, transparent 55%),
            linear-gradient(178deg, #1c2b23 0%, #0a1310 60%, #050a07 100%);
          color:#f6f2e8;
        }
        .f25-mast { position:absolute; top:56px; left:76px; right:76px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f25-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f25-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f25-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Podium svg + pool of light */
        .f25-stage { position:absolute; top:230px; left:calc(50% - 200px); width:400px; height:340px; z-index:5; }
        .f25-stage .halo {
          position:absolute; left:calc(50% - 200px); top:20px; width:400px; height:220px;
          background:radial-gradient(circle at 50% 40%, rgba(255,236,192,.5) 0%, rgba(255,236,192,.15) 40%, rgba(255,236,192,0) 70%);
          filter:blur(6px);
        }
        .f25-stage svg { position:relative; z-index:2; display:block; margin:0 auto; width:220px; height:100%; color:#e0d6bc; }
        /* Big serif title */
        .f25-head { position:absolute; left:76px; right:76px; top:600px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1; letter-spacing:-.028em; color:#f6f2e8; }
        .f25-head em { display:block; font-style:italic; color:#e0d6bc; }
        /* Body */
        .f25-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.24; letter-spacing:-.012em; color:rgba(246,242,232,.9); max-width:920px; }
        .f25-body em { font-style:normal; color:#e0d6bc; }
        .f25-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f25-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f25-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f25">
          <div class="f25-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Stage 25 · Meet the Candidates</span>
          </div>
          <span class="f25-kick">Meet the candidates</span>
          <div class="f25-stage">
            <div class="halo"></div>
            <svg viewBox="0 0 220 340" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <!-- Podium -->
              <path d="M60 220 L60 320 L160 320 L160 220 Z" fill="currentColor" fill-opacity=".15"/>
              <path d="M60 220 L60 320 L160 320 L160 220 Z"/>
              <path d="M50 200 L170 200 L160 220 L60 220 Z"/>
              <path d="M50 200 L170 200"/>
              <line x1="110" y1="200" x2="110" y2="150"/>
              <circle cx="110" cy="140" r="8"/>
              <!-- Ground -->
              <line x1="20" y1="330" x2="200" y2="330"/>
            </svg>
          </div>
          <h1 class="f25-head">Candidates<em>standing up for Northwest Oregon.</em></h1>
          <p class="f25-body">This election, we're supporting candidates who are prepared to listen, serve, and work for the communities they represent, <em>not just during campaign season, but long after Election Day.</em></p>
          <div class="f25-sig"><span>Stay tuned</span><span class="em">— Meet the candidates.</span></div>
          <div class="f25-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 26 — Mark Norman
     Creative direction: campaign magazine cover. Full-bleed
     portrait with masthead across top, italic serif name
     lockup, District 27 dossier bar at base.
  -------------------------------------------------------- */
  {
    id: 'feed-26-mark-norman',
    tag: 'Candidates',
    title: 'The candidate. Mark Norman.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true, onPhoto: true },
    caption:
      "We're proud to support Mark Norman because he understands responsibility, leadership, and the importance of putting community first.\n\nGet to know Mark and his vision for District 27.\n\n#MarkNorman #HouseDistrict27 #NorthwestOregonPAC #Leadership #Election2026",
    data: {
      css: `
        .f26 { position:absolute; inset:0; z-index:10; overflow:hidden; background:#0a100c; color:#f6f2e8; }
        .f26 .bg { position:absolute; inset:0; z-index:1; }
        .f26 .bg img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.75) contrast(1.18) brightness(.78); }
        .f26 .bg::after {
          content:''; position:absolute; inset:0;
          background:
            linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(0,0,0,.95) 100%);
        }
        /* Masthead */
        .f26-mast { position:absolute; top:56px; left:76px; right:76px; z-index:5; padding-bottom:16px; border-bottom:1px solid rgba(246,242,232,.4); display:flex; align-items:center; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.85); text-shadow:0 2px 12px rgba(0,0,0,.5); }
        .f26-mast img { height:56px; width:auto; filter:brightness(1.05) drop-shadow(0 2px 12px rgba(0,0,0,.5)); }
        .f26-mast .title { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#f6f2e8; text-transform:none; }
        /* Kicker */
        .f26-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:#e0d6bc; text-shadow:0 2px 12px rgba(0,0,0,.5); display:inline-flex; align-items:center; gap:16px; }
        .f26-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Big name lockup */
        .f26-name { position:absolute; left:76px; right:76px; bottom:340px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:120px; line-height:.96; letter-spacing:-.028em; color:#f6f2e8; text-shadow:0 4px 30px rgba(0,0,0,.6); }
        .f26-name em { font-style:italic; color:#e0d6bc; }
        .f26-name .lbl { display:block; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.75); margin-bottom:12px; text-shadow:0 2px 12px rgba(0,0,0,.5); }
        /* District bar */
        .f26-bar { position:absolute; left:76px; right:76px; bottom:200px; z-index:6; padding:14px 22px; background:rgba(246,242,232,.14); border:1px solid rgba(246,242,232,.4); display:flex; align-items:center; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(246,242,232,.85); backdrop-filter:blur(4px); }
        .f26-bar .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        /* Bio */
        .f26-bio { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; line-height:1.22; letter-spacing:-.012em; color:rgba(246,242,232,.9); text-shadow:0 2px 12px rgba(0,0,0,.5); max-width:920px; }
        .f26-bio em { font-style:normal; color:#e0d6bc; }
        .f26-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f26">
          <div class="bg"><img src="${ctx.prefix}img/mark-norman.jpg" alt="Mark Norman" /></div>
          <div class="f26-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span class="title">The Candidate Cover · No. 26</span>
            <span>Est. 2026</span>
          </div>
          <span class="f26-kick">The candidate</span>
          <h1 class="f26-name"><span class="lbl">— Endorsed by Northwest Oregon PAC</span>Mark <em>Norman.</em></h1>
          <div class="f26-bar"><span>Oregon House · District 27</span><span class="em">MarkNormanForOregon.com</span></div>
          <p class="f26-bio">From military service to caring for animals and serving his community, Mark Norman has built a career around <em>helping others,</em> and now he's ready to bring that same commitment to Salem.</p>
          <div class="f26-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 27 — Brian Schimmel
     Creative direction: split spread. Duotone forest portrait
     on left half, cream editorial column right with italic
     name and manifesto.
  -------------------------------------------------------- */
  {
    id: 'feed-27-brian-schimmel',
    tag: 'Candidates',
    title: 'Meet Brian Schimmel',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Communities deserve leaders who listen first, work hard, and stay connected to the people they represent. Brian Schimmel is committed to bringing that approach to House District 29.\n\nFollow Brian's campaign and learn more.\n\n#BrianSchimmel #HouseDistrict29 #NorthwestOregonPAC #Leadership #Election2026 #Oregon",
    data: {
      css: `
        .f27 { position:absolute; inset:0; z-index:10; overflow:hidden; background:#f6f2e8; color:#2e4538; }
        /* Left duotone portrait */
        .f27-portrait { position:absolute; top:0; bottom:0; left:0; width:52%; z-index:2; overflow:hidden; background:#1c2b23; }
        .f27-portrait img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:grayscale(1) contrast(1.15) brightness(.85); mix-blend-mode:multiply; }
        .f27-portrait::before { content:''; position:absolute; inset:0; background:linear-gradient(178deg, #2e4538 0%, #1c2b23 100%); z-index:1; }
        .f27-portrait::after { content:''; position:absolute; inset:0; background:linear-gradient(178deg, transparent 0%, rgba(28,43,35,.55) 100%); }
        .f27-portrait img { position:relative; z-index:2; }
        /* Portrait tag — pushed down out of the mast row */
        .f27-tag {
          position:absolute; top:220px; left:40px; z-index:4;
          padding:10px 16px; background:rgba(224,214,188,.15); border:1px solid rgba(224,214,188,.5);
          font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:#f6f2e8;
          backdrop-filter:blur(4px);
        }
        /* Right column */
        .f27-col { position:absolute; top:0; bottom:0; right:0; width:48%; z-index:3; padding:56px 60px 56px 50px; display:flex; flex-direction:column; }
        .f27-col .mast { display:flex; align-items:center; justify-content:space-between; gap:18px; padding-bottom:16px; border-bottom:1.5px solid rgba(46,69,56,.35); font-family:var(--font-mono); font-size:11px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f27-col .mast img { height:34px; width:auto; flex:none; }
        .f27-col .kick { margin-top:32px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f27-col .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f27-col .name { margin-top:14px; font-family:var(--font-display); font-weight:500; font-size:80px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f27-col .name em { display:block; font-style:italic; color:#5a7060; }
        .f27-col .office { margin-top:20px; padding-top:14px; border-top:1px solid rgba(46,69,56,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f27-col .bio { margin-top:24px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.22; letter-spacing:-.015em; color:#2e4538; max-width:380px; }
        .f27-col .bio em { font-style:normal; color:#6b5a42; }
        .f27-col .cta { margin-top:auto; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f27-col .cta .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f27-foot { position:absolute; left:76px; right:76px; bottom:22px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.5); }
      `,
      body: (ctx) => `
        <div class="f27">
          <div class="f27-portrait">
            <img src="${ctx.prefix}img/brian-schimmel.jpg" alt="Brian Schimmel" />
          </div>
          <span class="f27-tag">Candidate · 2026</span>
          <div class="f27-col">
            <div class="mast">
              <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
              <span>Spread 27</span>
            </div>
            <span class="kick">Meet the candidate</span>
            <h1 class="name">Brian<em>Schimmel</em></h1>
            <div class="office">— Candidate for Oregon House District 29</div>
            <p class="bio">Focused on practical <em>leadership,</em> local priorities, and serving the people of District 29.</p>
            <div class="cta"><span>Learn more</span><span class="em">— Follow the campaign</span></div>
          </div>
          <div class="f27-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 28 — Dr. Barbara Kahl
     Creative direction: circular medallion portrait, sand
     ground with three-role stack under.
  -------------------------------------------------------- */
  {
    id: 'feed-28-barbara-kahl',
    tag: 'Candidates',
    title: 'Meet Dr. Barbara Kahl',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Dr. Barbara Kahl is committed to serving Northwest Oregon with practical leadership and a focus on the issues that matter most to local communities. We're proud to support candidates who step forward to serve.\n\nLearn more about Dr. Kahl's campaign.\n\n#BarbaraKahl #CongressionalDistrict1 #NorthwestOregonPAC #Election2026 #Leadership #OregonPolitics",
    data: {
      css: `
        .f28 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f28-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f28-mast img { height:56px; width:auto; }
        .f28-kick { position:absolute; top:180px; left:0; right:0; z-index:6; text-align:center; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f28-kick::before, .f28-kick::after { content:'—'; margin:0 20px; opacity:.6; }
        /* Medallion */
        .f28-medallion { position:absolute; left:calc(50% - 190px); top:230px; width:380px; height:380px; z-index:5; border-radius:999px; overflow:hidden; border:6px solid #f6f2e8; box-shadow:0 30px 60px -22px rgba(46,69,56,.55), 0 0 0 12px rgba(46,69,56,.3); }
        .f28-medallion img { width:100%; height:100%; object-fit:cover; object-position:center 20%; filter:saturate(.9) contrast(1.12); }
        /* Name */
        .f28-name { position:absolute; left:76px; right:76px; top:640px; z-index:6; text-align:center; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f28-name em { font-style:italic; color:#5a7060; }
        /* Roles stack */
        .f28-roles { position:absolute; left:76px; right:76px; top:750px; z-index:6; display:flex; align-items:center; justify-content:center; gap:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f28-roles span { position:relative; }
        .f28-roles span + span::before { content:'·'; margin-right:24px; color:rgba(46,69,56,.5); }
        /* Office */
        .f28-office { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); text-align:center; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.22; letter-spacing:-.015em; color:#2e4538; }
        .f28-office em { font-style:normal; color:#6b5a42; }
        .f28-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; text-align:center; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f28-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f28-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f28">
          <div class="f28-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Medallion 28 · U.S. House · Oregon's 1st</span>
          </div>
          <span class="f28-kick">Meet the candidate</span>
          <div class="f28-medallion"><img src="${ctx.prefix}img/barbara-kahl.jpg" alt="Dr. Barbara Kahl" /></div>
          <h1 class="f28-name">Dr. Barbara <em>Kahl</em></h1>
          <div class="f28-roles"><span>Veterinarian</span><span>Community advocate</span><span>Candidate for Congress</span></div>
          <p class="f28-office">Candidate for U.S. House — <em>Oregon's 1st Congressional District.</em></p>
          <div class="f28-sig">Learn more · <span class="em">Learn about her campaign</span></div>
          <div class="f28-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 29 — Ciatta Thompson
     Creative direction: portrait plate + numbered pledge
     column. Forest ground, portrait plate left, three
     italic numbered "Committed to..." pledges on the right.
  -------------------------------------------------------- */
  {
    id: 'feed-29-ciatta-thompson',
    tag: 'Candidates',
    title: 'Ciatta Thompson',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "We're proud to support Ciatta Thompson for Oregon House District 33 and her commitment to building a stronger future for Northwest Oregon.\n\nLearn more about Ciatta's campaign.\n\n#CiattaThompson #HouseDistrict33 #NorthwestOregonPAC #Election2026 #Leadership #NorthwestOregon",
    data: {
      css: `
        .f29 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f29-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f29-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f29-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f29-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Portrait plate left */
        .f29-plate { position:absolute; top:230px; left:76px; width:400px; height:520px; z-index:5; overflow:hidden; border:4px solid #e0d6bc; box-shadow:0 30px 60px -22px rgba(0,0,0,.55); }
        .f29-plate img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.88) contrast(1.14); }
        /* Right column */
        .f29-col { position:absolute; top:230px; left:520px; right:76px; z-index:6; display:flex; flex-direction:column; gap:22px; }
        .f29-col .name { font-family:var(--font-display); font-weight:500; font-size:80px; line-height:.98; letter-spacing:-.028em; color:#f6f2e8; }
        .f29-col .name em { display:block; font-style:italic; color:#e0d6bc; }
        .f29-col .office { padding-top:14px; border-top:1.5px solid rgba(246,242,232,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f29-col .pledges { display:flex; flex-direction:column; gap:18px; margin-top:8px; }
        .f29-col .pledges .p { display:flex; align-items:baseline; gap:18px; padding-bottom:12px; border-bottom:1px solid rgba(246,242,232,.28); }
        .f29-col .pledges .p .n { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.5); min-width:44px; }
        .f29-col .pledges .p .v { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:rgba(246,242,232,.94); }
        .f29-col .pledges .p .v em { font-style:normal; color:#e0d6bc; }
        /* Bio + CTA at bottom */
        .f29-cta { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f29-cta .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f29-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f29">
          <div class="f29-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Plate 29 · Oregon House · District 33</span>
          </div>
          <span class="f29-kick">Meet the candidate</span>
          <div class="f29-plate"><img src="${ctx.prefix}img/ciatta-thompson.jpg" alt="Ciatta Thompson" /></div>
          <div class="f29-col">
            <h1 class="name">Ciatta<em>Thompson</em></h1>
            <div class="office">— Running for Oregon House District 33</div>
            <div class="pledges">
              <div class="p"><span class="n">01</span><span class="v">Committed to <em>practical leadership.</em></span></div>
              <div class="p"><span class="n">02</span><span class="v">Committed to <em>stronger communities.</em></span></div>
              <div class="p"><span class="n">03</span><span class="v">Putting the <em>people of District 33 first.</em></span></div>
            </div>
          </div>
          <div class="f29-cta"><span>Learn more</span><span class="em">— Follow the campaign</span></div>
          <div class="f29-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 30 — Randall Fryer
     Creative direction: portrait poster with editorial
     virtues column. Sand ground, portrait plate top-right,
     editorial column left with three roman-numeral virtues
     (Integrity / Experience / Willingness).
  -------------------------------------------------------- */
  {
    id: 'feed-30-randall-fryer',
    tag: 'Candidates',
    title: 'Randall Fryer',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Good leadership starts with integrity, experience, and a willingness to serve.\n\nWe\'re proud to support Randall Fryer as he runs for Oregon House District 28, bringing a steady and practical approach to public service.\n\nFollow Randall\'s campaign.\n\n#RandallFryer #HouseDistrict28 #NorthwestOregonPAC #Election2026 #Leadership #OregonPolitics',
    data: {
      css: `
        .f30 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f30-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f30-mast img { height:56px; width:auto; }
        /* Portrait plate right */
        .f30-plate { position:absolute; top:180px; right:60px; width:420px; height:520px; z-index:5; overflow:hidden; border:4px solid #2e4538; box-shadow:0 30px 60px -30px rgba(46,69,56,.5); }
        .f30-plate img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.88) contrast(1.14); }
        .f30-plate::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg, transparent 60%, rgba(28,43,35,.55) 100%); }
        .f30-plate .lbl { position:absolute; left:14px; bottom:14px; z-index:2; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:#f6f2e8; text-shadow:0 2px 12px rgba(0,0,0,.5); }
        /* Left column */
        .f30-col { position:absolute; top:180px; left:76px; width:440px; z-index:6; display:flex; flex-direction:column; gap:20px; }
        .f30-col .kick { font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f30-col .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f30-col .name { font-family:var(--font-display); font-weight:500; font-size:76px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f30-col .name em { display:block; font-style:italic; color:#5a7060; }
        .f30-col .office { padding-top:14px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f30-col .virtues { display:flex; flex-direction:column; gap:14px; margin-top:6px; }
        .f30-col .virtues .v { display:flex; align-items:baseline; gap:16px; padding-bottom:10px; border-bottom:1px dashed rgba(46,69,56,.4); }
        .f30-col .virtues .v .n { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.02em; color:rgba(46,69,56,.35); min-width:40px; }
        .f30-col .virtues .v .w { font-family:var(--font-display); font-weight:500; font-size:32px; line-height:1; letter-spacing:-.022em; color:#2e4538; }
        .f30-col .virtues .v .w em { font-style:italic; color:#5a7060; }
        /* Bio strip */
        .f30-bio { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; line-height:1.22; letter-spacing:-.012em; color:#2e4538; max-width:920px; }
        .f30-bio em { font-style:normal; color:#6b5a42; }
        .f30-cta { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f30-cta .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f30-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f30">
          <div class="f30-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Poster 30 · Oregon House · District 28</span>
          </div>
          <div class="f30-plate">
            <img src="${ctx.prefix}img/randall-fryer.jpg" alt="Randall Fryer" />
            <span class="lbl">— The candidate</span>
          </div>
          <div class="f30-col">
            <span class="kick">Meet the candidate</span>
            <h1 class="name">Randall<em>Fryer</em></h1>
            <div class="office">— Running for Oregon House District 28</div>
            <div class="virtues">
              <div class="v"><span class="n">i.</span><span class="w"><em>Integrity</em></span></div>
              <div class="v"><span class="n">ii.</span><span class="w"><em>Experience</em></span></div>
              <div class="v"><span class="n">iii.</span><span class="w">A willingness <em>to serve</em></span></div>
            </div>
          </div>
          <p class="f30-bio">Bringing decades of <em>professional experience</em> and a commitment to thoughtful, community-focused leadership.</p>
          <div class="f30-cta"><span>Learn more</span><span class="em">— Follow the campaign</span></div>
          <div class="f30-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 31 — Northwest Oregon needs good leaders. Run for office.
     Creative direction: vacancy notice / job posting board.
     Forest ground with editorial "Position: Leader" notice,
     bulleted background list, italic serif "Run for office."
  -------------------------------------------------------- */
  {
    id: 'feed-31-run-for-office',
    tag: 'Get involved',
    title: 'Northwest Oregon needs good leaders. Run for office.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "The next great leader doesn't always come from politics.\n\nSometimes they're a teacher, veteran, business owner, healthcare professional, farmer, or volunteer who simply wants to serve.\n\nIf you've ever considered running for office, let's talk.\n\n#RunForOffice #NorthwestOregonPAC #Leadership #ServeYourCommunity #Election2026",
    data: {
      css: `
        .f31 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f31-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f31-mast img { height:56px; width:auto; filter:brightness(1.05); }
        /* Notice card */
        .f31-notice { position:absolute; top:170px; bottom:130px; left:80px; right:80px; z-index:5;
          background:rgba(224,214,188,.06); border:1.5px solid rgba(224,214,188,.5);
          box-shadow:0 30px 60px -30px rgba(0,0,0,.5);
          padding:30px 40px 34px;
          display:flex; flex-direction:column;
        }
        .f31-notice .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid rgba(224,214,188,.5); font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.75); }
        .f31-notice .header .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f31-notice .kick { margin-top:22px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f31-notice .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f31-notice .head { margin-top:12px; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:1; letter-spacing:-.028em; color:#f6f2e8; }
        .f31-notice .head em { display:block; font-style:italic; color:#e0d6bc; }
        .f31-notice .sub { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.22; letter-spacing:-.012em; color:rgba(246,242,232,.85); }
        /* Backgrounds bullets */
        .f31-notice .bg-lbl { margin-top:26px; padding-top:14px; border-top:1px dashed rgba(246,242,232,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(246,242,232,.55); }
        .f31-notice .bg-grid { margin-top:12px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px 20px; }
        .f31-notice .bg { display:flex; align-items:baseline; gap:12px; padding-bottom:8px; border-bottom:1px solid rgba(246,242,232,.22); font-family:var(--font-display); font-weight:500; font-size:22px; line-height:1.14; letter-spacing:-.015em; color:rgba(246,242,232,.94); }
        .f31-notice .bg .n { font-family:var(--font-mono); font-size:10px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.5); }
        .f31-notice .bg em { font-style:italic; color:#e0d6bc; }
        /* Sign-off */
        .f31-notice .signoff { margin-top:auto; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f31-notice .signoff .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f31-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f31">
          <div class="f31-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Notice 31 · Run for Office</span>
          </div>
          <div class="f31-notice">
            <div class="header"><span>The Northwest Vacancy Notice</span><span class="em">Position — Leader</span><span>No. 31</span></div>
            <span class="kick">Run for office</span>
            <h1 class="head">Northwest Oregon needs<em>good leaders.</em></h1>
            <p class="sub">The next great leader doesn't always come from politics.</p>
            <div class="bg-lbl">Backgrounds welcomed</div>
            <div class="bg-grid">
              <div class="bg"><span class="n">01</span>Teacher</div>
              <div class="bg"><span class="n">02</span>Veteran</div>
              <div class="bg"><span class="n">03</span>Business owner</div>
              <div class="bg"><span class="n">04</span>Healthcare professional</div>
              <div class="bg"><span class="n">05</span>Farmer</div>
              <div class="bg"><span class="n">06</span>Volunteer</div>
            </div>
            <div class="signoff"><span>If you've ever considered running for office</span><span class="em">— Let's talk.</span></div>
          </div>
          <div class="f31-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 32 — Volunteer with Northwest Oregon PAC.
     Creative direction: field sign-up sheet on cream ledger.
     A ruled roster with a "Volunteer" italic serif title,
     three empty ruled signature lines, and volunteer
     activity checkboxes.
  -------------------------------------------------------- */
  {
    id: 'feed-32-volunteer',
    tag: 'Get involved',
    title: 'Volunteer with Northwest Oregon PAC.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Become a volunteer today. Whether it's volunteering at events, talking with neighbors, or supporting local candidates, every effort helps strengthen Northwest Oregon.\n\nJoin us and be part of the movement.\n\n#Volunteer #NorthwestOregonPAC #GetInvolved #Grassroots #CommunityLeadership #Election2026",
    data: {
      css: `
        .f32 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f32-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f32-mast img { height:56px; width:auto; }
        /* Sign-up sheet */
        .f32-sheet { position:absolute; top:170px; bottom:130px; left:80px; right:80px; z-index:5;
          background:#faf3d8; border:1.5px solid rgba(46,69,56,.4); box-shadow:0 30px 60px -30px rgba(46,69,56,.4);
          padding:32px 40px 28px;
          display:flex; flex-direction:column;
        }
        .f32-sheet .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid #2e4538; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f32-sheet .header .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f32-sheet .kick { margin-top:20px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f32-sheet .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f32-sheet .head { margin-top:10px; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f32-sheet .head em { font-style:italic; color:#5a7060; }
        .f32-sheet .sub { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.2; letter-spacing:-.015em; color:rgba(46,69,56,.85); max-width:800px; }
        /* Signature roster */
        .f32-sheet .roster { margin-top:24px; }
        .f32-sheet .roster .rlbl { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); }
        .f32-sheet .roster .line { margin-top:10px; height:44px; border-bottom:1px solid rgba(46,69,56,.5); display:flex; align-items:baseline; padding:0 12px 6px; }
        .f32-sheet .roster .line .n { font-family:var(--font-mono); font-size:10px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.5); margin-right:14px; }
        .f32-sheet .roster .line .hint { font-family:var(--font-display); font-style:italic; font-size:24px; color:rgba(46,69,56,.3); letter-spacing:-.01em; }
        .f32-sheet .roster .lines { display:grid; grid-template-columns:1fr 1fr; gap:16px 30px; margin-top:10px; }
        /* Bottom sign-off */
        .f32-sheet .signoff { margin-top:auto; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.4); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f32-sheet .signoff .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f32-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f32">
          <div class="f32-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Sign-up 32 · Volunteer Roster</span>
          </div>
          <div class="f32-sheet">
            <div class="header"><span>The Volunteer Roster</span><span class="em">Northwest Oregon PAC</span><span>No. 32</span></div>
            <span class="kick">Volunteer</span>
            <h1 class="head">Volunteer with<em>Northwest Oregon PAC.</em></h1>
            <p class="sub">Your time, skills, and voice can help build lasting change across our region.</p>
            <div class="roster">
              <span class="rlbl">— Add your name to the roster</span>
              <div class="lines">
                <div class="line"><span class="n">01</span><span class="hint">Your name here</span></div>
                <div class="line"><span class="n">02</span><span class="hint">Your name here</span></div>
                <div class="line"><span class="n">03</span><span class="hint">Your name here</span></div>
                <div class="line"><span class="n">04</span><span class="hint">Your name here</span></div>
              </div>
            </div>
            <div class="signoff"><span>Become a volunteer today</span><span class="em">— Join us and be part of the movement.</span></div>
          </div>
          <div class="f32-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 33 — Where do you fit in?
     Creative direction: puzzle-piece grid. Sand ground with
     five interlocking tile cards, each labeled with a role
     and small hand-drawn icon.
  -------------------------------------------------------- */
  {
    id: 'feed-33-where-you-fit',
    tag: 'Get involved',
    title: 'Where do you fit in?',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Whether you have a few hours a month or want to get involved every week, your time can help strengthen campaigns and communities across Northwest Oregon.\n\nJoin our volunteer team.\n\n#Volunteer #NorthwestOregonPAC #GetInvolved #Grassroots #CommunityLeadership #NorthwestOregon",
    data: {
      css: `
        .f33 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f33-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f33-mast img { height:56px; width:auto; }
        .f33-kick { position:absolute; top:180px; left:76px; right:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f33-kick::before { content:'— '; }
        .f33-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:96px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f33-head em { font-style:italic; color:#5a7060; }
        /* Puzzle tile grid */
        .f33-grid { position:absolute; left:76px; right:76px; top:410px; z-index:5; display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
        .f33-tile { position:relative; padding:22px 24px 20px; background:rgba(246,242,232,.75); border:1.5px solid rgba(46,69,56,.4); box-shadow:0 20px 40px -22px rgba(46,69,56,.35); }
        .f33-tile.tall { grid-row:span 2; padding-top:36px; padding-bottom:36px; background:#2e4538; color:#f6f2e8; }
        .f33-tile.tall::before {
          content:''; position:absolute; top:0; left:0; right:0; height:6px; background:#e0d6bc;
        }
        .f33-tile .n { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.02em; color:rgba(46,69,56,.4); }
        .f33-tile.tall .n { color:rgba(224,214,188,.5); }
        .f33-tile .lbl { display:block; margin-top:8px; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f33-tile.tall .lbl { color:rgba(246,242,232,.6); }
        .f33-tile .w { display:block; margin-top:8px; font-family:var(--font-display); font-weight:500; font-size:34px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; }
        .f33-tile.tall .w { color:#e0d6bc; font-style:italic; font-size:42px; }
        .f33-tile svg { display:block; margin-top:12px; width:48px; height:48px; color:#5a7060; }
        .f33-tile.tall svg { color:#e0d6bc; }
        /* Bottom manifesto */
        .f33-mani { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); display:flex; align-items:baseline; justify-content:space-between; gap:22px; }
        .f33-mani .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); flex:none; }
        .f33-mani .v { flex:1; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; }
        .f33-mani .v em { font-style:normal; color:#6b5a42; }
        .f33-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f33">
          <div class="f33-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Tiles 33 · Where You Fit</span>
          </div>
          <span class="f33-kick">Every movement needs people willing to step forward.</span>
          <h1 class="f33-head">Where do <em>you</em> fit in?</h1>
          <div class="f33-grid">
            <div class="f33-tile"><span class="n">01</span><span class="lbl">— Role i.</span><span class="w">Knock doors</span></div>
            <div class="f33-tile"><span class="n">02</span><span class="lbl">— Role ii.</span><span class="w">Make calls</span></div>
            <div class="f33-tile tall"><span class="n">03</span><span class="lbl">— Role iii.</span><span class="w">Help at events</span><span class="lbl" style="margin-top:auto">There's a place for you.</span></div>
            <div class="f33-tile"><span class="n">04</span><span class="lbl">— Role iv.</span><span class="w">Support candidates</span></div>
            <div class="f33-tile"><span class="n">05</span><span class="lbl">— Role v.</span><span class="w">Share your skills</span></div>
          </div>
          <div class="f33-mani"><span class="k">— Join in</span><p class="v">A few hours a month or every week — <em>your time</em> can help strengthen campaigns and communities across Northwest Oregon.</p></div>
          <div class="f33-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 34 — Campaigns work when people gather.
     Creative direction: table/seating plan diagram. Forest
     ground with a plan-view of chairs around a round table,
     italic serif "Campaigns work when people gather."
  -------------------------------------------------------- */
  {
    id: 'feed-34-campaigns-gather',
    tag: 'Get involved',
    title: 'Campaigns work when people gather.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "The best conversations don't happen online, they happen in our communities.\n\nJoin us at upcoming meet-and-greets, volunteer nights, community discussions, and campaign events across Northwest Oregon.\n\nWe'd love to meet you.\n\n#NorthwestOregonPAC #CommunityEvents #MeetTheCandidates #Election2026",
    data: {
      css: `
        .f34 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f34-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f34-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f34-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f34-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f34-head { position:absolute; top:220px; left:76px; right:520px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:1.02; letter-spacing:-.028em; color:#f6f2e8; }
        .f34-head em { display:block; font-style:italic; color:#e0d6bc; }
        /* Seating diagram right */
        .f34-plan { position:absolute; top:210px; right:76px; width:440px; height:440px; z-index:5; }
        .f34-plan svg { display:block; width:100%; height:100%; }
        /* Three lines meta */
        .f34-lines { position:absolute; left:76px; right:76px; bottom:220px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .f34-lines .l { padding:14px 16px; background:rgba(224,214,188,.06); border:1px solid rgba(246,242,232,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.65); text-align:center; }
        .f34-lines .l .em { display:block; margin-top:6px; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f34-sig { position:absolute; left:76px; right:76px; bottom:150px; z-index:6; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:rgba(246,242,232,.9); text-align:center; }
        .f34-sig em { font-style:normal; color:#e0d6bc; }
        .f34-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f34">
          <div class="f34-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Plan 34 · Community Events</span>
          </div>
          <span class="f34-kick">Community events</span>
          <h1 class="f34-head">Campaigns work when<em>people gather.</em></h1>
          <div class="f34-plan">
            <svg viewBox="0 0 440 440" fill="none">
              <!-- Round table -->
              <circle cx="220" cy="220" r="120" fill="rgba(224,214,188,.14)" stroke="#e0d6bc" stroke-width="2"/>
              <text x="220" y="216" font-family="Source Sans 3" font-size="11" fill="#e0d6bc" text-anchor="middle" letter-spacing="3">THE TABLE</text>
              <text x="220" y="240" font-family="Lora" font-style="italic" font-size="20" fill="#e0d6bc" text-anchor="middle">community</text>
              <!-- 8 chairs around table -->
              <g fill="rgba(224,214,188,.9)" stroke="#e0d6bc" stroke-width="1.5">
                <rect x="204" y="60" width="32" height="24" rx="4"/>
                <rect x="322" y="94" width="32" height="24" rx="4" transform="rotate(45 338 106)"/>
                <rect x="366" y="204" width="32" height="24" rx="4" transform="rotate(90 382 216)"/>
                <rect x="322" y="322" width="32" height="24" rx="4" transform="rotate(-45 338 334)"/>
                <rect x="204" y="356" width="32" height="24" rx="4"/>
                <rect x="86" y="322" width="32" height="24" rx="4" transform="rotate(45 102 334)"/>
                <rect x="42" y="204" width="32" height="24" rx="4" transform="rotate(90 58 216)"/>
                <rect x="86" y="94" width="32" height="24" rx="4" transform="rotate(-45 102 106)"/>
              </g>
              <!-- Radial connection lines -->
              <g stroke="rgba(224,214,188,.4)" stroke-width="1" stroke-dasharray="4 4">
                <line x1="220" y1="220" x2="220" y2="60"/>
                <line x1="220" y1="220" x2="380" y2="220"/>
                <line x1="220" y1="220" x2="220" y2="380"/>
                <line x1="220" y1="220" x2="60" y2="220"/>
              </g>
            </svg>
          </div>
          <div class="f34-lines">
            <div class="l">— Line i.<span class="em">Meet candidates.</span></div>
            <div class="l">— Line ii.<span class="em">Meet neighbors.</span></div>
            <div class="l">— Line iii.<span class="em">Join the conversation.</span></div>
          </div>
          <p class="f34-sig">The best conversations don't happen online — <em>they happen in our communities.</em></p>
          <div class="f34-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 35 — Host a meet-up. Invite your neighbors.
     Creative direction: invitation card. Cream envelope
     peeled open with a formal RSVP card visible; italic
     script "You're invited" motif.
  -------------------------------------------------------- */
  {
    id: 'feed-35-host-meetup',
    tag: 'Get involved',
    title: 'Host a meet-up.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "One conversation can inspire an entire neighborhood.\n\nWhether it's a living room gathering, a local business, or a community space, hosting an event is one of the most meaningful ways to connect people with the issues and candidates that matter.\n\nHost an event with us.\n\n#HostAnEvent #NorthwestOregonPAC #CommunityLeadership",
    data: {
      css: `
        .f35 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f35-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f35-mast img { height:56px; width:auto; }
        /* Envelope (paper) */
        .f35-env { position:absolute; top:170px; bottom:150px; left:80px; right:80px; z-index:4;
          background:linear-gradient(180deg, #f2e8c9 0%, #d8c68e 100%);
          border:1.5px solid rgba(46,69,56,.35);
          box-shadow:0 24px 60px -28px rgba(46,69,56,.4);
        }
        /* Peeled flap on the top-left */
        .f35-flap {
          position:absolute; top:170px; left:80px; z-index:5;
          width:180px; height:170px;
          background:linear-gradient(160deg, #ede0b6 0%, #c8b581 100%);
          clip-path:polygon(0 0, 100% 0, 45% 100%);
          transform-origin:top left;
          transform:rotate(-6deg);
          box-shadow:0 8px 22px rgba(0,0,0,.15);
          border-right:1px solid rgba(46,69,56,.35);
        }
        /* Invitation card */
        .f35-card { position:absolute; top:220px; bottom:200px; left:150px; right:150px; z-index:5;
          background:#faf3d8; border:2px solid #2e4538;
          box-shadow:0 30px 60px -30px rgba(46,69,56,.5), inset 0 1px 0 rgba(255,255,255,.6);
          padding:30px 40px 26px;
          display:flex; flex-direction:column;
          transform:rotate(-1.4deg);
        }
        .f35-card::before { content:''; position:absolute; inset:10px; border:1px double #2e4538; pointer-events:none; }
        .f35-card .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:12px; border-bottom:1.5px solid #2e4538; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f35-card .header .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f35-card .kick { margin-top:16px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f35-card .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f35-card .youre { margin-top:6px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:32px; color:#5a7060; letter-spacing:-.015em; }
        .f35-card .head { margin-top:6px; font-family:var(--font-display); font-weight:500; font-size:64px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f35-card .head em { font-style:italic; color:#5a7060; }
        .f35-card .sub { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; }
        .f35-card .details { margin-top:auto; padding-top:14px; border-top:1.5px solid #2e4538; display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
        .f35-card .details .d { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f35-card .details .d .em { display:block; margin-top:6px; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Wax seal */
        .f35-seal { position:absolute; right:130px; top:400px; z-index:7;
          width:96px; height:96px; border-radius:999px;
          background:radial-gradient(circle at 30% 30%, #8a7040 0%, #4a3a1f 100%);
          display:flex; align-items:center; justify-content:center;
          font-family:var(--font-mono); font-size:9px; letter-spacing:.3em; text-transform:uppercase; color:#f6f2e8;
          transform:rotate(-8deg);
          box-shadow:0 12px 24px -8px rgba(0,0,0,.5);
        }
        .f35-seal .in { font-family:var(--font-display); font-style:italic; font-size:22px; }
        .f35-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f35">
          <div class="f35-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Invitation 35 · Host an Event</span>
          </div>
          <div class="f35-env"></div>
          <div class="f35-flap"></div>
          <div class="f35-card">
            <div class="header"><span>The Northwest Invitation</span><span class="em">Host an event</span><span>No. 35</span></div>
            <span class="kick">Host an event</span>
            <p class="youre">You're invited to —</p>
            <h1 class="head">Host a meet-up.<em>Invite your neighbors.</em></h1>
            <p class="sub">Help connect people with the candidates shaping Northwest Oregon's future.</p>
            <div class="details">
              <div class="d">— Where<span class="em">Your living room</span></div>
              <div class="d">— With<span class="em">A few neighbors</span></div>
              <div class="d">— About<span class="em">The issues that matter</span></div>
            </div>
          </div>
          <div class="f35-seal"><span class="in">✎</span></div>
          <div class="f35-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 36 — Not because of one candidate.
     Creative direction: interlocking chain of neighbors —
     six stylized SVG figure silhouettes holding shoulders
     across the frame; italic serif manifesto below.
  -------------------------------------------------------- */
  {
    id: 'feed-36-not-one-candidate',
    tag: 'Introduction',
    title: "Northwest Oregon isn't changing because of one candidate.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'This movement is powered by volunteers, supporters, local businesses, donors, and neighbors who believe Northwest Oregon deserves a stronger future.\n\nThank you for being part of it.\n\n#NorthwestOregonPAC #CommunityFirst #Grassroots #Volunteer #Leadership',
    data: {
      css: `
        .f36 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f36-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f36-mast img { height:56px; width:auto; }
        .f36-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f36-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f36-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1.02; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f36-head em { font-style:italic; color:#5a7060; }
        /* Neighbor chain SVG */
        .f36-chain { position:absolute; left:76px; right:76px; top:500px; height:180px; z-index:5; }
        .f36-chain svg { display:block; width:100%; height:100%; }
        /* Manifesto below */
        .f36-mani { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; max-width:920px; }
        .f36-mani em { font-style:normal; color:#6b5a42; }
        .f36-sig { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f36-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f36-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f36">
          <div class="f36-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Chain 36 · A Movement of Neighbors</span>
          </div>
          <span class="f36-kick">A movement of neighbors</span>
          <h1 class="f36-head">Northwest Oregon isn't changing because of<em>one candidate.</em></h1>
          <div class="f36-chain">
            <svg viewBox="0 0 900 180" fill="none" stroke="#2e4538" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <g fill="#5a7060" fill-opacity="0.15">
                <circle cx="70" cy="46" r="24"/>
                <path d="M28 176 L28 108 C 28 92 44 82 70 82 C 96 82 112 92 112 108 L 112 176"/>
                <circle cx="216" cy="46" r="24"/>
                <path d="M174 176 L174 108 C 174 92 190 82 216 82 C 242 82 258 92 258 108 L 258 176"/>
                <circle cx="362" cy="46" r="24"/>
                <path d="M320 176 L320 108 C 320 92 336 82 362 82 C 388 82 404 92 404 108 L 404 176"/>
                <circle cx="508" cy="46" r="24"/>
                <path d="M466 176 L466 108 C 466 92 482 82 508 82 C 534 82 550 92 550 108 L 550 176"/>
                <circle cx="654" cy="46" r="24"/>
                <path d="M612 176 L612 108 C 612 92 628 82 654 82 C 680 82 696 92 696 108 L 696 176"/>
                <circle cx="800" cy="46" r="24"/>
                <path d="M758 176 L758 108 C 758 92 774 82 800 82 C 826 82 842 92 842 108 L 842 176"/>
              </g>
              <!-- Interlocking arms -->
              <path d="M100 122 L184 122 M246 122 L330 122 M392 122 L476 122 M538 122 L622 122 M684 122 L768 122"/>
              <!-- Ground line -->
              <line x1="0" y1="176" x2="900" y2="176" stroke-dasharray="6 6" opacity="0.5"/>
            </svg>
          </div>
          <p class="f36-mani"><em>It's changing because neighbors are choosing to get involved.</em> This movement is powered by volunteers, supporters, local businesses, donors, and neighbors.</p>
          <div class="f36-sig"><span>Thank you</span><span class="em">— For being part of it.</span></div>
          <div class="f36-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 37 — Stay informed. Stay involved.
     Creative direction: broadcast dial / radio. Forest ground
     with a mono radio-dial SVG receiver, italic serif split
     title, three channel bands (Facebook / Website / Email).
  -------------------------------------------------------- */
  {
    id: 'feed-37-stay-informed',
    tag: 'Get involved',
    title: 'Stay informed. Stay involved.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "Change starts with staying informed.\n\nFollow Northwest Oregon PAC for campaign updates, community events, candidate announcements, and opportunities to get involved across the region.\n\nTogether, we'll keep Northwest Oregon moving forward.\n\n#NorthwestOregonPAC #StayConnected #CommunityUpdates #Election2026 #NorthwestOregon #Grassroots",
    data: {
      css: `
        .f37 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f37-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f37-mast img { height:56px; width:auto; filter:brightness(1.05); }
        /* Left: title */
        .f37-title { position:absolute; top:190px; left:76px; width:520px; z-index:6; display:flex; flex-direction:column; gap:20px; }
        .f37-title .kick { font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f37-title .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f37-title .head { font-family:var(--font-display); font-weight:500; font-size:80px; line-height:.98; letter-spacing:-.028em; color:#f6f2e8; }
        .f37-title .head em { display:block; font-style:italic; color:#e0d6bc; }
        .f37-title .sub { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.22; letter-spacing:-.015em; color:rgba(246,242,232,.85); max-width:440px; }
        /* Right: dial */
        .f37-dial { position:absolute; top:190px; right:70px; width:400px; height:400px; z-index:5; }
        .f37-dial svg { display:block; width:100%; height:100%; }
        /* Bottom channel bands */
        .f37-bands { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:18px; border-top:1.5px solid rgba(246,242,232,.35); display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .f37-band { padding:14px 18px; background:rgba(224,214,188,.06); border:1px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; gap:14px; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.65); }
        .f37-band .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f37-sig { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f37-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f37-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f37">
          <div class="f37-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Dial 37 · Stay Connected</span>
          </div>
          <div class="f37-title">
            <span class="kick">Stay connected</span>
            <h1 class="head">Stay informed.<em>Stay involved.</em></h1>
            <p class="sub">Follow Northwest Oregon PAC for candidate updates, local events, campaign news, and the issues shaping our communities.</p>
          </div>
          <div class="f37-dial">
            <svg viewBox="0 0 400 400" fill="none">
              <!-- Outer dial frame -->
              <circle cx="200" cy="200" r="180" stroke="#e0d6bc" stroke-width="2" fill="rgba(224,214,188,.06)"/>
              <circle cx="200" cy="200" r="150" stroke="#e0d6bc" stroke-width="1" opacity="0.6"/>
              <!-- Tick marks -->
              <g stroke="#e0d6bc" stroke-width="1.4">
                <line x1="200" y1="26" x2="200" y2="46"/>
                <line x1="374" y1="200" x2="354" y2="200"/>
                <line x1="200" y1="374" x2="200" y2="354"/>
                <line x1="26" y1="200" x2="46" y2="200"/>
              </g>
              <!-- Small ticks -->
              <g stroke="#e0d6bc" stroke-width="1" opacity="0.5">
                <line x1="286" y1="60" x2="278" y2="76"/>
                <line x1="340" y1="114" x2="324" y2="122"/>
                <line x1="340" y1="286" x2="324" y2="278"/>
                <line x1="286" y1="340" x2="278" y2="324"/>
                <line x1="114" y1="340" x2="122" y2="324"/>
                <line x1="60" y1="286" x2="76" y2="278"/>
                <line x1="60" y1="114" x2="76" y2="122"/>
                <line x1="114" y1="60" x2="122" y2="76"/>
              </g>
              <!-- Needle -->
              <line x1="200" y1="200" x2="290" y2="120" stroke="#e0d6bc" stroke-width="3" stroke-linecap="round"/>
              <circle cx="200" cy="200" r="14" fill="#e0d6bc"/>
              <circle cx="200" cy="200" r="6" fill="#2e4538"/>
              <!-- Center label -->
              <text x="200" y="252" font-family="Source Sans 3" font-size="11" fill="#e0d6bc" text-anchor="middle" letter-spacing="3">FREQUENCY</text>
              <text x="200" y="278" font-family="Lora" font-style="italic" font-size="24" fill="#e0d6bc" text-anchor="middle">the region</text>
            </svg>
          </div>
          <div class="f37-bands">
            <div class="f37-band"><span>— Ch. i.</span><span class="em">Facebook</span></div>
            <div class="f37-band"><span>— Ch. ii.</span><span class="em">Website</span></div>
            <div class="f37-band"><span>— Ch. iii.</span><span class="em">Email Updates</span></div>
          </div>
          <div class="f37-sig"><span>Change starts with staying informed</span><span class="em">— Moving forward, together.</span></div>
          <div class="f37-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 38 — Have a question? Contact card
     Creative direction: formal calling card. Sand ground
     with the PAC's official card centered, embossed corner
     marks, four contact rows in mono.
  -------------------------------------------------------- */
  {
    id: 'feed-38-contact',
    tag: 'About',
    title: 'Have a question? Reach the PAC directly.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Questions about volunteering, supported candidates, events, donations, or running for office?\n\nReach out directly. We want Northwest Oregon residents to know who we are, what we support, and how to participate.\n\n#ContactNorthwestOregonPAC #NorthwestOregon #GetInvolved #OregonPolitics',
    data: {
      css: `
        .f38 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f38-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f38-mast img { height:56px; width:auto; }
        /* Calling card */
        .f38-card { position:absolute; top:180px; bottom:140px; left:80px; right:80px; z-index:5;
          background:#faf3d8; border:2px solid #2e4538;
          box-shadow:0 30px 60px -30px rgba(46,69,56,.5), inset 0 1px 0 rgba(255,255,255,.6);
          padding:34px 40px 32px;
          display:flex; flex-direction:column;
        }
        .f38-card::before { content:''; position:absolute; inset:12px; border:1px double #2e4538; pointer-events:none; }
        /* Corner ornaments */
        .f38-corner { position:absolute; font-family:var(--font-display); font-style:italic; font-size:40px; color:#5a7060; }
        .f38-corner.tl { top:18px; left:26px; }
        .f38-corner.tr { top:18px; right:26px; }
        .f38-corner.bl { bottom:22px; left:26px; }
        .f38-corner.br { bottom:22px; right:26px; }
        /* Card header */
        .f38-card .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid #2e4538; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f38-card .header .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Titles */
        .f38-card .kick { margin-top:18px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f38-card .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f38-card .head { margin-top:10px; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f38-card .sub { margin-top:8px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:32px; letter-spacing:-.015em; color:#5a7060; }
        /* Contact rows */
        .f38-card .rows { margin-top:24px; display:flex; flex-direction:column; gap:14px; }
        .f38-card .row { display:flex; align-items:baseline; gap:20px; padding-bottom:10px; border-bottom:1px dashed rgba(46,69,56,.45); }
        .f38-card .row .k { flex:none; width:210px; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f38-card .row .v { flex:1; font-family:var(--font-display); font-weight:500; font-size:24px; line-height:1.14; letter-spacing:-.012em; color:#2e4538; }
        /* Sign-off */
        .f38-card .signoff { margin-top:auto; padding-top:14px; border-top:1.5px solid #2e4538; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f38-card .signoff .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f38-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f38">
          <div class="f38-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Card 38 · Contact</span>
          </div>
          <div class="f38-card">
            <span class="f38-corner tl">§</span>
            <span class="f38-corner tr">§</span>
            <span class="f38-corner bl">§</span>
            <span class="f38-corner br">§</span>
            <div class="header"><span>The Northwest Calling Card</span><span class="em">Contact directory</span><span>No. 38</span></div>
            <span class="kick">Contact</span>
            <h1 class="head">Have a question?</h1>
            <p class="sub">Reach the PAC directly.</p>
            <div class="rows">
              <div class="row"><span class="k">— General Inquiries</span><span class="v">info@northwestoregon.com</span></div>
              <div class="row"><span class="k">— Program Director</span><span class="v">Cynthia Sawyer · 503-490-4139</span></div>
              <div class="row"><span class="k">— Mailing Address</span><span class="v">10700 SW Beaverton-Hillsdale Highway, Suite 212, Beaverton, Oregon 97005</span></div>
              <div class="row"><span class="k">— Region</span><span class="v">Northwest Oregon · Pacific Time</span></div>
            </div>
            <div class="signoff"><span>Reach out directly</span><span class="em">— We want you to know who we are.</span></div>
          </div>
          <div class="f38-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 39 — Why We Are Here
     Creative direction: charter preamble. Cream page with an
     illuminated capital, italic serif "Why We Are Here"
     heading; single defining sentence set as a serif body.
  -------------------------------------------------------- */
  {
    id: 'feed-39-why-we-are-here',
    tag: 'Beliefs',
    title: 'Why We Are Here',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      'We believe in restoring political competition, support credible candidates, and give practical voters across Northwest Oregon a lasting regional voice.\n\nNo community should be conceded before voters have a real choice.\n\n#NorthwestOregonPAC #WhyWeExist #NorthwestOregon #VoterChoice #CompetitiveElections #Election2026',
    data: {
      css: `
        .f39 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f39-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f39-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f39-preamble { position:absolute; top:180px; left:76px; right:76px; z-index:6; padding-bottom:14px; border-bottom:1.5px solid rgba(246,242,232,.35); display:flex; align-items:baseline; justify-content:space-between; gap:22px; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.65); }
        .f39-preamble .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        /* Illuminated capital — sits alone as a mark, not fused with word */
        .f39-cap { position:absolute; top:270px; left:76px; z-index:5; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:180px; line-height:.82; letter-spacing:-.04em; color:#e0d6bc; text-shadow:0 6px 30px rgba(0,0,0,.5); }
        .f39-title { position:absolute; top:310px; left:264px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:96px; line-height:1; letter-spacing:-.028em; color:#f6f2e8; }
        .f39-title em { display:block; font-style:italic; color:#e0d6bc; }
        .f39-body { position:absolute; left:76px; right:76px; bottom:210px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); font-family:var(--font-display); font-weight:500; font-size:34px; line-height:1.16; letter-spacing:-.015em; color:#f6f2e8; max-width:920px; }
        .f39-body em { font-style:italic; color:#e0d6bc; }
        .f39-sig { position:absolute; left:76px; right:76px; bottom:118px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f39-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f39-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f39">
          <div class="f39-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Preamble 39 · Why We Are Here</span>
          </div>
          <div class="f39-preamble"><span>The Charter</span><span class="em">A preamble</span><span>No. 39</span></div>
          <span class="f39-cap">W</span>
          <h1 class="f39-title">Why We<em>Are Here.</em></h1>
          <p class="f39-body">Northwest Oregon should never <em>lose its voice</em> simply because others decided the region was too difficult to compete for.</p>
          <div class="f39-sig"><span>No community should be conceded</span><span class="em">— Before voters have a real choice.</span></div>
          <div class="f39-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 40 — Invest in Northwest Oregon.
     Creative direction: stacked-coins investment illustration.
     Sand ground with four SVG stacked coins each labeled with
     a mission use; italic serif "Invest in Northwest Oregon."
  -------------------------------------------------------- */
  {
    id: 'feed-40-invest',
    tag: 'Support',
    title: 'Invest in Northwest Oregon.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Your contribution helps us support candidates, organize volunteers, communicate with voters, and continue building the long-term infrastructure Northwest Oregon deserves.\n\nEvery gift, no matter the size, helps move the mission forward.\n\nSupport Northwest Oregon PAC today.\n\n#Donate #NorthwestOregonPAC #SupportLocalLeadership #Grassroots #Election2026 #NorthwestOregon',
    data: {
      css: `
        .f40 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f40-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f40-mast img { height:56px; width:auto; }
        .f40-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f40-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f40-head { position:absolute; top:220px; left:76px; right:520px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f40-head em { display:block; font-style:italic; color:#5a7060; }
        /* Stacked coins diagram right */
        .f40-coins { position:absolute; top:220px; right:70px; width:440px; height:500px; z-index:5; }
        .f40-coins svg { display:block; width:100%; height:100%; }
        /* Callouts on coins */
        .f40-lbls { position:absolute; top:220px; right:70px; width:440px; height:500px; z-index:6; pointer-events:none; }
        .f40-lbls .l { position:absolute; right:0; display:flex; align-items:center; gap:12px; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f40-lbls .l .em { font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f40-lbls .l.a { top:80px; }
        .f40-lbls .l.b { top:180px; }
        .f40-lbls .l.c { top:280px; }
        .f40-lbls .l.d { top:380px; }
        /* Body */
        .f40-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-weight:500; font-size:24px; line-height:1.22; letter-spacing:-.012em; color:#2e4538; max-width:920px; }
        .f40-body em { font-style:italic; color:#6b5a42; }
        .f40-sig { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f40-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f40-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f40">
          <div class="f40-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Investment 40 · Support</span>
          </div>
          <span class="f40-kick">Support</span>
          <h1 class="f40-head">Invest in<em>Northwest Oregon.</em></h1>
          <div class="f40-coins">
            <svg viewBox="0 0 440 500" fill="none">
              <defs>
                <linearGradient id="f40coin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#c8b581"/>
                  <stop offset="55%" stop-color="#9c8144"/>
                  <stop offset="100%" stop-color="#6b5124"/>
                </linearGradient>
              </defs>
              <!-- Four stacked coins with disc + rim -->
              <g>
                <ellipse cx="180" cy="440" rx="140" ry="30" fill="#6b5124" opacity="0.35"/>
                <rect x="40" y="380" width="280" height="50" fill="url(#f40coin)" stroke="#2e4538" stroke-width="1.5"/>
                <ellipse cx="180" cy="430" rx="140" ry="30" fill="url(#f40coin)" stroke="#2e4538" stroke-width="1.5"/>
                <ellipse cx="180" cy="380" rx="140" ry="30" fill="#e0d6bc" stroke="#2e4538" stroke-width="1.5"/>
                <text x="180" y="384" font-family="Lora" font-style="italic" font-size="24" fill="#2e4538" text-anchor="middle">$1,000</text>
                <!-- Coin 3 -->
                <rect x="40" y="290" width="280" height="50" fill="url(#f40coin)" stroke="#2e4538" stroke-width="1.5"/>
                <ellipse cx="180" cy="290" rx="140" ry="30" fill="#e0d6bc" stroke="#2e4538" stroke-width="1.5"/>
                <text x="180" y="294" font-family="Lora" font-style="italic" font-size="24" fill="#2e4538" text-anchor="middle">$500</text>
                <!-- Coin 2 -->
                <rect x="40" y="200" width="280" height="50" fill="url(#f40coin)" stroke="#2e4538" stroke-width="1.5"/>
                <ellipse cx="180" cy="200" rx="140" ry="30" fill="#e0d6bc" stroke="#2e4538" stroke-width="1.5"/>
                <text x="180" y="204" font-family="Lora" font-style="italic" font-size="24" fill="#2e4538" text-anchor="middle">$100</text>
                <!-- Coin 1 (top) -->
                <rect x="40" y="110" width="280" height="50" fill="url(#f40coin)" stroke="#2e4538" stroke-width="1.5"/>
                <ellipse cx="180" cy="110" rx="140" ry="30" fill="#e0d6bc" stroke="#2e4538" stroke-width="1.5"/>
                <text x="180" y="114" font-family="Lora" font-style="italic" font-size="24" fill="#2e4538" text-anchor="middle">$25</text>
              </g>
            </svg>
          </div>
          <p class="f40-body">Every contribution helps <em>strengthen local campaigns,</em> recruit future leaders, support grassroots volunteers, and expand our reach across the region.</p>
          <div class="f40-sig"><span>Help build something that lasts</span><span class="em">— Support Northwest Oregon PAC today.</span></div>
          <div class="f40-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 41 — Donate ladder $25 / $100 / $500 / $1,000
     Creative direction: rising steps. Forest ground with an
     ascending staircase SVG, each step labeled with a dollar
     amount rising left-to-right; italic serif headline.
  -------------------------------------------------------- */
  {
    id: 'feed-41-donate-ladder',
    tag: 'Support',
    title: 'Every contribution builds a stronger Northwest Oregon.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "Every dollar stays focused on Northwest Oregon, supporting candidates, organizing volunteers, and reaching voters across our region.\n\nWhether it's $25 or $1,000, your contribution helps build lasting political infrastructure.\n\nChip in today and help strengthen Northwest Oregon.\n\n#Donate #NorthwestOregonPAC #SupportLocalLeadership #Election2026 #Grassroots #NorthwestOregon",
    data: {
      css: `
        .f41 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f41-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f41-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f41-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f41-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f41-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1.02; letter-spacing:-.028em; color:#f6f2e8; max-width:920px; }
        .f41-head em { font-style:italic; color:#e0d6bc; }
        /* Ascending steps */
        .f41-stairs { position:absolute; left:76px; right:76px; top:430px; height:340px; z-index:5; display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:14px; align-items:end; }
        .f41-step { position:relative; background:linear-gradient(180deg, rgba(224,214,188,.14) 0%, rgba(224,214,188,.06) 100%); border:1.5px solid rgba(246,242,232,.5); padding:16px 14px 14px; display:flex; flex-direction:column; gap:8px; box-shadow:0 20px 40px -22px rgba(0,0,0,.5); }
        .f41-step .n { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); }
        .f41-step .amt { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:52px; line-height:1; letter-spacing:-.03em; color:#e0d6bc; }
        .f41-step .lbl { margin-top:auto; font-family:var(--font-mono); font-size:10px; letter-spacing:.42em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f41-step.s1 { height:180px; }
        .f41-step.s2 { height:220px; }
        .f41-step.s3 { height:280px; }
        .f41-step.s4 { height:340px; background:linear-gradient(180deg, rgba(224,214,188,.28) 0%, rgba(224,214,188,.08) 100%); border-width:2.5px; }
        /* CTA plate */
        .f41-cta { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding:16px 22px; background:#e0d6bc; color:#2e4538; display:flex; align-items:center; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-weight:700; font-size:16px; letter-spacing:.44em; text-transform:uppercase; }
        .f41-cta .em { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f41-sig { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f41-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f41-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f41">
          <div class="f41-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Ladder 41 · Donate</span>
          </div>
          <span class="f41-kick">Donate</span>
          <h1 class="f41-head">Every contribution builds a stronger<em>Northwest Oregon.</em></h1>
          <div class="f41-stairs">
            <div class="f41-step s1"><span class="n">— Step 01</span><span class="amt">$25</span><span class="lbl">Chip in</span></div>
            <div class="f41-step s2"><span class="n">— Step 02</span><span class="amt">$100</span><span class="lbl">Take a stand</span></div>
            <div class="f41-step s3"><span class="n">— Step 03</span><span class="amt">$500</span><span class="lbl">Build the bench</span></div>
            <div class="f41-step s4"><span class="n">— Step 04</span><span class="amt">$1,000</span><span class="lbl">Anchor the region</span></div>
          </div>
          <div class="f41-cta"><span>Donate Today</span><span class="em">— Chip in and help strengthen Northwest Oregon.</span></div>
          <div class="f41-sig"><span>Every dollar stays here</span><span class="em">— Focused on Northwest Oregon.</span></div>
          <div class="f41-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 42 — What does your support make possible?
     Creative direction: recipe / ingredients card. Sand ground
     with a hand-numbered ingredient list for building a
     stronger region; italic serif title above.
  -------------------------------------------------------- */
  {
    id: 'feed-42-support-makes-possible',
    tag: 'Support',
    title: 'What does your support make possible?',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Together, we're building the foundation for stronger campaigns and stronger communities across Northwest Oregon.\n\nBe part of the movement.\n\n#NorthwestOregonPAC #Grassroots #CommunityImpact #SupportLocal #Election2026",
    data: {
      css: `
        .f42 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f42-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f42-mast img { height:56px; width:auto; }
        /* Recipe card */
        .f42-card { position:absolute; top:170px; bottom:130px; left:80px; right:80px; z-index:5;
          background:#faf3d8; border:1.5px solid rgba(46,69,56,.4);
          box-shadow:0 30px 60px -30px rgba(46,69,56,.4);
          padding:30px 40px 28px;
          display:flex; flex-direction:column;
        }
        .f42-card .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid #2e4538; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f42-card .header .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f42-card .kick { margin-top:16px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f42-card .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f42-card .head { margin-top:6px; font-family:var(--font-display); font-weight:500; font-size:62px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f42-card .head em { font-style:italic; color:#5a7060; }
        .f42-card .yields { margin-top:16px; padding-top:12px; border-top:1px dashed rgba(46,69,56,.5); display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f42-card .yields .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f42-card .ingredients { margin-top:18px; display:flex; flex-direction:column; gap:12px; }
        .f42-card .ing { display:grid; grid-template-columns:44px 130px 1fr; gap:20px; align-items:baseline; padding-bottom:10px; border-bottom:1px solid rgba(46,69,56,.3); }
        .f42-card .ing .n { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); }
        .f42-card .ing .qty { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#5a7060; }
        .f42-card .ing .item { font-family:var(--font-display); font-weight:500; font-size:26px; line-height:1.14; letter-spacing:-.015em; color:#2e4538; }
        .f42-card .ing .item em { font-style:italic; color:#6b5a42; }
        .f42-card .signoff { margin-top:auto; padding-top:14px; border-top:1.5px solid #2e4538; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f42-card .signoff .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f42-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f42">
          <div class="f42-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Recipe 42 · Your Support</span>
          </div>
          <div class="f42-card">
            <div class="header"><span>The Northwest Recipe</span><span class="em">Your support</span><span>No. 42</span></div>
            <span class="kick">Your support</span>
            <h1 class="head">What does your support make <em>possible?</em></h1>
            <div class="yields"><span>— Yields</span><span class="em">Stronger campaigns · Stronger communities</span></div>
            <div class="ingredients">
              <div class="ing"><span class="n">01</span><span class="qty">1 part</span><span class="item">Candidate <em>recruitment</em></span></div>
              <div class="ing"><span class="n">02</span><span class="qty">1 part</span><span class="item">Volunteer <em>organization</em></span></div>
              <div class="ing"><span class="n">03</span><span class="qty">1 part</span><span class="item">Community <em>outreach</em></span></div>
              <div class="ing"><span class="n">04</span><span class="qty">1 part</span><span class="item">Voter <em>engagement</em></span></div>
              <div class="ing"><span class="n">05</span><span class="qty">1 part</span><span class="item">Campaign <em>communications</em></span></div>
            </div>
            <div class="signoff"><span>Together, we're building the foundation</span><span class="em">— Be part of the movement.</span></div>
          </div>
          <div class="f42-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 43 — Campaigns aren't built in boardrooms.
     Creative direction: struck-through boardroom vs open
     doorstep. Cream ground with a bureaucratic "meeting
     minutes" card struck through, italic serif contrast
     "doorsteps / community events / conversations" beneath.
  -------------------------------------------------------- */
  {
    id: 'feed-43-not-boardrooms',
    tag: 'Get involved',
    title: "Campaigns aren't built in boardrooms.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Volunteers are the heart of every successful campaign.\n\nWhether you have one hour or one weekend, your time helps connect candidates with the communities they hope to serve.\n\nJoin our volunteer network.\n\n#Volunteer #NorthwestOregonPAC',
    data: {
      css: `
        .f43 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f43-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f43-mast img { height:56px; width:auto; }
        .f43-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f43-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f43-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:70px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f43-head em { display:block; font-style:italic; color:#5a7060; }
        /* Struck-through boardroom card */
        .f43-strike { position:absolute; left:76px; right:76px; top:440px; z-index:5;
          background:rgba(46,69,56,.08); border:1.5px dashed rgba(46,69,56,.5);
          padding:18px 22px;
        }
        .f43-strike::after {
          content:''; position:absolute; left:22px; right:22px; top:calc(74% - 2px); height:3px; background:#2e4538; transform:rotate(-.7deg); opacity:.85;
        }
        .f43-strike .lbl { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); position:relative; z-index:2; }
        .f43-strike .txt { position:relative; z-index:2; margin-top:6px; font-family:var(--font-display); font-weight:500; font-size:32px; line-height:1.06; letter-spacing:-.022em; color:rgba(46,69,56,.75); }
        /* Alternative — three doorstep tiles */
        .f43-tiles { position:absolute; left:76px; right:76px; top:600px; z-index:5; display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .f43-tile { padding:18px 20px; background:#2e4538; color:#f6f2e8; border-top:4px solid #e0d6bc; }
        .f43-tile .n { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(224,214,188,.7); }
        .f43-tile .w { margin-top:8px; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:32px; line-height:1.02; letter-spacing:-.022em; color:#f6f2e8; }
        .f43-tile .w em { font-style:normal; color:#e0d6bc; }
        /* Sig */
        .f43-sig { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; max-width:920px; }
        .f43-sig em { font-style:normal; color:#5a7060; }
        .f43-tag { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f43-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f43-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f43">
          <div class="f43-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Correction 43 · Grassroots</span>
          </div>
          <span class="f43-kick">Grassroots is where it happens</span>
          <h1 class="f43-head">Campaigns aren't built in<em>boardrooms.</em></h1>
          <div class="f43-strike">
            <span class="lbl">— Not here</span>
            <p class="txt">Boardroom · Meeting minutes · Corporate slate</p>
          </div>
          <div class="f43-tiles">
            <div class="f43-tile"><span class="n">— Here 01</span><span class="w">On <em>doorsteps.</em></span></div>
            <div class="f43-tile"><span class="n">— Here 02</span><span class="w">At <em>community events.</em></span></div>
            <div class="f43-tile"><span class="n">— Here 03</span><span class="w">In <em>conversations between neighbors.</em></span></div>
          </div>
          <p class="f43-sig">Volunteers are the <em>heart</em> of every successful campaign.</p>
          <div class="f43-tag"><span>Whether one hour or one weekend</span><span class="em">— Join our volunteer network.</span></div>
          <div class="f43-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 44 — We don't measure success by headlines.
     Creative direction: mock front-page with the headline bar
     struck through, three real metrics printed underneath as
     italic serif measures.
  -------------------------------------------------------- */
  {
    id: 'feed-44-not-headlines',
    tag: 'Beliefs',
    title: "We don't measure success by headlines.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "One election can make a difference.\n\nA stronger political organization can make a difference for generations.\n\nThat's the commitment we're making to Northwest Oregon.\n\n#NorthwestOregonPAC #CommunityLeadership #NorthwestOregon",
    data: {
      css: `
        .f44 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(224,214,188,.5) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2a2a26;
        }
        .f44::before {
          content:''; position:absolute; inset:0; opacity:.14; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.14  0 0 0 0 0.1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        .f44-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f44-mast img { height:56px; width:auto; }
        /* Newspaper masthead */
        .f44-paper { position:absolute; top:170px; left:76px; right:76px; z-index:6; padding-bottom:14px; border-bottom:3px double #2a2a26; }
        .f44-paper .title { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:58px; letter-spacing:-.02em; color:#2a2a26; line-height:1; }
        .f44-paper .meta { margin-top:12px; display:flex; align-items:center; justify-content:space-between; gap:20px; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        /* Struck headline card */
        .f44-strike { position:absolute; top:320px; left:76px; right:76px; z-index:5;
          padding:22px 24px; background:rgba(46,69,56,.05); border:1.5px solid rgba(46,69,56,.35);
        }
        .f44-strike::after { content:''; position:absolute; left:24px; right:24px; top:calc(75% - 2px); height:3px; background:#6b5a42; transform:rotate(-.8deg); opacity:.85; }
        .f44-strike .k { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); position:relative; z-index:2; }
        .f44-strike .txt { position:relative; z-index:2; margin-top:6px; font-family:var(--font-display); font-weight:500; font-size:52px; line-height:1; letter-spacing:-.028em; color:rgba(46,69,56,.7); }
        /* Real measures */
        .f44-measures { position:absolute; left:76px; right:76px; top:520px; z-index:5; padding-top:18px; border-top:1.5px solid rgba(46,69,56,.35); display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .f44-measure { padding:18px 20px; background:rgba(246,242,232,.7); border:1.5px solid rgba(46,69,56,.4); display:flex; flex-direction:column; gap:10px; }
        .f44-measure .n { font-family:var(--font-display); font-style:italic; font-size:34px; line-height:1; color:rgba(46,69,56,.35); letter-spacing:-.02em; }
        .f44-measure .k { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f44-measure .v { font-family:var(--font-display); font-weight:500; font-size:32px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; }
        .f44-measure .v em { font-style:italic; color:#5a7060; }
        /* Sig */
        .f44-sig { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; text-align:center; }
        .f44-sig em { font-style:normal; color:#5a7060; }
        .f44-tag { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f44-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f44-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f44">
          <div class="f44-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Correction 44 · How We Measure</span>
          </div>
          <div class="f44-paper">
            <div class="title">The Northwest Front Page</div>
            <div class="meta"><span>Vol. 44 · No. 01</span><span>How we measure</span><span>Est. 2026</span></div>
          </div>
          <div class="f44-strike">
            <span class="k">— Not this</span>
            <p class="txt">Headlines · Coverage · Applause</p>
          </div>
          <div class="f44-measures">
            <div class="f44-measure"><span class="n">i.</span><span class="k">— Measure 01</span><span class="v">Stronger <em>communities.</em></span></div>
            <div class="f44-measure"><span class="n">ii.</span><span class="k">— Measure 02</span><span class="v">Better <em>candidates.</em></span></div>
            <div class="f44-measure"><span class="n">iii.</span><span class="k">— Measure 03</span><span class="v">More <em>engaged citizens.</em></span></div>
          </div>
          <p class="f44-sig">A stronger political organization can make a difference for <em>generations.</em></p>
          <div class="f44-tag"><span>That's the commitment we're making</span><span class="em">— To Northwest Oregon.</span></div>
          <div class="f44-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 45 — This is bigger than one election.
     Creative direction: election-cycles horizon strip. Forest
     ground with a horizontal timeline of election-year discs
     (2026 · 2028 · 2030 · ∞) with the current cycle marked
     as "one of many"; italic serif manifesto beneath.
  -------------------------------------------------------- */
  {
    id: 'feed-45-bigger-than-one',
    tag: 'Beliefs',
    title: 'This is bigger than one election.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      "Northwest Oregon PAC was created with a long-term vision.\n\nTo recruit leaders. Support campaigns. Grow volunteers. Strengthen communities.\n\nAnd ensure Northwest Oregon is never an afterthought again.\n\nJoin us as we build what's next.\n\n#NorthwestOregonPAC #NorthwestOregon #Election2026",
    data: {
      css: `
        .f45 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.9) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f45-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f45-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f45-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f45-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f45-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:.98; letter-spacing:-.028em; color:#f6f2e8; max-width:920px; }
        .f45-head em { display:block; font-style:italic; color:#e0d6bc; }
        /* Cycles strip */
        .f45-strip { position:absolute; left:76px; right:76px; top:460px; z-index:5; padding-top:20px; border-top:1.5px solid rgba(224,214,188,.55); }
        .f45-strip .rail { position:relative; height:180px; }
        .f45-strip .rail::before { content:''; position:absolute; left:0; right:0; top:60px; height:1px; background:linear-gradient(90deg, rgba(224,214,188,.6), rgba(224,214,188,.35) 90%, transparent); }
        .f45-cycle { position:absolute; top:0; display:flex; flex-direction:column; align-items:center; gap:10px; width:22%; text-align:center; }
        .f45-cycle .disc { width:100px; height:100px; border-radius:999px; border:2px solid #e0d6bc; background:#1c2b23; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 22px -8px rgba(0,0,0,.5); }
        .f45-cycle.now .disc { background:#e0d6bc; }
        .f45-cycle .disc .yr { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:32px; letter-spacing:-.02em; color:#e0d6bc; }
        .f45-cycle.now .disc .yr { color:#2e4538; }
        .f45-cycle .disc .inf { font-family:var(--font-display); font-weight:500; font-size:42px; color:#e0d6bc; }
        .f45-cycle .lbl { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f45-cycle.c1 { left:0; }
        .f45-cycle.c2 { left:26%; }
        .f45-cycle.c3 { left:52%; }
        .f45-cycle.c4 { left:78%; }
        /* Body */
        .f45-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(224,214,188,.35); font-family:var(--font-display); font-weight:500; font-size:24px; line-height:1.24; letter-spacing:-.012em; color:rgba(246,242,232,.94); max-width:920px; }
        .f45-body em { font-style:italic; color:#e0d6bc; }
        .f45-tag { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f45-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f45-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f45">
          <div class="f45-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Horizon 45 · Bigger Than One</span>
          </div>
          <span class="f45-kick">Bigger than one election</span>
          <h1 class="f45-head">This is bigger than<em>one election.</em></h1>
          <div class="f45-strip">
            <div class="rail">
              <div class="f45-cycle c1 now"><div class="disc"><span class="yr">'26</span></div><span class="lbl">— This cycle</span></div>
              <div class="f45-cycle c2"><div class="disc"><span class="yr">'28</span></div><span class="lbl">— Next cycle</span></div>
              <div class="f45-cycle c3"><div class="disc"><span class="yr">'30</span></div><span class="lbl">— After next</span></div>
              <div class="f45-cycle c4"><div class="disc"><span class="inf">∞</span></div><span class="lbl">— And beyond</span></div>
            </div>
          </div>
          <p class="f45-body">It's about building a Northwest Oregon where every community has a <em>voice,</em> every voter has a <em>choice,</em> and every candidate has the opportunity to compete.</p>
          <div class="f45-tag"><span>Join us as we build what's next</span><span class="em">— A long-term vision.</span></div>
          <div class="f45-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 46 — Raised here. Invested here.
     Creative direction: return-here arrow diagram. Cream ground
     with a bold circular arrow forming a closed local loop.
     Italic serif title splits with mono verbs beneath.
  -------------------------------------------------------- */
  {
    id: 'feed-46-raised-invested',
    tag: 'Support',
    title: 'Raised here. Invested here.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Northwest Oregon should not have to wait for outside organizations to decide our races matter. Local support gives credible candidates the tools to build stronger campaigns.\n\nHelp strengthen the region.\n\n#NorthwestOregonPAC #SupportLocalCandidates #OregonPolitics',
    data: {
      css: `
        .f46 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f46-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f46-mast img { height:56px; width:auto; }
        .f46-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f46-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Split title */
        .f46-title { position:absolute; top:230px; left:76px; right:520px; z-index:6; }
        .f46-title .l1 { font-family:var(--font-display); font-weight:500; font-size:96px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f46-title .l2 { display:block; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:96px; line-height:.98; letter-spacing:-.028em; color:#5a7060; }
        /* Right SVG loop */
        .f46-loop { position:absolute; top:200px; right:70px; width:420px; height:420px; z-index:5; }
        .f46-loop svg { display:block; width:100%; height:100%; }
        /* Verbs strip */
        .f46-verbs { position:absolute; left:76px; right:76px; bottom:180px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .f46-verbs .v { padding:14px 16px; background:#2e4538; color:#f6f2e8; display:flex; align-items:baseline; justify-content:space-between; gap:14px; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f46-verbs .v .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f46-sig { position:absolute; left:76px; right:76px; bottom:120px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f46-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f46-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f46">
          <div class="f46-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Loop 46 · Raised Here. Invested Here.</span>
          </div>
          <span class="f46-kick">Raised here. Invested here.</span>
          <div class="f46-title">
            <span class="l1">Raised here.</span>
            <span class="l2">Invested here.</span>
          </div>
          <div class="f46-loop">
            <svg viewBox="0 0 420 420" fill="none" stroke="#2e4538" stroke-width="2">
              <circle cx="210" cy="210" r="170" fill="rgba(90,112,96,.06)"/>
              <!-- Circular flow path leaves clear gap at 3 & 9 o'clock -->
              <path d="M 90 152 A 150 150 0 0 1 330 152" stroke-dasharray="6 6" opacity="0.6"/>
              <path d="M 90 268 A 150 150 0 0 0 330 268" stroke-dasharray="6 6" opacity="0.6"/>
              <!-- Arrows -->
              <path d="M 322 148 L 332 152 L 320 168" stroke-width="2.5" fill="none"/>
              <path d="M 98 148 L 88 152 L 100 168" stroke-width="2.5" fill="none"/>
              <!-- Nodes — larger and pushed to the sides -->
              <circle cx="60" cy="210" r="44" fill="#e0d6bc" stroke="#2e4538" stroke-width="2"/>
              <text x="60" y="202" font-family="Source Sans 3" font-size="10" fill="#2e4538" text-anchor="middle" stroke="none" letter-spacing="2">RAISED</text>
              <text x="60" y="224" font-family="Lora" font-style="italic" font-size="16" fill="#2e4538" text-anchor="middle" stroke="none">here</text>
              <circle cx="360" cy="210" r="44" fill="#2e4538" stroke="#e0d6bc" stroke-width="2"/>
              <text x="360" y="202" font-family="Source Sans 3" font-size="10" fill="#e0d6bc" text-anchor="middle" stroke="none" letter-spacing="2">INVESTED</text>
              <text x="360" y="224" font-family="Lora" font-style="italic" font-size="16" fill="#e0d6bc" text-anchor="middle" stroke="none">here</text>
              <text x="210" y="216" font-family="Source Sans 3" font-size="11" fill="#2e4538" text-anchor="middle" stroke="none" letter-spacing="3">THE REGION</text>
            </svg>
          </div>
          <div class="f46-verbs">
            <div class="v"><span>— 01</span><span class="em">Organize</span></div>
            <div class="v"><span>— 02</span><span class="em">Communicate</span></div>
            <div class="v"><span>— 03</span><span class="em">Compete</span></div>
          </div>
          <div class="f46-sig"><span>No waiting for outside organizations</span><span class="em">— Help strengthen the region.</span></div>
          <div class="f46-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 47 — Every voter deserves a real choice.
     Creative direction: ballot with both ovals open (no
     race decided). Sand ground with an editorial ballot
     card centered; italic serif title above.
  -------------------------------------------------------- */
  {
    id: 'feed-47-real-choice',
    tag: 'Beliefs',
    title: 'Every voter deserves a real choice.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Political competition encourages candidates to listen, explain their positions, and earn voters' trust.\n\nNo Northwest Oregon district should be written off in advance.\n\n#VoterChoice #NorthwestOregon #CompetitiveElections #OregonPolitics",
    data: {
      css: `
        .f47 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f47-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f47-mast img { height:56px; width:auto; }
        .f47-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f47-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f47-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:1; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f47-head em { font-style:italic; color:#5a7060; }
        /* Ballot */
        .f47-ballot { position:absolute; left:150px; right:150px; top:440px; bottom:220px; z-index:5;
          background:#faf3d8; border:2px solid #2e4538;
          box-shadow:0 30px 60px -30px rgba(46,69,56,.5);
          padding:26px 34px 24px;
          display:flex; flex-direction:column;
        }
        .f47-ballot::before { content:''; position:absolute; inset:10px; border:1px double #2e4538; pointer-events:none; }
        .f47-ballot .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:12px; border-bottom:2px solid #2e4538; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f47-ballot .header .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f47-ballot .instr { margin-top:16px; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); }
        .f47-ballot .opts { margin-top:16px; display:flex; flex-direction:column; gap:16px; }
        .f47-ballot .opt { display:flex; align-items:center; gap:22px; padding:16px 20px; border:1.5px solid rgba(46,69,56,.55); }
        .f47-ballot .opt .oval { flex:none; width:38px; height:56px; border:3px solid #2e4538; border-radius:999px; }
        .f47-ballot .opt .lbl { flex:1; font-family:var(--font-display); font-weight:500; font-size:32px; letter-spacing:-.015em; color:#2e4538; }
        .f47-ballot .opt .lbl em { font-style:italic; color:#5a7060; }
        .f47-ballot .opt .abc { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); }
        .f47-ballot .foot { margin-top:auto; padding-top:14px; border-top:1.5px solid #2e4538; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f47-ballot .foot .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Body */
        .f47-body { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; line-height:1.22; letter-spacing:-.012em; color:#2e4538; text-align:center; max-width:920px; }
        .f47-body em { font-style:normal; color:#6b5a42; }
        .f47-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f47">
          <div class="f47-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Ballot 47 · Competitive Elections</span>
          </div>
          <span class="f47-kick">Competitive elections</span>
          <h1 class="f47-head">Every voter deserves a <em>real choice.</em></h1>
          <div class="f47-ballot">
            <div class="header"><span>The Northwest Ballot</span><span class="em">Both options open</span><span>No. 47</span></div>
            <span class="instr">— Mark one oval · Fill completely</span>
            <div class="opts">
              <div class="opt"><span class="oval"></span><span class="lbl">Candidate <em>A</em></span><span class="abc">A</span></div>
              <div class="opt"><span class="oval"></span><span class="lbl">Candidate <em>B</em></span><span class="abc">B</span></div>
            </div>
            <div class="foot"><span>Not decided before the first ballot is cast</span><span class="em">— Every race is a choice.</span></div>
          </div>
          <p class="f47-body">No Northwest Oregon district should be <em>written off in advance.</em></p>
          <div class="f47-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 48 — A credible candidate should never have to build alone.
     Creative direction: candidate silhouette encircled by
     four support beams. Forest ground with a central figure
     and radial support labels (Fundraising / Messaging /
     Outreach / Volunteers).
  -------------------------------------------------------- */
  {
    id: 'feed-48-not-alone',
    tag: 'About',
    title: 'A credible candidate should never have to build alone.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      'Running a serious campaign takes more than determination. It takes organization, resources, and people willing to help.\n\nThat is the infrastructure Northwest Oregon PAC is building.\n\n#CandidateSupport #Northwestoregon',
    data: {
      css: `
        .f48 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 42%, rgba(224,214,188,.14) 0%, rgba(224,214,188,0) 55%),
            radial-gradient(90% 60% at 20% 5%, rgba(90,112,96,.5) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f48-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f48-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f48-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f48-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f48-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1; letter-spacing:-.028em; color:#f6f2e8; max-width:920px; }
        .f48-head em { display:block; font-style:italic; color:#e0d6bc; }
        /* Central figure + beams */
        .f48-diagram { position:absolute; top:450px; left:calc(50% - 200px); width:400px; height:260px; z-index:5; }
        .f48-diagram svg { display:block; width:100%; height:100%; }
        /* Four beam labels around the figure */
        .f48-lbl { position:absolute; z-index:6; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.65); }
        .f48-lbl .em { display:block; margin-top:4px; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f48-lbl.tl { top:450px; left:80px; width:240px; text-align:right; }
        .f48-lbl.tr { top:450px; right:80px; width:240px; text-align:left; }
        .f48-lbl.bl { top:660px; left:80px; width:240px; text-align:right; }
        .f48-lbl.br { top:660px; right:80px; width:240px; text-align:left; }
        /* Body */
        .f48-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); font-family:var(--font-display); font-weight:500; font-size:24px; line-height:1.22; letter-spacing:-.012em; color:rgba(246,242,232,.94); max-width:920px; }
        .f48-body em { font-style:italic; color:#e0d6bc; }
        .f48-tag { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f48-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f48-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f48">
          <div class="f48-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Diagram 48 · Candidate Support</span>
          </div>
          <span class="f48-kick">Candidate support</span>
          <h1 class="f48-head">A credible candidate should never have to<em>build alone.</em></h1>
          <div class="f48-diagram">
            <svg viewBox="0 0 400 260" fill="none" stroke="#e0d6bc" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <!-- Center silhouette -->
              <circle cx="200" cy="90" r="24"/>
              <path d="M 160 200 L 160 130 C 160 122 168 116 200 116 C 232 116 240 122 240 130 L 240 200"/>
              <!-- Four support beams -->
              <line x1="200" y1="90" x2="60" y2="30" stroke-width="1.2" stroke-dasharray="4 4"/>
              <line x1="200" y1="90" x2="340" y2="30" stroke-width="1.2" stroke-dasharray="4 4"/>
              <line x1="200" y1="200" x2="60" y2="240" stroke-width="1.2" stroke-dasharray="4 4"/>
              <line x1="200" y1="200" x2="340" y2="240" stroke-width="1.2" stroke-dasharray="4 4"/>
              <!-- Beam anchors -->
              <circle cx="60" cy="30" r="8" fill="#e0d6bc"/>
              <circle cx="340" cy="30" r="8" fill="#e0d6bc"/>
              <circle cx="60" cy="240" r="8" fill="#e0d6bc"/>
              <circle cx="340" cy="240" r="8" fill="#e0d6bc"/>
              <!-- Ground line -->
              <line x1="140" y1="220" x2="260" y2="220" stroke-width="1.4"/>
            </svg>
          </div>
          <span class="f48-lbl tl">— Beam 01<span class="em">Fundraising</span></span>
          <span class="f48-lbl tr">— Beam 02<span class="em">Messaging</span></span>
          <span class="f48-lbl bl">— Beam 03<span class="em">Outreach</span></span>
          <span class="f48-lbl br">— Beam 04<span class="em">Volunteer support</span></span>
          <p class="f48-body">Running a serious campaign takes <em>more than determination.</em> It takes organization, resources, and people willing to help.</p>
          <div class="f48-tag"><span>That is the infrastructure</span><span class="em">— Northwest Oregon PAC is building.</span></div>
          <div class="f48-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 49 — Let builders build.
     Creative direction: stacked brick wall composition. Cream
     ground with SVG stacked bricks each stamped with a verb
     of enterprise. Italic serif "Let builders build."
  -------------------------------------------------------- */
  {
    id: 'feed-49-let-builders-build',
    tag: 'Issues',
    title: 'Let builders build.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Local employers create jobs, support families, and keep communities moving.\n\nPublic policy should make it easier, not harder, or responsible businesses to succeed.\n\n#SmallBusiness #EconomicOpportunity #NorthwestOregonPAC #SupportLocal',
    data: {
      css: `
        .f49 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f49-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f49-mast img { height:56px; width:auto; }
        .f49-section { position:absolute; top:180px; left:76px; right:76px; z-index:6; display:flex; align-items:center; gap:22px; font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:.5em; text-transform:uppercase; color:#6b5a42; }
        .f49-section .rule { flex:1; height:1px; background:currentColor; opacity:.5; }
        .f49-head { position:absolute; top:230px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:104px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f49-head em { font-style:italic; color:#5a7060; }
        /* Brick wall */
        .f49-wall { position:absolute; left:76px; right:76px; top:400px; height:280px; z-index:5; display:flex; flex-direction:column; gap:8px; }
        .f49-brickrow { display:grid; gap:8px; align-items:center; }
        .f49-brickrow.r1 { grid-template-columns:2fr 1.4fr 1.6fr; margin-left:0; }
        .f49-brickrow.r2 { grid-template-columns:1.6fr 2fr 1.4fr; margin-left:40px; }
        .f49-brickrow.r3 { grid-template-columns:1.4fr 1.6fr 2fr; margin-left:20px; }
        .f49-brick {
          padding:18px 22px; background:linear-gradient(180deg, #c8b581 0%, #9c8144 100%);
          border:1.5px solid #2e4538; color:#2e4538;
          display:flex; align-items:baseline; justify-content:space-between; gap:14px;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase;
          box-shadow:0 6px 12px -6px rgba(46,32,19,.5), inset 0 -3px 6px rgba(46,32,19,.2);
        }
        .f49-brick .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; line-height:1; }
        .f49-brick.dark { background:linear-gradient(180deg, #2e4538 0%, #1c2b23 100%); color:rgba(224,214,188,.7); }
        .f49-brick.dark .em { color:#e0d6bc; }
        /* Body */
        .f49-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-weight:500; font-size:22px; line-height:1.22; letter-spacing:-.012em; color:#2e4538; max-width:920px; }
        .f49-body em { font-style:italic; color:#6b5a42; }
        .f49-tag { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f49-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f49-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f49">
          <div class="f49-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Wall 49 · Our Priorities</span>
          </div>
          <div class="f49-section"><span>Our Priorities</span><span class="rule"></span><span>No. 49</span></div>
          <h1 class="f49-head">Let builders <em>build.</em></h1>
          <div class="f49-wall">
            <div class="f49-brickrow r1">
              <div class="f49-brick"><span>— 01</span><span class="em">Start</span></div>
              <div class="f49-brick dark"><span>— 02</span><span class="em">Hire</span></div>
              <div class="f49-brick"><span>— 03</span><span class="em">Invest</span></div>
            </div>
            <div class="f49-brickrow r2">
              <div class="f49-brick dark"><span>— 04</span><span class="em">Grow</span></div>
              <div class="f49-brick"><span>— 05</span><span class="em">Create jobs</span></div>
              <div class="f49-brick dark"><span>— 06</span><span class="em">Support families</span></div>
            </div>
            <div class="f49-brickrow r3">
              <div class="f49-brick"><span>— 07</span><span class="em">Keep communities moving</span></div>
              <div class="f49-brick dark"><span>— 08</span><span class="em">Without unnecessary barriers</span></div>
              <div class="f49-brick"><span>— 09</span><span class="em">Northwest Oregon succeeds</span></div>
            </div>
          </div>
          <p class="f49-body">Northwest Oregon succeeds when entrepreneurs can start, hire, invest, and <em>grow without unnecessary barriers.</em></p>
          <div class="f49-tag"><span>Local employers create jobs</span><span class="em">— Support families. Keep communities moving.</span></div>
          <div class="f49-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 50 — "Someone should do something" might be the
     person who should run.
     Creative direction: editorial pull-quote with mirror
     reflection. Sand ground with a mirror motif — the reader
     sees themselves in the quote; italic serif reflection.
  -------------------------------------------------------- */
  {
    id: 'feed-50-someone-should',
    tag: 'Get involved',
    title: '"Someone should do something" might be the person who should run.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Northwest Oregon needs capable residents who understand their communities and are ready to serve.\n\nExploring a campaign begins with a conversation, not a commitment.\n\n#RunForOffice #NorthwestOregonPAC #FutureCandidates #PublicService #Election2026',
    data: {
      css: `
        .f50 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f50-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f50-mast img { height:56px; width:auto; }
        .f50-section { position:absolute; top:180px; left:76px; right:76px; z-index:6; display:flex; align-items:center; gap:22px; font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:.5em; text-transform:uppercase; color:#6b5a42; }
        .f50-section .rule { flex:1; height:1px; background:currentColor; opacity:.5; }
        /* First voice */
        .f50-said { position:absolute; top:250px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-style:italic; font-weight:400; font-size:32px; letter-spacing:-.02em; color:rgba(46,69,56,.55); }
        .f50-quote { position:absolute; top:310px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.028em; color:#2e4538; }
        .f50-quote em { font-style:italic; color:#5a7060; }
        /* Reveal separator */
        .f50-mirror { position:absolute; left:76px; right:76px; top:620px; z-index:5; height:2px; background:linear-gradient(90deg, transparent, #2e4538 20%, #2e4538 80%, transparent); }
        .f50-mirror::before { content:'⟨ the reveal ⟩'; position:absolute; left:50%; transform:translateX(-50%); top:-14px; padding:0 22px; background:#f0e8cf; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:#6b5a42; }
        /* The answer — reads right-side up, editorial italic */
        .f50-reflect { position:absolute; top:660px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:60px; line-height:1.02; letter-spacing:-.028em; color:#5a7060; text-align:center; }
        /* CTA plate */
        .f50-cta { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding:16px 22px; background:#2e4538; color:#e0d6bc; display:flex; align-items:center; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-weight:700; font-size:16px; letter-spacing:.44em; text-transform:uppercase; }
        .f50-cta .em { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; letter-spacing:-.01em; color:#f6f2e8; text-transform:none; }
        .f50-tag { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f50-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f50-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f50">
          <div class="f50-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Mirror 50 · Leadership</span>
          </div>
          <div class="f50-section"><span>Leadership</span><span class="rule"></span><span>No. 50</span></div>
          <p class="f50-said">— The person saying,</p>
          <h1 class="f50-quote">"Someone should do something" might be the <em>person who should run.</em></h1>
          <div class="f50-mirror"></div>
          <p class="f50-reflect">— might be <em style="font-style:normal;color:#2e4538;">you.</em></p>
          <div class="f50-cta"><span>Start the conversation</span><span class="em">— Exploring a campaign begins with a conversation, not a commitment.</span></div>
          <div class="f50-tag"><span>Northwest Oregon needs capable residents</span><span class="em">— Ready to serve.</span></div>
          <div class="f50-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 51 — Attention every four years.
     Creative direction: four-year calendar strip. Sand ground
     with a horizontal timeline of the last four years with
     only two election years lit up; brackets marking the
     dark years between; italic serif rebuke.
  -------------------------------------------------------- */
  {
    id: 'feed-51-every-four-years',
    tag: 'Beliefs',
    title: 'Our communities deserve more than attention every four years.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Campaigns come and go, but communities remain. Northwest Oregon deserves leaders who stay engaged long after the votes are counted.\n\n#NorthwestOregon #Leadership #CommunityFirst #NorthwestOregonPAC #Election2026',
    data: {
      css: `
        .f51 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f51-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f51-mast img { height:56px; width:auto; }
        .f51-section { position:absolute; top:180px; left:76px; right:76px; z-index:6; display:flex; align-items:center; gap:22px; font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:.5em; text-transform:uppercase; color:#6b5a42; }
        .f51-section .rule { flex:1; height:1px; background:currentColor; opacity:.5; }
        .f51-head { position:absolute; top:230px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1.02; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f51-head em { font-style:italic; color:#5a7060; }
        /* Year strip */
        .f51-strip { position:absolute; left:76px; right:76px; top:450px; z-index:5; padding-top:22px; border-top:1.5px solid rgba(46,69,56,.35); }
        .f51-strip .yrs { position:relative; height:240px; display:grid; grid-template-columns:1fr 1fr 1fr 1fr 1fr; gap:12px; align-items:start; }
        .f51-strip .yr { display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:10px; padding-bottom:14px; border-bottom:1px dashed rgba(46,69,56,.35); position:relative; }
        .f51-strip .yr .lbl { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.5); }
        .f51-strip .yr .disc { width:64px; height:64px; border-radius:999px; border:2px solid #2e4538; display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; letter-spacing:-.02em; color:#2e4538; background:transparent; }
        .f51-strip .yr.on .disc { background:#e0d6bc; box-shadow:0 8px 22px -8px rgba(46,69,56,.4); }
        .f51-strip .yr.on .lbl { color:#5a7060; font-weight:500; }
        /* Bracket over dark years — sits BELOW the row */
        .f51-strip .brace { position:absolute; left:22%; right:22%; top:150px; height:28px; border:2px solid #2e4538; border-bottom:none; border-radius:12px 12px 0 0; pointer-events:none; }
        .f51-strip .brace-lbl { position:absolute; left:22%; right:22%; top:182px; text-align:center; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); display:flex; align-items:baseline; justify-content:center; gap:14px; }
        .f51-strip .brace-lbl .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Body */
        .f51-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.012em; color:#2e4538; max-width:920px; }
        .f51-body em { font-style:italic; color:#6b5a42; }
        .f51-tag { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f51-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f51-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f51">
          <div class="f51-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Calendar 51 · The Empty Years</span>
          </div>
          <div class="f51-section"><span>Northwest Oregon</span><span class="rule"></span><span>No. 51</span></div>
          <h1 class="f51-head">Our communities deserve more than<em>attention every four years.</em></h1>
          <div class="f51-strip">
            <div class="yrs">
              <div class="yr on"><span class="lbl">— Election</span><span class="disc">'22</span></div>
              <div class="yr"><span class="lbl">— Quiet year</span><span class="disc">'23</span></div>
              <div class="yr"><span class="lbl">— Quiet year</span><span class="disc">'24</span></div>
              <div class="yr"><span class="lbl">— Quiet year</span><span class="disc">'25</span></div>
              <div class="yr on"><span class="lbl">— Election</span><span class="disc">'26</span></div>
              <div class="brace"></div>
              <div class="brace-lbl"><span>Three empty years</span><span class="em">— Where were they?</span></div>
            </div>
          </div>
          <p class="f51-body">They deserve <em>consistent leadership,</em> local investment, and representatives who never stop showing up.</p>
          <div class="f51-tag"><span>Campaigns come and go</span><span class="em">— Communities remain.</span></div>
          <div class="f51-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 52 — Every "Open" sign represents someone's dream.
     Creative direction: storefront window at dusk. Forest
     ground with SVG shop-window silhouette, warm glow, and
     an OPEN sign hanging inside; italic serif quote.
  -------------------------------------------------------- */
  {
    id: 'feed-52-open-sign',
    tag: 'Issues',
    title: 'Every "Open" sign represents someone\'s dream.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      'When local businesses succeed, they create jobs, strengthen neighborhoods, and invest back into the communities they call home.\n\nSupporting local business is supporting Northwest Oregon.\n\n#SupportLocal #SmallBusiness #NorthwestOregonPAC #EconomicGrowth #NorthwestOregon',
    data: {
      css: `
        .f52 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 42%, rgba(224,214,188,.18) 0%, rgba(224,214,188,0) 55%),
            radial-gradient(120% 100% at 50% 100%, rgba(14,22,17,.9) 0%, transparent 65%),
            linear-gradient(178deg, #1c2b23 0%, #0a1310 60%, #050a07 100%);
          color:#f6f2e8;
        }
        .f52-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f52-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f52-section { position:absolute; top:180px; left:76px; right:76px; z-index:6; display:flex; align-items:center; gap:22px; font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:.5em; text-transform:uppercase; color:#e0d6bc; }
        .f52-section .rule { flex:1; height:1px; background:currentColor; opacity:.5; }
        /* Shop-window SVG */
        .f52-shop { position:absolute; left:calc(50% - 220px); top:250px; width:440px; height:440px; z-index:5; }
        .f52-shop .halo { position:absolute; left:calc(50% - 200px); top:60px; width:400px; height:340px;
          background:radial-gradient(circle at 50% 40%, rgba(255,236,192,.28) 0%, rgba(255,236,192,.06) 40%, rgba(255,236,192,0) 70%);
          filter:blur(6px);
        }
        .f52-shop svg { position:relative; z-index:2; display:block; margin:0 auto; width:100%; height:100%; }
        /* Big quote below */
        .f52-quote { position:absolute; left:76px; right:76px; top:730px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:44px; line-height:1.02; letter-spacing:-.028em; color:#f6f2e8; text-align:center; }
        .f52-quote em { font-style:italic; color:#e0d6bc; }
        /* Body */
        .f52-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.22; letter-spacing:-.015em; color:rgba(246,242,232,.9); text-align:center; max-width:920px; }
        .f52-body em { font-style:normal; color:#e0d6bc; }
        .f52-tag { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f52-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f52-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f52">
          <div class="f52-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Window 52 · Local Economy</span>
          </div>
          <div class="f52-section"><span>Local Economy</span><span class="rule"></span><span>No. 52</span></div>
          <div class="f52-shop">
            <div class="halo"></div>
            <svg viewBox="0 0 440 440" fill="none" stroke="#e0d6bc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <!-- Storefront outer frame -->
              <path d="M 40 90 L 40 400 L 400 400 L 400 90 Z" fill="rgba(224,214,188,.06)"/>
              <path d="M 40 90 L 40 400 L 400 400 L 400 90"/>
              <!-- Awning -->
              <path d="M 30 90 L 410 90 L 380 60 L 60 60 Z" fill="rgba(90,112,96,.2)"/>
              <path d="M 30 90 L 410 90 L 380 60 L 60 60 Z"/>
              <!-- Awning stripes -->
              <line x1="120" y1="60" x2="100" y2="90" opacity="0.6"/>
              <line x1="180" y1="60" x2="164" y2="90" opacity="0.6"/>
              <line x1="240" y1="60" x2="228" y2="90" opacity="0.6"/>
              <line x1="300" y1="60" x2="292" y2="90" opacity="0.6"/>
              <line x1="360" y1="60" x2="356" y2="90" opacity="0.6"/>
              <!-- Window frame -->
              <rect x="70" y="130" width="300" height="240" fill="rgba(255,236,192,.14)" stroke="#e0d6bc"/>
              <line x1="220" y1="130" x2="220" y2="370"/>
              <line x1="70" y1="250" x2="370" y2="250"/>
              <!-- Door -->
              <rect x="180" y="290" width="80" height="110" fill="rgba(14,22,17,.7)" stroke="#e0d6bc"/>
              <circle cx="248" cy="345" r="3" fill="#e0d6bc"/>
              <!-- OPEN sign hanging in the window -->
              <line x1="220" y1="130" x2="220" y2="160" opacity="0.7"/>
              <rect x="176" y="160" width="88" height="42" fill="#e0d6bc" stroke="#2e4538" stroke-width="1.4"/>
              <text x="220" y="187" font-family="Lora" font-style="italic" font-size="26" fill="#2e4538" text-anchor="middle" stroke="none">Open</text>
              <!-- Sidewalk -->
              <line x1="10" y1="400" x2="430" y2="400" stroke-width="1.2" stroke-dasharray="6 6" opacity="0.5"/>
            </svg>
          </div>
          <p class="f52-quote">Every "Open" sign represents<em>someone's dream.</em></p>
          <p class="f52-body">Strong communities are built by <em>entrepreneurs,</em> family businesses, and people willing to take a chance on Northwest Oregon.</p>
          <div class="f52-tag"><span>Supporting local business</span><span class="em">— Is supporting Northwest Oregon.</span></div>
          <div class="f52-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 53 — We are building — FOR OREGON
     Creative direction: progress tracker. Cream ground with
     a five-row build-progress panel each with a check mark
     and progress bar; large italic "For Oregon" plate at end.
  -------------------------------------------------------- */
  {
    id: 'feed-53-we-are-building',
    tag: 'About',
    title: 'We are building',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Success is measured by what Northwest Oregon looks like five years from now.\n\nThat's the work we're committed to.\n\n#NorthwestOregonPAC #Grassroots #Future #Leadership #Election2026",
    data: {
      css: `
        .f53 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f53-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f53-mast img { height:56px; width:auto; }
        .f53-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f53-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f53-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:96px; line-height:.98; letter-spacing:-.028em; color:#2e4538; }
        .f53-head em { font-style:italic; color:#5a7060; }
        /* Progress rows */
        .f53-rows { position:absolute; left:76px; right:76px; top:400px; z-index:5; display:flex; flex-direction:column; gap:12px; }
        .f53-row { display:grid; grid-template-columns:38px 300px 1fr 44px; gap:20px; align-items:center; padding:12px 18px; background:rgba(246,242,232,.7); border:1.5px solid rgba(46,69,56,.35); }
        .f53-row .tick { font-family:var(--font-display); font-style:italic; font-size:28px; color:#5a7060; line-height:1; text-align:center; }
        .f53-row .lbl { font-family:var(--font-display); font-weight:500; font-size:28px; letter-spacing:-.015em; color:#2e4538; }
        .f53-row .bar { height:10px; background:rgba(46,69,56,.15); position:relative; }
        .f53-row .bar::after { content:''; position:absolute; left:0; top:0; bottom:0; background:linear-gradient(90deg, #5a7060, #2e4538); width:100%; }
        .f53-row.b .bar::after { width:82%; }
        .f53-row.c .bar::after { width:65%; }
        .f53-row.d .bar::after { width:48%; }
        .f53-row.e .bar::after { width:32%; }
        .f53-row .n { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); text-align:right; }
        /* Bottom plate */
        .f53-plate { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding:20px 26px; background:#2e4538; color:#e0d6bc; display:flex; align-items:baseline; justify-content:space-between; gap:16px; }
        .f53-plate .lbl { font-family:var(--font-mono); font-size:13px; letter-spacing:.5em; text-transform:uppercase; color:rgba(224,214,188,.7); }
        .f53-plate .em { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:56px; line-height:1; letter-spacing:-.02em; color:#e0d6bc; }
        .f53-tag { position:absolute; left:76px; right:76px; bottom:110px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f53-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f53-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f53">
          <div class="f53-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Progress 53 · We Are Building</span>
          </div>
          <span class="f53-kick">We are building</span>
          <h1 class="f53-head">We are <em>building.</em></h1>
          <div class="f53-rows">
            <div class="f53-row a"><span class="tick">✓</span><span class="lbl">Stronger candidates</span><span class="bar"></span><span class="n">01</span></div>
            <div class="f53-row b"><span class="tick">✓</span><span class="lbl">Better organization</span><span class="bar"></span><span class="n">02</span></div>
            <div class="f53-row c"><span class="tick">✓</span><span class="lbl">More volunteers</span><span class="bar"></span><span class="n">03</span></div>
            <div class="f53-row d"><span class="tick">✓</span><span class="lbl">Local momentum</span><span class="bar"></span><span class="n">04</span></div>
            <div class="f53-row e"><span class="tick">✓</span><span class="lbl">A lasting regional voice</span><span class="bar"></span><span class="n">05</span></div>
          </div>
          <div class="f53-plate"><span class="lbl">— The work is</span><span class="em">For Oregon.</span></div>
          <div class="f53-tag"><span>Success measured five years from now</span><span class="em">— That's the work we're committed to.</span></div>
          <div class="f53-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 54 — Northwest Oregon deserves to compete.
     Creative direction: track starting-line. Sand ground with
     an SVG starting line viewed head-on, three racing lanes
     labeled "Every district / Every voter / Every election".
  -------------------------------------------------------- */
  {
    id: 'feed-54-deserves-to-compete',
    tag: 'Beliefs',
    title: 'Northwest Oregon deserves to compete.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "We're working to ensure Northwest Oregon communities always have candidates, conversations, and real choices.\n\nJoin us in this movement.\n\n#NorthwestOregonPAC #Election2026 #CompetitiveElections #NorthwestOregon",
    data: {
      css: `
        .f54 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f54-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f54-mast img { height:56px; width:auto; }
        .f54-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f54-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f54-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:.98; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f54-head em { font-style:italic; color:#5a7060; }
        /* Race lanes */
        .f54-track { position:absolute; left:76px; right:76px; top:460px; height:280px; z-index:5; display:flex; flex-direction:column; gap:8px; }
        .f54-lane { position:relative; flex:1; padding:14px 20px; display:grid; grid-template-columns:60px 1fr auto; gap:18px; align-items:center; background:#2e4538; color:#e0d6bc; border-left:6px solid #e0d6bc; }
        .f54-lane .n { font-family:var(--font-mono); font-weight:600; font-size:24px; letter-spacing:.4em; color:#e0d6bc; }
        .f54-lane .lbl { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:40px; line-height:1; letter-spacing:-.02em; color:#e0d6bc; }
        .f54-lane .tag { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(224,214,188,.6); }
        /* Starting line stripes */
        .f54-track::before {
          content:''; position:absolute; left:-20px; top:0; bottom:0; width:8px;
          background:repeating-linear-gradient(0deg, #2e4538 0 12px, #e0d6bc 12px 24px);
        }
        /* Body */
        .f54-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; text-align:center; }
        .f54-body em { font-style:normal; color:#5a7060; }
        .f54-tag { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f54-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f54-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f54">
          <div class="f54-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Track 54 · Compete</span>
          </div>
          <span class="f54-kick">Compete</span>
          <h1 class="f54-head">Northwest Oregon deserves to<em>compete.</em></h1>
          <div class="f54-track">
            <div class="f54-lane"><span class="n">i.</span><span class="lbl">Every district.</span><span class="tag">— Lane 01</span></div>
            <div class="f54-lane"><span class="n">ii.</span><span class="lbl">Every voter.</span><span class="tag">— Lane 02</span></div>
            <div class="f54-lane"><span class="n">iii.</span><span class="lbl">Every election.</span><span class="tag">— Lane 03</span></div>
          </div>
          <p class="f54-body">Ensuring communities always have <em>candidates, conversations, and real choices.</em></p>
          <div class="f54-tag"><span>Join us in this movement</span><span class="em">— The starting line is here.</span></div>
          <div class="f54-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 55 — Your community needs more than your vote.
     Creative direction: ballot plus volunteer button pair.
     Cream ground with an editorial "diptych" — a completed
     ballot on the left, a pinned volunteer button on the
     right; italic serif title binding the two.
  -------------------------------------------------------- */
  {
    id: 'feed-55-more-than-vote',
    tag: 'Get involved',
    title: 'Your community needs more than your vote.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Whether you volunteer once a month or once a week, your involvement helps strengthen campaigns and connect communities.\n\nEveryone has something valuable to contribute.\n\nVolunteer today.\n\n#Volunteer #NorthwestOregonPAC #GetInvolved #Grassroots #CommunityLeadership',
    data: {
      css: `
        .f55 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f55-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f55-mast img { height:56px; width:auto; }
        .f55-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f55-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f55-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:64px; line-height:1.02; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f55-head em { font-style:italic; color:#5a7060; }
        /* Diptych */
        .f55-pair { position:absolute; left:76px; right:76px; top:440px; height:340px; z-index:5; display:grid; grid-template-columns:1fr 60px 1fr; gap:22px; align-items:stretch; }
        /* Ballot side */
        .f55-ballot { position:relative; background:#faf3d8; border:2px solid #2e4538; padding:22px 24px; box-shadow:0 20px 40px -22px rgba(46,69,56,.4); transform:rotate(-1.5deg); }
        .f55-ballot::before { content:''; position:absolute; inset:10px; border:1px double #2e4538; pointer-events:none; }
        .f55-ballot .k { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f55-ballot .title { margin-top:4px; font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; }
        .f55-ballot .rows { margin-top:14px; display:flex; flex-direction:column; gap:10px; }
        .f55-ballot .row { display:flex; align-items:center; gap:14px; padding-bottom:8px; border-bottom:1px dashed rgba(46,69,56,.4); }
        .f55-ballot .row .oval { flex:none; width:28px; height:40px; border:2.5px solid #2e4538; border-radius:999px; display:flex; align-items:center; justify-content:center; }
        .f55-ballot .row.f .oval { background:#2e4538; }
        .f55-ballot .row .oval .mark { color:#e0d6bc; font-family:var(--font-display); font-style:italic; font-size:22px; line-height:1; }
        .f55-ballot .row .lbl { flex:1; font-family:var(--font-display); font-weight:500; font-size:22px; letter-spacing:-.015em; color:#2e4538; }
        .f55-ballot .stamp { position:absolute; right:24px; bottom:20px; padding:6px 12px; border:2px solid #5a7060; color:#5a7060; font-family:var(--font-mono); font-weight:700; font-size:12px; letter-spacing:.36em; text-transform:uppercase; transform:rotate(-4deg); }
        /* Plus sign */
        .f55-plus { display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-style:italic; font-size:96px; color:#5a7060; letter-spacing:-.02em; }
        /* Volunteer button */
        .f55-button { position:relative; align-self:center; justify-self:center; width:290px; height:290px; border-radius:999px; background:#2e4538; color:#e0d6bc; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; box-shadow:0 20px 40px -18px rgba(46,69,56,.55), inset 0 -8px 20px rgba(0,0,0,.3), inset 0 4px 12px rgba(255,255,255,.1); border:5px solid #e0d6bc; transform:rotate(6deg); }
        .f55-button::before { content:''; position:absolute; inset:14px; border:1.5px dashed rgba(224,214,188,.5); border-radius:999px; }
        .f55-button .lbl { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(224,214,188,.7); }
        .f55-button .word { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:60px; letter-spacing:-.028em; color:#e0d6bc; }
        .f55-button .call { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(224,214,188,.85); }
        /* Body */
        .f55-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; text-align:center; }
        .f55-body em { font-style:normal; color:#5a7060; }
        .f55-tag { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f55-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f55-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f55">
          <div class="f55-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Pair 55 · More Than a Vote</span>
          </div>
          <span class="f55-kick">Volunteer</span>
          <h1 class="f55-head">Your community needs more than<em>your vote.</em></h1>
          <div class="f55-pair">
            <div class="f55-ballot">
              <span class="k">— Received</span>
              <div class="title">Your vote · counted</div>
              <div class="rows">
                <div class="row f"><span class="oval"><span class="mark">✓</span></span><span class="lbl">Your ballot</span></div>
                <div class="row"><span class="oval"></span><span class="lbl">Everything else it takes</span></div>
              </div>
              <span class="stamp">Counted</span>
            </div>
            <div class="f55-plus">+</div>
            <div class="f55-button">
              <span class="lbl">— Also needed</span>
              <span class="word">More.</span>
              <span class="call">Volunteer today</span>
            </div>
          </div>
          <p class="f55-body">Whether once a month or once a week — <em>everyone has something valuable to contribute.</em></p>
          <div class="f55-tag"><span>Your involvement helps</span><span class="em">— Strengthen campaigns and connect communities.</span></div>
          <div class="f55-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 56 — We are building beyond Election Day.
     Creative direction: skyline construction crane. Forest
     ground with SVG crane silhouette at sunset, silhouetted
     buildings rising along the horizon; italic serif title.
  -------------------------------------------------------- */
  {
    id: 'feed-56-beyond-election-day',
    tag: 'About',
    title: 'We are building beyond Election Day.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    caption:
      'One election cannot build everything Northwest Oregon needs.\n\nOur goal is long-term: develop candidates, organize supporters, strengthen outreach, and ensure this region is never treated as an afterthought again.\n\n#NorthwestOregonPAC #BeyondElectionDay #BuildTheBench',
    data: {
      css: `
        .f56 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 60% 60%, rgba(224,214,188,.14) 0%, rgba(224,214,188,0) 55%),
            radial-gradient(120% 90% at 20% 5%, rgba(90,112,96,.4) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .f56-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(246,242,232,.7); }
        .f56-mast img { height:56px; width:auto; filter:brightness(1.05); }
        .f56-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.55); display:inline-flex; align-items:center; gap:16px; }
        .f56-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f56-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:74px; line-height:.98; letter-spacing:-.028em; color:#f6f2e8; max-width:920px; }
        .f56-head em { display:block; font-style:italic; color:#e0d6bc; }
        /* Skyline SVG */
        .f56-sky { position:absolute; left:0; right:0; top:440px; height:280px; z-index:5; }
        .f56-sky svg { display:block; width:100%; height:100%; }
        /* Four labels below */
        .f56-labels { position:absolute; left:76px; right:76px; bottom:180px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(246,242,232,.35); display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:14px; }
        .f56-labels .l { padding:14px 16px; background:rgba(224,214,188,.06); border:1px solid rgba(246,242,232,.35); font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.65); text-align:center; }
        .f56-labels .l .em { display:block; margin-top:6px; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f56-sig { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.6); }
        .f56-sig .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .f56-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,242,232,.55); }
      `,
      body: (ctx) => `
        <div class="f56">
          <div class="f56-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Skyline 56 · Beyond Election Day</span>
          </div>
          <span class="f56-kick">Beyond Election Day</span>
          <h1 class="f56-head">We are building<em>beyond Election Day.</em></h1>
          <div class="f56-sky">
            <svg viewBox="0 0 1080 280" fill="none" stroke="#e0d6bc" stroke-width="1.6">
              <!-- Horizon glow (already in bg) -->
              <line x1="0" y1="240" x2="1080" y2="240" stroke="#e0d6bc" stroke-width="1.4" opacity="0.6"/>
              <!-- Distant hills -->
              <path d="M 0 220 L 120 190 L 240 210 L 380 180 L 520 200 L 660 175 L 800 205 L 940 185 L 1080 210 L 1080 240 L 0 240 Z" fill="rgba(90,112,96,.3)" stroke="none"/>
              <!-- Buildings silhouette -->
              <rect x="60" y="180" width="60" height="60" fill="#1c2b23" stroke="#e0d6bc" stroke-width="1"/>
              <rect x="140" y="140" width="80" height="100" fill="#1c2b23" stroke="#e0d6bc" stroke-width="1"/>
              <rect x="240" y="170" width="60" height="70" fill="#1c2b23" stroke="#e0d6bc" stroke-width="1"/>
              <rect x="880" y="150" width="70" height="90" fill="#1c2b23" stroke="#e0d6bc" stroke-width="1"/>
              <rect x="970" y="180" width="60" height="60" fill="#1c2b23" stroke="#e0d6bc" stroke-width="1"/>
              <!-- Construction crane center-right -->
              <g stroke="#e0d6bc" stroke-width="2">
                <line x1="540" y1="60" x2="540" y2="240"/>
                <line x1="380" y1="80" x2="720" y2="80"/>
                <line x1="540" y1="60" x2="380" y2="80"/>
                <line x1="540" y1="60" x2="720" y2="80"/>
                <line x1="540" y1="80" x2="540" y2="120"/>
                <line x1="480" y1="80" x2="480" y2="105" stroke-width="1.4"/>
                <rect x="472" y="102" width="18" height="16" fill="#1c2b23" stroke="#e0d6bc"/>
                <!-- Building rising under crane -->
                <rect x="480" y="145" width="120" height="95" fill="#2e4538" stroke="#e0d6bc"/>
                <line x1="480" y1="170" x2="600" y2="170" stroke-width="1"/>
                <line x1="480" y1="195" x2="600" y2="195" stroke-width="1"/>
                <line x1="480" y1="220" x2="600" y2="220" stroke-width="1"/>
                <line x1="510" y1="145" x2="510" y2="240" stroke-width="1" opacity="0.55"/>
                <line x1="540" y1="145" x2="540" y2="240" stroke-width="1" opacity="0.55"/>
                <line x1="570" y1="145" x2="570" y2="240" stroke-width="1" opacity="0.55"/>
              </g>
              <!-- Rising labels -->
              <text x="600" y="60" font-family="Lora" font-style="italic" font-size="18" fill="#e0d6bc" stroke="none">still building</text>
              <text x="380" y="70" font-family="Source Sans 3" font-size="10" fill="#e0d6bc" stroke="none" letter-spacing="3">EST. 2026</text>
            </svg>
          </div>
          <div class="f56-labels">
            <div class="l">— 01<span class="em">More candidates.</span></div>
            <div class="l">— 02<span class="em">More volunteers.</span></div>
            <div class="l">— 03<span class="em">Stronger campaigns.</span></div>
            <div class="l">— 04<span class="em">A lasting regional voice.</span></div>
          </div>
          <div class="f56-sig"><span>One election cannot build everything</span><span class="em">— The goal is long-term.</span></div>
          <div class="f56-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 57 — Here's what your support makes possible.
     Creative direction: dispatch crate. Cream ground with a
     wooden shipping crate SVG stenciled "SHIP TO NORTHWEST
     OREGON" containing five provisioned line items.
  -------------------------------------------------------- */
  {
    id: 'feed-57-support-list',
    tag: 'Support',
    title: "Here's what your support makes possible.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Every contribution directly supports the work happening across Northwest Oregon, not somewhere else.\n\nThank you for helping build stronger campaigns and stronger communities.\n\nSupport the mission.\n\n#Donatefororegon #NorthwestOregonPAC #SupportLocal #Grassroots #Election2026',
    data: {
      css: `
        .f57 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f57-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f57-mast img { height:56px; width:auto; }
        .f57-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f57-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f57-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:64px; line-height:1; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f57-head em { font-style:italic; color:#5a7060; }
        /* Crate */
        .f57-crate { position:absolute; left:100px; right:100px; top:420px; height:360px; z-index:5;
          background:linear-gradient(180deg, #a68558 0%, #6b5124 100%);
          border:6px solid #3d2f14;
          box-shadow:0 30px 60px -30px rgba(46,32,19,.6), inset 0 -12px 20px rgba(0,0,0,.3);
          padding:34px 46px 30px;
          position:relative;
        }
        .f57-crate::before, .f57-crate::after {
          content:''; position:absolute; left:0; right:0; height:14px;
          background:repeating-linear-gradient(90deg, #3d2f14 0 30px, #6b5124 30px 60px);
        }
        .f57-crate::before { top:0; }
        .f57-crate::after { bottom:0; }
        /* Shipping label — floats above the crate on empty margin */
        .f57-label { position:absolute; top:-70px; right:60px; padding:10px 20px; background:#f6f2e8; color:#2e4538; border:2px solid #2e4538; font-family:var(--font-mono); font-weight:700; font-size:11px; letter-spacing:.32em; text-transform:uppercase; transform:rotate(3deg); box-shadow:0 10px 20px -6px rgba(0,0,0,.45); z-index:7; white-space:nowrap; }
        .f57-label .em { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:18px; letter-spacing:-.01em; color:#2e4538; text-transform:none; margin-left:6px; }
        /* Stencil header */
        .f57-crate .stencil { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px dashed rgba(246,242,232,.65); font-family:var(--font-mono); font-weight:600; font-size:14px; letter-spacing:.5em; text-transform:uppercase; color:#f6f2e8; }
        .f57-crate .stencil .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#f6f2e8; text-transform:none; }
        /* Items grid */
        .f57-crate .items { margin-top:16px; display:grid; grid-template-columns:1fr 1fr; gap:12px 22px; }
        .f57-crate .item { padding:12px 14px; background:rgba(246,242,232,.14); border:1px solid rgba(246,242,232,.55); display:flex; align-items:baseline; gap:14px; }
        .f57-crate .item .n { flex:none; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,242,232,.65); }
        .f57-crate .item .lbl { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:26px; letter-spacing:-.01em; color:#f6f2e8; line-height:1; }
        /* Body */
        .f57-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:24px; line-height:1.2; letter-spacing:-.015em; color:#2e4538; text-align:center; }
        .f57-body em { font-style:normal; color:#5a7060; }
        .f57-tag { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f57-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f57-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f57">
          <div class="f57-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Crate 57 · Your Support</span>
          </div>
          <span class="f57-kick">Where your support goes</span>
          <h1 class="f57-head">Here's what your support makes<em>possible.</em></h1>
          <div class="f57-crate">
            <span class="f57-label">Ship to Northwest Oregon</span>
            <div class="stencil"><span>Contents · Case 57</span><span class="em">Handle with care</span><span>Sealed</span></div>
            <div class="items">
              <div class="item"><span class="n">01</span><span class="lbl">Campaign literature.</span></div>
              <div class="item"><span class="n">02</span><span class="lbl">Community events.</span></div>
              <div class="item"><span class="n">03</span><span class="lbl">Volunteer training.</span></div>
              <div class="item"><span class="n">04</span><span class="lbl">Voter outreach.</span></div>
              <div class="item"><span class="n">05</span><span class="lbl">Candidate support.</span></div>
            </div>
          </div>
          <p class="f57-body">Every contribution directly supports the work happening <em>across Northwest Oregon, not somewhere else.</em></p>
          <div class="f57-tag"><span>Thank you</span><span class="em">— For helping build stronger campaigns and stronger communities.</span></div>
          <div class="f57-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 58 — This is our promise.
     Creative direction: formal oath card. Cream ground with
     a bordered oath card, four numbered "We'll keep..." pledges
     stamped with brand seal at the base.
  -------------------------------------------------------- */
  {
    id: 'feed-58-our-promise',
    tag: 'About',
    title: 'This is our promise.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      'Northwest Oregon PAC was founded with a long-term commitment, to strengthen our region, support principled candidates, and ensure our communities are never overlooked.\n\nThis is only the beginning.\n\nFollow the journey. Get involved. Help build what\'s next.\n\n#NorthwestOregonPAC #NorthwestOregon #Leadership #Grassroots #Election2026 #CommunityFirst',
    data: {
      css: `
        .f58 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f58-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f58-mast img { height:56px; width:auto; }
        /* Oath card */
        .f58-oath { position:absolute; top:170px; bottom:130px; left:80px; right:80px; z-index:5;
          background:#faf3d8; border:2px solid #2e4538;
          box-shadow:0 30px 60px -30px rgba(46,69,56,.5), inset 0 1px 0 rgba(255,255,255,.5);
          padding:34px 40px 30px;
          display:flex; flex-direction:column;
        }
        .f58-oath::before { content:''; position:absolute; inset:12px; border:1px double #2e4538; pointer-events:none; }
        /* Corner ornaments */
        .f58-corner { position:absolute; font-family:var(--font-display); font-style:italic; font-size:42px; color:#5a7060; }
        .f58-corner.tl { top:16px; left:26px; }
        .f58-corner.tr { top:16px; right:26px; }
        .f58-corner.bl { bottom:20px; left:26px; }
        .f58-corner.br { bottom:20px; right:26px; }
        .f58-oath .header { display:flex; align-items:baseline; justify-content:space-between; padding-bottom:14px; border-bottom:2px solid #2e4538; font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f58-oath .header .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f58-oath .kick { margin-top:20px; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f58-oath .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f58-oath .head { margin-top:10px; font-family:var(--font-display); font-weight:500; font-size:74px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f58-oath .head em { font-style:italic; color:#5a7060; }
        .f58-oath .pledges { margin-top:22px; display:flex; flex-direction:column; gap:16px; }
        .f58-oath .pledge { display:flex; align-items:baseline; gap:22px; padding-bottom:12px; border-bottom:1px dashed rgba(46,69,56,.4); }
        .f58-oath .pledge .n { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.55); min-width:60px; }
        .f58-oath .pledge .v { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:36px; line-height:1.06; letter-spacing:-.02em; color:#2e4538; }
        .f58-oath .pledge .v em { font-style:normal; color:#6b5a42; }
        /* Seal + plate */
        .f58-oath .seal-row { margin-top:auto; padding-top:16px; border-top:1.5px solid #2e4538; display:flex; align-items:center; justify-content:space-between; gap:20px; }
        .f58-oath .plate { padding:12px 22px; background:#2e4538; color:#e0d6bc; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:34px; letter-spacing:-.015em; }
        .f58-oath .seal {
          width:100px; height:100px; border-radius:999px; border:3px double #2e4538;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          font-family:var(--font-mono); font-size:9px; letter-spacing:.32em; text-transform:uppercase; color:#2e4538;
          transform:rotate(-6deg); background:rgba(90,112,96,.14);
        }
        .f58-oath .seal .star { font-family:var(--font-display); font-style:italic; font-size:26px; color:#5a7060; }
        .f58-oath .signoff { padding:12px 18px; background:rgba(46,69,56,.08); border:1px solid rgba(46,69,56,.4); font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.65); }
        .f58-oath .signoff .em { display:block; margin-top:6px; font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f58-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f58">
          <div class="f58-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Oath 58 · Our Promise</span>
          </div>
          <div class="f58-oath">
            <span class="f58-corner tl">§</span>
            <span class="f58-corner tr">§</span>
            <span class="f58-corner bl">§</span>
            <span class="f58-corner br">§</span>
            <div class="header"><span>The Northwest Oath</span><span class="em">Our promise</span><span>No. 58</span></div>
            <span class="kick">Our promise</span>
            <h1 class="head">This is <em>our promise.</em></h1>
            <div class="pledges">
              <div class="pledge"><span class="n">01</span><span class="v">We'll keep <em>recruiting.</em></span></div>
              <div class="pledge"><span class="n">02</span><span class="v">We'll keep <em>organizing.</em></span></div>
              <div class="pledge"><span class="n">03</span><span class="v">We'll keep <em>supporting.</em></span></div>
              <div class="pledge"><span class="n">04</span><span class="v">We'll keep <em>showing up.</em></span></div>
            </div>
            <div class="seal-row">
              <span class="plate">For Northwest Oregon.</span>
              <span class="signoff">Signed by the region<span class="em">— This is only the beginning.</span></span>
              <div class="seal"><span class="star">☘</span><span>Est.<br/>2026</span></div>
            </div>
          </div>
          <div class="f58-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 59 — Northwest Oregon comes first.
     Creative direction: single-decision flowchart. Sand ground
     with an SVG flowchart — one central "the question" diamond
     with Yes / No branches, each ending in an italic verdict.
  -------------------------------------------------------- */
  {
    id: 'feed-59-comes-first',
    tag: 'Beliefs',
    title: 'Northwest Oregon comes first.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Our focus has never been on headlines or politics for politics' sake. It's about strengthening Northwest Oregon through practical leadership, competitive candidates, and long-term investment in our communities.\n\n#NorthwestOregonPAC #NorthwestOregon #CommunityFirst #Leadership #Election2026 #StrongerTogether",
    data: {
      css: `
        .f59 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2e4538;
        }
        .f59-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f59-mast img { height:56px; width:auto; }
        .f59-kick { position:absolute; top:180px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); display:inline-flex; align-items:center; gap:16px; }
        .f59-kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .f59-head { position:absolute; top:220px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:88px; line-height:1; letter-spacing:-.028em; color:#2e4538; }
        .f59-head em { font-style:italic; color:#5a7060; }
        /* Flowchart nodes */
        .f59-flow { position:absolute; left:76px; right:76px; top:410px; z-index:5; height:340px; }
        /* Question box */
        .f59-q { position:absolute; left:calc(50% - 200px); top:0; width:400px; padding:22px 24px; background:#2e4538; color:#e0d6bc; text-align:center; box-shadow:0 24px 44px -20px rgba(46,69,56,.55); }
        .f59-q .lbl { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(224,214,188,.7); }
        .f59-q .v { margin-top:8px; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:36px; line-height:1.06; letter-spacing:-.02em; color:#e0d6bc; }
        /* Branch line */
        .f59-branches { position:absolute; left:0; right:0; top:180px; height:60px; }
        .f59-branches svg { display:block; width:100%; height:100%; }
        /* Result boxes */
        .f59-result { position:absolute; top:240px; width:38%; padding:18px 20px; }
        .f59-result.yes { left:6%; background:rgba(90,112,96,.14); border:1.5px solid #2e4538; }
        .f59-result.no { right:6%; background:transparent; border:1.5px dashed rgba(46,69,56,.55); opacity:.7; }
        .f59-result .lbl { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f59-result .v { margin-top:6px; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:32px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; }
        .f59-result.no .v { color:rgba(46,69,56,.55); font-style:normal; }
        /* Body */
        .f59-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; text-align:center; max-width:920px; }
        .f59-body em { font-style:normal; color:#5a7060; }
        .f59-tag { position:absolute; left:76px; right:76px; bottom:112px; z-index:6; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,69,56,.6); }
        .f59-tag .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        .f59-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f59">
          <div class="f59-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Decision 59 · One Question</span>
          </div>
          <span class="f59-kick">One question guides every decision</span>
          <h1 class="f59-head">Northwest Oregon comes <em>first.</em></h1>
          <div class="f59-flow">
            <div class="f59-q">
              <span class="lbl">— The question</span>
              <div class="v">Will this make our communities stronger?</div>
            </div>
            <div class="f59-branches">
              <svg viewBox="0 0 800 60" fill="none" stroke="#2e4538" stroke-width="2">
                <path d="M 400 0 L 400 30 L 150 30 L 150 60 M 400 30 L 650 30 L 650 60" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="220" y="20" font-family="Source Sans 3" font-size="12" fill="#2e4538" stroke="none" letter-spacing="3">YES</text>
                <text x="540" y="20" font-family="Source Sans 3" font-size="12" fill="rgba(46,69,56,.55)" stroke="none" letter-spacing="3">NO</text>
              </svg>
            </div>
            <div class="f59-result yes"><span class="lbl">— If yes</span><p class="v">We'll <em>fight</em> for it.</p></div>
            <div class="f59-result no"><span class="lbl">— If no</span><p class="v">We won't.</p></div>
          </div>
          <p class="f59-body">Our focus has never been on <em>headlines or politics for politics' sake.</em></p>
          <div class="f59-tag"><span>Practical leadership · Competitive candidates</span><span class="em">— Long-term investment.</span></div>
          <div class="f59-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* --------------------------------------------------------
     FEED 60 — Decisions we make today
     Creative direction: sunrise / generation-baton. Cream ground
     with a warm horizon sunrise and two silhouettes — an elder
     handing a baton to a child figure. Italic serif manifesto.
     A closing "fin" flourish caps the sequence.
  -------------------------------------------------------- */
  {
    id: 'feed-60-decisions-today',
    tag: 'Beliefs',
    title: 'The decisions we make today shape the opportunities our children inherit tomorrow.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    caption:
      "Every policy, every campaign, and every volunteer effort should leave the next generation with more opportunity than the last.\n\nThat's the future we're working toward.\n\nShare if you believe the next generation deserves our best.\n\n#FutureGenerations #NorthwestOregonPAC",
    data: {
      css: `
        .f60 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(80% 60% at 50% 62%, rgba(255,220,140,.28) 0%, rgba(255,220,140,0) 55%),
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 42%, #b09765 100%);
          color:#2e4538;
        }
        .f60-mast { position:absolute; top:56px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,69,56,.7); }
        .f60-mast img { height:56px; width:auto; }
        .f60-section { position:absolute; top:180px; left:76px; right:76px; z-index:6; display:flex; align-items:center; gap:22px; font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:.5em; text-transform:uppercase; color:#6b5a42; }
        .f60-section .rule { flex:1; height:1px; background:currentColor; opacity:.5; }
        .f60-head { position:absolute; top:230px; left:76px; right:76px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:58px; line-height:1.02; letter-spacing:-.028em; color:#2e4538; max-width:920px; }
        .f60-head em { font-style:italic; color:#5a7060; }
        /* Sunrise horizon */
        .f60-horizon { position:absolute; left:0; right:0; top:500px; height:280px; z-index:5; }
        .f60-horizon svg { display:block; width:100%; height:100%; }
        /* Body */
        .f60-body { position:absolute; left:76px; right:76px; bottom:170px; z-index:6; padding-top:16px; border-top:1.5px solid rgba(46,69,56,.35); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:26px; line-height:1.16; letter-spacing:-.015em; color:#2e4538; text-align:center; max-width:920px; }
        .f60-body em { font-style:normal; color:#5a7060; }
        .f60-fin { position:absolute; left:0; right:0; bottom:112px; z-index:6; text-align:center; font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:rgba(46,69,56,.6); }
        .f60-fin::before, .f60-fin::after { content:'—'; margin:0 16px; opacity:.5; }
        .f60-foot { position:absolute; left:76px; right:76px; bottom:56px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.55); }
      `,
      body: (ctx) => `
        <div class="f60">
          <div class="f60-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Sunrise 60 · For Future Generations</span>
          </div>
          <div class="f60-section"><span>For future generations</span><span class="rule"></span><span>No. 60</span></div>
          <h1 class="f60-head">Let's build a Northwest Oregon<em>they'll be proud to call home.</em></h1>
          <div class="f60-horizon">
            <svg viewBox="0 0 1080 280" fill="none">
              <!-- Sun rising -->
              <circle cx="540" cy="220" r="90" fill="url(#f60sun)"/>
              <defs>
                <radialGradient id="f60sun" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stop-color="#f6f2e8"/>
                  <stop offset="55%" stop-color="#e0d6bc"/>
                  <stop offset="100%" stop-color="#b09765" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <!-- Rays -->
              <g stroke="#e0d6bc" stroke-width="1.4" opacity="0.6">
                <line x1="540" y1="60" x2="540" y2="100"/>
                <line x1="380" y1="120" x2="410" y2="150"/>
                <line x1="700" y1="120" x2="670" y2="150"/>
                <line x1="300" y1="220" x2="340" y2="220"/>
                <line x1="740" y1="220" x2="780" y2="220"/>
              </g>
              <!-- Ground line -->
              <line x1="0" y1="230" x2="1080" y2="230" stroke="#2e4538" stroke-width="1.6" opacity="0.6"/>
              <!-- Adult silhouette handing baton -->
              <g stroke="#2e4538" stroke-width="2" fill="#2e4538" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="400" cy="155" r="12"/>
                <path d="M 400 167 L 400 210 M 400 210 L 388 230 M 400 210 L 412 230 M 400 185 L 440 175 M 400 178 L 380 195" fill="none"/>
              </g>
              <!-- Child silhouette receiving -->
              <g stroke="#2e4538" stroke-width="2" fill="#2e4538" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="500" cy="180" r="9"/>
                <path d="M 500 189 L 500 218 M 500 218 L 492 230 M 500 218 L 508 230 M 500 200 L 470 190" fill="none"/>
              </g>
              <!-- Baton being passed -->
              <line x1="446" y1="175" x2="470" y2="188" stroke="#5a7060" stroke-width="3.5" stroke-linecap="round"/>
            </svg>
          </div>
          <p class="f60-body">Every policy, every campaign, and every volunteer effort should leave the next generation with <em>more opportunity than the last.</em></p>
          <p class="f60-fin">fin</p>
          <div class="f60-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
]

/* -------------------------------------------------------------------
   STORIES — 30 posts, 1080×1920
   Content matches the PDF's INSTAGRAM STORIES section verbatim.
------------------------------------------------------------------- */
export const stories = [
  /* ------------------------------------------------------------
     STORY 01 — "Attention every four years"
     Creative direction: editorial split — cinematic Oregon landscape
     on top half, hand-torn deckle edge, cream page below with a big
     serif manifesto. Feels like a magazine cover, not a template.
  ------------------------------------------------------------ */
  {
    id: 'story-01-attention',
    tag: 'Introduction',
    title: 'Attention every four years.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s01 { position:absolute; inset:0; z-index:10; display:flex; flex-direction:column; background:#f6f2e8; }
        .s01-photo { position:relative; height:56%; overflow:hidden; background:#0f1a13; }
        .s01-photo img { width:100%; height:100%; object-fit:cover; filter:saturate(0.72) contrast(1.18) brightness(0.86); }
        .s01-photo::after {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(110% 90% at 30% 15%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 100%),
            linear-gradient(180deg, rgba(15,26,19,.1) 0%, rgba(15,26,19,.35) 60%, rgba(15,26,19,.9) 100%);
        }
        .s01-mast { position:absolute; top:64px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:24px; color:#e0d6bc; font-family:var(--font-mono); font-size:20px; letter-spacing:.32em; text-transform:uppercase; text-shadow:0 2px 20px rgba(0,0,0,.5); }
        .s01-mast img { height:76px; width:auto; filter:drop-shadow(0 2px 22px rgba(0,0,0,.5)); }
        .s01-photo-label { position:absolute; left:80px; bottom:60px; z-index:5; display:flex; flex-direction:column; gap:14px; color:#e0d6bc; text-shadow:0 2px 20px rgba(0,0,0,.55); }
        .s01-photo-label .kick { font-family:var(--font-mono); font-size:22px; letter-spacing:.42em; text-transform:uppercase; opacity:.9; }
        .s01-photo-label .place { font-family:var(--font-display); font-style:italic; font-size:38px; letter-spacing:-.01em; }
        /* Torn paper edge — pronounced hand-torn deckle */
        .s01-tear {
          position:absolute; left:0; right:0; height:72px; z-index:4;
          top: calc(56% - 40px);
          background:#f6f2e8;
          -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 72' preserveAspectRatio='none'><path d='M0 72 L0 46 C 30 18 70 60 118 32 C 168 8 210 54 262 26 C 310 4 358 46 410 22 C 462 2 508 40 560 20 C 616 4 660 42 712 24 C 766 8 810 40 860 22 C 912 6 962 42 1010 26 C 1042 16 1064 34 1080 24 L1080 72 Z' fill='black'/></svg>");
          mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 72' preserveAspectRatio='none'><path d='M0 72 L0 46 C 30 18 70 60 118 32 C 168 8 210 54 262 26 C 310 4 358 46 410 22 C 462 2 508 40 560 20 C 616 4 660 42 712 24 C 766 8 810 40 860 22 C 912 6 962 42 1010 26 C 1042 16 1064 34 1080 24 L1080 72 Z' fill='black'/></svg>");
          -webkit-mask-size:100% 100%; mask-size:100% 100%;
          filter: drop-shadow(0 -3px 10px rgba(0,0,0,.2));
        }
        /* Fine paper fibre texture at the tear */
        .s01-tear::after {
          content:''; position:absolute; inset:0;
          background:
            repeating-linear-gradient(90deg, rgba(140,120,80,0) 0 2px, rgba(140,120,80,.06) 2px 3px),
            linear-gradient(180deg, rgba(180,160,110,.18) 0%, rgba(180,160,110,0) 60%);
          mix-blend-mode:multiply;
        }
        .s01-page { position:relative; flex:1; padding:80px 90px 140px; display:flex; flex-direction:column; gap:38px; background:#f6f2e8; }
        .s01-page::before {
          content:''; position:absolute; top:0; bottom:120px; left:60px; width:2px;
          background:linear-gradient(180deg, rgba(46,69,56,.5) 0%, rgba(46,69,56,0) 92%);
        }
        .s01-issue { display:flex; align-items:baseline; gap:20px; font-family:var(--font-mono); font-size:20px; letter-spacing:.4em; text-transform:uppercase; color:#4b6252; }
        .s01-issue .no { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:44px; letter-spacing:-.02em; color:#2e4538; text-transform:none; }
        .s01-issue .rule { display:inline-block; width:44px; height:1px; background:#4b6252; opacity:.6; }
        .s01-lede { font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; max-width:900px; }
        .s01-lede em { font-style:italic; color:#5a7060; font-weight:500; }
        .s01-sub { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; line-height:1.22; color:#4b6252; max-width:820px; margin-top:4px; }
        .s01-foot { position:absolute; left:90px; right:90px; bottom:70px; display:flex; align-items:flex-end; justify-content:space-between; gap:32px; padding-top:24px; border-top:1px solid rgba(46,69,56,.2); }
        .s01-foot .cta { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:42px; color:#2e4538; letter-spacing:-.01em; display:inline-flex; align-items:center; gap:20px; }
        .s01-foot .cta .arrow { display:inline-flex; align-items:center; justify-content:center; width:68px; height:68px; border-radius:999px; background:#2e4538; color:#f6f2e8; font-family:var(--font-sans); font-size:30px; box-shadow:0 12px 30px -14px rgba(46,69,56,.55); }
        .s01-foot .meta { font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.5); text-align:right; line-height:1.9; max-width:280px; }
      `,
      body: (ctx) => `
        <div class="s01">
          <div class="s01-photo">
            <img src="${ctx.prefix}img/banner.jpg" alt="Northwest Oregon landscape" />
            <div class="s01-mast">
              <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
              <span>Vol. 01 · The Region</span>
            </div>
            <div class="s01-photo-label">
              <span class="kick">— Field notes</span>
              <span class="place">Northwest Oregon, at dusk.</span>
            </div>
          </div>
          <div class="s01-tear" aria-hidden="true"></div>
          <div class="s01-page">
            <div class="s01-issue">
              <span class="no">No. 01</span>
              <span class="rule"></span>
              <span>Manifesto</span>
            </div>
            <p class="s01-lede">Northwest Oregon deserves more than <em>attention every four years.</em></p>
            <p class="s01-sub">We're building something that lasts.</p>
            <div class="s01-foot">
              <span class="cta">Learn more <span class="arrow">→</span></span>
              <span class="meta">Paid for by Northwest Oregon PAC #25045<br />northwestoregon.com</span>
            </div>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 02 — "Your community. Your voice. Your future."
     Creative direction: typographic-only poster. Four lines that
     grow as you read. Cinema-style vertical rule on the left. The
     CTA is a floating pill, not a text link.
  ------------------------------------------------------------ */
  {
    id: 'story-02-your-future',
    tag: 'Get involved',
    title: 'Your future.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    data: {
      css: `
        .s02 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 80% at 12% 8%, rgba(90,112,96,.6) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.95) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .s02::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(2px 2px at 20% 15%, rgba(224,214,188,.35), transparent 60%),
            radial-gradient(2px 2px at 78% 8%, rgba(224,214,188,.25), transparent 60%),
            radial-gradient(1.5px 1.5px at 62% 88%, rgba(224,214,188,.3), transparent 60%),
            radial-gradient(2px 2px at 8% 74%, rgba(224,214,188,.2), transparent 60%);
          opacity:.7;
          pointer-events:none;
        }
        .s02-mast { position:absolute; top:78px; left:96px; right:96px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:24px; color:#e0d6bc; font-family:var(--font-mono); font-size:16px; letter-spacing:.36em; text-transform:uppercase; }
        .s02-mast img { height:66px; width:auto; }
        .s02-mast .filing { color:rgba(224,214,188,.6); }
        /* Numbered corner mark */
        .s02-number {
          position:absolute; left:96px; top:220px; z-index:5;
          font-family:var(--font-display); font-style:italic; font-weight:400;
          font-size:32px; letter-spacing:-.02em; color:#e0d6bc;
          display:flex; align-items:baseline; gap:20px;
        }
        .s02-number .n { font-size:88px; font-style:italic; }
        .s02-number .label { font-family:var(--font-mono); font-style:normal; font-size:18px; letter-spacing:.42em; text-transform:uppercase; color:rgba(224,214,188,.7); }
        /* Long vertical rule anchoring the left column */
        .s02-rule {
          position:absolute; left:120px; top:400px; bottom:340px; width:2px; z-index:4;
          background:linear-gradient(180deg, rgba(224,214,188,.6), rgba(224,214,188,0) 96%);
        }
        /* Stanza — the four ascending lines */
        .s02-stanza { position:absolute; left:180px; right:96px; top:440px; z-index:5; display:flex; flex-direction:column; gap:22px; font-family:var(--font-display); font-weight:500; letter-spacing:-.024em; line-height:.98; }
        .s02-stanza .l1 { font-size:104px; color:#e0d6bc; }
        .s02-stanza .l2 { font-size:118px; color:#e0d6bc; }
        .s02-stanza .l3 { font-size:132px; color:#f6f2e8; font-style:italic; }
        .s02-stanza .l4 { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:46px; color:rgba(224,214,188,.82); letter-spacing:-.015em; line-height:1.24; margin-top:26px; max-width:820px; }
        /* CTA pill */
        .s02-cta {
          position:absolute; left:96px; bottom:130px; z-index:6; display:inline-flex; align-items:center; gap:24px;
          padding:24px 36px 24px 44px; border-radius:999px;
          background:#f6f2e8; color:#2e4538;
          font-family:var(--font-mono); font-size:20px; letter-spacing:.36em; text-transform:uppercase; font-weight:500;
          box-shadow:0 26px 60px -22px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.6);
        }
        .s02-cta .dot { display:inline-block; width:12px; height:12px; border-radius:999px; background:#2e4538; }
        .s02-cta .arrow-box { display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:999px; background:#2e4538; color:#f6f2e8; font-family:var(--font-sans); font-size:22px; letter-spacing:0; }
        /* Footer rail */
        .s02-foot {
          position:absolute; left:96px; right:96px; bottom:70px; z-index:6;
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase;
          color:rgba(224,214,188,.55);
        }
        .s02-foot .rule { flex:1; height:1px; background:linear-gradient(90deg, rgba(224,214,188,.35), rgba(224,214,188,0)); margin:0 24px; }
      `,
      body: (ctx) => `
        <div class="s02">
          <div class="s02-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span class="filing">Committee #25045 · Est. 2026</span>
          </div>
          <div class="s02-number">
            <span class="n">02</span>
            <span class="label">Rally</span>
          </div>
          <div class="s02-rule" aria-hidden="true"></div>
          <div class="s02-stanza">
            <span class="l1">Your community.</span>
            <span class="l2">Your voice.</span>
            <span class="l3">Your future.</span>
            <span class="l4">Let's build it together.</span>
          </div>
          <span class="s02-cta">
            <span class="dot"></span>
            Join Us
            <span class="arrow-box">→</span>
          </span>
          <div class="s02-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span class="rule"></span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 03 — Poll: "Have you voted in a local election recently?"
     Creative direction: composed as an Oregon vote-by-mail ballot
     object. Perforated top, mono ballot header, editorial question,
     two options rendered as real ballot ovals. Taped-on margin
     note calls out the IG poll sticker placement.
  ------------------------------------------------------------ */
  {
    id: 'story-03-voted-poll',
    tag: 'Get involved',
    title: 'Have you voted in a local election recently?',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s03 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(224,214,188,.4) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e8dfc4 100%);
        }
        /* Ballot card — a floating document */
        .s03-card {
          position:absolute; top:170px; bottom:220px; left:80px; right:80px; z-index:5;
          background:#f6f2e8;
          box-shadow:
            0 40px 90px -40px rgba(46,42,20,.35),
            0 8px 24px -12px rgba(46,42,20,.2);
          border-radius:6px;
          transform:rotate(-1.4deg);
          transform-origin:center;
        }
        /* Perforated top edge on the ballot */
        .s03-perf {
          position:absolute; top:-1px; left:0; right:0; height:22px;
          background-image: radial-gradient(circle at 12px 11px, #e8dfc4 5px, transparent 5.4px);
          background-size:24px 22px; background-position:6px 0;
        }
        .s03-perf-line { position:absolute; top:22px; left:20px; right:20px; height:1px; background:repeating-linear-gradient(90deg, rgba(46,42,20,.35) 0 8px, transparent 8px 14px); }
        .s03-header { position:absolute; top:80px; left:64px; right:64px; display:flex; align-items:flex-start; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:15px; letter-spacing:.32em; text-transform:uppercase; color:#4b6252; }
        .s03-header .title { font-weight:500; max-width:340px; line-height:1.6; }
        .s03-header .meta { text-align:right; color:rgba(46,42,20,.55); line-height:1.7; }
        .s03-header .meta .id { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; display:block; margin-bottom:6px; }
        .s03-rule { position:absolute; top:200px; left:64px; right:64px; height:2px; background:#2e4538; }
        .s03-issue { position:absolute; top:232px; left:64px; right:64px; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.55); display:flex; justify-content:space-between; }
        /* Editorial question */
        .s03-q { position:absolute; top:320px; left:64px; right:64px; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.02em; color:#2e4538; }
        .s03-q em { font-style:italic; font-weight:500; color:#5a7060; }
        .s03-q .qmark { display:block; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); margin-bottom:22px; }
        /* Ballot options */
        .s03-opts { position:absolute; left:64px; right:64px; top:720px; display:flex; flex-direction:column; gap:34px; }
        .s03-opt { display:flex; align-items:center; gap:36px; padding:32px 40px 32px 32px; border:1.5px solid rgba(46,42,20,.35); border-radius:2px; background:rgba(253,250,241,1); }
        .s03-opt .oval {
          flex:none; width:56px; height:80px; border:3px solid #2e4538; border-radius:999px;
          display:flex; align-items:center; justify-content:center;
        }
        .s03-opt.filled .oval { background:#2e4538; }
        .s03-opt .mark { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:56px; color:#f6f2e8; line-height:1; padding-bottom:4px; }
        .s03-opt .lbl { flex:1; font-family:var(--font-display); font-weight:500; font-size:56px; letter-spacing:-.015em; color:#2e4538; }
        .s03-opt .sub { font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.5); }
        /* Rubber-stamp SAMPLE watermark */
        .s03-stamp {
          position:absolute; top:340px; right:96px; z-index:6;
          font-family:var(--font-mono); font-weight:500; font-size:44px; letter-spacing:.32em;
          color:#6b5a42; opacity:.85;
          border:6px solid #6b5a42;
          padding:12px 24px;
          transform:rotate(8deg);
          border-radius:6px;
          box-shadow:inset 0 0 0 2px rgba(107,90,66,.2);
          text-transform:uppercase;
        }
        /* Taped-on margin note */
        .s03-note {
          position:absolute; z-index:8;
          bottom:76px; right:52px;
          transform:rotate(3deg);
          background:#faf4d8;
          color:#4b3a20;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.28em; text-transform:uppercase;
          padding:12px 20px 14px;
          box-shadow:0 12px 28px -14px rgba(0,0,0,.35);
          max-width:280px;
        }
        .s03-note::before, .s03-note::after {
          content:''; position:absolute; top:-8px; width:60px; height:16px;
          background:rgba(200,180,120,.5); transform:rotate(-4deg);
        }
        .s03-note::before { left:16px; }
        .s03-note::after { right:16px; transform:rotate(6deg); }
        /* Instructions row above options */
        .s03-instr { position:absolute; left:64px; right:64px; top:640px; font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.55); display:flex; align-items:center; gap:20px; }
        .s03-instr .rule { flex:1; height:1px; background:rgba(46,42,20,.25); }
        /* Mast + footer outside the card */
        .s03-mast { position:absolute; top:74px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:20px; font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:#4b6252; }
        .s03-mast img { height:60px; width:auto; }
        .s03-foot { position:absolute; left:80px; right:80px; bottom:74px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.5); }
      `,
      body: (ctx) => `
        <div class="s03">
          <div class="s03-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Committee #25045 · Est. 2026</span>
          </div>

          <div class="s03-card">
            <div class="s03-perf"></div>
            <div class="s03-perf-line"></div>
            <div class="s03-header">
              <span class="title">Official ballot · Northwest Oregon</span>
              <span class="meta"><span class="id">Precinct №27</span>Vote by mail — retain for records</span>
            </div>
            <div class="s03-rule"></div>
            <div class="s03-issue">
              <span>Question · 01 of 01</span>
              <span>Community poll</span>
            </div>
            <div class="s03-q">
              <span class="qmark">— The question at hand</span>
              Have you voted in a local election <em>recently?</em>
            </div>
            <div class="s03-instr"><span>Mark one oval</span><span class="rule"></span><span>Fill completely</span></div>
            <div class="s03-opts">
              <div class="s03-opt filled">
                <span class="oval"><span class="mark">✓</span></span>
                <span class="lbl">Yes</span>
                <span class="sub">A</span>
              </div>
              <div class="s03-opt">
                <span class="oval"></span>
                <span class="lbl">Not Yet</span>
                <span class="sub">B</span>
              </div>
            </div>
          </div>

          <div class="s03-stamp">Sample</div>

          <div class="s03-note">
            Overlay Instagram<br />poll sticker here
          </div>

          <div class="s03-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 04 — "Strong communities don't happen by chance"
     Creative direction: architectural blueprint. Cross-hatched
     grid, drafting call-out with typed labels, the manifesto as
     technical spec, "VOLUNTEER TODAY" stamped as a drafting
     approval.
  ------------------------------------------------------------ */
  {
    id: 'story-04-strong-communities',
    tag: 'Get involved',
    title: "Strong communities don't happen by chance.",
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s04 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(90,112,96,.4) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 100%);
          color:#f6f2e8;
        }
        /* Blueprint grid — fine + heavy */
        .s04::before {
          content:''; position:absolute; inset:0;
          background:
            linear-gradient(rgba(224,214,188,.08) 1px, transparent 1px) 0 0/40px 40px,
            linear-gradient(90deg, rgba(224,214,188,.08) 1px, transparent 1px) 0 0/40px 40px,
            linear-gradient(rgba(224,214,188,.15) 1px, transparent 1px) 0 0/200px 200px,
            linear-gradient(90deg, rgba(224,214,188,.15) 1px, transparent 1px) 0 0/200px 200px;
          pointer-events:none;
        }
        .s04::after {
          content:''; position:absolute; inset:0;
          background:radial-gradient(90% 70% at 50% 40%, rgba(8,24,42,0) 0%, rgba(8,24,42,.55) 100%);
          pointer-events:none;
        }
        .s04-mast { position:absolute; top:80px; left:96px; right:96px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:20px; color:#e0d6bc; font-family:var(--font-mono); font-size:15px; letter-spacing:.36em; text-transform:uppercase; }
        .s04-mast img { height:60px; width:auto; filter:brightness(1.05) drop-shadow(0 2px 12px rgba(0,0,0,.4)); }
        /* Drafting title block */
        .s04-titleblock {
          position:absolute; top:200px; left:96px; right:96px; z-index:5;
          padding:20px 24px; border:1.5px solid rgba(224,214,188,.4);
          display:grid; grid-template-columns:1fr 1fr 1fr; gap:0;
          font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase;
          color:rgba(224,214,188,.8);
        }
        .s04-titleblock > div { padding:4px 12px; border-right:1px solid rgba(224,214,188,.28); }
        .s04-titleblock > div:last-child { border-right:none; }
        .s04-titleblock .k { color:rgba(224,214,188,.5); display:block; margin-bottom:6px; font-size:11px; letter-spacing:.28em; }
        .s04-titleblock .v { color:#f6f2e8; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; text-transform:none; }
        /* Section marker column on the left */
        .s04-section {
          position:absolute; left:96px; top:340px; z-index:5;
          display:flex; align-items:baseline; gap:22px;
          font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase;
          color:#5a7060;
        }
        .s04-section .n { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:56px; letter-spacing:-.02em; color:#f6f2e8; }
        /* Big spec headline */
        .s04-head {
          position:absolute; left:96px; right:96px; top:440px; z-index:5;
          font-family:var(--font-display); font-weight:500; font-size:88px; line-height:1.02; letter-spacing:-.022em; color:#f6f2e8;
          max-width:920px;
        }
        .s04-head em { font-style:italic; color:#5a7060; font-weight:500; }
        /* Callout lines pointing to a spec */
        .s04-callout {
          position:absolute; left:96px; right:96px; top:900px; z-index:5;
          display:flex; align-items:flex-start; gap:40px;
        }
        .s04-callout .line {
          flex:none; margin-top:26px;
          display:flex; align-items:center;
        }
        .s04-callout .dot { width:14px; height:14px; border-radius:999px; border:2px solid #5a7060; background:#2e4538; }
        .s04-callout .stroke { width:60px; height:1.5px; background:#5a7060; }
        .s04-callout .body {
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:44px; line-height:1.22; letter-spacing:-.012em; color:#e0d6bc;
          max-width:720px;
        }
        /* Spec ledger — a compact key/value block */
        .s04-ledger {
          position:absolute; left:96px; right:96px; top:1100px; z-index:5;
          border-top:1px solid rgba(224,214,188,.4);
          border-bottom:1px solid rgba(224,214,188,.4);
          padding:26px 0;
          display:flex; flex-direction:column; gap:16px;
        }
        .s04-ledger .row {
          display:flex; align-items:baseline; justify-content:space-between; gap:24px;
          font-family:var(--font-mono); font-size:15px; letter-spacing:.32em; text-transform:uppercase; color:rgba(224,214,188,.75);
        }
        .s04-ledger .row .v { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; text-transform:none; color:#f6f2e8; }
        /* Approved stamp */
        .s04-stamp {
          position:absolute; right:110px; bottom:280px; z-index:8;
          border:5px solid #e0d6bc; padding:14px 28px 16px; border-radius:8px;
          transform:rotate(-4deg);
          font-family:var(--font-mono); font-weight:500; font-size:34px; letter-spacing:.32em; text-transform:uppercase;
          color:#e0d6bc;
          box-shadow:inset 0 0 0 2px rgba(224,214,188,.2);
        }
        .s04-stamp small { display:block; font-family:var(--font-mono); font-size:11px; letter-spacing:.36em; color:rgba(224,214,188,.85); margin-top:6px; }
        /* CTA plate */
        .s04-cta {
          position:absolute; left:96px; bottom:140px; z-index:6;
          display:inline-flex; align-items:center; gap:22px;
          padding:24px 34px;
          background:#e0d6bc; color:#2e4538;
          font-family:var(--font-mono); font-weight:600; font-size:20px; letter-spacing:.36em; text-transform:uppercase;
          box-shadow:0 30px 60px -22px rgba(224,214,188,.45);
        }
        .s04-cta .arrow { display:inline-block; width:26px; height:2px; background:#2e4538; position:relative; }
        .s04-cta .arrow::after { content:''; position:absolute; right:-2px; top:-5px; width:0; height:0; border-left:8px solid #2e4538; border-top:6px solid transparent; border-bottom:6px solid transparent; }
        /* Footer rail */
        .s04-foot {
          position:absolute; left:96px; right:96px; bottom:70px; z-index:6;
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase;
          color:rgba(224,214,188,.6);
        }
      `,
      body: (ctx) => `
        <div class="s04">
          <div class="s04-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Sheet 04 / 30 · Blueprint</span>
          </div>

          <div class="s04-titleblock">
            <div><span class="k">Project</span><span class="v">Northwest Oregon</span></div>
            <div><span class="k">Sheet</span><span class="v">SC-04</span></div>
            <div><span class="k">Scale</span><span class="v">1 : Community</span></div>
          </div>

          <div class="s04-section"><span class="n">04</span><span>Community as construction</span></div>

          <h1 class="s04-head">Strong communities don't happen by <em>chance.</em></h1>

          <div class="s04-callout">
            <span class="line"><span class="dot"></span><span class="stroke"></span></span>
            <p class="s04-body body">They happen because people <em>get involved.</em></p>
          </div>

          <div class="s04-ledger">
            <div class="row"><span>Material</span><span class="v">Neighbours, showing up.</span></div>
            <div class="row"><span>Method</span><span class="v">One conversation at a time.</span></div>
            <div class="row"><span>Load-bearing</span><span class="v">Trust.</span></div>
          </div>

          <div class="s04-stamp">Approved<small>By the people</small></div>

          <span class="s04-cta">Volunteer Today <span class="arrow"></span></span>

          <div class="s04-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 05 — "Every dollar raised"
     Creative direction: an editorial banknote / bill of exchange.
     Engraved-style border, italic monogram, giant "$" watermark,
     "Northwest Oregon" as the issuing authority, CTA as the
     authorized-signature line.
  ------------------------------------------------------------ */
  {
    id: 'story-05-every-dollar',
    tag: 'Support',
    title: 'Every dollar raised.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s05 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(210,192,150,.4) 0%, transparent 55%),
            linear-gradient(180deg, #f0e6cf 0%, #d9c99e 100%);
          color:#2a2a1f;
        }
        /* Guilloché pattern layer (engraved currency lines) */
        .s05::before {
          content:''; position:absolute; inset:0; pointer-events:none; opacity:.16;
          background:
            repeating-linear-gradient(38deg, rgba(46,42,20,.5) 0 1px, transparent 1px 5px),
            repeating-linear-gradient(-42deg, rgba(46,42,20,.35) 0 1px, transparent 1px 7px);
        }
        /* Big "$" watermark */
        .s05-dollar {
          position:absolute; top:270px; left:50%; transform:translateX(-50%); z-index:1;
          font-family:var(--font-display); font-weight:500; font-style:italic;
          font-size:1400px; line-height:.8; letter-spacing:-.08em;
          color:rgba(74,58,20,.09);
          pointer-events:none; user-select:none;
        }
        /* Currency frame */
        .s05-frame {
          position:absolute; top:150px; bottom:140px; left:64px; right:64px; z-index:3;
          border:4px double #2e4538;
          padding:52px 60px;
          background:
            radial-gradient(120% 90% at 30% 20%, rgba(255,250,235,.65) 0%, transparent 55%),
            linear-gradient(180deg, rgba(240,230,207,.9) 0%, rgba(230,215,178,.95) 100%);
        }
        .s05-frame::before {
          content:''; position:absolute; inset:16px; border:1px solid rgba(46,69,56,.5); pointer-events:none;
        }
        /* Corner ornaments */
        .s05-corner { position:absolute; z-index:5; font-family:var(--font-display); font-style:italic; font-size:56px; color:#2e4538; letter-spacing:-.02em; }
        .s05-corner.tl { top:12px; left:12px; }
        .s05-corner.tr { top:12px; right:12px; }
        .s05-corner.bl { bottom:20px; left:12px; }
        .s05-corner.br { bottom:20px; right:12px; }
        /* Header row inside frame */
        .s05-authority {
          display:flex; align-items:baseline; justify-content:space-between; gap:24px;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase;
          color:#4b3a20;
        }
        .s05-authority .issuer { color:#2e4538; }
        .s05-issue-title {
          margin-top:22px;
          font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.7);
          display:flex; align-items:center; gap:22px;
        }
        .s05-issue-title .rule { flex:1; height:1px; background:rgba(46,42,20,.35); }
        /* The declared value */
        .s05-lede {
          margin-top:34px;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55);
        }
        .s05-figure {
          font-family:var(--font-display); font-weight:500; font-style:italic;
          font-size:200px; line-height:.9; letter-spacing:-.03em; color:#2e4538;
          margin:2px 0 2px;
        }
        .s05-figure .cents { font-size:52px; vertical-align:top; margin-left:6px; color:#4b6252; letter-spacing:0; }
        .s05-inwords {
          margin-top:14px;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.65);
        }
        .s05-inwords .amt {
          display:block; margin-top:8px;
          font-family:var(--font-display); font-weight:500; font-style:italic;
          font-size:46px; letter-spacing:-.015em; text-transform:none; color:#2e4538; line-height:1.16;
          max-width:820px;
        }
        /* Middle engraved emblem — a compass rose vignette */
        .s05-emblem {
          margin:36px auto 0; display:flex; flex-direction:column; align-items:center; gap:14px;
          width:100%;
        }
        .s05-emblem .disc {
          width:190px; height:190px; border-radius:999px;
          border:2px double #2e4538;
          display:flex; align-items:center; justify-content:center;
          position:relative;
          background:
            radial-gradient(60% 60% at 50% 50%, rgba(255,250,235,.8) 0%, rgba(240,230,207,.6) 100%);
        }
        .s05-emblem .disc::before,
        .s05-emblem .disc::after {
          content:''; position:absolute; inset:14px; border-radius:999px; border:1px solid rgba(46,69,56,.4);
          pointer-events:none;
        }
        .s05-emblem .disc::after {
          inset:26px; border-style:dashed;
        }
        .s05-emblem .disc svg { position:relative; z-index:2; width:120px; height:120px; color:#2e4538; }
        .s05-emblem .cap { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        /* Signature block */
        .s05-sig { position:absolute; left:60px; right:60px; bottom:60px; display:flex; align-items:flex-end; justify-content:space-between; gap:40px; }
        .s05-sig .col { display:flex; flex-direction:column; gap:8px; }
        .s05-sig .line { width:340px; height:1.5px; background:#2e4538; }
        .s05-sig .role { font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        .s05-sig .name { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:38px; letter-spacing:-.015em; color:#2e4538; line-height:1; padding-bottom:6px; }
        .s05-seal {
          width:110px; height:110px; border-radius:999px; border:3px double #2e4538;
          display:flex; align-items:center; justify-content:center;
          font-family:var(--font-display); font-style:italic; font-size:44px; color:#2e4538;
          background:rgba(255,250,235,.3);
        }
        /* Mast (above the frame) */
        .s05-mast { position:absolute; top:70px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:20px; color:#4b3a20; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; }
        .s05-mast img { height:54px; width:auto; }
        /* Bottom rail */
        .s05-foot { position:absolute; left:80px; right:80px; bottom:64px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.55); }
      `,
      body: (ctx) => `
        <div class="s05">
          <div class="s05-dollar">$</div>
          <div class="s05-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>No. 05 · Bill of Exchange</span>
          </div>

          <div class="s05-frame">
            <span class="s05-corner tl">§</span>
            <span class="s05-corner tr">§</span>
            <span class="s05-corner bl">§</span>
            <span class="s05-corner br">§</span>

            <div class="s05-authority">
              <span>Issuing authority</span>
              <span class="issuer">Northwest Oregon PAC · 25045</span>
            </div>
            <div class="s05-issue-title">
              <span>The Northwest Oregon Dollar</span>
              <span class="rule"></span>
              <span>Series 2026</span>
            </div>

            <div class="s05-lede">Declared value</div>
            <div class="s05-figure">$1<span class="cents">.00</span></div>

            <div class="s05-inwords">
              Every dollar promises —
              <span class="amt">Every dollar raised stays focused on strengthening Northwest Oregon.</span>
            </div>

            <div class="s05-emblem">
              <div class="disc">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M50 8 L54 46 L92 50 L54 54 L50 92 L46 54 L8 50 L46 46 Z" fill="currentColor" fill-opacity=".08"/>
                  <path d="M50 8 L54 46 L92 50 L54 54 L50 92 L46 54 L8 50 L46 46 Z"/>
                  <circle cx="50" cy="50" r="4" fill="currentColor"/>
                </svg>
              </div>
              <span class="cap">— Legal tender for the region —</span>
            </div>

            <div class="s05-sig">
              <div class="col">
                <span class="name">Support the Mission</span>
                <span class="line"></span>
                <span class="role">Authorized signature · The People</span>
              </div>
              <div class="s05-seal">☘</div>
            </div>
          </div>

          <div class="s05-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 06 — "We're recruiting tomorrow's community leaders today"
     Creative direction: an elevated newspaper classified ad.
     Broadsheet masthead, column rules, "POSITION AVAILABLE" kicker,
     italic call to arms, and a coupon-style tear-off marking the
     CTA at the bottom.
  ------------------------------------------------------------ */
  {
    id: 'story-06-recruiting',
    tag: 'Candidates',
    title: "We're recruiting tomorrow's community leaders today.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s06 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(244,238,220,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e9ddbf 100%);
          color:#221e14;
        }
        /* Very subtle newsprint tint */
        .s06::before {
          content:''; position:absolute; inset:0; pointer-events:none; opacity:.06; mix-blend-mode:multiply;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.14  0 0 0 0 0.1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        /* Broadsheet masthead */
        .s06-masthead {
          position:absolute; top:80px; left:70px; right:70px; z-index:5;
          padding-bottom:14px; border-bottom:3px double #221e14;
        }
        .s06-masthead .title { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:66px; letter-spacing:-.02em; color:#221e14; line-height:1; }
        .s06-masthead .meta { margin-top:14px; display:flex; align-items:center; justify-content:space-between; gap:20px; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(34,30,20,.6); }
        /* Dateline row */
        .s06-dateline {
          position:absolute; top:224px; left:70px; right:70px; z-index:5;
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase;
          color:rgba(34,30,20,.55);
        }
        /* Section kicker */
        .s06-section {
          position:absolute; top:280px; left:70px; z-index:5;
          font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:.5em; text-transform:uppercase;
          color:#6b5a42;
          display:inline-flex; align-items:center; gap:14px;
          padding:8px 14px; border:1.5px solid #6b5a42; background:rgba(255,255,255,.4);
        }
        .s06-section .diamond { display:inline-block; width:8px; height:8px; background:#6b5a42; transform:rotate(45deg); }
        /* Two-column body: giant headline left, kicker + intro right */
        .s06-body {
          position:absolute; top:360px; left:70px; right:70px; bottom:340px; z-index:4;
          display:grid; grid-template-columns:2fr 1px 1fr; gap:34px;
        }
        .s06-body .col-rule { background:linear-gradient(180deg, rgba(34,30,20,.35) 0%, rgba(34,30,20,0) 100%); }
        .s06-headline {
          font-family:var(--font-display); font-weight:500; font-size:120px; line-height:.96; letter-spacing:-.028em; color:#221e14;
        }
        .s06-headline em { font-style:italic; color:#6b5a42; font-weight:500; }
        .s06-side {
          display:flex; flex-direction:column; gap:22px;
          font-family:var(--font-display); font-weight:500;
        }
        .s06-side .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(34,30,20,.55); }
        .s06-side .call { font-size:44px; line-height:1.05; letter-spacing:-.018em; color:#221e14; font-style:italic; }
        .s06-side .call em { font-style:normal; }
        .s06-side .rule { width:60px; height:1px; background:#221e14; opacity:.55; }
        .s06-side .desc { font-family:var(--font-sans); font-weight:400; font-size:24px; line-height:1.44; color:rgba(34,30,20,.75); }
        /* Coupon at bottom — tear-off dashed line + apply block */
        .s06-coupon {
          position:absolute; left:70px; right:70px; bottom:130px; z-index:5;
          padding:26px 32px 30px;
          border:2px dashed #221e14; background:rgba(255,255,255,.35);
          display:flex; align-items:center; justify-content:space-between; gap:24px;
        }
        .s06-coupon::before {
          content:'scissors ✂'; position:absolute; top:-14px; left:26px;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:rgba(34,30,20,.55);
          background:#f6f2e8; padding:0 8px;
        }
        .s06-coupon .col { display:flex; flex-direction:column; gap:8px; }
        .s06-coupon .col .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(34,30,20,.55); }
        .s06-coupon .col .v { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; letter-spacing:-.015em; color:#221e14; line-height:1; }
        .s06-coupon .cta {
          display:inline-flex; align-items:center; gap:16px;
          padding:18px 28px;
          background:#221e14; color:#f6f2e8;
          font-family:var(--font-mono); font-size:18px; letter-spacing:.36em; text-transform:uppercase; font-weight:600;
        }
        .s06-coupon .cta::after { content:'→'; }
        /* Bottom bar (rail) */
        .s06-foot { position:absolute; left:70px; right:70px; bottom:64px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(34,30,20,.55); }
        /* Mast tag in the corner */
        .s06-corner-tag { position:absolute; top:74px; right:70px; z-index:6; display:inline-flex; align-items:center; gap:12px; padding:8px 14px; border:1px solid rgba(34,30,20,.55); font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(34,30,20,.7); background:rgba(255,255,255,.4); }
      `,
      body: (ctx) => `
        <div class="s06">
          <div class="s06-masthead">
            <div class="title">The Northwest Classified</div>
            <div class="meta">
              <span>Vol. 26 · No. 06</span>
              <span>Community Section · A1</span>
              <span>Est. 2026</span>
            </div>
          </div>

          <div class="s06-corner-tag"><img src="${ctx.prefix}nwop-logo-dark.png" alt="" style="height:20px;filter:contrast(1.1)" /></div>

          <div class="s06-dateline">
            <span>Beaverton · Hillsboro · Astoria · Tillamook</span>
            <span>Filed by the People</span>
          </div>

          <span class="s06-section"><span class="diamond"></span>Position Available</span>

          <div class="s06-body">
            <h1 class="s06-headline">Could it <em>be you?</em></h1>
            <div class="col-rule"></div>
            <div class="s06-side">
              <span class="kick">— Notice to residents</span>
              <p class="call">We're recruiting <em>tomorrow's</em> community leaders <em>today.</em></p>
              <span class="rule"></span>
              <p class="desc">Open to teachers, veterans, small-business owners, farmers, parents, neighbours — anyone who cares enough to step forward.</p>
            </div>
          </div>

          <div class="s06-coupon">
            <div class="col">
              <span class="k">Applications open</span>
              <span class="v">Let's Talk</span>
            </div>
            <span class="cta">Reply Today</span>
          </div>

          <div class="s06-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 07 — "Hope. Support. Heard."
     Creative direction: neon storefront marquee. Three values
     glow individually on a night-forest ground with soft radial
     halos; the manifesto is set as an engraved plaque below.
  ------------------------------------------------------------ */
  {
    id: 'story-07-hope-support-heard',
    tag: 'Values',
    title: 'Hope. Support. Heard.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s07 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 30%, rgba(90,140,110,.28) 0%, transparent 55%),
            radial-gradient(120% 90% at 50% 100%, rgba(0,0,0,.9) 0%, transparent 65%),
            linear-gradient(178deg, #0b1a12 0%, #050c07 100%);
          color:#f0efe3;
        }
        /* Subtle bokeh dots — city window lights in the distance */
        .s07::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(3px 3px at 14% 82%, rgba(255,230,150,.6), transparent 60%),
            radial-gradient(2px 2px at 30% 88%, rgba(255,230,150,.35), transparent 60%),
            radial-gradient(2px 2px at 62% 84%, rgba(255,230,150,.45), transparent 60%),
            radial-gradient(3px 3px at 82% 86%, rgba(255,230,150,.55), transparent 60%),
            radial-gradient(2px 2px at 92% 78%, rgba(255,230,150,.35), transparent 60%);
          filter:blur(1.2px);
        }
        .s07-mast { position:absolute; top:80px; left:96px; right:96px; z-index:5; display:flex; align-items:center; justify-content:space-between; gap:20px; color:rgba(240,239,227,.6); font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase; }
        .s07-mast img { height:56px; width:auto; opacity:.9; filter:drop-shadow(0 2px 12px rgba(0,0,0,.6)); }
        .s07-tag {
          position:absolute; top:220px; left:50%; transform:translateX(-50%); z-index:5;
          font-family:var(--font-mono); font-size:15px; letter-spacing:.5em; text-transform:uppercase;
          color:rgba(240,239,227,.5);
          display:inline-flex; align-items:center; gap:22px;
        }
        .s07-tag .bar { display:inline-block; width:60px; height:1px; background:rgba(240,239,227,.4); }
        /* Neon words — three staggered stacked lines */
        .s07-neon { position:absolute; top:320px; left:0; right:0; z-index:5; display:flex; flex-direction:column; align-items:center; gap:36px; }
        .s07-word {
          font-family:var(--font-display); font-style:italic; font-weight:400;
          font-size:160px; line-height:1; letter-spacing:-.03em;
          position:relative;
        }
        .s07-word.hope    { color:#e0d6bc; text-shadow:0 0 12px rgba(224,214,188,.95), 0 0 30px rgba(224,214,188,.6), 0 0 60px rgba(224,214,188,.4), 0 0 120px rgba(224,214,188,.22); }
        .s07-word.support { color:#f0e5c9; text-shadow:0 0 12px rgba(140,168,146,.95), 0 0 30px rgba(140,168,146,.6), 0 0 60px rgba(90,112,96,.45), 0 0 120px rgba(90,112,96,.25); }
        .s07-word.heard   { color:#f6f2e8; text-shadow:0 0 12px rgba(246,242,232,.95), 0 0 30px rgba(246,242,232,.55), 0 0 60px rgba(246,242,232,.35), 0 0 120px rgba(246,242,232,.2); }
        .s07-word::after {
          content:''; position:absolute; left:50%; bottom:-14px; transform:translateX(-50%);
          width:60%; height:2px; background:currentColor; opacity:.4;
          box-shadow:0 0 12px currentColor;
        }
        /* Engraved plaque */
        .s07-plaque {
          position:absolute; left:96px; right:96px; bottom:200px; z-index:5;
          padding:26px 30px;
          background:linear-gradient(180deg, rgba(240,239,227,.06) 0%, rgba(240,239,227,.02) 100%);
          border:1px solid rgba(240,239,227,.35);
          backdrop-filter: blur(4px);
        }
        .s07-plaque .k { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        .s07-plaque .v { margin-top:12px; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:44px; line-height:1.18; letter-spacing:-.015em; color:#f0efe3; }
        .s07-plaque .v em { font-style:normal; color:#e0d6bc; }
        /* Bottom rail */
        .s07-foot {
          position:absolute; left:96px; right:96px; bottom:74px; z-index:5;
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase;
          color:rgba(240,239,227,.5);
        }
      `,
      body: (ctx) => `
        <div class="s07">
          <div class="s07-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Sign 07 · After hours</span>
          </div>

          <span class="s07-tag"><span class="bar"></span>The Northwest Sign<span class="bar"></span></span>

          <div class="s07-neon">
            <span class="s07-word hope">Hope.</span>
            <span class="s07-word support">Support.</span>
            <span class="s07-word heard">Heard.</span>
          </div>

          <div class="s07-plaque">
            <span class="k">— Reads the marquee</span>
            <div class="v">That's the movement <em>we're building.</em></div>
          </div>

          <div class="s07-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 08 — "Every volunteer makes a difference"
     Creative direction: personnel dossier / manila file folder.
     Folder tab up top with a stamped case number, typewriter mono
     field labels, and the manifesto set as the file's statement.
  ------------------------------------------------------------ */
  {
    id: 'story-08-every-volunteer',
    tag: 'Get involved',
    title: 'Every volunteer makes a difference.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s08 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 20% 20%, rgba(0,0,0,.14) 0%, transparent 55%),
            linear-gradient(180deg, #a48a52 0%, #8a7040 100%);
        }
        .s08::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.24  0 0 0 0 0.14  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
          pointer-events:none;
        }
        /* Folder tab */
        .s08-tab {
          position:absolute; top:110px; left:120px; z-index:5;
          padding:14px 34px 12px;
          background:#c8a866;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase;
          color:#3d2f14;
          clip-path:polygon(0 0, 100% 0, 92% 100%, 8% 100%);
          box-shadow:inset 0 -2px 0 rgba(90,70,20,.4);
        }
        /* Manila card sheet */
        .s08-sheet {
          position:absolute; top:150px; bottom:130px; left:60px; right:60px; z-index:4;
          background:
            radial-gradient(90% 70% at 20% 10%, rgba(255,251,235,.9) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #ebd9a5 100%);
          border:1px solid rgba(90,70,20,.3);
          box-shadow:0 40px 90px -40px rgba(60,45,20,.5), inset 0 1px 0 rgba(255,255,255,.5);
        }
        /* Case header inside sheet */
        .s08-caseheader { position:absolute; top:60px; left:64px; right:64px; display:flex; align-items:baseline; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        .s08-caseheader .case { color:#2e4538; font-weight:600; }
        .s08-rule { position:absolute; top:100px; left:64px; right:64px; height:1px; background:repeating-linear-gradient(90deg, rgba(46,42,20,.5) 0 8px, transparent 8px 14px); }
        /* Big red "APPROVED" stamp on the sheet */
        .s08-approved {
          position:absolute; top:140px; right:80px; z-index:6;
          border:5px solid #6b5a42; padding:14px 26px 16px; border-radius:6px;
          transform:rotate(-6deg);
          font-family:var(--font-mono); font-weight:700; font-size:34px; letter-spacing:.34em; text-transform:uppercase;
          color:#6b5a42;
          box-shadow:inset 0 0 0 2px rgba(107,90,66,.2);
        }
        .s08-approved small { display:block; margin-top:4px; font-size:11px; letter-spacing:.36em; color:rgba(107,90,66,.9); }
        /* Field grid */
        .s08-fields {
          position:absolute; top:250px; left:64px; right:64px; display:grid; grid-template-columns:1fr 1fr; row-gap:26px; column-gap:34px;
        }
        .s08-fields .row { display:flex; flex-direction:column; gap:6px; padding-bottom:14px; border-bottom:1px solid rgba(46,42,20,.35); }
        .s08-fields .row .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s08-fields .row .v { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:32px; letter-spacing:-.015em; color:#2e4538; line-height:1.05; }
        /* Statement */
        .s08-statement {
          position:absolute; left:64px; right:64px; bottom:140px;
          padding-top:26px; border-top:2px solid rgba(46,42,20,.55);
        }
        .s08-statement .k { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s08-statement .v {
          margin-top:14px;
          font-family:var(--font-display); font-weight:500; font-size:64px; line-height:1.02; letter-spacing:-.02em; color:#2e4538;
        }
        .s08-statement .v em { font-style:italic; color:#6b5a42; font-weight:500; }
        .s08-statement .lines { margin-top:20px; display:flex; flex-direction:column; gap:6px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:34px; color:rgba(46,42,20,.75); line-height:1.24; }
        /* Signature line */
        .s08-signline { position:absolute; left:64px; right:64px; bottom:70px; display:flex; align-items:baseline; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        .s08-signline .sig { flex:1; height:1px; background:rgba(46,42,20,.5); margin:0 14px; }
        /* Corner paperclip */
        .s08-clip { position:absolute; top:80px; right:180px; z-index:6; }
        /* Bottom rail (outside folder) */
        .s08-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(255,240,210,.8); }
        .s08-mast-mini { position:absolute; top:76px; right:70px; z-index:6; display:flex; align-items:center; gap:14px; padding:8px 16px; background:rgba(0,0,0,.28); font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:#f6f2e8; }
        .s08-mast-mini img { height:24px; width:auto; filter:brightness(1.1); }
      `,
      body: (ctx) => `
        <div class="s08">
          <span class="s08-tab">Personnel · Case 08</span>
          <div class="s08-mast-mini"><img src="${ctx.prefix}nwop-logo-light.png" alt="" />Northwest Oregon PAC</div>

          <div class="s08-sheet">
            <div class="s08-caseheader">
              <span class="case">FILE №26-VOL-08</span>
              <span>The Volunteer Dossier · Classified for the People</span>
            </div>
            <div class="s08-rule"></div>

            <svg class="s08-clip" width="46" height="120" viewBox="0 0 46 120" fill="none" stroke="#6b5a42" stroke-width="4">
              <path d="M12 10 v70 a11 11 0 0 0 22 0 v-45 a7 7 0 0 0 -14 0 v40" />
            </svg>

            <span class="s08-approved">Approved<small>No experience required</small></span>

            <div class="s08-fields">
              <div class="row"><span class="k">Applicant</span><span class="v">You</span></div>
              <div class="row"><span class="k">Position</span><span class="v">Volunteer</span></div>
              <div class="row"><span class="k">District</span><span class="v">Northwest Oregon</span></div>
              <div class="row"><span class="k">Commitment</span><span class="v">Any hours available</span></div>
            </div>

            <div class="s08-statement">
              <span class="k">— Statement of finding</span>
              <div class="v">Every volunteer makes a <em>difference.</em></div>
              <div class="lines">
                <span>No experience required.</span>
                <span>Just a willingness to serve.</span>
              </div>
            </div>

            <div class="s08-signline">
              <span>Signed</span>
              <span class="sig"></span>
              <span>Date · 2026</span>
            </div>
          </div>

          <div class="s08-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 09 — Poll: "What's most important for Northwest Oregon?"
     Creative direction: photographic diptych. Two vertically-halved
     photographic scenes representing the two options. Mono "OR"
     divider centered on a hairline rule; italic labels beneath.
  ------------------------------------------------------------ */
  {
    id: 'story-09-issue-poll',
    tag: 'Values',
    title: "What's most important for Northwest Oregon?",
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true, onPhoto: true },
    data: {
      css: `
        .s09 { position:absolute; inset:0; z-index:10; overflow:hidden; background:#0a0f0b; color:#f0efe3; }
        /* Header band carrying the question */
        .s09-header {
          position:absolute; top:0; left:0; right:0; height:340px; z-index:7;
          background:linear-gradient(180deg, #0a0f0b 0%, #0a0f0b 78%, rgba(10,15,11,0) 100%);
          padding:80px 70px 20px;
          display:flex; flex-direction:column; gap:30px;
        }
        .s09-header .top-row { display:flex; align-items:center; justify-content:space-between; gap:20px; font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.75); }
        .s09-header .top-row img { height:52px; width:auto; filter:brightness(1.05); }
        .s09-header .qkick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(240,239,227,.55); display:inline-flex; align-items:center; gap:16px; }
        .s09-header .qkick::before { content:''; display:inline-block; width:44px; height:1px; background:rgba(240,239,227,.5); }
        .s09-header .q {
          font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1.02; letter-spacing:-.02em; color:#f6f2e8; max-width:940px;
        }
        .s09-header .q em { font-style:italic; color:#e0d6bc; }
        .s09-pane { position:absolute; left:0; right:0; overflow:hidden; }
        .s09-pane.top { top:340px; height:calc(50% - 300px + 100px); }
        .s09-pane.bot { bottom:0; height:calc(50% - 40px); }
        .s09-pane img { width:100%; height:100%; object-fit:cover; filter:saturate(0.7) contrast(1.15) brightness(0.75); }
        .s09-pane.top img { filter:saturate(0.75) contrast(1.2) brightness(0.7) hue-rotate(-8deg); }
        .s09-pane.bot img { filter:saturate(0.6) contrast(1.22) brightness(0.68) sepia(0.35); }
        .s09-pane .wash { position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.1) 40%, rgba(0,0,0,.6) 100%); }
        .s09-pane.top .wash { background:linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.1) 40%, rgba(0,0,0,.8) 100%); }
        .s09-pane.bot .wash { background:linear-gradient(180deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.15) 40%, rgba(0,0,0,.5) 100%); }
        /* Center divider strip */
        .s09-divider {
          position:absolute; top:calc(50% + 60px); left:0; right:0; height:100px; z-index:6;
          background:#0a0f0b;
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;
        }
        .s09-divider .or {
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:88px; line-height:1; color:#f0efe3; letter-spacing:-.02em;
          text-shadow:0 4px 26px rgba(0,0,0,.6);
        }
        .s09-divider .hair { position:absolute; left:80px; right:80px; height:1px; background:linear-gradient(90deg, transparent, rgba(240,239,227,.6) 20%, rgba(240,239,227,.6) 80%, transparent); }
        .s09-divider .hair.top { top:22px; }
        .s09-divider .hair.bot { bottom:22px; }
        /* Labels on each pane */
        .s09-label { position:absolute; z-index:6; display:flex; flex-direction:column; gap:12px; padding:26px 30px; max-width:520px; }
        .s09-label .kick { font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.75); }
        .s09-label .badge {
          align-self:flex-start; display:inline-flex; align-items:center; gap:12px;
          padding:10px 18px; border-radius:999px; border:1.5px solid rgba(240,239,227,.6); background:rgba(0,0,0,.35);
          font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase; color:#f0efe3;
        }
        .s09-label .badge .n { font-family:var(--font-display); font-style:italic; font-size:18px; letter-spacing:-.01em; text-transform:none; color:#e0d6bc; }
        .s09-label .value { font-family:var(--font-display); font-weight:500; font-size:80px; line-height:1.02; letter-spacing:-.022em; color:#f6f2e8; text-shadow:0 3px 22px rgba(0,0,0,.65); }
        .s09-label .value em { font-style:italic; color:#e0d6bc; }
        .s09-label.top { bottom:auto; top:400px; left:70px; }
        .s09-label.bot { bottom:150px; left:70px; }
        /* Poll-sticker margin note */
        .s09-note { position:absolute; right:24px; top:calc(50% + 100px); z-index:8; transform:rotate(3deg); background:#faf4d8; color:#4b3a20; font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase; padding:10px 16px; box-shadow:0 8px 22px -12px rgba(0,0,0,.6); max-width:240px; }
        /* Footer */
        .s09-foot { position:absolute; left:70px; right:70px; bottom:60px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
      `,
      body: (ctx) => `
        <div class="s09">
          <div class="s09-header">
            <div class="top-row">
              <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
              <span>Poll · 09 / 30</span>
            </div>
            <span class="qkick">The Question</span>
            <div class="q">What's most important for <em>Northwest Oregon?</em></div>
          </div>

          <div class="s09-pane top">
            <img src="${ctx.prefix}img/banner.jpg" alt="Growth" />
            <div class="wash"></div>
          </div>
          <div class="s09-pane bot">
            <img src="${ctx.prefix}img/who-we-are.jpg" alt="Safety" />
            <div class="wash"></div>
          </div>

          <div class="s09-label top">
            <span class="badge"><span class="n">A</span>Option one</span>
            <span class="value">Economic <em>Growth.</em></span>
          </div>

          <div class="s09-divider">
            <span class="hair top"></span>
            <span class="or">or</span>
            <span class="hair bot"></span>
          </div>

          <div class="s09-label bot">
            <span class="badge"><span class="n">B</span>Option two</span>
            <span class="value">Community <em>Safety.</em></span>
          </div>

          <div class="s09-note">Overlay IG poll<br />sticker here</div>

          <div class="s09-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 10 — "Campaigns come and go. Strong communities remain."
     Creative direction: a documentary filmstrip. Three photographic
     frames sit as a horizontal strip crossing the middle; sprocket
     holes above/below; editorial commentary framing the strip.
  ------------------------------------------------------------ */
  {
    id: 'story-10-campaigns-remain',
    tag: 'Beliefs',
    title: 'Campaigns come and go. Strong communities remain.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s10 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(244,239,224,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e6d9b7 100%);
        }
        .s10-mast { position:absolute; top:76px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        .s10-mast img { height:56px; width:auto; }
        /* Top editorial caption */
        .s10-lede {
          position:absolute; top:220px; left:80px; right:80px; z-index:5;
        }
        .s10-lede .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,42,20,.55); display:inline-flex; align-items:center; gap:16px; }
        .s10-lede .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s10-lede .head { margin-top:20px; font-family:var(--font-display); font-weight:500; font-size:88px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; }
        .s10-lede .head em { font-style:italic; color:#6b5a42; }
        /* Filmstrip */
        .s10-strip {
          position:absolute; top:640px; left:-30px; right:-30px; height:520px; z-index:4;
          background:#111008;
          padding:56px 20px;
          transform:rotate(-1.2deg);
          box-shadow:0 40px 90px -40px rgba(0,0,0,.6);
        }
        .s10-strip::before, .s10-strip::after {
          content:''; position:absolute; left:20px; right:20px; height:26px;
          background-image: radial-gradient(circle at 20px 13px, #f6f2e8 8px, transparent 8.5px);
          background-size:52px 26px;
        }
        .s10-strip::before { top:12px; }
        .s10-strip::after { bottom:12px; }
        .s10-strip .frames {
          display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; height:100%;
        }
        .s10-strip .frame { position:relative; overflow:hidden; background:#000; }
        .s10-strip .frame img { width:100%; height:100%; object-fit:cover; filter:saturate(.7) contrast(1.2) brightness(.85); }
        .s10-strip .frame .wash { position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 100%); }
        .s10-strip .frame .lbl { position:absolute; left:14px; bottom:14px; font-family:var(--font-mono); font-size:11px; letter-spacing:.4em; text-transform:uppercase; color:#e0d6bc; }
        .s10-strip .frame .yr { position:absolute; right:14px; top:14px; font-family:var(--font-display); font-style:italic; font-size:24px; color:#f0efe3; letter-spacing:-.01em; }
        /* Below-strip commentary */
        .s10-below {
          position:absolute; left:80px; right:80px; bottom:190px; z-index:5;
          padding-top:20px; border-top:1.5px solid rgba(46,42,20,.35);
          display:flex; align-items:flex-end; justify-content:space-between; gap:24px;
        }
        .s10-below .k { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s10-below .v {
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:44px; line-height:1.16; letter-spacing:-.015em; color:#2e4538;
          max-width:640px;
        }
        .s10-below .cornerbadge { font-family:var(--font-display); font-style:italic; font-size:80px; color:rgba(46,69,56,.28); letter-spacing:-.02em; }
        .s10-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.55); }
      `,
      body: (ctx) => `
        <div class="s10">
          <div class="s10-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Reel 10 · Field Documentary</span>
          </div>

          <div class="s10-lede">
            <span class="kick">Frame by frame</span>
            <h1 class="head">Campaigns <em>come and go.</em></h1>
          </div>

          <div class="s10-strip">
            <div class="frames">
              <div class="frame">
                <img src="${ctx.prefix}img/banner.jpg" alt="Then" />
                <div class="wash"></div>
                <span class="yr">'22</span>
                <span class="lbl">— Then</span>
              </div>
              <div class="frame">
                <img src="${ctx.prefix}img/who-we-are.jpg" alt="Now" />
                <div class="wash"></div>
                <span class="yr">'26</span>
                <span class="lbl">— Now</span>
              </div>
              <div class="frame">
                <img src="${ctx.prefix}img/hero.jpg" alt="Next" />
                <div class="wash"></div>
                <span class="yr">'30</span>
                <span class="lbl">— Next</span>
              </div>
            </div>
          </div>

          <div class="s10-below">
            <div>
              <span class="k">— Strong communities remain</span>
              <p class="v">That's why we're investing for the long term.</p>
            </div>
            <span class="cornerbadge">10.</span>
          </div>

          <div class="s10-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 11 — "One conversation can change a campaign"
     Creative direction: two large tilted speech-bubbles as if
     torn from an editorial illustration. Each bubble carries one
     line; handwritten-mono attributions underneath. Reads as an
     art-directed conversation record.
  ------------------------------------------------------------ */
  {
    id: 'story-11-one-conversation',
    tag: 'Get involved',
    title: 'One conversation can change a campaign.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s11 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(100% 70% at 30% 15%, rgba(210,222,206,.55) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(180,200,180,.5) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #c8b98a 100%);
        }
        .s11::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
          pointer-events:none;
        }
        .s11-mast { position:absolute; top:80px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,46,26,.6); }
        .s11-mast img { height:58px; width:auto; }
        .s11-kicker { position:absolute; top:200px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,46,26,.55); display:inline-flex; align-items:center; gap:16px; }
        .s11-kicker::before { content:''; display:inline-block; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Speech bubble A — top-left leaning left */
        .s11-bubble {
          position:absolute; padding:36px 44px 42px; z-index:5;
          font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1.06; letter-spacing:-.018em; color:#2e4538;
          box-shadow:0 30px 60px -30px rgba(46,46,26,.45), inset 0 1px 0 rgba(255,255,255,.6);
          border:1.5px solid rgba(46,46,26,.35);
        }
        .s11-bubble em { font-style:italic; color:#6b5a42; font-weight:500; }
        .s11-bubble .tail { position:absolute; width:44px; height:44px; background:inherit; border:1.5px solid rgba(46,46,26,.35); clip-path:polygon(0 0, 100% 0, 40% 100%); }
        .s11-bubble .attr { display:block; margin-top:22px; font-family:var(--font-mono); font-size:13px; letter-spacing:.38em; text-transform:uppercase; color:rgba(46,46,26,.55); font-weight:400; }
        .s11-bubble.a {
          top:270px; left:56px; max-width:640px;
          background:#f6f2e8;
          border-radius:32px 32px 32px 6px;
          transform:rotate(-2.5deg);
        }
        .s11-bubble.a .tail { bottom:-24px; left:60px; transform:rotate(4deg); border-top:none; border-right:none; background:#f6f2e8; border-radius:0 0 6px 6px; }
        /* Speech bubble B — bottom-right leaning right */
        .s11-bubble.b {
          bottom:340px; right:56px; max-width:640px;
          background:#e0d6bc;
          border-radius:32px 32px 6px 32px;
          transform:rotate(2.4deg);
        }
        .s11-bubble.b .tail { top:-24px; right:70px; transform:rotate(184deg); background:#e0d6bc; border-radius:0 0 6px 6px; }
        /* Connector — an editorial arrow drawn between bubbles */
        .s11-arrow { position:absolute; left:180px; right:180px; top:calc(50% - 40px); z-index:3; opacity:.5; }
        .s11-num { position:absolute; top:calc(50% - 40px); left:50%; transform:translateX(-50%); z-index:4; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:120px; letter-spacing:-.02em; color:rgba(46,46,26,.15); }
        /* Bottom label */
        .s11-tag { position:absolute; left:76px; right:76px; bottom:150px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,46,26,.55); text-align:center; }
        .s11-tag .dot { display:inline-block; width:8px; height:8px; border-radius:999px; background:#6b5a42; margin:0 12px; vertical-align:middle; }
        /* Footer */
        .s11-foot { position:absolute; left:76px; right:76px; bottom:64px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,46,26,.55); }
      `,
      body: (ctx) => `
        <div class="s11">
          <div class="s11-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Session 11 · On the Doorstep</span>
          </div>
          <span class="s11-kicker">A short conversation, overheard</span>

          <div class="s11-bubble a">
            One conversation can <em>change</em> a campaign.
            <span class="attr">— Said the volunteer</span>
            <span class="tail"></span>
          </div>

          <span class="s11-num">&</span>

          <div class="s11-bubble b">
            One volunteer can <em>inspire</em> a community.
            <span class="attr">— Said the neighbor</span>
            <span class="tail"></span>
          </div>

          <div class="s11-tag">Northwest Oregon <span class="dot"></span> Every voice compounds</div>

          <div class="s11-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 12 — "Leadership starts with listening"
     Creative direction: sequential two-chapter poster.
     Chapter 01 = LISTENING with a large ear-diagram icon.
     Chapter 02 = ACTION with a walking-figures diagram.
     Numbered chapters with editorial rules between.
  ------------------------------------------------------------ */
  {
    id: 'story-12-leadership-listening',
    tag: 'Values',
    title: 'Leadership starts with listening.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    data: {
      css: `
        .s12 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 10%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.95) 0%, transparent 60%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f0efe3;
        }
        .s12-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.65); }
        .s12-mast img { height:56px; width:auto; filter:brightness(1.05); }
        /* Section 1 — LISTENING */
        .s12-chapter { position:absolute; left:80px; right:80px; z-index:5; }
        .s12-chapter.one { top:220px; }
        .s12-chapter.two { bottom:220px; }
        .s12-chapter .no { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:32px; letter-spacing:-.02em; color:rgba(240,239,227,.5); display:inline-flex; align-items:baseline; gap:14px; }
        .s12-chapter .no .n { font-size:62px; color:#e0d6bc; font-weight:500; }
        .s12-chapter .no small { font-family:var(--font-mono); font-style:normal; font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(240,239,227,.6); }
        .s12-chapter .body {
          margin-top:20px; display:grid; grid-template-columns:auto 1fr; gap:36px; align-items:center;
        }
        .s12-chapter .body svg { width:170px; height:170px; color:#e0d6bc; opacity:.95; }
        .s12-chapter .msg { display:flex; flex-direction:column; gap:12px; }
        .s12-chapter .msg .head { font-family:var(--font-display); font-weight:500; font-size:70px; line-height:1.02; letter-spacing:-.022em; color:#f0efe3; }
        .s12-chapter .msg .head em { font-style:italic; color:#e0d6bc; }
        .s12-chapter .msg .sub { font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        /* Middle rule with rotating arrow */
        .s12-middle { position:absolute; top:50%; left:80px; right:80px; z-index:4; display:flex; align-items:center; gap:24px; transform:translateY(-50%); }
        .s12-middle .line { flex:1; height:1px; background:linear-gradient(90deg, rgba(240,239,227,.55), rgba(240,239,227,.55)); opacity:.5; }
        .s12-middle .arrow { display:inline-flex; align-items:center; justify-content:center; width:80px; height:80px; border-radius:999px; border:1.5px solid rgba(240,239,227,.55); color:#e0d6bc; font-family:var(--font-display); font-style:italic; font-size:44px; letter-spacing:-.02em; background:rgba(14,22,17,.6); }
        .s12-middle .arrow svg { width:32px; height:32px; }
        .s12-middle .stamp { font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        .s12-foot { position:absolute; left:80px; right:80px; bottom:74px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
      `,
      body: (ctx) => `
        <div class="s12">
          <div class="s12-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Field Manual 12 · Two-Part Practice</span>
          </div>

          <div class="s12-chapter one">
            <span class="no"><span class="n">01</span> — <small>The first act</small></span>
            <div class="body">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M32 42 C32 22 68 22 68 42 C68 62 60 68 60 78 C60 88 46 92 40 82 C36 75 34 68 34 62"/>
                <path d="M42 50 C46 44 54 44 58 50"/>
                <path d="M40 58 C45 52 55 52 60 58"/>
                <circle cx="52" cy="66" r="3" fill="currentColor"/>
              </svg>
              <div class="msg">
                <span class="sub">Chapter 01 · Listen</span>
                <p class="head">Leadership starts with <em>listening.</em></p>
              </div>
            </div>
          </div>

          <div class="s12-middle">
            <span class="line"></span>
            <span class="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16M6 14l6 6 6-6"/></svg>
            </span>
            <span class="line"></span>
            <span class="stamp">then</span>
            <span class="line"></span>
          </div>

          <div class="s12-chapter two">
            <div class="body">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="34" cy="22" r="8"/>
                <path d="M34 30 L34 60 L26 84 M34 60 L44 84"/>
                <path d="M34 40 L22 52 L18 62 M34 40 L48 50 L54 44"/>
                <circle cx="68" cy="30" r="7" opacity=".8"/>
                <path d="M68 37 L68 62 L62 82 M68 62 L76 82" opacity=".8"/>
              </svg>
              <div class="msg">
                <span class="sub">Chapter 02 · Act</span>
                <p class="head">Then it <em>grows</em> through action.</p>
              </div>
            </div>
          </div>

          <div class="s12-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 13 — "The future of Northwest Oregon belongs to those
     willing to build it."
     Creative direction: an under-construction billboard rising
     off a foundation. Striped construction barrier at the base,
     yellow "UNDER CONSTRUCTION" tag, hard-hat mono metadata.
  ------------------------------------------------------------ */
  {
    id: 'story-13-future-belongs',
    tag: 'Introduction',
    title: 'The future of Northwest Oregon belongs to those willing to build it.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s13 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 5%, rgba(224,214,188,.18) 0%, transparent 55%),
            linear-gradient(180deg, #2a2a26 0%, #1a1a17 100%);
          color:#e0d6bc;
        }
        /* Sky grain */
        .s13::before { content:''; position:absolute; inset:0; opacity:.14; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.4  0 0 0 0 0.35  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); mix-blend-mode:screen; }
        /* Construction stripes at bottom */
        .s13-barrier { position:absolute; left:0; right:0; bottom:64px; height:70px; z-index:6;
          background:repeating-linear-gradient(-45deg, #e0d6bc 0 40px, #1a1a17 40px 80px);
          box-shadow:0 -6px 24px -6px rgba(0,0,0,.6);
        }
        .s13-barrier::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; background:#e0d6bc; box-shadow:0 -2px 0 #1a1a17; }
        /* Billboard sign */
        .s13-sign { position:absolute; left:64px; right:64px; top:220px; bottom:200px; z-index:5;
          background:
            radial-gradient(120% 90% at 20% 15%, rgba(240,232,206,.98) 0%, rgba(220,208,180,.95) 100%);
          border:4px solid #1a1a17;
          box-shadow:0 40px 90px -40px rgba(0,0,0,.7);
          padding:36px 44px;
          display:flex; flex-direction:column; justify-content:space-between;
        }
        .s13-sign::before, .s13-sign::after {
          content:''; position:absolute; width:22px; height:22px; border-radius:999px; background:#1a1a17;
          border:3px solid #e0d6bc;
        }
        .s13-sign::before { top:14px; left:14px; }
        .s13-sign::after { top:14px; right:14px; }
        .s13-sign .brc { position:absolute; width:22px; height:22px; border-radius:999px; background:#1a1a17; border:3px solid #e0d6bc; }
        .s13-sign .brc.bl { bottom:14px; left:14px; }
        .s13-sign .brc.br { bottom:14px; right:14px; }
        /* Support struts anchoring the sign to the barrier */
        .s13-strut { position:absolute; bottom:70px; width:20px; height:180px; background:linear-gradient(180deg, rgba(0,0,0,.7), rgba(0,0,0,.9)); z-index:5; }
        .s13-strut.l { left:150px; }
        .s13-strut.r { right:150px; }
        .s13-strut::before, .s13-strut::after { content:''; position:absolute; left:-6px; right:-6px; height:8px; background:rgba(0,0,0,.85); }
        .s13-strut::before { top:0; }
        .s13-strut::after { bottom:0; }
        /* Sign contents */
        .s13-tag { align-self:flex-start; display:inline-flex; align-items:center; gap:14px;
          padding:12px 20px; background:#e0d6bc; color:#1a1a17;
          font-family:var(--font-mono); font-weight:700; font-size:16px; letter-spacing:.42em; text-transform:uppercase;
          box-shadow:0 6px 0 rgba(0,0,0,.75);
        }
        .s13-tag .diamond { display:inline-block; width:12px; height:12px; background:#1a1a17; transform:rotate(45deg); }
        .s13-body { margin-top:16px; display:flex; flex-direction:column; gap:22px; }
        .s13-body .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(26,26,23,.6); }
        .s13-body .head { font-family:var(--font-display); font-weight:500; font-size:74px; line-height:1.02; letter-spacing:-.022em; color:#1a1a17; }
        .s13-body .head em { font-style:italic; color:#6b5a42; }
        .s13-meta {
          margin-top:auto; padding-top:20px; border-top:2px solid rgba(26,26,23,.35);
          display:grid; grid-template-columns:1fr 1fr; gap:14px 30px;
          font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(26,26,23,.7);
        }
        .s13-meta .k { display:block; color:rgba(26,26,23,.5); font-size:11px; letter-spacing:.4em; margin-bottom:4px; }
        .s13-meta .v { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; text-transform:none; color:#1a1a17; }
        /* Top mast */
        .s13-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(234,228,208,.75); }
        .s13-mast img { height:52px; width:auto; filter:brightness(1.05); }
        /* Footer bar */
        .s13-footbar { position:absolute; left:0; right:0; bottom:0; height:64px; z-index:7; background:#1a1a17; display:flex; align-items:center; justify-content:space-between; padding:0 80px; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(234,228,208,.6); }
      `,
      body: (ctx) => `
        <div class="s13">
          <div class="s13-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Site 13 · Now Being Built</span>
          </div>
          <div class="s13-sign">
            <span class="brc bl"></span><span class="brc br"></span>
            <span class="s13-tag"><span class="diamond"></span>Under Construction</span>
            <div class="s13-body">
              <span class="kick">— The future, in progress</span>
              <p class="head">The future of Northwest Oregon belongs to those <em>willing to build it.</em></p>
            </div>
            <div class="s13-meta">
              <div><span class="k">Contractor</span><span class="v">You & your neighbours</span></div>
              <div><span class="k">Completion</span><span class="v">A generation from now</span></div>
              <div><span class="k">Permit</span><span class="v">#25045-NWOR</span></div>
              <div><span class="k">Inspection</span><span class="v">Every election</span></div>
            </div>
          </div>
          <span class="s13-strut l"></span>
          <span class="s13-strut r"></span>
          <div class="s13-barrier"></div>
          <div class="s13-footbar">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 14 — "We believe every town deserves a voice."
     Creative direction: broadcast sonar. Concentric ripple rings
     radiate from a small town marker on a stylized Northwest
     Oregon coast; town labels sit at the tips of the ripples;
     the manifesto set as ham-radio frequency call-out.
  ------------------------------------------------------------ */
  {
    id: 'story-14-every-town',
    tag: 'Beliefs',
    title: 'We believe every town deserves a voice.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s14 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 40%, rgba(90,140,110,.24) 0%, transparent 55%),
            radial-gradient(120% 100% at 50% 100%, rgba(0,0,0,.9) 0%, transparent 65%),
            linear-gradient(178deg, #0b1b1a 0%, #071010 100%);
          color:#e0e5db;
        }
        .s14::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(1.5px 1.5px at 14% 22%, rgba(200,240,220,.3), transparent 60%),
            radial-gradient(1.5px 1.5px at 82% 12%, rgba(200,240,220,.35), transparent 60%),
            radial-gradient(2px 2px at 62% 74%, rgba(200,240,220,.3), transparent 60%),
            radial-gradient(1.5px 1.5px at 24% 62%, rgba(200,240,220,.25), transparent 60%);
          pointer-events:none;
        }
        .s14-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(224,229,219,.7); }
        .s14-mast img { height:56px; width:auto; filter:brightness(1.05); }
        /* Sonar disk */
        .s14-radar {
          position:absolute; top:340px; left:50%; width:880px; height:880px;
          transform:translateX(-50%);
          z-index:4;
        }
        .s14-radar .ring { position:absolute; inset:0; border-radius:999px; border:1px solid rgba(200,240,220,.35); }
        .s14-radar .ring.r1 { inset:0; }
        .s14-radar .ring.r2 { inset:80px; opacity:.55; }
        .s14-radar .ring.r3 { inset:160px; opacity:.4; }
        .s14-radar .ring.r4 { inset:240px; opacity:.32; }
        .s14-radar .ring.r5 { inset:320px; opacity:.24; }
        .s14-radar .crosshair-h { position:absolute; left:0; right:0; top:50%; height:1px; background:rgba(200,240,220,.28); }
        .s14-radar .crosshair-v { position:absolute; top:0; bottom:0; left:50%; width:1px; background:rgba(200,240,220,.28); }
        .s14-radar .dot { position:absolute; width:20px; height:20px; border-radius:999px; background:#e0d6bc; box-shadow:0 0 30px rgba(200,240,220,.7); }
        .s14-radar .dot.origin { left:calc(50% - 10px); top:calc(50% - 10px); background:#e0d6bc; box-shadow:0 0 40px rgba(244,215,143,.9); }
        .s14-radar .town { position:absolute; display:flex; align-items:center; gap:12px; font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:#e0e5db; white-space:nowrap; }
        .s14-radar .town .marker { display:inline-block; width:14px; height:14px; border:2px solid #e0d6bc; border-radius:999px; }
        .s14-radar .town.a { top:40px; left:calc(50% + 90px); }
        .s14-radar .town.b { top:280px; right:calc(50% + 260px); flex-direction:row-reverse; }
        .s14-radar .town.c { bottom:220px; left:calc(50% + 220px); }
        .s14-radar .town.d { bottom:40px; right:calc(50% + 60px); flex-direction:row-reverse; }
        .s14-radar .town.e { top:calc(50% + 40px); left:calc(50% - 240px); }
        /* Left-side call-out */
        .s14-callout {
          position:absolute; top:220px; left:80px; z-index:6;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase;
          color:rgba(224,229,219,.6);
        }
        .s14-callout::after { content:''; display:block; margin-top:12px; width:100px; height:1px; background:currentColor; opacity:.5; }
        /* Bottom message */
        .s14-message { position:absolute; left:80px; right:80px; bottom:170px; z-index:5; }
        .s14-message .head { font-family:var(--font-display); font-weight:500; font-size:80px; line-height:1.02; letter-spacing:-.022em; color:#f0efe3; }
        .s14-message .head em { font-style:italic; color:#e0d6bc; }
        .s14-message .sub { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:38px; letter-spacing:-.015em; color:rgba(224,229,219,.75); }
        /* Frequency meta */
        .s14-freq { position:absolute; left:80px; right:80px; bottom:110px; z-index:5; display:flex; align-items:center; gap:22px; font-family:var(--font-mono); font-size:12px; letter-spacing:.38em; text-transform:uppercase; color:rgba(224,229,219,.55); }
        .s14-freq .rule { flex:1; height:1px; background:rgba(224,229,219,.35); }
        .s14-foot { position:absolute; left:80px; right:80px; bottom:60px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(224,229,219,.45); }
      `,
      body: (ctx) => `
        <div class="s14">
          <div class="s14-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Frequency 14 · Every Town</span>
          </div>
          <div class="s14-callout">— Broadcast log · Northwest Oregon</div>
          <div class="s14-radar">
            <div class="ring r1"></div>
            <div class="ring r2"></div>
            <div class="ring r3"></div>
            <div class="ring r4"></div>
            <div class="ring r5"></div>
            <div class="crosshair-h"></div>
            <div class="crosshair-v"></div>
            <div class="dot origin"></div>
            <span class="town a"><span class="marker"></span>Astoria</span>
            <span class="town b">Hillsboro<span class="marker"></span></span>
            <span class="town c"><span class="marker"></span>Tillamook</span>
            <span class="town d">Forest Grove<span class="marker"></span></span>
            <span class="town e"><span class="marker"></span>Columbia County</span>
          </div>
          <div class="s14-message">
            <div class="head">We believe every town deserves a <em>voice.</em></div>
            <div class="sub">Not just the biggest ones.</div>
          </div>
          <div class="s14-freq">
            <span>Signal · 25.045 MHz</span>
            <span class="rule"></span>
            <span>Range · The entire region</span>
          </div>
          <div class="s14-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 15 — Question: "What issue matters most in your community?"
     Creative direction: vintage voting-booth curtain. Deep crimson
     heavy velvet with visible pleats + gold rope tie; the question
     is lit by a spotlight center-stage. Yellow taped margin note
     for the IG ask sticker.
  ------------------------------------------------------------ */
  {
    id: 'story-15-issue-question',
    tag: 'Values',
    title: 'What issue matters most in your community?',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s15 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 30%, rgba(224,214,188,.24) 0%, transparent 55%),
            radial-gradient(120% 100% at 50% 100%, rgba(14,22,17,.95) 0%, transparent 65%),
            linear-gradient(178deg, #2e4538 0%, #101815 100%);
          color:#f6f2e8;
        }
        /* Velvet pleats — forest stripe pattern */
        .s15::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:
            repeating-linear-gradient(90deg, rgba(28,43,35,.6) 0 40px, rgba(90,112,96,.2) 40px 80px, rgba(28,43,35,.6) 80px 120px);
          mix-blend-mode:multiply; opacity:.55;
        }
        .s15::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(60% 45% at 50% 42%, rgba(224,214,188,.22) 0%, rgba(224,214,188,0) 55%);
        }
        /* Left + right pleated curtain frame — forest velvet */
        .s15-curtain {
          position:absolute; top:0; bottom:0; width:26%; z-index:3;
          background:
            repeating-linear-gradient(90deg, rgba(14,22,17,.9) 0 30px, rgba(28,43,35,.7) 30px 60px);
          box-shadow:inset 0 0 60px rgba(14,22,17,.75);
        }
        .s15-curtain.l { left:0; border-right:2px solid rgba(224,214,188,.18); }
        .s15-curtain.r { right:0; border-left:2px solid rgba(224,214,188,.18); }
        /* Gold rope tie-back */
        .s15-rope { position:absolute; z-index:5; }
        .s15-rope.l { top:calc(50% - 40px); left:26%; }
        .s15-rope.r { top:calc(50% - 40px); right:26%; transform:scaleX(-1); }
        /* Spotlight pool */
        .s15-spot {
          position:absolute; top:280px; left:50%; transform:translateX(-50%);
          width:660px; height:660px; z-index:4; pointer-events:none;
          background:radial-gradient(50% 50% at 50% 50%, rgba(255,240,190,.22) 0%, rgba(255,240,190,0) 55%);
          filter:blur(6px);
        }
        /* Mast */
        .s15-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(246,236,201,.75); }
        .s15-mast img { height:54px; width:auto; filter:brightness(1.1); }
        /* Program card */
        .s15-card {
          position:absolute; top:280px; left:26%; right:26%; z-index:5;
          padding:44px 44px 40px;
          background:#f6f2e8;
          color:#2a2a26;
          box-shadow:0 40px 90px -30px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.6);
          transform:rotate(-1.2deg);
        }
        .s15-card::before { content:''; position:absolute; top:14px; left:14px; right:14px; bottom:14px; border:1px double #2a2a26; pointer-events:none; }
        .s15-card .header { display:flex; align-items:baseline; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(58,26,18,.65); }
        .s15-card .header .no { font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2a2a26; text-transform:none; }
        .s15-card .rule { margin:18px 0 26px; height:2px; background:#2a2a26; }
        .s15-card .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(58,26,18,.65); }
        .s15-card .q { margin-top:12px; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.022em; color:#2a2a26; }
        .s15-card .q em { font-style:italic; color:#6b5a42; }
        .s15-card .sub { margin-top:22px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; color:#2a2a26; letter-spacing:-.012em; }
        /* Yellow tape note */
        .s15-note {
          position:absolute; right:52px; bottom:260px; z-index:8;
          transform:rotate(4deg);
          background:#faf4d8; color:#4b3a20;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase;
          padding:12px 20px 14px; box-shadow:0 10px 24px -12px rgba(0,0,0,.55); max-width:280px;
        }
        .s15-note::before, .s15-note::after { content:''; position:absolute; top:-10px; width:70px; height:18px; background:rgba(200,180,120,.5); }
        .s15-note::before { left:18px; transform:rotate(-4deg); }
        .s15-note::after  { right:18px; transform:rotate(6deg); }
        /* Footer */
        .s15-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,236,201,.55); }
      `,
      body: (ctx) => `
        <div class="s15">
          <div class="s15-curtain l"></div>
          <div class="s15-curtain r"></div>
          <div class="s15-spot"></div>
          <div class="s15-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Program 15 · The Floor is Yours</span>
          </div>
          <div class="s15-card">
            <div class="header"><span>The Northwest Program</span><span class="no">Act 15</span></div>
            <div class="rule"></div>
            <span class="kick">— The question to the audience</span>
            <div class="q">What issue matters most in your <em>community?</em></div>
            <div class="sub">Tell us below.</div>
          </div>
          <div class="s15-note">Overlay Instagram<br />ask sticker here</div>
          <div class="s15-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 16 — "Supporting local candidates. Building stronger…"
     Creative direction: three matte-print posters stacked at
     slight angles, as if pinned to a wall. Each poster carries
     one of the three lines, with its own color story and
     specimen type-block.
  ------------------------------------------------------------ */
  {
    id: 'story-16-supporting-local',
    tag: 'Introduction',
    title: 'Supporting local candidates.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s16 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,80,60,.28) 0%, transparent 55%),
            linear-gradient(180deg, #2a2a26 0%, #1a1815 100%);
          color:#f0efe3;
        }
        .s16::before {
          content:''; position:absolute; inset:0; opacity:.14; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0 0.22  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:screen;
        }
        .s16-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.65); }
        .s16-mast img { height:52px; width:auto; filter:brightness(1.05); }
        .s16-kicker { position:absolute; top:200px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.55); display:inline-flex; align-items:center; gap:16px; }
        .s16-kicker::before { content:''; display:inline-block; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Poster stack */
        .s16-stack { position:absolute; top:260px; bottom:200px; left:60px; right:60px; z-index:5; }
        .s16-poster {
          position:absolute; padding:38px 38px 34px;
          box-shadow:0 30px 60px -24px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.05);
          display:flex; flex-direction:column; gap:24px;
        }
        .s16-poster .pin { position:absolute; top:-8px; left:32px; width:22px; height:22px; border-radius:999px;
          background:radial-gradient(circle at 30% 30%, #e0d6bc 0%, #6b5a42 70%);
          box-shadow:0 4px 10px rgba(0,0,0,.5); }
        .s16-poster .no { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:36px; letter-spacing:-.02em; }
        .s16-poster .kick { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; }
        .s16-poster .head { font-family:var(--font-display); font-weight:500; font-size:62px; line-height:1.02; letter-spacing:-.022em; }
        .s16-poster .head em { font-style:italic; }
        .s16-poster .rule { width:60px; height:2px; }
        .s16-poster .meta { font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; opacity:.7; margin-top:auto; padding-top:16px; border-top:1px solid rgba(0,0,0,.15); }
        /* Poster 1 - top-left */
        .s16-poster.p1 { top:0; left:0; width:520px; height:340px; background:#e0d6bc; color:#2e4538; transform:rotate(-3.5deg); }
        .s16-poster.p1 .rule { background:#6b5a42; }
        .s16-poster.p1 .head em { color:#6b5a42; }
        /* Poster 2 - middle-right */
        .s16-poster.p2 { top:220px; right:0; width:520px; height:340px; background:#2e4538; color:#f0efe3; transform:rotate(2.4deg); }
        .s16-poster.p2 .rule { background:#e0d6bc; }
        .s16-poster.p2 .head em { color:#e0d6bc; }
        /* Poster 3 - bottom-left */
        .s16-poster.p3 { bottom:0; left:20px; width:540px; height:340px; background:#e0d6bc; color:#3d2f14; transform:rotate(-1.8deg); }
        .s16-poster.p3 .rule { background:#3d2f14; }
        .s16-poster.p3 .head em { color:#6b5a42; font-style:italic; }
        .s16-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.5); }
      `,
      body: (ctx) => `
        <div class="s16">
          <div class="s16-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Wall 16 · Poster Series</span>
          </div>
          <span class="s16-kicker">Three prints, pulled from the wall</span>

          <div class="s16-stack">
            <div class="s16-poster p1">
              <span class="pin"></span>
              <span class="no">i.</span>
              <span class="kick">Print № 01 · The endorsement</span>
              <p class="head">Supporting <em>local</em> candidates.</p>
              <span class="rule"></span>
              <span class="meta">Northwest Oregon PAC · Series 2026</span>
            </div>
            <div class="s16-poster p2">
              <span class="pin"></span>
              <span class="no">ii.</span>
              <span class="kick">Print № 02 · The workshop</span>
              <p class="head">Building <em>stronger</em> campaigns.</p>
              <span class="rule"></span>
              <span class="meta">Volunteer bench · Precinct-tested</span>
            </div>
            <div class="s16-poster p3">
              <span class="pin"></span>
              <span class="no">iii.</span>
              <span class="kick">Print № 03 · The neighborhood</span>
              <p class="head">Growing <em>stronger</em> communities.</p>
              <span class="rule"></span>
              <span class="meta">Long-run edition · Continues forever</span>
            </div>
          </div>

          <div class="s16-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 17 — "You don't have to run for office to make a
     difference. You simply have to get involved."
     Creative direction: editorial two-column magazine spread with
     an oversized drop-cap "Y" on the left column and a big italic
     gold pull-quote on the right.
  ------------------------------------------------------------ */
  {
    id: 'story-17-dont-need-office',
    tag: 'Get involved',
    title: "You don't have to run for office to make a difference.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s17 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
        }
        .s17::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.14  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply; pointer-events:none;
        }
        .s17-mast { position:absolute; top:80px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s17-mast img { height:52px; width:auto; }
        .s17-runhead { position:absolute; top:170px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; padding-bottom:14px; border-bottom:1.5px solid #2e4538; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,42,20,.65); }
        .s17-runhead .title { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Body — two columns; left column widened so wrap breathes */
        .s17-body { position:absolute; top:250px; bottom:200px; left:76px; right:76px; z-index:5; display:grid; grid-template-columns:1.4fr 1px 1fr; gap:36px; }
        .s17-body .col-rule { background:linear-gradient(180deg, rgba(46,42,20,.35) 0%, rgba(46,42,20,0) 100%); }
        /* Left column — drop cap sits inline, paragraph reads normally */
        .s17-left { position:relative; display:flex; flex-direction:column; justify-content:center; gap:20px; }
        .s17-left .dropcap {
          font-family:var(--font-display); font-weight:500; font-style:italic;
          font-size:220px; line-height:.85; letter-spacing:-.05em; color:#2e4538;
          float:left; margin:8px 24px 0 0; padding:0;
          shape-outside:margin-box;
        }
        .s17-left p { font-family:var(--font-display); font-weight:500; font-size:44px; line-height:1.14; letter-spacing:-.018em; color:#2e4538; }
        .s17-left p em { font-style:italic; color:#6b5a42; font-weight:500; }
        .s17-left .attribution { margin-top:28px; padding-top:14px; border-top:1px solid rgba(46,42,20,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); clear:both; }
        /* Right column - pull quote */
        .s17-right { display:flex; flex-direction:column; justify-content:center; gap:20px; }
        .s17-right .qmark { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:160px; line-height:.55; color:rgba(107,90,66,.9); letter-spacing:-.06em; }
        .s17-right .pull { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:48px; line-height:1.1; letter-spacing:-.02em; color:#2e4538; }
        .s17-right .pull em { font-style:normal; color:#6b5a42; }
        .s17-right .sig { margin-top:20px; display:flex; align-items:center; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s17-right .sig::before { content:''; width:40px; height:1px; background:currentColor; opacity:.55; }
        /* Folio (page number) */
        .s17-folio { position:absolute; bottom:130px; left:50%; transform:translateX(-50%); z-index:6; font-family:var(--font-display); font-style:italic; font-size:24px; color:rgba(46,42,20,.55); letter-spacing:-.01em; }
        .s17-foot { position:absolute; left:76px; right:76px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.5); }
      `,
      body: (ctx) => `
        <div class="s17">
          <div class="s17-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Spread 17 · Two Columns</span>
          </div>
          <div class="s17-runhead">
            <span>The Northwest Reader</span>
            <span class="title">A note on participation</span>
            <span>P. 17</span>
          </div>
          <div class="s17-body">
            <div class="s17-left">
              <span class="dropcap">Y</span>
              <p>ou don't have to <em>run</em> for office to make a <em>difference.</em></p>
              <span class="attribution">— A note to the reader</span>
            </div>
            <div class="col-rule"></div>
            <div class="s17-right">
              <span class="qmark">"</span>
              <p class="pull">You simply have to <em>get involved.</em></p>
              <span class="sig">The invitation stands</span>
            </div>
          </div>
          <span class="s17-folio">— 17 —</span>
          <div class="s17-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 18 — "Communities thrive when neighbours work together"
     Creative direction: hand-loom textile diagram. Interlocking
     warp and weft rules visualize the neighbours-woven metaphor.
     Warm ecru palette, edge finishing, editorial swatch labels.
  ------------------------------------------------------------ */
  {
    id: 'story-18-neighbours-thrive',
    tag: 'Introduction',
    title: 'Communities thrive when neighbours work together.',
    template: 'custom',
    meta: { forceSurface: 's-sand', hideChrome: true },
    data: {
      css: `
        .s18 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(240,224,180,.6) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #d7c592 100%);
          color:#3a2c14;
        }
        .s18::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.32 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply; pointer-events:none;
        }
        .s18-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(58,44,20,.7); }
        .s18-mast img { height:52px; width:auto; }
        .s18-kicker { position:absolute; top:200px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(58,44,20,.55); display:inline-flex; align-items:center; gap:16px; }
        .s18-kicker::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s18-head { position:absolute; top:250px; left:80px; right:80px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:82px; line-height:1.02; letter-spacing:-.022em; color:#3a2c14; max-width:940px; }
        .s18-head em { font-style:italic; color:#6b5a42; }
        /* Loom diagram — a woven grid */
        .s18-loom { position:absolute; left:80px; right:80px; top:580px; height:640px; z-index:4;
          background:#f6f2e8;
          border:1px solid rgba(58,44,20,.35);
          padding:20px;
          box-shadow:0 30px 60px -30px rgba(58,44,20,.5);
        }
        /* Warp (vertical) threads */
        .s18-loom::before {
          content:''; position:absolute; inset:20px;
          background: repeating-linear-gradient(90deg,
            #6b5a42 0 4px, transparent 4px 26px,
            #2e4538 26px 30px, transparent 30px 52px);
        }
        /* Weft (horizontal) threads — offset color band pattern */
        .s18-loom::after {
          content:''; position:absolute; inset:20px;
          background: repeating-linear-gradient(0deg,
            #d7c592 0 6px, #e0d6bc 6px 12px,
            #c8ac70 12px 20px, #e0d6bc 20px 30px);
          mix-blend-mode:multiply; opacity:.85;
        }
        /* Selvage labels around the loom */
        .s18-loom .selvage { position:absolute; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(58,44,20,.6); }
        .s18-loom .selvage.top    { top:-24px; left:20px; right:20px; display:flex; justify-content:space-between; }
        .s18-loom .selvage.bottom { bottom:-24px; left:20px; right:20px; display:flex; justify-content:space-between; }
        .s18-loom .selvage.left   { left:-40px; top:20px; bottom:20px; writing-mode:vertical-rl; transform:rotate(180deg); display:flex; align-items:center; justify-content:center; letter-spacing:.36em; }
        .s18-loom .selvage.right  { right:-40px; top:20px; bottom:20px; writing-mode:vertical-rl; display:flex; align-items:center; justify-content:center; letter-spacing:.36em; }
        /* Overlaid caption card on the loom */
        .s18-caption {
          position:absolute; left:120px; right:120px; top:calc(580px + 260px); z-index:6;
          background:#f6f2e8; border:1.5px solid #3a2c14; padding:28px 30px;
          box-shadow:0 26px 60px -30px rgba(58,44,20,.55);
          transform:rotate(-1deg);
        }
        .s18-caption .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(58,44,20,.6); }
        .s18-caption .v { margin-top:10px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; line-height:1.16; letter-spacing:-.015em; color:#3a2c14; }
        .s18-swatch { position:absolute; bottom:170px; left:80px; z-index:6; display:flex; align-items:center; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(58,44,20,.6); }
        .s18-swatch .chip { display:inline-block; width:22px; height:22px; border:1px solid rgba(58,44,20,.5); }
        .s18-swatch .chip.a { background:#6b5a42; }
        .s18-swatch .chip.b { background:#2e4538; }
        .s18-swatch .chip.c { background:#c8ac70; }
        .s18-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(58,44,20,.55); }
      `,
      body: (ctx) => `
        <div class="s18">
          <div class="s18-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Weave 18 · Field Textile</span>
          </div>
          <span class="s18-kicker">— A study in the warp &amp; weft</span>
          <h1 class="s18-head">Communities thrive when neighbours work <em>together.</em></h1>
          <div class="s18-loom">
            <span class="selvage top"><span>Warp · Values</span><span>Selvage</span></span>
            <span class="selvage bottom"><span>Weft · Actions</span><span>Loom · Northwest</span></span>
            <span class="selvage left">Prosperity · Safety · Voice</span>
            <span class="selvage right">Volunteer · Vote · Show up</span>
          </div>
          <div class="s18-caption">
            <span class="k">— Fig. 18 · Finished cloth</span>
            <div class="v">That's how lasting change begins.</div>
          </div>
          <div class="s18-swatch">
            <span class="chip a"></span><span>Crimson</span>
            <span class="chip b"></span><span>Forest</span>
            <span class="chip c"></span><span>Ochre</span>
          </div>
          <div class="s18-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 19 — Poll: "Would you volunteer for a local campaign?"
     Creative direction: enlistment recruitment poster. Bold
     serif "I need you" style with halftone Oregon stripe and
     two ballot-oval styled options.
  ------------------------------------------------------------ */
  {
    id: 'story-19-volunteer-poll',
    tag: 'Get involved',
    title: 'Would you volunteer for a local campaign?',
    template: 'custom',
    meta: { forceSurface: 's-sand', hideChrome: true },
    data: {
      css: `
        .s19 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,224,180,.6) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #ddc890 100%);
          color:#2e1a0a;
        }
        .s19::before {
          content:''; position:absolute; inset:0; opacity:.45;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.16  0 0 0 0 0.08  0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply; pointer-events:none;
        }
        /* Halftone dot pattern above the fold */
        .s19-halftone {
          position:absolute; top:-40px; left:-40px; right:-40px; height:340px; z-index:3; pointer-events:none;
          background-image: radial-gradient(circle at 8px 8px, rgba(107,90,66,.85) 3px, transparent 3.5px);
          background-size:22px 22px;
          -webkit-mask-image:linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 100%);
          mask-image:linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 100%);
          opacity:.55;
        }
        /* Diagonal ribbon behind title */
        .s19-ribbon {
          position:absolute; top:340px; left:-40px; right:-40px; height:120px; z-index:3;
          background:#6b5a42;
          transform:rotate(-3deg);
          box-shadow:0 20px 40px -22px rgba(0,0,0,.4);
        }
        .s19-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,26,10,.7); }
        .s19-mast img { height:56px; width:auto; }
        .s19-tag { position:absolute; top:220px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,26,10,.65); display:inline-flex; align-items:center; gap:16px; }
        .s19-tag::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s19-title {
          position:absolute; top:360px; left:80px; right:80px; z-index:5;
          transform:rotate(-3deg);
          padding:14px 24px;
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:64px; line-height:1.02; letter-spacing:-.022em;
          color:#f6f2e8;
          text-shadow:0 3px 20px rgba(0,0,0,.4);
        }
        .s19-title strong { font-weight:500; font-style:normal; color:#e0d6bc; letter-spacing:-.02em; }
        /* Enlistment paper */
        .s19-paper {
          position:absolute; left:80px; right:80px; top:600px; bottom:220px; z-index:5;
          padding:38px 40px 32px;
          background:#f6f2e8;
          border:2px solid #2e1a0a;
          box-shadow:0 30px 60px -30px rgba(46,26,10,.5), inset 0 1px 0 rgba(255,255,255,.6);
        }
        .s19-paper::before { content:''; position:absolute; top:8px; left:8px; right:8px; bottom:8px; border:1px dashed rgba(46,26,10,.4); pointer-events:none; }
        .s19-paper .kick { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,26,10,.6); }
        .s19-paper .stamp {
          position:absolute; top:24px; right:34px;
          font-family:var(--font-mono); font-weight:700; font-size:16px; letter-spacing:.4em; text-transform:uppercase; color:#6b5a42;
          border:3px solid #6b5a42; padding:8px 14px; transform:rotate(4deg);
        }
        .s19-paper .prompt { margin-top:12px; font-family:var(--font-display); font-weight:500; font-size:34px; line-height:1.12; letter-spacing:-.015em; color:#2e1a0a; max-width:600px; }
        .s19-paper .prompt em { font-style:italic; color:#6b5a42; }
        .s19-paper .opts { margin-top:22px; display:flex; flex-direction:column; gap:14px; }
        .s19-paper .opt { display:flex; align-items:center; gap:22px; padding:16px 20px; border:1.5px solid rgba(46,26,10,.55); background:rgba(255,250,232,.6); }
        .s19-paper .opt .oval { flex:none; width:38px; height:56px; border:2.5px solid #2e1a0a; border-radius:999px; display:flex; align-items:center; justify-content:center; }
        .s19-paper .opt.filled .oval { background:#2e1a0a; }
        .s19-paper .opt .mark { color:#f6f2e8; font-family:var(--font-display); font-weight:500; font-size:28px; line-height:1; font-style:italic; }
        .s19-paper .opt .lbl { flex:1; font-family:var(--font-display); font-weight:500; font-size:34px; letter-spacing:-.015em; color:#2e1a0a; }
        .s19-paper .opt .abc { font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; color:rgba(46,26,10,.6); text-transform:uppercase; }
        .s19-note {
          position:absolute; right:36px; bottom:120px; z-index:8;
          transform:rotate(3deg);
          background:#faf4d8; color:#4b3a20;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase;
          padding:10px 16px 12px; box-shadow:0 10px 24px -12px rgba(0,0,0,.5); max-width:270px;
        }
        .s19-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,26,10,.55); }
      `,
      body: (ctx) => `
        <div class="s19">
          <div class="s19-halftone"></div>
          <div class="s19-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Enlistment 19 · Volunteer Call</span>
          </div>
          <span class="s19-tag">— A recruitment notice, printed in earnest</span>
          <div class="s19-ribbon"></div>
          <div class="s19-title"><strong>Northwest Oregon</strong> needs you.</div>

          <div class="s19-paper">
            <span class="stamp">Ballot · Poll</span>
            <span class="kick">The Question · Enlistment 19 of 30</span>
            <p class="prompt">Would you <em>volunteer</em> for a local campaign?</p>
            <div class="opts">
              <div class="opt filled">
                <span class="oval"><span class="mark">✓</span></span>
                <span class="lbl">Absolutely</span>
                <span class="abc">A</span>
              </div>
              <div class="opt">
                <span class="oval"></span>
                <span class="lbl">I would Like More Info</span>
                <span class="abc">B</span>
              </div>
            </div>
          </div>

          <div class="s19-note">Overlay Instagram<br />poll sticker here</div>

          <div class="s19-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 20 — "Every donation helps build long-term political
     infrastructure across Northwest Oregon."
     Creative direction: an architectural cross-section. A tower
     rising from a stack of coins; editorial call-outs point to
     each floor (candidates, volunteers, outreach, comms); the
     manifesto crowns the tower.
  ------------------------------------------------------------ */
  {
    id: 'story-20-every-donation',
    tag: 'Support',
    title: 'Every donation helps build long-term political infrastructure across Northwest Oregon.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s20 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #d9c99e 100%);
          color:#2a2213;
        }
        .s20-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,34,19,.7); }
        .s20-mast img { height:52px; width:auto; }
        .s20-kicker { position:absolute; top:210px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,34,19,.6); display:inline-flex; align-items:center; gap:16px; }
        .s20-kicker::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s20-head { position:absolute; top:250px; left:80px; right:80px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:62px; line-height:1.04; letter-spacing:-.022em; color:#2e4538; max-width:940px; }
        .s20-head em { font-style:italic; color:#6b5a42; }
        /* Elevation diagram — the tower */
        .s20-elevation { position:absolute; left:80px; right:80px; top:520px; bottom:230px; z-index:4; display:grid; grid-template-columns:100px 1fr 260px; gap:24px; }
        .s20-elevation .scale { position:relative; }
        .s20-elevation .scale::after {
          content:''; position:absolute; left:22px; top:0; bottom:0; width:1px; background:linear-gradient(180deg, rgba(42,34,19,.5) 0%, rgba(42,34,19,.2) 100%);
        }
        .s20-elevation .scale .tick {
          position:absolute; left:12px; width:24px; height:1px; background:rgba(42,34,19,.55);
          font-family:var(--font-mono); font-size:10px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,34,19,.6);
        }
        .s20-elevation .scale .tick::after { content:attr(data-h); position:absolute; left:34px; top:-6px; white-space:nowrap; }
        .s20-elevation .tower { position:relative; display:flex; flex-direction:column; }
        .s20-elevation .tower .floor {
          flex:1; border:2px solid #2a2213; border-bottom:none;
          background:linear-gradient(180deg, rgba(240,232,206,.6) 0%, rgba(180,160,100,.35) 100%);
          padding:14px 22px;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
        }
        .s20-elevation .tower .floor:last-of-type { border-bottom:2px solid #2a2213; }
        .s20-elevation .tower .floor .no { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:30px; color:#2e4538; letter-spacing:-.01em; }
        .s20-elevation .tower .floor .name { font-family:var(--font-mono); font-size:13px; letter-spacing:.4em; text-transform:uppercase; color:#2a2213; }
        .s20-elevation .tower .foundation {
          margin-top:6px; padding:8px 22px; background:#2a2213; color:#f6f2e8;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase;
          display:flex; align-items:center; justify-content:space-between;
        }
        .s20-elevation .tower .foundation .coins { display:flex; align-items:center; gap:6px; }
        .s20-elevation .tower .foundation .coin { display:inline-block; width:22px; height:22px; border-radius:999px; background:radial-gradient(circle at 30% 30%, #e0d6bc 0%, #6b5a42 90%); border:1px solid #3d2f14; }
        /* Callouts on the right */
        .s20-elevation .callouts { display:flex; flex-direction:column; justify-content:space-between; padding:6px 0; }
        .s20-elevation .callouts .co { display:flex; align-items:center; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,34,19,.75); }
        .s20-elevation .callouts .co .stroke { flex:none; width:36px; height:1px; background:#2e4538; }
        .s20-elevation .callouts .co .val { font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Bottom banner */
        .s20-band { position:absolute; left:80px; right:80px; bottom:140px; z-index:6; padding:14px 22px; background:#2e4538; color:#f6f2e8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; }
        .s20-band .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .s20-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,34,19,.55); }
      `,
      body: (ctx) => `
        <div class="s20">
          <div class="s20-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Elevation 20 · Long-term Build</span>
          </div>
          <span class="s20-kicker">Section drawing · Investment infrastructure</span>
          <h1 class="s20-head">Every donation helps build long-term political <em>infrastructure</em> across Northwest Oregon.</h1>

          <div class="s20-elevation">
            <div class="scale">
              <span class="tick" style="top:0" data-h="Comms"></span>
              <span class="tick" style="top:25%" data-h="Outreach"></span>
              <span class="tick" style="top:50%" data-h="Volunteers"></span>
              <span class="tick" style="top:75%" data-h="Candidates"></span>
              <span class="tick" style="top:100%" data-h="Base"></span>
            </div>
            <div class="tower">
              <div class="floor"><span class="no">04</span><span class="name">Communications</span></div>
              <div class="floor"><span class="no">03</span><span class="name">Outreach</span></div>
              <div class="floor"><span class="no">02</span><span class="name">Volunteers</span></div>
              <div class="floor"><span class="no">01</span><span class="name">Candidates</span></div>
              <div class="foundation">
                <span>Foundation · Every dollar</span>
                <span class="coins"><span class="coin"></span><span class="coin"></span><span class="coin"></span><span class="coin"></span></span>
              </div>
            </div>
            <div class="callouts">
              <div class="co"><span class="stroke"></span><span class="val">Message the region</span></div>
              <div class="co"><span class="stroke"></span><span class="val">Meet every voter</span></div>
              <div class="co"><span class="stroke"></span><span class="val">Show up together</span></div>
              <div class="co"><span class="stroke"></span><span class="val">Field capable people</span></div>
              <div class="co"><span class="stroke"></span><span class="val">Rests on you</span></div>
            </div>
          </div>

          <div class="s20-band">
            <span>Long-term infrastructure</span>
            <span class="em">Built to last across the region.</span>
          </div>

          <div class="s20-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 21 — "Leadership isn't about titles. It's about serving
     your community."
     Creative direction: a manuscript being copy-edited. The word
     "titles" is struck through with a heavy black bar; "serving"
     is highlighted with a soft yellow marker. Editor's margin
     marks in mono.
  ------------------------------------------------------------ */
  {
    id: 'story-21-leadership-not-titles',
    tag: 'Values',
    title: "Leadership isn't about titles.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s21 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(250,244,220,.6) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2a2213;
        }
        .s21::before {
          content:''; position:absolute; inset:0; opacity:.4; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        /* Faint horizontal ruled lines like typing paper */
        .s21-page {
          position:absolute; top:200px; bottom:200px; left:70px; right:70px; z-index:4;
          background:
            repeating-linear-gradient(180deg, rgba(42,34,19,0) 0 65px, rgba(42,34,19,.12) 65px 66px);
          padding:40px 46px;
        }
        /* Left margin red rule (like manuscript paper) */
        .s21-page::before {
          content:''; position:absolute; left:130px; top:20px; bottom:20px; width:1.5px; background:#6b5a42; opacity:.55;
        }
        .s21-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,34,19,.7); }
        .s21-mast img { height:52px; width:auto; }
        .s21-editor { position:absolute; top:190px; right:60px; z-index:6; padding:8px 14px; background:#6b5a42; color:#f6f2e8; font-family:var(--font-mono); font-size:11px; letter-spacing:.42em; text-transform:uppercase; transform:rotate(3deg); box-shadow:0 6px 14px -6px rgba(0,0,0,.4); }
        /* Numbered draft header inside page */
        .s21-header { display:flex; align-items:baseline; justify-content:space-between; gap:16px; padding-bottom:14px; border-bottom:1.5px solid rgba(42,34,19,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(42,34,19,.6); margin-left:80px; }
        .s21-header .draft { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2a2213; text-transform:none; }
        /* The two "sentences" being copy-edited */
        .s21-para { margin:36px 0 0 80px; font-family:var(--font-display); font-weight:500; font-size:68px; line-height:1.06; letter-spacing:-.02em; color:#2a2213; }
        .s21-para .strike {
          position:relative; color:rgba(42,34,19,.6);
        }
        .s21-para .strike::before {
          content:''; position:absolute; left:-6px; right:-6px; top:calc(50% + 4px); height:12px; background:#2a2213; transform:rotate(-1.2deg);
        }
        .s21-para .highlight {
          background:linear-gradient(180deg, rgba(90,112,96,0) 20%, rgba(90,112,96,.55) 20%, rgba(90,112,96,.55) 90%, rgba(90,112,96,0) 90%);
          padding:0 6px; box-decoration-break:clone; -webkit-box-decoration-break:clone;
          color:#2a2a26;
        }
        .s21-para em { font-style:italic; }
        /* Editor's margin marks */
        .s21-marginmark { position:absolute; font-family:var(--font-display); font-style:italic; color:#6b5a42; }
        .s21-marginmark.m1 { top:230px; left:80px; font-size:36px; transform:rotate(-8deg); }
        .s21-marginmark.m2 { top:400px; left:80px; font-size:28px; letter-spacing:.02em; font-style:italic; }
        .s21-note {
          position:absolute; right:74px; bottom:280px; z-index:6;
          padding:12px 16px; background:#faf4d8;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:#4b3a20;
          transform:rotate(2.5deg); box-shadow:0 10px 24px -12px rgba(0,0,0,.4); max-width:250px;
        }
        .s21-note::before {
          content:'M'; position:absolute; top:-18px; left:6px;
          font-family:var(--font-display); font-style:italic; font-size:28px; color:#6b5a42;
        }
        .s21-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,34,19,.55); }
      `,
      body: (ctx) => `
        <div class="s21">
          <div class="s21-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Draft 21 · Copy Edit</span>
          </div>
          <span class="s21-editor">Editor's Proof</span>

          <div class="s21-page">
            <div class="s21-header">
              <span>The Northwest Editorial</span>
              <span class="draft">A definition of leadership</span>
              <span>Rev. 21</span>
            </div>

            <span class="s21-marginmark m1">✎</span>
            <p class="s21-para">Leadership <em>isn't</em> about <span class="strike">titles.</span></p>

            <span class="s21-marginmark m2">stet.</span>
            <p class="s21-para">It's about <span class="highlight">serving</span> your community.</p>
          </div>

          <div class="s21-note">
            Copy-edit approved by<br />the People. Signed 2026.
          </div>

          <div class="s21-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 22 — "Northwest Oregon is worth investing in.
     Today. Tomorrow. Every year."
     Creative direction: wall calendar. Three tear-off pages
     stacked with slight offsets and paperclip binding rings at
     the top. Each page shows one of the three time-markers.
  ------------------------------------------------------------ */
  {
    id: 'story-22-worth-investing',
    tag: 'Support',
    title: 'Northwest Oregon is worth investing in.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    data: {
      css: `
        .s22 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 10%, rgba(90,112,96,.5) 0%, transparent 55%),
            linear-gradient(178deg, #253e30 0%, #101c15 100%);
          color:#f0efe3;
        }
        .s22-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.7); }
        .s22-mast img { height:52px; width:auto; filter:brightness(1.05); }
        .s22-lede { position:absolute; top:210px; left:80px; right:80px; z-index:6; }
        .s22-lede .kick { font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.55); display:inline-flex; align-items:center; gap:16px; }
        .s22-lede .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s22-lede .head { margin-top:14px; font-family:var(--font-display); font-weight:500; font-size:68px; line-height:1.02; letter-spacing:-.022em; color:#f0efe3; max-width:920px; }
        .s22-lede .head em { font-style:italic; color:#e0d6bc; }
        /* Wall pin / binding rings */
        .s22-binding { position:absolute; left:0; right:0; top:520px; height:44px; z-index:5; display:flex; justify-content:center; gap:340px; }
        .s22-binding .ring { width:44px; height:44px; border-radius:999px; border:5px solid #c4b078; background:transparent; box-shadow:0 4px 12px rgba(0,0,0,.5); }
        /* Calendar stack */
        .s22-cal { position:absolute; left:100px; right:100px; top:560px; bottom:200px; z-index:4; }
        .s22-page {
          position:absolute; left:0; right:0; padding:24px 30px;
          background:#f6f2e8; color:#2e2013;
          box-shadow:0 30px 60px -30px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.5);
        }
        .s22-page::before {
          content:''; position:absolute; top:0; left:0; right:0; height:8px;
          background:repeating-linear-gradient(90deg, transparent 0 12px, rgba(46,32,19,.3) 12px 14px);
        }
        .s22-page .row1 { display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,32,19,.6); }
        .s22-page .date { font-family:var(--font-display); font-weight:500; font-size:78px; line-height:1; letter-spacing:-.022em; color:#2e4538; margin-top:6px; }
        .s22-page .date em { font-style:italic; color:#6b5a42; }
        .s22-page .row2 { display:flex; align-items:center; justify-content:space-between; gap:20px; padding-top:14px; border-top:1.5px solid rgba(46,32,19,.35); margin-top:14px; font-family:var(--font-mono); font-size:11px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,32,19,.55); }
        .s22-page.p1 { top:0; transform:rotate(-1.6deg); }
        .s22-page.p2 { top:230px; transform:rotate(1.2deg); background:#dfd5aa; }
        .s22-page.p3 { top:460px; transform:rotate(-0.6deg); background:#c9bd8f; }
        /* Bottom manifesto */
        .s22-tail { position:absolute; left:80px; right:80px; bottom:140px; z-index:6; padding:16px 22px; background:rgba(0,0,0,.35); font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.75); display:flex; align-items:center; justify-content:space-between; }
        .s22-tail .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .s22-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
      `,
      body: (ctx) => `
        <div class="s22">
          <div class="s22-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Calendar 22 · Long horizon</span>
          </div>
          <div class="s22-lede">
            <span class="kick">On the wall this year, and every year</span>
            <h1 class="head">Northwest Oregon is worth <em>investing</em> in.</h1>
          </div>
          <div class="s22-binding"><span class="ring"></span><span class="ring"></span></div>
          <div class="s22-cal">
            <div class="s22-page p1">
              <div class="row1"><span>Page 01</span><span>The moment</span></div>
              <div class="date"><em>Today.</em></div>
              <div class="row2"><span>2026 · Right now</span><span>Volunteer · Donate · Show up</span></div>
            </div>
            <div class="s22-page p2">
              <div class="row1"><span>Page 02</span><span>The next chapter</span></div>
              <div class="date"><em>Tomorrow.</em></div>
              <div class="row2"><span>The election ahead</span><span>Keep building</span></div>
            </div>
            <div class="s22-page p3">
              <div class="row1"><span>Page 03</span><span>Long horizon</span></div>
              <div class="date"><em>Every year.</em></div>
              <div class="row2"><span>The commitment</span><span>Never an afterthought</span></div>
            </div>
          </div>
          <div class="s22-tail"><span>The calendar reads</span><span class="em">— Worth every page turn.</span></div>
          <div class="s22-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 23 — "Small businesses. Strong families. Thriving
     communities. That's worth protecting."
     Creative direction: printer's type-specimen book. Three tiles,
     each with an ornate frame, small serif emblem, and italic
     specimen title; conclusion set as a bookend imprimatur.
  ------------------------------------------------------------ */
  {
    id: 'story-23-small-businesses',
    tag: 'Issues',
    title: 'Small businesses. Strong families. Thriving communities.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s23 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #d9c88f 100%);
          color:#2a2213;
        }
        .s23::before {
          content:''; position:absolute; inset:0; opacity:.4; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .s23-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,34,19,.7); }
        .s23-mast img { height:52px; width:auto; }
        /* Header row */
        .s23-headplate { position:absolute; top:190px; left:80px; right:80px; z-index:6; padding-bottom:20px; border-bottom:2px double #2a2213; display:flex; align-items:baseline; justify-content:space-between; gap:24px; }
        .s23-headplate .title { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:44px; letter-spacing:-.015em; color:#2a2213; }
        .s23-headplate .no { font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,34,19,.6); }
        /* Three tiles */
        .s23-tiles { position:absolute; top:340px; bottom:340px; left:80px; right:80px; z-index:5; display:flex; flex-direction:column; gap:22px; }
        .s23-tile { position:relative; flex:1; padding:22px 30px; background:#f6f2e8; border:2px solid #2a2213; display:grid; grid-template-columns:100px 1fr auto; gap:26px; align-items:center; box-shadow:0 20px 40px -24px rgba(42,34,19,.4); }
        .s23-tile::before, .s23-tile::after { content:''; position:absolute; left:8px; right:8px; height:2px; background:#2a2213; }
        .s23-tile::before { top:8px; opacity:.6; }
        .s23-tile::after { bottom:8px; opacity:.6; }
        .s23-tile .glyph { width:88px; height:88px; border:1.5px solid #2a2213; border-radius:999px; display:flex; align-items:center; justify-content:center; color:#2a2213; }
        .s23-tile .glyph svg { width:52px; height:52px; }
        .s23-tile .txt { display:flex; flex-direction:column; gap:8px; }
        .s23-tile .txt .kick { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,34,19,.6); }
        .s23-tile .txt .title { font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1; letter-spacing:-.022em; color:#2a2213; }
        .s23-tile .txt .title em { font-style:italic; color:#6b5a42; }
        .s23-tile .no { font-family:var(--font-display); font-style:italic; font-size:60px; color:rgba(42,34,19,.25); letter-spacing:-.02em; }
        /* Bookend imprimatur */
        .s23-imprimatur { position:absolute; left:80px; right:80px; bottom:150px; z-index:6; padding-top:16px; border-top:2px double #2a2213; display:flex; align-items:baseline; justify-content:space-between; gap:14px; }
        .s23-imprimatur .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,34,19,.55); }
        .s23-imprimatur .em { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:44px; line-height:1.1; letter-spacing:-.018em; color:#2a2213; }
        .s23-imprimatur .em em { font-style:normal; color:#6b5a42; }
        .s23-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,34,19,.55); }
      `,
      body: (ctx) => `
        <div class="s23">
          <div class="s23-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Specimen 23 · Three Tiles</span>
          </div>

          <div class="s23-headplate">
            <span class="title">Type specimen book · The Northwest Set</span>
            <span class="no">Fascicle · 23 / 30</span>
          </div>

          <div class="s23-tiles">
            <div class="s23-tile">
              <span class="glyph">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 42 L14 82 L86 82 L86 42"/>
                  <path d="M14 42 L26 20 L74 20 L86 42"/>
                  <path d="M40 82 L40 58 L60 58 L60 82"/>
                  <path d="M14 42 L86 42"/>
                </svg>
              </span>
              <div class="txt">
                <span class="kick">Specimen · I</span>
                <span class="title">Small <em>businesses.</em></span>
              </div>
              <span class="no">01</span>
            </div>
            <div class="s23-tile">
              <span class="glyph">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="50" cy="30" r="10"/>
                  <path d="M30 78 C 30 62 40 55 50 55 C 60 55 70 62 70 78"/>
                  <circle cx="26" cy="42" r="7"/>
                  <path d="M14 78 C 14 68 20 62 26 62 C 32 62 38 68 38 78"/>
                  <circle cx="74" cy="42" r="7"/>
                  <path d="M62 78 C 62 68 68 62 74 62 C 80 62 86 68 86 78"/>
                </svg>
              </span>
              <div class="txt">
                <span class="kick">Specimen · II</span>
                <span class="title">Strong <em>families.</em></span>
              </div>
              <span class="no">02</span>
            </div>
            <div class="s23-tile">
              <span class="glyph">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 82 L14 46 L28 32 L42 46 L42 82"/>
                  <path d="M42 82 L42 40 L58 26 L74 40 L74 82"/>
                  <path d="M74 82 L74 52 L86 46"/>
                  <path d="M14 82 L86 82"/>
                </svg>
              </span>
              <div class="txt">
                <span class="kick">Specimen · III</span>
                <span class="title">Thriving <em>communities.</em></span>
              </div>
              <span class="no">03</span>
            </div>
          </div>

          <div class="s23-imprimatur">
            <span class="kick">Imprimatur</span>
            <span class="em">That's <em>worth protecting.</em></span>
          </div>

          <div class="s23-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 24 — "Meet Brian Schimmel. Candidate for Oregon House
     District 29. Committed to service / community / Northwest Oregon."
     Creative direction: portrait-first campaign broadsheet. Full-
     bleed portrait, editorial masthead across the top, "Committed
     to..." rendered as three inscription rules stacked at the base.
  ------------------------------------------------------------ */
  {
    id: 'story-24-brian-schimmel',
    tag: 'Candidates',
    title: 'Meet Brian Schimmel.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true, onPhoto: true },
    data: {
      css: `
        .s24 { position:absolute; inset:0; z-index:10; overflow:hidden; background:#0a100c; color:#f0efe3; }
        .s24 .bg { position:absolute; inset:0; z-index:1; }
        .s24 .bg img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.72) contrast(1.24) brightness(.7); }
        .s24 .bg::after {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(120% 90% at 30% 10%, rgba(0,0,0,.35) 0%, rgba(0,0,0,.15) 40%, rgba(0,0,0,.9) 100%),
            linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,.95) 100%);
        }
        .s24-mast { position:absolute; top:80px; left:80px; right:80px; z-index:5; display:flex; align-items:center; justify-content:space-between; gap:24px; padding-bottom:22px; border-bottom:1px solid rgba(240,239,227,.35); font-family:var(--font-mono); font-size:13px; letter-spacing:.4em; text-transform:uppercase; color:rgba(240,239,227,.85); text-shadow:0 2px 12px rgba(0,0,0,.5); }
        .s24-mast img { height:52px; width:auto; filter:brightness(1.1) drop-shadow(0 2px 12px rgba(0,0,0,.6)); }
        .s24-mast .headtitle { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#f6f2e8; text-transform:none; }
        /* Section: name + district */
        .s24-section { position:absolute; top:220px; left:80px; right:80px; z-index:5; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(240,239,227,.75); }
        /* Title lockup — lifted higher with real breathing room. */
        .s24-lockup { position:absolute; left:80px; right:80px; bottom:560px; z-index:5; display:flex; flex-direction:column; gap:26px; }
        .s24-lockup .kick { font-family:var(--font-mono); font-size:15px; letter-spacing:.44em; text-transform:uppercase; color:#e0d6bc; }
        .s24-lockup .name { font-family:var(--font-display); font-weight:500; font-size:126px; line-height:1; letter-spacing:-.028em; color:#f6f2e8; text-shadow:0 4px 30px rgba(0,0,0,.6); }
        .s24-lockup .name em { font-style:italic; color:#e0d6bc; }
        /* District band — its own row, well spaced from lockup and inscriptions */
        .s24-district {
          position:absolute; left:80px; right:80px; bottom:440px; z-index:5;
          padding-top:24px; border-top:1px solid rgba(240,239,227,.4);
          display:flex; align-items:center; justify-content:space-between; gap:22px;
          font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.8);
        }
        .s24-district .cred { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        /* Three inscription rules — generous spacing, larger italic */
        .s24-inscriptions { position:absolute; left:80px; right:80px; bottom:140px; z-index:5; display:flex; flex-direction:column; gap:26px; }
        .s24-inscriptions .row { display:flex; align-items:center; gap:30px; padding-bottom:22px; border-bottom:1px solid rgba(240,239,227,.3); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; letter-spacing:-.015em; color:rgba(240,239,227,.95); line-height:1.1; }
        .s24-inscriptions .row .n { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(240,239,227,.55); font-style:normal; min-width:52px; }
        .s24-inscriptions .row .v { flex:1; }
        .s24-inscriptions .row .v em { font-style:normal; color:#e0d6bc; }
        .s24-foot { position:absolute; left:80px; right:80px; bottom:64px; z-index:5; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
      `,
      body: (ctx) => `
        <div class="s24">
          <div class="bg"><img src="${ctx.prefix}img/brian-schimmel.jpg" alt="Brian Schimmel" /></div>
          <div class="s24-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span class="headtitle">The Candidate Broadsheet · No. 24</span>
            <span>Est. 2026</span>
          </div>
          <div class="s24-section"><span>Meet the Candidate</span><span>Endorsement 24 / 30</span></div>
          <div class="s24-lockup">
            <span class="kick">— Endorsed by Northwest Oregon PAC</span>
            <h1 class="name">Meet <em>Brian Schimmel.</em></h1>
          </div>
          <div class="s24-district"><span>Candidate for Oregon House District 29</span><span class="cred">Practical leadership</span></div>
          <div class="s24-inscriptions">
            <div class="row"><span class="n">01</span><span class="v">Committed to <em>service.</em></span></div>
            <div class="row"><span class="n">02</span><span class="v">Committed to <em>the community.</em></span></div>
            <div class="row"><span class="n">03</span><span class="v">Committed to <em>Northwest Oregon.</em></span></div>
          </div>
          <div class="s24-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 25 — "Randall Fryer / Backed BY Northwest Oregon PAC"
     Creative direction: championship boxing-card poster. Heavy
     display type, cracked-paper newsprint bed, "BACKED BY" as
     the promotional headline, portrait plate framed by heavy
     rules.
  ------------------------------------------------------------ */
  {
    id: 'story-25-randall-fryer',
    tag: 'Candidates',
    title: 'Randall Fryer',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s25 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,220,180,.32) 0%, transparent 55%),
            linear-gradient(178deg, #2a3a30 0%, #101815 100%);
          color:#f6f2e8;
        }
        .s25::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0 0.14  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        /* Radial rays behind portrait */
        .s25-rays { position:absolute; top:280px; left:50%; width:920px; height:920px; z-index:2; transform:translateX(-50%); pointer-events:none; opacity:.35;
          background:
            repeating-conic-gradient(from 0deg at 50% 50%, rgba(246,236,201,.8) 0deg, rgba(246,236,201,.8) 6deg, transparent 6deg, transparent 20deg);
          mask-image:radial-gradient(circle at center, transparent 26%, black 27%, black 60%, transparent 62%);
          -webkit-mask-image:radial-gradient(circle at center, transparent 26%, black 27%, black 60%, transparent 62%);
        }
        .s25-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(246,236,201,.75); }
        .s25-mast img { height:52px; width:auto; filter:brightness(1.1); }
        .s25-tag { position:absolute; top:200px; left:0; right:0; text-align:center; z-index:6; font-family:var(--font-mono); font-weight:700; font-size:22px; letter-spacing:.54em; text-transform:uppercase; color:#e0d6bc; }
        .s25-tag::before, .s25-tag::after { content:'—'; margin:0 24px; opacity:.7; }
        .s25-brand { position:absolute; top:250px; left:0; right:0; text-align:center; z-index:6; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:44px; letter-spacing:-.02em; color:#f6f2e8; }
        /* Portrait frame */
        .s25-portrait {
          position:absolute; top:340px; left:50%; transform:translateX(-50%); z-index:5;
          width:520px; height:520px; border-radius:999px; overflow:hidden;
          border:6px solid #f6f2e8;
          box-shadow:0 30px 60px -22px rgba(0,0,0,.7), 0 0 0 14px rgba(107,90,66,.55);
        }
        .s25-portrait img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.85) contrast(1.15) brightness(.95); }
        .s25-name {
          position:absolute; left:0; right:0; top:900px; z-index:6; text-align:center;
          font-family:var(--font-display); font-weight:500; font-size:150px; line-height:.92; letter-spacing:-.028em; color:#f6f2e8;
          text-shadow:0 4px 24px rgba(0,0,0,.55);
        }
        .s25-name em { font-style:italic; color:#e0d6bc; }
        .s25-underline { position:absolute; left:50%; top:1080px; transform:translateX(-50%); z-index:6; width:340px; height:3px; background:#e0d6bc; box-shadow:0 0 24px rgba(244,215,143,.4); }
        .s25-cta { position:absolute; left:80px; right:80px; bottom:210px; z-index:6; padding:18px 28px; background:#f6f2e8; color:#2a3a30; display:flex; align-items:center; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; }
        .s25-cta .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2a3a30; text-transform:none; }
        .s25-fine { position:absolute; left:0; right:0; bottom:150px; z-index:6; text-align:center; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,236,201,.65); }
        .s25-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,236,201,.55); }
      `,
      body: (ctx) => `
        <div class="s25">
          <div class="s25-rays"></div>
          <div class="s25-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Card 25 · Endorsement Poster</span>
          </div>
          <div class="s25-tag">Backed by</div>
          <div class="s25-brand">Northwest Oregon PAC</div>
          <div class="s25-portrait">
            <img src="${ctx.prefix}img/randall-fryer.jpg" alt="Randall Fryer" />
          </div>
          <div class="s25-name">"Randall <em>Fryer"</em></div>
          <div class="s25-underline"></div>
          <div class="s25-cta"><span>Working to strengthen</span><span class="em">— Northwest Oregon</span></div>
          <div class="s25-fine">— Steady · Practical · Community-focused —</div>
          <div class="s25-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 26 — Question: "Would you ever consider running for
     local office?"
     Creative direction: blank filing form. Editorial "declaration
     of candidacy" form with an empty write-in line for the reader's
     name, and the prompt set as the form's headline instruction.
  ------------------------------------------------------------ */
  {
    id: 'story-26-run-question',
    tag: 'Candidates',
    title: 'Would you ever consider running for local office?',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s26 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(232,222,196,.6) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #d4c085 100%);
          color:#2a2013;
        }
        .s26::before {
          content:''; position:absolute; inset:0; opacity:.5; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.32 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .s26-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,32,19,.7); }
        .s26-mast img { height:52px; width:auto; }
        /* Form card */
        .s26-form { position:absolute; top:200px; bottom:200px; left:70px; right:70px; z-index:5;
          background:#f6f2e8; border:2px solid #2a2013;
          padding:44px 46px 36px;
          box-shadow:0 30px 60px -30px rgba(42,32,19,.5), inset 0 1px 0 rgba(255,255,255,.5);
        }
        .s26-form::before { content:''; position:absolute; inset:10px; border:1px double #2a2013; pointer-events:none; }
        /* Header of the form */
        .s26-form .header { display:flex; align-items:baseline; justify-content:space-between; gap:24px; padding-bottom:16px; border-bottom:2px solid #2a2013; font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,32,19,.65); }
        .s26-form .header .title { font-family:var(--font-display); font-style:italic; font-size:28px; letter-spacing:-.01em; color:#2a2013; text-transform:none; }
        .s26-form .instruction { margin-top:26px; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,32,19,.55); }
        .s26-form .prompt { margin-top:16px; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.022em; color:#2a2013; }
        .s26-form .prompt em { font-style:italic; color:#6b5a42; }
        .s26-form .sub { margin-top:16px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:34px; letter-spacing:-.015em; color:#2a2013; }
        /* Write-in name line */
        .s26-form .writeIn { margin-top:44px; }
        .s26-form .writeIn .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,32,19,.55); }
        .s26-form .writeIn .line {
          margin-top:14px; height:56px; border-bottom:2px solid #2a2013;
          display:flex; align-items:flex-end; padding:0 18px 8px;
          font-family:var(--font-display); font-style:italic; font-size:34px; color:rgba(42,32,19,.35); letter-spacing:-.01em;
        }
        .s26-form .writeIn .hint { font-family:var(--font-mono); font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,32,19,.4); margin-top:8px; }
        /* Two checkboxes at the bottom */
        .s26-form .boxes { margin-top:28px; display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .s26-form .boxes .box { display:flex; align-items:center; gap:16px; padding:14px 18px; border:1.5px solid rgba(42,32,19,.55); }
        .s26-form .boxes .box .sq { flex:none; width:32px; height:32px; border:2px solid #2a2013; }
        .s26-form .boxes .box .lbl { font-family:var(--font-display); font-weight:500; font-size:26px; letter-spacing:-.01em; color:#2a2013; }
        /* Signature line */
        .s26-form .sig { position:absolute; left:46px; right:46px; bottom:34px; display:flex; align-items:baseline; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(42,32,19,.6); }
        .s26-form .sig .line { flex:1; height:1px; background:rgba(42,32,19,.55); margin:0 12px; }
        /* Sticker note */
        .s26-note {
          position:absolute; right:34px; bottom:180px; z-index:8;
          transform:rotate(3deg);
          background:#faf4d8; color:#4b3a20;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase;
          padding:10px 16px 12px; box-shadow:0 10px 24px -12px rgba(0,0,0,.5); max-width:260px;
        }
        .s26-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,32,19,.55); }
      `,
      body: (ctx) => `
        <div class="s26">
          <div class="s26-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Form 26 · Declaration of Candidacy</span>
          </div>
          <div class="s26-form">
            <div class="header"><span>The Northwest Filing</span><span class="title">A question, on the record</span><span>Rev. 26</span></div>
            <div class="instruction">— Section A · Please respond</div>
            <p class="prompt">Would you ever consider <em>running</em> for local office?</p>
            <p class="sub">Tell us why or why not.</p>
            <div class="writeIn">
              <span class="k">Section B · Your name (write-in)</span>
              <div class="line">Print here</div>
              <span class="hint">Every candidate started as someone who just wrote their name.</span>
            </div>
            <div class="boxes">
              <div class="box"><span class="sq"></span><span class="lbl">I've thought about it</span></div>
              <div class="box"><span class="sq"></span><span class="lbl">Not yet — but tell me more</span></div>
            </div>
            <div class="sig"><span>Signed</span><span class="line"></span><span>Date · 2026</span></div>
          </div>
          <div class="s26-note">Overlay Instagram<br />ask sticker here</div>
          <div class="s26-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 27 — "Northwest Oregon PAC proudly supports Mark Norman.
     Because stronger communities deserve dedicated representation."
     Creative direction: formal endorsement letter on letterhead.
     Embossed seal, "PROUDLY SUPPORTS" as a declaration, candidate
     portrait as an inline photograph plate, letterhead signature.
  ------------------------------------------------------------ */
  {
    id: 'story-27-mark-norman',
    tag: 'Candidates',
    title: 'Northwest Oregon PAC proudly supports Mark Norman.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s27 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,208,.6) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #d6c493 100%);
          color:#2a1f10;
        }
        .s27::before {
          content:''; position:absolute; inset:0; opacity:.44; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .s27-letter { position:absolute; top:130px; bottom:130px; left:64px; right:64px; z-index:5;
          background:#f6f2e8; border:1px solid rgba(42,31,16,.35);
          box-shadow:0 30px 60px -30px rgba(42,31,16,.55), inset 0 1px 0 rgba(255,255,255,.6);
          padding:60px 60px 44px;
        }
        /* Letterhead */
        .s27-letter .letterhead { display:flex; align-items:center; justify-content:space-between; padding-bottom:20px; border-bottom:2px solid #2a1f10; }
        .s27-letter .letterhead img { height:70px; width:auto; }
        .s27-letter .letterhead .meta { text-align:right; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,31,16,.65); line-height:1.8; }
        .s27-letter .letterhead .meta .title { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2a1f10; text-transform:none; display:block; margin-bottom:4px; }
        /* Recipient */
        .s27-letter .to { margin-top:24px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,31,16,.55); }
        /* Body */
        .s27-letter .body { margin-top:22px; display:grid; grid-template-columns:240px 1fr; gap:34px; align-items:start; }
        .s27-letter .plate { width:240px; height:290px; overflow:hidden; border:2px solid #2a1f10; background:#333; box-shadow:0 20px 40px -22px rgba(42,31,16,.5); }
        .s27-letter .plate img { width:100%; height:100%; object-fit:cover; object-position:center 20%; filter:saturate(.82) contrast(1.14); }
        .s27-letter .prose { display:flex; flex-direction:column; gap:16px; }
        .s27-letter .prose .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,31,16,.55); }
        .s27-letter .prose .head { font-family:var(--font-display); font-weight:500; font-size:52px; line-height:1.02; letter-spacing:-.022em; color:#2a1f10; }
        .s27-letter .prose .head em { font-style:italic; color:#6b5a42; }
        .s27-letter .prose .name { font-family:var(--font-display); font-weight:500; font-size:66px; line-height:.98; letter-spacing:-.022em; color:#2a1f10; }
        .s27-letter .prose .name em { font-style:italic; color:#6b5a42; }
        .s27-letter .prose .quote { margin-top:8px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:30px; line-height:1.24; letter-spacing:-.012em; color:#2a1f10; }
        /* Bottom signature block */
        .s27-letter .close { position:absolute; left:60px; right:60px; bottom:44px; display:flex; align-items:flex-end; justify-content:space-between; gap:24px; padding-top:22px; border-top:1.5px solid rgba(42,31,16,.4); }
        .s27-letter .close .sig { flex:1; display:flex; flex-direction:column; gap:4px; }
        .s27-letter .close .sig .signature { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; letter-spacing:-.012em; color:#2a1f10; }
        .s27-letter .close .sig .role { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,31,16,.6); }
        /* Embossed seal */
        .s27-letter .seal {
          width:140px; height:140px; border-radius:999px; border:3px double #6b5a42;
          display:flex; align-items:center; justify-content:center; flex-direction:column; gap:2px;
          font-family:var(--font-mono); font-size:10px; letter-spacing:.36em; text-transform:uppercase; color:#6b5a42;
          transform:rotate(-6deg);
          box-shadow:inset 0 0 0 1px rgba(107,90,66,.35);
        }
        .s27-letter .seal .star { font-family:var(--font-display); font-style:italic; font-size:30px; color:#6b5a42; }
        .s27-letter .seal .lbl { text-align:center; line-height:1.4; }
        .s27-foot { position:absolute; left:64px; right:64px; bottom:64px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,31,16,.55); }
      `,
      body: (ctx) => `
        <div class="s27">
          <div class="s27-letter">
            <div class="letterhead">
              <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
              <div class="meta">
                <span class="title">Formal Endorsement</span>
                Letter No. 27 · Series 2026<br />Issued at Beaverton, Oregon
              </div>
            </div>
            <div class="to">— To the residents of Northwest Oregon:</div>
            <div class="body">
              <div class="plate"><img src="${ctx.prefix}img/mark-norman.jpg" alt="Mark Norman" /></div>
              <div class="prose">
                <span class="kick">Be it known that</span>
                <div class="head">Northwest Oregon PAC <em>proudly supports</em></div>
                <div class="name">Mark <em>Norman.</em></div>
                <p class="quote">— Because stronger communities deserve dedicated representation.</p>
              </div>
            </div>
            <div class="close">
              <div class="sig">
                <span class="signature">The Board & Members</span>
                <span class="role">On behalf of Northwest Oregon PAC · Committee #25045</span>
              </div>
              <div class="seal"><span class="star">★</span><span class="lbl">Northwest<br/>Oregon<br/>Endorsed</span></div>
            </div>
          </div>
          <div class="s27-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 28 — Poll: "Have you met Barbara Kahl? Yes / I would Like To"
     Creative direction: meet-and-greet business-card. Portrait as
     an inline photograph plate on the left, poll options rendered
     as engraved calling-card entries on the right.
  ------------------------------------------------------------ */
  {
    id: 'story-28-barbara-kahl',
    tag: 'Candidates',
    title: 'Have you met Barbara Kahl?',
    template: 'custom',
    meta: { forceSurface: 's-sand', hideChrome: true },
    data: {
      css: `
        .s28 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,208,.6) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #cfb87a 100%);
          color:#2a1f10;
        }
        .s28::before {
          content:''; position:absolute; inset:0; opacity:.4; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .s28-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,31,16,.7); }
        .s28-mast img { height:52px; width:auto; }
        .s28-kicker { position:absolute; top:200px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,31,16,.55); display:inline-flex; align-items:center; gap:16px; }
        .s28-kicker::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s28-question { position:absolute; top:250px; left:80px; right:80px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:1.02; letter-spacing:-.022em; color:#2a1f10; }
        .s28-question em { font-style:italic; color:#6b5a42; }
        /* Meet-and-greet card */
        .s28-card { position:absolute; top:500px; left:64px; right:64px; z-index:5;
          background:#f6f2e8; border:2px solid #2a1f10;
          box-shadow:0 30px 60px -30px rgba(42,31,16,.55), inset 0 1px 0 rgba(255,255,255,.5);
          display:grid; grid-template-columns:1fr 1fr; gap:0;
          transform:rotate(-1.2deg);
        }
        .s28-card::before { content:''; position:absolute; inset:10px; border:1px double #2a1f10; pointer-events:none; }
        .s28-card .plate { position:relative; overflow:hidden; }
        .s28-card .plate img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.85) contrast(1.14); display:block; }
        .s28-card .plate::after { content:''; position:absolute; top:0; right:0; bottom:0; width:1px; background:#2a1f10; }
        .s28-card .content { padding:34px 34px 26px; display:flex; flex-direction:column; gap:14px; }
        .s28-card .content .kick { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,31,16,.55); }
        .s28-card .content .name { font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1; letter-spacing:-.022em; color:#2a1f10; }
        .s28-card .content .name em { font-style:italic; color:#6b5a42; }
        .s28-card .content .role { font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,31,16,.6); }
        .s28-card .content .rule { width:60px; height:2px; background:#6b5a42; margin:8px 0; }
        .s28-card .content .rsvp { margin-top:8px; display:flex; flex-direction:column; gap:12px; }
        .s28-card .content .rsvp .opt { display:flex; align-items:center; gap:14px; padding:12px 14px; border:1.5px solid #2a1f10; }
        .s28-card .content .rsvp .opt .sq { flex:none; width:24px; height:24px; border:2px solid #2a1f10; }
        .s28-card .content .rsvp .opt.filled .sq { background:#2a1f10; position:relative; }
        .s28-card .content .rsvp .opt.filled .sq::after { content:'✓'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#f6f2e8; font-family:var(--font-display); font-size:16px; font-style:italic; }
        .s28-card .content .rsvp .opt .lbl { font-family:var(--font-display); font-weight:500; font-size:26px; letter-spacing:-.01em; color:#2a1f10; }
        .s28-note {
          position:absolute; right:34px; bottom:180px; z-index:8; transform:rotate(4deg);
          background:#faf4d8; color:#4b3a20;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase;
          padding:10px 16px 12px; box-shadow:0 10px 24px -12px rgba(0,0,0,.5); max-width:250px;
        }
        .s28-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,31,16,.55); }
      `,
      body: (ctx) => `
        <div class="s28">
          <div class="s28-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Card 28 · Meet-and-Greet</span>
          </div>
          <span class="s28-kicker">— A calling card, extended</span>
          <h1 class="s28-question">Have you met <em>Barbara Kahl?</em></h1>
          <div class="s28-card">
            <div class="plate"><img src="${ctx.prefix}img/barbara-kahl.jpg" alt="Barbara Kahl" /></div>
            <div class="content">
              <span class="kick">— The candidate</span>
              <div class="name">Dr. Barbara <em>Kahl</em></div>
              <span class="role">U.S. House · Oregon's 1st Congressional District</span>
              <span class="rule"></span>
              <div class="rsvp">
                <div class="opt filled"><span class="sq"></span><span class="lbl">Yes</span></div>
                <div class="opt"><span class="sq"></span><span class="lbl">I would Like To</span></div>
              </div>
            </div>
          </div>
          <div class="s28-note">Overlay Instagram<br />poll sticker here</div>
          <div class="s28-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 29 — "Every volunteer strengthens a campaign. Help support
     Ciatta Thompson today. Move Northwest Oregon forward."
     Creative direction: torch relay. A diagonal red-orange path
     crosses the frame from bottom-left to top-right; candidate
     portrait sits at a node on the path; italic overlay carries
     the message.
  ------------------------------------------------------------ */
  {
    id: 'story-29-ciatta-thompson',
    tag: 'Candidates',
    title: 'Every volunteer strengthens a campaign.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s29 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 90%, rgba(90,112,96,.32) 0%, transparent 55%),
            radial-gradient(100% 90% at 80% 10%, rgba(224,214,188,.12) 0%, transparent 55%),
            linear-gradient(178deg, #0e1a13 0%, #050a07 100%);
          color:#f6f2e8;
        }
        /* Diagonal torch path — glowing line (sand + sage) */
        .s29-path {
          position:absolute; top:180px; left:-40px; right:-40px; bottom:180px; z-index:3; pointer-events:none;
          background:
            linear-gradient(38deg, transparent 0%, transparent 44%, rgba(140,168,146,.9) 46%, rgba(224,214,188,1) 50%, rgba(140,168,146,.9) 54%, transparent 56%, transparent 100%);
          filter:blur(1px);
        }
        .s29-path::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(38deg, transparent 0%, transparent 42%, rgba(224,214,188,.5) 45%, rgba(246,242,232,1) 50%, rgba(224,214,188,.5) 55%, transparent 58%, transparent 100%);
          filter:blur(14px); mix-blend-mode:screen;
        }
        /* Sparks — sand toned */
        .s29-sparks { position:absolute; inset:0; z-index:4; pointer-events:none;
          background:
            radial-gradient(3px 3px at 20% 78%, rgba(224,214,188,.9), transparent 60%),
            radial-gradient(2px 2px at 32% 70%, rgba(246,242,232,.7), transparent 60%),
            radial-gradient(2px 2px at 46% 60%, rgba(224,214,188,.9), transparent 60%),
            radial-gradient(3px 3px at 62% 46%, rgba(224,214,188,.85), transparent 60%),
            radial-gradient(2px 2px at 76% 34%, rgba(246,242,232,.7), transparent 60%),
            radial-gradient(3px 3px at 88% 24%, rgba(224,214,188,.9), transparent 60%);
        }
        .s29-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(244,236,208,.75); }
        .s29-mast img { height:52px; width:auto; filter:brightness(1.05); }
        /* Portrait node */
        .s29-node {
          position:absolute; top:640px; left:calc(50% - 130px); z-index:5;
          width:260px; height:260px; border-radius:999px; overflow:hidden;
          border:5px solid #f6f2e8;
          box-shadow:0 0 60px rgba(224,214,188,.6), 0 20px 40px -18px rgba(0,0,0,.55);
        }
        .s29-node img { width:100%; height:100%; object-fit:cover; object-position:center 24%; filter:saturate(.85) contrast(1.15); }
        .s29-nodetag { position:absolute; top:640px; right:60px; z-index:6; padding:8px 14px; background:#f6f2e8; color:#2a1f10; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; }
        /* Top message */
        .s29-topmsg { position:absolute; top:210px; left:80px; right:80px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1.02; letter-spacing:-.022em; color:#f6f2e8; text-shadow:0 3px 22px rgba(0,0,0,.55); max-width:820px; }
        .s29-topmsg em { font-style:italic; color:#e0d6bc; }
        /* Bottom name + CTA */
        .s29-bot { position:absolute; left:80px; right:80px; bottom:230px; z-index:6; display:flex; align-items:flex-end; justify-content:space-between; gap:24px; padding-top:22px; border-top:1px solid rgba(244,236,208,.35); }
        .s29-bot .name { font-family:var(--font-display); font-weight:500; font-size:64px; line-height:.98; letter-spacing:-.022em; color:#f6f2e8; }
        .s29-bot .name em { font-style:italic; color:#e0d6bc; }
        .s29-bot .cred { text-align:right; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:28px; letter-spacing:-.012em; color:#f6f2e8; max-width:360px; line-height:1.2; }
        .s29-bot .cred small { display:block; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(244,236,208,.65); margin-top:8px; font-style:normal; }
        .s29-tail { position:absolute; left:80px; right:80px; bottom:150px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:#e0d6bc; text-align:center; }
        .s29-tail::before, .s29-tail::after { content:'▸'; margin:0 16px; }
        .s29-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(244,236,208,.55); }
      `,
      body: (ctx) => `
        <div class="s29">
          <div class="s29-path"></div>
          <div class="s29-sparks"></div>
          <div class="s29-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Relay 29 · Pass the Torch</span>
          </div>
          <h1 class="s29-topmsg">Every volunteer <em>strengthens</em> a campaign.</h1>
          <div class="s29-node"><img src="${ctx.prefix}img/ciatta-thompson.jpg" alt="Ciatta Thompson" /></div>
          <span class="s29-nodetag">Runner · 29</span>
          <div class="s29-bot">
            <div class="name">Ciatta <em>Thompson</em></div>
            <div class="cred">Help support her today.<small>Oregon House District 33</small></div>
          </div>
          <div class="s29-tail">Move Northwest Oregon forward</div>
          <div class="s29-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 30 — Closing: "Together, we're building a stronger
     Northwest Oregon. Hope • Support • Heard / Follow • Volunteer
     • Donate"
     Creative direction: colophon — the final page of a beautifully
     printed book. Decorative typographic ornaments, three-column
     values grid, signed closing note, italic finis at the base.
  ------------------------------------------------------------ */
  {
    id: 'story-30-hope-support-heard',
    tag: 'Values',
    title: 'Hope · Support · Heard',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    data: {
      css: `
        .s30 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(90,112,96,.55) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.95) 0%, transparent 60%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f0efe3;
        }
        .s30::before {
          content:''; position:absolute; inset:0; opacity:.14; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:screen;
        }
        .s30-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.7); }
        .s30-mast img { height:52px; width:auto; filter:brightness(1.05); }
        /* Ornament separator (top) */
        .s30-orn { position:absolute; left:0; right:0; text-align:center; z-index:5; color:#e0d6bc; }
        .s30-orn.top { top:200px; }
        .s30-orn.bot { bottom:260px; }
        .s30-orn svg { width:200px; height:32px; }
        /* Colophon heading */
        .s30-heading { position:absolute; top:260px; left:0; right:0; text-align:center; z-index:6; font-family:var(--font-display); font-style:italic; font-weight:400; font-size:30px; letter-spacing:.06em; color:rgba(240,239,227,.6); }
        .s30-title { position:absolute; top:320px; left:80px; right:80px; text-align:center; z-index:6; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.022em; color:#f0efe3; }
        .s30-title em { font-style:italic; color:#e0d6bc; }
        /* Three-column value grid */
        .s30-grid { position:absolute; top:640px; left:80px; right:80px; z-index:6; display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
        .s30-grid .cell { position:relative; padding:24px 20px; text-align:center; }
        .s30-grid .cell + .cell { border-left:1px solid rgba(240,239,227,.35); }
        .s30-grid .cell .no { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:38px; color:rgba(240,239,227,.5); letter-spacing:-.02em; }
        .s30-grid .cell .word { font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1; letter-spacing:-.022em; color:#f6f2e8; margin-top:10px; }
        .s30-grid .cell .word.italic { font-style:italic; color:#c3d0c6; }
        .s30-grid .cell .word.gold { color:#e0d6bc; font-style:italic; }
        .s30-grid .cell .sub { margin-top:12px; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        /* Second three-column grid (Follow/Volunteer/Donate) */
        .s30-grid2 { position:absolute; top:900px; left:80px; right:80px; z-index:6; display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .s30-grid2 .cell { padding:14px 12px; text-align:center; border:1.5px solid rgba(240,239,227,.5); font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase; color:#f0efe3; }
        .s30-grid2 .cell .em { display:block; margin-top:2px; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; text-transform:none; color:#e0d6bc; }
        /* Closing note */
        .s30-close { position:absolute; left:80px; right:80px; top:1100px; z-index:6; padding-top:22px; border-top:1px double rgba(240,239,227,.4); text-align:center; }
        .s30-close .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        .s30-close .v { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; line-height:1.14; letter-spacing:-.015em; color:#f0efe3; }
        .s30-close .v em { font-style:normal; color:#e0d6bc; }
        /* Finis */
        .s30-finis { position:absolute; left:0; right:0; bottom:150px; z-index:6; text-align:center; font-family:var(--font-display); font-style:italic; font-size:34px; letter-spacing:-.01em; color:rgba(240,239,227,.65); }
        .s30-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        /* Ornament SVG shared style */
        .s30 .orn-svg path, .s30 .orn-svg circle { fill:currentColor; }
      `,
      body: (ctx) => `
        <div class="s30">
          <div class="s30-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Colophon 30 · Closing Page</span>
          </div>
          <div class="s30-orn top">
            <svg class="orn-svg" viewBox="0 0 200 32" fill="none">
              <path d="M0 16 L60 16" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="72" cy="16" r="2" fill="currentColor"/>
              <path d="M84 12 Q100 24 116 12" stroke="currentColor" stroke-width="1.4" fill="none"/>
              <circle cx="128" cy="16" r="2" fill="currentColor"/>
              <path d="M140 16 L200 16" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </div>
          <div class="s30-heading">— Colophon · The closing note —</div>
          <h1 class="s30-title">Together, we're building a stronger <em>Northwest Oregon.</em></h1>

          <div class="s30-grid">
            <div class="cell"><span class="no">i.</span><div class="word">Hope.</div><span class="sub">The starting condition</span></div>
            <div class="cell"><span class="no">ii.</span><div class="word italic">Support.</div><span class="sub">The daily practice</span></div>
            <div class="cell"><span class="no">iii.</span><div class="word gold">Heard.</div><span class="sub">The outcome</span></div>
          </div>

          <div class="s30-grid2">
            <div class="cell">Follow<span class="em">— stay close</span></div>
            <div class="cell">Volunteer<span class="em">— show up</span></div>
            <div class="cell">Donate<span class="em">— chip in</span></div>
          </div>

          <div class="s30-close">
            <span class="k">Signed on behalf of the region</span>
            <div class="v">— The end of the beginning. <em>Turn the page with us.</em></div>
          </div>

          <div class="s30-finis">— fin —</div>

          <div class="s30-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
]

/* -------------------------------------------------------------------
   CAROUSELS — 10 sets, exact PDF slide text
   Redesigned with the `c*` template suite (see templates.mjs /
   carousels.css). Each carousel gets a unique visual identity by
   pairing bespoke compositions with different imagery + palette.
------------------------------------------------------------------- */
export const carousels = [
  // ==============================================================
  // 01 · For Northwest Oregon — cinematic intro, bridge/community
  // ==============================================================
  {
    id: 'carousel-01-meet-the-pac',
    tag: 'Introduction',
    title: 'For Northwest Oregon',
    caption:
      'Northwest Oregon PAC was created because too many communities across our region have been overlooked and underinvested in. We believe every voter deserves real choices, every community deserves to be heard, and every credible candidate deserves the opportunity to compete.\n\nWe\'re building a stronger future for Northwest Oregon.\n\n#NorthwestOregonPAC #NorthwestOregon #GrassrootsLeadership #Election2026',
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'banner.jpg',
          eyebrow: 'Slide 1 · A voice for the region',
          brandLine: 'Northwest Oregon PAC · 2026',
          heading: 'FOR NORTHWEST OREGON',
          sub: 'Learn why our work matters.',
          washDeep: true,
          emWords: 2,
        },
      },
      {
        template: 'cManifesto',
        surface: 's-forest',
        data: {
          photo: 'community.jpg',
          eyebrow: 'Slide 2',
          heading: 'Northwest Oregon has too often been overlooked.',
          paragraphs: [
            'Communities across our region have been treated as "uncompetitive," leaving voters with fewer resources, less engagement, and fewer opportunities to build lasting political momentum.',
          ],
          align: 'left',
        },
      },
      {
        template: 'cDuoSplit',
        surface: 's-light',
        data: {
          photo: 'event.jpg',
          photoLabel: 'Community · Convening · Voice',
          orientation: 'vertical',
          eyebrow: 'Slide 3',
          heading: 'We believe every community deserves investment.',
          copyTone: 'sand',
          emWords: 2,
        },
      },
      {
        template: 'cCheckOverImage',
        data: {
          photo: 'campaign.jpg',
          eyebrow: 'Slide 4',
          heading: "Elections don't become competitive by accident.",
          subhead: 'It takes:',
          items: [
            'Candidate recruitment',
            'Volunteer networks',
            'Community partnerships',
            'Local fundraising',
            'Long-term commitment',
          ],
        },
      },
      {
        template: 'cManifesto',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 5',
          paragraphs: [
            'We help build the foundation that allows strong candidates and dedicated volunteers to succeed, not just for one election, but for years to come.',
          ],
          align: 'left',
        },
      },
      {
        template: 'cCheckSolid',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6',
          heading: 'We want a Northwest Oregon where:',
          items: [
            'Communities are heard',
            'Candidates are supported',
            'Elections are competitive',
            'Local voices matter',
          ],
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'bridge.png',
          eyebrow: 'Slide 7 · Join the movement',
          heading: 'Join the movement.',
          items: ['Volunteer.', 'Support.', 'DONATE'],
          footer: 'northwestoregon.com',
        },
      },
    ],
  },

  // ==============================================================
  // 02 · Competitive Elections Build Better Communities
  // ==============================================================
  {
    id: 'carousel-02-competitive-elections',
    tag: 'Issues',
    title: 'Competitive Elections Build Better Communities',
    caption:
      'Healthy democracy depends on competitive elections. When candidates earn support instead of expecting it, communities benefit through stronger ideas, greater accountability, and more engaged voters.\n\nNorthwest Oregon deserves elections where every community has a voice and every voter has a meaningful choice.\n\n#CompetitiveElections #NorthwestOregonPAC #NorthwestOregon #Election2026',
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'hero.jpg',
          eyebrow: 'Slide 1 · A civic thesis',
          brandLine: 'Issue Series · No. 02',
          heading: 'Competitive Elections Build Better Communities',
          emWords: 3,
        },
      },
      {
        template: 'cBeliefStatement',
        surface: 's-forest',
        data: {
          photo: 'hero.jpg',
          side: 'left',
          index: '01',
          tag: 'WHEN ELECTIONS ARE COMPETITIVE',
          eyebrow: 'Slide 2 · When elections are competitive',
          paragraphs: [
            'Candidates spend more time listening to voters instead of taking support for granted.',
          ],
        },
      },
      {
        template: 'cCheckSolid',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: 'Competitive races encourage',
          items: [
            'Better conversations',
            'Better ideas',
            'Greater accountability',
            'Higher voter participation',
          ],
        },
      },
      {
        template: 'cManifesto',
        surface: 's-forest',
        data: {
          photo: 'community.jpg',
          eyebrow: 'Slide 4',
          paragraphs: [
            'Communities benefit when every candidate has the opportunity to earn support, not when races are decided before campaigns begin.',
          ],
          align: 'left',
        },
      },
      {
        template: 'cDuoSplit',
        data: {
          photo: 'us-elections.jpg',
          photoLabel: 'Ballots · Choice · Voice',
          orientation: 'horizontal',
          eyebrow: 'Slide 5',
          heading: 'Northwest Oregon deserves real choices.',
          paragraphs: ['Not predetermined outcomes.', 'Not forgotten communities.'],
          copyTone: 'forest',
          emWords: 2,
        },
      },
      {
        template: 'cCheckOverImage',
        data: {
          photo: 'community.jpg',
          eyebrow: 'Slide 6 · That requires people willing to',
          items: [
            'Volunteer',
            'Donate',
            'Organize',
            'Vote',
            'Encourage others to participate',
          ],
          bullet: '•',
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'hero.jpg',
          eyebrow: 'Slide 7',
          heading: 'Strong elections begin with strong communities.',
          sub: 'Help us strengthen Northwest Oregon.',
          items: ['northwestoregon.com'],
        },
      },
    ],
  },

  // ==============================================================
  // 03 · Where Does Your Donation Go? — step-by-step big numerals
  // ==============================================================
  {
    id: 'carousel-03-where-donation-goes',
    tag: 'Support',
    title: 'Where Does Your Donation Go?',
    caption:
      'Every contribution to Northwest Oregon PAC helps strengthen the foundation for long-term success. From recruiting candidates and organizing volunteers to supporting voter outreach and campaign communications, your investment stays focused on Northwest Oregon.\n\nTogether, we\'re building lasting political infrastructure that serves our communities, not just during election season, but every year.\n\nMake your contribution today and help strengthen Northwest Oregon.\n\n#DonateLocal #NorthwestOregonPAC #GrassrootsSupport #NorthwestOregon #Election2026 #SupportLocalLeadership',
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'banner.jpg',
          eyebrow: 'Slide 1 · A four-part story',
          brandLine: 'Support Series · 2026',
          heading: 'Where Does Your Donation Go?',
          washDeep: true,
        },
      },
      {
        template: 'cBigNum',
        data: {
          num: '1',
          tag: 'RECRUITING LEADERS',
          eyebrow: 'Slide 2 · Recruiting Leaders',
          photo: 'campaign.jpg',
          heading: 'Recruiting Leaders',
          paragraphs: [
            'Finding and encouraging qualified candidates who care deeply about Northwest Oregon and are ready to serve.',
          ],
          footer: 'Step 01 · of the mission',
        },
      },
      {
        template: 'cBigNum',
        surface: 's-forest',
        data: {
          num: '2',
          tag: 'BUILDING CAMPAIGNS',
          eyebrow: 'Slide 3',
          photo: 'event.jpg',
          heading: 'Building Campaigns',
          paragraphs: [
            'Supporting campaign communications, voter outreach, and grassroots organization that help candidates connect with their communities.',
          ],
          footer: 'Step 02 · of the mission',
        },
      },
      {
        template: 'cBigNum',
        surface: 's-sand',
        data: {
          num: '3',
          tag: 'GROWING VOLUNTEER NETWORKS',
          eyebrow: 'Slide 4',
          photo: 'community.jpg',
          heading: 'Growing Volunteer Networks',
          paragraphs: [
            'Providing the tools and coordination needed to bring volunteers together for meaningful local action.',
          ],
          footer: 'Step 03 · of the mission',
        },
      },
      {
        template: 'cBigNum',
        surface: 's-forest',
        data: {
          num: '4',
          tag: 'INVESTING IN LONG-TERM SUCCESS',
          eyebrow: 'Slide 5',
          photo: 'bridge.png',
          heading: 'Investing in Long-Term Success',
          paragraphs: [
            "We're building political infrastructure that continues long after one election cycle ends.",
          ],
          footer: 'Step 04 · of the mission',
        },
      },
      {
        template: 'cManifesto',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 6',
          heading: 'Every contribution matters.',
          paragraphs: [
            "Whether you give $25 or $1,000, you're helping build stronger campaigns and stronger communities throughout Northwest Oregon.",
          ],
          align: 'left',
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'banner.jpg',
          eyebrow: 'Support',
          heading: 'Support Northwest Oregon PAC',
          sub: 'Every gift, no matter the size, moves the mission forward.',
          items: ['Donate', 'Volunteer', 'Stay Connected'],
          footer: 'northwestoregon.com',
        },
      },
    ],
  },

  // ==============================================================
  // 04 · Could You Be the Next Community Leader? — recruitment
  // ==============================================================
  {
    id: 'carousel-04-next-community-leader',
    tag: 'Candidates',
    title: 'Could You Be the Next Community Leader?',
    caption:
      "If you've ever thought, \"Someone should step up,\" maybe it's time to have a conversation. Running for office starts with listening, not with paperwork.\n\nKnow someone who would make a great local leader? Tag them below.\n\n#NorthwestOregonPAC #RunForOffice #Leadership #CommunityLeadership #NorthwestOregon #Election2026 #ServeYourCommunity #FutureLeaders",
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'community.jpg',
          eyebrow: 'Slide 1 · An invitation',
          brandLine: 'Leadership Series · 2026',
          heading: 'Could You Be the Next Community Leader?',
          washDeep: true,
          emWords: 3,
        },
      },
      {
        template: 'cManifesto',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 2',
          paragraphs: [
            'Many great candidates never planned to run for office.',
            'They simply cared enough about their community to step forward.',
          ],
          align: 'left',
        },
      },
      {
        template: 'cCheckSolid',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 3',
          heading: "You don't need to have all the answers.",
          subhead: 'You need:',
          items: ['Integrity', 'A willingness to listen', 'A desire to serve', 'The commitment to learn'],
        },
      },
      {
        template: 'cCheckOverImage',
        data: {
          photo: 'community.jpg',
          eyebrow: 'Slide 4',
          heading: 'Northwest Oregon needs leaders from every community.',
          items: [
            'Teachers.',
            'Small business owners.',
            'Veterans.',
            'Parents.',
            'Farmers.',
            'Community volunteers.',
          ],
          footer: 'Leadership comes from every walk of life.',
        },
      },
      {
        template: 'cBeliefStatement',
        surface: 's-forest',
        data: {
          photo: 'mark-norman.jpg',
          side: 'right',
          index: '05',
          tag: 'YOU WILL NOT DO IT ALONE',
          eyebrow: 'Slide 5',
          heading: "You won't do it alone.",
          paragraphs: [
            'Northwest Oregon PAC works to connect prospective candidates with guidance, resources, and a network of people who believe our communities deserve strong representation.',
          ],
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'campaign.jpg',
          eyebrow: 'Slide 6',
          heading: 'Ready to explore?',
          sub: "Let's talk.",
          items: ['Start the conversation'],
          footer: 'northwestoregon.com',
        },
      },
    ],
  },

  // ==============================================================
  // 05 · Every Volunteer Makes a Difference — volunteers
  // ==============================================================
  {
    id: 'carousel-05-every-volunteer',
    tag: 'Get involved',
    title: 'Every Volunteer Makes a Difference',
    caption:
      "Whether you can help for one afternoon or one season, there's a place for you.\n\nSend us a message to learn how you can get involved.\n\n#Volunteer #NorthwestOregonPAC #Grassroots #CommunityLeadership #Election2026",
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'event.jpg',
          eyebrow: 'Slide 1 · Show up',
          brandLine: 'Volunteer Series · 2026',
          heading: 'Every Volunteer Makes a Difference',
        },
      },
      {
        template: 'cCheckOverImage',
        data: {
          photo: 'community.jpg',
          eyebrow: 'Slide 2 · There are countless ways to help.',
          items: [
            'Community events',
            'Voter outreach',
            'Phone banking',
            'Door knocking',
            'Photography',
            'Social media',
            'Administrative support',
          ],
          bullet: '•',
        },
      },
      {
        template: 'cDuoSplit',
        surface: 's-light',
        data: {
          photo: 'banner.jpg',
          photoLabel: 'Hours · Momentum',
          orientation: 'vertical',
          eyebrow: 'Slide 3',
          paragraphs: [
            'Even a few hours each month can make a real difference.',
            'Small contributions of time create lasting momentum.',
          ],
          copyTone: 'sand',
        },
      },
      {
        template: 'cManifesto',
        surface: 's-forest',
        data: {
          photo: 'event.jpg',
          eyebrow: 'Slide 4',
          paragraphs: [
            'Every campaign is powered by neighbours helping neighbours.',
            "Not because they're paid.",
            'Because they care.',
          ],
          align: 'center',
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'event.jpg',
          eyebrow: 'Slide 5',
          heading: 'Northwest Oregon needs people willing to show up.',
          sub: 'Join our volunteer network.',
          items: ['Help strengthen your community.'],
          footer: 'northwestoregon.com',
        },
      },
    ],
  },

  // ==============================================================
  // 06 · What We Believe — belief manifesto
  // ==============================================================
  {
    id: 'carousel-06-what-we-believe',
    tag: 'Beliefs',
    title: 'WHAT WE BELIEVE',
    caption:
      "Everything Northwest Oregon PAC does is rooted in one goal: strengthening our region through principled leadership, community involvement, and long-term investment in competitive local elections.\n\nOur mission isn't just about winning campaigns—it's about building stronger communities for years to come.\n\nWhich of these principles resonates with you the most? Tell us in the comments.\n\n#NorthwestOregonPAC #NorthwestOregon",
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'hero.jpg',
          eyebrow: 'Slide 1 · A manifesto',
          brandLine: 'Principles · No. 06',
          heading: 'WHAT WE BELIEVE',
          sub: 'The principles that guide Northwest Oregon PAC.',
          washDeep: true,
        },
      },
      {
        template: 'cBeliefStatement',
        data: {
          photo: 'hero.jpg',
          side: 'left',
          index: '01',
          tag: 'ON COMMUNITY',
          eyebrow: 'Slide 2',
          heading: 'We believe every community deserves a voice.',
          paragraphs: [
            "No town should be overlooked because someone decided it wasn't competitive enough.",
          ],
        },
      },
      {
        template: 'cBeliefStatement',
        data: {
          photo: 'community.jpg',
          side: 'right',
          index: '02',
          tag: 'ON LEADERSHIP',
          eyebrow: 'Slide 3',
          heading: 'We believe local leadership matters.',
          paragraphs: [
            'The people who know a community best are the people who live there, work there, and raise their families there.',
          ],
        },
      },
      {
        template: 'cCheckSolid',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'We believe strong campaigns require strong foundations.',
          items: [
            'Candidates need volunteers.',
            'Volunteers need organization.',
            'Communities need long-term investment.',
          ],
          bullet: '·',
        },
      },
      {
        template: 'cBeliefStatement',
        surface: 's-forest',
        data: {
          photo: 'event.jpg',
          side: 'left',
          index: '04',
          tag: 'YEAR-ROUND WORK',
          eyebrow: 'Slide 5',
          paragraphs: [
            "We believe political engagement shouldn't end after Election Day.",
            'Building stronger communities is year-round work.',
          ],
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'bridge.png',
          eyebrow: 'Slide 6',
          heading: 'Hope. Support. Heard.',
          sub: "Together, we're building a stronger Northwest Oregon.",
          footer: 'northwestoregon.com',
        },
      },
    ],
  },

  // ==============================================================
  // 07 · Why Local Elections Matter — civic thesis
  // ==============================================================
  {
    id: 'carousel-07-why-local',
    tag: 'Beliefs',
    title: 'Why Local Elections Matter',
    caption:
      "The elections that shape our daily lives often receive the least attention. We're working to change that by building stronger local campaigns, supporting principled candidates, and encouraging more people to get involved across Northwest Oregon.\n\nShare this with someone who believes local leadership matters.\n\n#NorthwestOregonPAC #LocalLeadership #CommunityFirst #Election2026",
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'bridge.png',
          eyebrow: 'Slide 1 · A civic thesis',
          brandLine: 'On Local Politics · 2026',
          heading: 'Why Local Elections Matter',
          washDeep: true,
        },
      },
      {
        template: 'cDuoSplit',
        surface: 's-light',
        data: {
          photo: 'oregon-roads.png',
          photoLabel: 'Roads · Schools · Services',
          orientation: 'vertical',
          eyebrow: 'Slide 2',
          heading: 'Local decisions shape everyday life.',
          paragraphs: [
            'From roads and public safety to schools and community growth, local leaders make decisions that directly affect Northwest Oregon families.',
          ],
          copyTone: 'forest',
        },
      },
      {
        template: 'cBeliefStatement',
        data: {
          photo: 'hero.jpg',
          side: 'right',
          index: '02',
          tag: 'ON TIME + STRUCTURE',
          eyebrow: 'Slide 3',
          heading: "Strong local leadership doesn't happen overnight.",
          paragraphs: [
            'It takes prepared candidates, informed voters, engaged volunteers, and organizations committed to building long-term success.',
          ],
        },
      },
      {
        template: 'cManifesto',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: "That's why Northwest Oregon PAC exists.",
          paragraphs: [
            'To recruit leaders, strengthen campaigns, organize volunteers, and help communities become more engaged in the political process.',
          ],
          align: 'left',
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'hero.jpg',
          eyebrow: 'Slide 5',
          heading: 'Better communities begin with local leadership.',
          sub: 'Join Northwest Oregon PAC and help build a stronger future.',
          items: ['northwestoregon.com'],
        },
      },
    ],
  },

  // ==============================================================
  // 08 · Meet Northwest Oregon PAC — investment triptych
  // ==============================================================
  {
    id: 'carousel-08-meet-the-pac',
    tag: 'About',
    title: 'Meet Northwest Oregon PAC',
    caption:
      "Northwest Oregon PAC is focused on one mission: helping our region build stronger candidates, stronger campaigns, and stronger communities. Everything we do is centered on creating lasting opportunities for Northwest Oregon, not just during election season, but every day.\n\n#NorthwestOregonPAC #NorthwestOregon #CommunityLeadership",
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'who-we-are.jpg',
          eyebrow: 'Slide 1 · An introduction',
          brandLine: 'Meet the PAC · 2026',
          heading: 'Meet Northwest Oregon PAC',
          washDeep: true,
        },
      },
      {
        template: 'cBigNum',
        data: {
          num: '1',
          tag: 'WE INVEST IN PEOPLE',
          eyebrow: 'Slide 2 · We invest in people.',
          photo: 'campaign.jpg',
          heading: 'We invest in people.',
          paragraphs: [
            'We identify and support candidates who are committed to serving Northwest Oregon with integrity, accountability, and practical leadership.',
          ],
        },
      },
      {
        template: 'cBigNum',
        surface: 's-sand',
        data: {
          num: '2',
          tag: 'WE INVEST IN COMMUNITIES',
          eyebrow: 'Slide 3 · We invest in communities.',
          photo: 'community.jpg',
          heading: 'We invest in communities.',
          paragraphs: [
            'Our work includes volunteer recruitment, voter outreach, campaign support, and long-term regional organization.',
          ],
        },
      },
      {
        template: 'cBigNum',
        surface: 's-forest',
        data: {
          num: '3',
          tag: 'WE INVEST IN THE FUTURE',
          eyebrow: 'Slide 4 · We invest in the future.',
          photo: 'bridge.png',
          heading: 'We invest in the future.',
          paragraphs: [
            "Our mission extends beyond one election. We're building lasting political infrastructure that benefits Northwest Oregon for years to come.",
          ],
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'who-we-are.jpg',
          eyebrow: 'Slide 5',
          heading: 'Hope. Support. Heard.',
          sub: 'Join the movement and help strengthen Northwest Oregon.',
          footer: 'northwestoregon.com',
        },
      },
    ],
  },

  // ==============================================================
  // 09 · Small Business Drives Northwest Oregon
  // ==============================================================
  {
    id: 'carousel-09-small-business',
    tag: 'Issues',
    title: 'Small Business Drives Northwest Oregon',
    caption:
      "Our communities are stronger when entrepreneurs, family-owned businesses, and local employers have the opportunity to succeed. Supporting economic opportunity means supporting Northwest Oregon's future.\n\n#SupportLocal #NorthwestOregonPAC #SmallBusiness #EconomicOpportunity #NorthwestOregon #CommunityGrowth #ShopLocal",
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'banner.jpg',
          eyebrow: 'Slide 1 · Local economy',
          brandLine: 'Issue Series · No. 09',
          heading: 'Small Business Drives Northwest Oregon',
        },
      },
      {
        template: 'cManifesto',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 2',
          paragraphs: [
            'Behind every local business is someone willing to invest in Northwest Oregon, creating jobs, serving neighbours, and strengthening our local economy.',
          ],
          align: 'left',
        },
      },
      {
        template: 'cBeliefStatement',
        surface: 's-forest',
        data: {
          photo: 'community.jpg',
          side: 'left',
          index: '03',
          tag: 'ON PUBLIC POLICY',
          eyebrow: 'Slide 3',
          paragraphs: [
            'Public policy should encourage entrepreneurship, reduce unnecessary barriers, and create an environment where local businesses can grow with confidence.',
          ],
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'banner.jpg',
          eyebrow: 'Slide 4',
          heading: 'When local businesses thrive, Northwest Oregon thrives.',
          sub: "Let's build an environment where opportunity can grow.",
          footer: 'northwestoregon.com',
        },
      },
    ],
  },

  // ==============================================================
  // 10 · This Movement Belongs to Northwest Oregon
  // ==============================================================
  {
    id: 'carousel-10-this-movement',
    tag: 'Introduction',
    title: 'THIS MOVEMENT BELONGS TO NORTHWEST OREGON.',
    caption:
      "Northwest Oregon PAC isn't built by one person or one campaign. It's built by people who believe our communities deserve a stronger voice, competitive elections, and leaders who are invested in the region's future.\n\nEvery action matters, and there's a place for everyone in this movement.\n\nFollow us, get involved, and help build what's next.\n\n#NorthwestOregonPAC #NorthwestOregon #GetInvolved #Grassroots #Leadership #Election2026 #CommunityFirst #PoliticalAction",
    slides: [
      {
        template: 'cCover',
        data: {
          photo: 'banner.jpg',
          eyebrow: 'Slide 1 · A movement',
          brandLine: 'Northwest Oregon PAC · 2026',
          heading: 'THIS MOVEMENT BELONGS TO NORTHWEST OREGON.',
          washDeep: true,
          emWords: 3,
        },
      },
      {
        template: 'cManifesto',
        surface: 's-forest',
        data: {
          photo: 'community.jpg',
          eyebrow: 'Slide 2',
          paragraphs: [
            "Whether you volunteer, donate, attend events, or simply share our message, you're helping strengthen communities across our region.",
          ],
          align: 'left',
        },
      },
      {
        template: 'cDuoSplit',
        surface: 's-light',
        data: {
          photo: 'event.jpg',
          photoLabel: 'Real change · Real people',
          orientation: 'vertical',
          eyebrow: 'Slide 3',
          paragraphs: [
            'Real change happens when neighbours work together with a shared purpose and a long-term commitment to their communities.',
          ],
          copyTone: 'sand',
        },
      },
      {
        template: 'cClosing',
        data: {
          photo: 'bridge.png',
          eyebrow: 'Slide 4',
          heading: 'Help write the next chapter for Northwest Oregon.',
          items: ['Volunteer', 'Donate', 'Stay Connected', 'Get Involved'],
          footer: 'northwestoregon.com',
        },
      },
    ],
  },
]

// Sentinel for legacy carousels array — replaced above.
const __legacyCarousels = [
  {
    id: 'carousel-01-meet-the-pac',
    tag: 'Introduction',
    title: 'For Northwest Oregon',
    caption:
      'Northwest Oregon PAC was created because too many communities across our region have been overlooked and underinvested in. We believe every voter deserves real choices, every community deserves to be heard, and every credible candidate deserves the opportunity to compete.\n\nWe\'re building a stronger future for Northwest Oregon.\n\n#NorthwestOregonPAC #NorthwestOregon #GrassrootsLeadership #Election2026',
    slides: [
      {
        template: 'cover',
        surface: 's-forest',
        data: {
          photo: 'banner.jpg',
          eyebrow: 'Slide 1',
          heading: 'FOR NORTHWEST OREGON',
          sub: 'Learn why our work matters.',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          heading: 'Northwest Oregon has too often been overlooked.',
          paragraphs: [
            'Communities across our region have been treated as "uncompetitive," leaving voters with fewer resources, less engagement, and fewer opportunities to build lasting political momentum.',
          ],
        },
      },
      {
        template: 'headline',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: 'We believe every community',
          headingLine2: 'deserves investment.',
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: "Elections don't become competitive by accident.",
          subhead: 'It takes:',
          items: [
            'Candidate recruitment',
            'Volunteer networks',
            'Community partnerships',
            'Local fundraising',
            'Long-term commitment',
          ],
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 5',
          paragraphs: [
            'We help build the foundation that allows strong candidates and dedicated volunteers to succeed, not just for one election, but for years to come.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6',
          heading: 'We want a Northwest Oregon where:',
          items: [
            'Communities are heard',
            'Candidates are supported',
            'Elections are competitive',
            'Local voices matter',
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 7',
          heading: 'Join the movement.',
          items: ['Volunteer.', 'Support.', 'DONATE'],
        },
      },
    ],
  },
  {
    id: 'carousel-02-competitive-elections',
    tag: 'Issues',
    title: 'Competitive Elections Build Better Communities',
    caption:
      'Healthy democracy depends on competitive elections. When candidates earn support instead of expecting it, communities benefit through stronger ideas, greater accountability, and more engaged voters.\n\nNorthwest Oregon deserves elections where every community has a voice and every voter has a meaningful choice.\n\n#CompetitiveElections #NorthwestOregonPAC #NorthwestOregon #Election2026',
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Competitive Elections',
          headingLine2: 'Build Better Communities',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2 · When elections are competitive',
          paragraphs: [
            'Candidates spend more time listening to voters instead of taking support for granted.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: 'Competitive races encourage',
          items: [
            'Better conversations',
            'Better ideas',
            'Greater accountability',
            'Higher voter participation',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          paragraphs: [
            'Communities benefit when every candidate has the opportunity to earn support, not when races are decided before campaigns begin.',
          ],
        },
      },
      {
        template: 'headline',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Northwest Oregon deserves real choices.',
          lines: ['Not predetermined outcomes.', 'Not forgotten communities.'],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6 · That requires people willing to',
          items: [
            'Volunteer',
            'Donate',
            'Organize',
            'Vote',
            'Encourage others to participate',
          ],
          bullet: '•',
        },
      },
      {
        template: 'cta',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 7',
          heading: 'Strong elections begin with strong communities.',
          sub: 'Help us strengthen Northwest Oregon.',
          items: ['northwestoregon.com'],
        },
      },
    ],
  },
  {
    id: 'carousel-03-where-donation-goes',
    tag: 'Support',
    title: 'Where Does Your Donation Go?',
    caption:
      'Every contribution to Northwest Oregon PAC helps strengthen the foundation for long-term success. From recruiting candidates and organizing volunteers to supporting voter outreach and campaign communications, your investment stays focused on Northwest Oregon.\n\nTogether, we\'re building lasting political infrastructure that serves our communities, not just during election season, but every year.\n\nMake your contribution today and help strengthen Northwest Oregon.\n\n#DonateLocal #NorthwestOregonPAC #GrassrootsSupport #NorthwestOregon #Election2026 #SupportLocalLeadership',
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Where Does Your Donation Go?',
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 2 · Recruiting Leaders',
          paragraphs: [
            'Finding and encouraging qualified candidates who care deeply about Northwest Oregon and are ready to serve.',
          ],
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 3',
          heading: 'Building Campaigns',
          paragraphs: [
            'Supporting campaign communications, voter outreach, and grassroots organization that help candidates connect with their communities.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'Growing Volunteer Networks',
          paragraphs: [
            'Providing the tools and coordination needed to bring volunteers together for meaningful local action.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Investing in Long-Term Success',
          paragraphs: [
            "We're building political infrastructure that continues long after one election cycle ends.",
          ],
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 6',
          heading: 'Every contribution matters.',
          paragraphs: [
            "Whether you give $25 or $1,000, you're helping build stronger campaigns and stronger communities throughout Northwest Oregon.",
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-forest',
        data: {
          eyebrow: 'Support',
          heading: 'Support Northwest Oregon PAC',
        },
      },
    ],
  },
  {
    id: 'carousel-04-next-community-leader',
    tag: 'Candidates',
    title: 'Could You Be the Next Community Leader?',
    caption:
      "If you've ever thought, \"Someone should step up,\" maybe it's time to have a conversation. Running for office starts with listening, not with paperwork.\n\nKnow someone who would make a great local leader? Tag them below.\n\n#NorthwestOregonPAC #RunForOffice #Leadership #CommunityLeadership #NorthwestOregon #Election2026 #ServeYourCommunity #FutureLeaders",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Could You Be the Next Community Leader?',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          paragraphs: [
            'Many great candidates never planned to run for office.',
            'They simply cared enough about their community to step forward.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: "You don't need to have all the answers.",
          subhead: 'You need:',
          items: ['Integrity', 'A willingness to listen', 'A desire to serve', 'The commitment to learn'],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'Northwest Oregon needs leaders from every community.',
          items: [
            'Teachers.',
            'Small business owners.',
            'Veterans.',
            'Parents.',
            'Farmers.',
            'Community volunteers.',
          ],
          footer: 'Leadership comes from every walk of life.',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 5',
          heading: "You won't do it alone.",
          paragraphs: [
            'Northwest Oregon PAC works to connect prospective candidates with guidance, resources, and a network of people who believe our communities deserve strong representation.',
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6',
          heading: 'Ready to explore?',
          sub: "Let's talk.",
        },
      },
    ],
  },
  {
    id: 'carousel-05-every-volunteer',
    tag: 'Get involved',
    title: 'Every Volunteer Makes a Difference',
    caption:
      "Whether you can help for one afternoon or one season, there's a place for you.\n\nSend us a message to learn how you can get involved.\n\n#Volunteer #NorthwestOregonPAC #Grassroots #CommunityLeadership #Election2026",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Every Volunteer Makes a Difference',
        },
      },
      {
        template: 'checklist',
        data: {
          eyebrow: 'Slide 2 · There are countless ways to help.',
          items: [
            'Community events',
            'Voter outreach',
            'Phone banking',
            'Door knocking',
            'Photography',
            'Social media',
            'Administrative support',
          ],
          bullet: '•',
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          paragraphs: [
            'Even a few hours each month can make a real difference.',
            'Small contributions of time create lasting momentum.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          paragraphs: [
            'Every campaign is powered by neighbours helping neighbours.',
            "Not because they're paid.",
            'Because they care.',
          ],
        },
      },
      {
        template: 'cta',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Northwest Oregon needs people willing to show up.',
          sub: 'Join our volunteer network.',
          items: ['Help strengthen your community.'],
        },
      },
    ],
  },
  {
    id: 'carousel-06-what-we-believe',
    tag: 'Beliefs',
    title: 'WHAT WE BELIEVE',
    caption:
      "Everything Northwest Oregon PAC does is rooted in one goal: strengthening our region through principled leadership, community involvement, and long-term investment in competitive local elections.\n\nOur mission isn't just about winning campaigns—it's about building stronger communities for years to come.\n\nWhich of these principles resonates with you the most? Tell us in the comments.\n\n#NorthwestOregonPAC #NorthwestOregon",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'WHAT WE BELIEVE',
          sub: 'The principles that guide Northwest Oregon PAC.',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          heading: 'We believe every community deserves a voice.',
          paragraphs: [
            "No town should be overlooked because someone decided it wasn't competitive enough.",
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: 'We believe local leadership matters.',
          paragraphs: [
            'The people who know a community best are the people who live there, work there, and raise their families there.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'We believe strong campaigns require strong foundations.',
          items: [
            'Candidates need volunteers.',
            'Volunteers need organization.',
            'Communities need long-term investment.',
          ],
          bullet: '·',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 5',
          paragraphs: [
            "We believe political engagement shouldn't end after Election Day.",
            'Building stronger communities is year-round work.',
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6',
          heading: 'Hope. Support. Heard.',
          sub: "Together, we're building a stronger Northwest Oregon.",
        },
      },
    ],
  },
  {
    id: 'carousel-07-why-local',
    tag: 'Beliefs',
    title: 'Why Local Elections Matter',
    caption:
      "The elections that shape our daily lives often receive the least attention. We're working to change that by building stronger local campaigns, supporting principled candidates, and encouraging more people to get involved across Northwest Oregon.\n\nShare this with someone who believes local leadership matters.\n\n#NorthwestOregonPAC #LocalLeadership #CommunityFirst #Election2026",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Why Local Elections Matter',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          heading: 'Local decisions shape everyday life.',
          paragraphs: [
            'From roads and public safety to schools and community growth, local leaders make decisions that directly affect Northwest Oregon families.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: "Strong local leadership doesn't happen overnight.",
          paragraphs: [
            'It takes prepared candidates, informed voters, engaged volunteers, and organizations committed to building long-term success.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: "That's why Northwest Oregon PAC exists.",
          paragraphs: [
            'To recruit leaders, strengthen campaigns, organize volunteers, and help communities become more engaged in the political process.',
          ],
        },
      },
      {
        template: 'cta',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Better communities begin with local leadership.',
          sub: 'Join Northwest Oregon PAC and help build a stronger future.',
          items: ['northwestoregon.com'],
        },
      },
    ],
  },
  {
    id: 'carousel-08-meet-the-pac',
    tag: 'About',
    title: 'Meet Northwest Oregon PAC',
    caption:
      "Northwest Oregon PAC is focused on one mission: helping our region build stronger candidates, stronger campaigns, and stronger communities. Everything we do is centered on creating lasting opportunities for Northwest Oregon, not just during election season, but every day.\n\n#NorthwestOregonPAC #NorthwestOregon #CommunityLeadership",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Meet Northwest Oregon PAC',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2 · We invest in people.',
          paragraphs: [
            'We identify and support candidates who are committed to serving Northwest Oregon with integrity, accountability, and practical leadership.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3 · We invest in communities.',
          paragraphs: [
            'Our work includes volunteer recruitment, voter outreach, campaign support, and long-term regional organization.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4 · We invest in the future.',
          paragraphs: [
            "Our mission extends beyond one election. We're building lasting political infrastructure that benefits Northwest Oregon for years to come.",
          ],
        },
      },
      {
        template: 'cta',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Hope. Support. Heard.',
          sub: 'Join the movement and help strengthen Northwest Oregon.',
        },
      },
    ],
  },
  {
    id: 'carousel-09-small-business',
    tag: 'Issues',
    title: 'Small Business Drives Northwest Oregon',
    caption:
      "Our communities are stronger when entrepreneurs, family-owned businesses, and local employers have the opportunity to succeed. Supporting economic opportunity means supporting Northwest Oregon's future.\n\n#SupportLocal #NorthwestOregonPAC #SmallBusiness #EconomicOpportunity #NorthwestOregon #CommunityGrowth #ShopLocal",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Small Business Drives Northwest Oregon',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          paragraphs: [
            'Behind every local business is someone willing to invest in Northwest Oregon, creating jobs, serving neighbours, and strengthening our local economy.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          paragraphs: [
            'Public policy should encourage entrepreneurship, reduce unnecessary barriers, and create an environment where local businesses can grow with confidence.',
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'When local businesses thrive, Northwest Oregon thrives.',
          sub: "Let's build an environment where opportunity can grow.",
        },
      },
    ],
  },
  {
    id: 'carousel-10-this-movement',
    tag: 'Introduction',
    title: 'THIS MOVEMENT BELONGS TO NORTHWEST OREGON.',
    caption:
      "Northwest Oregon PAC isn't built by one person or one campaign. It's built by people who believe our communities deserve a stronger voice, competitive elections, and leaders who are invested in the region's future.\n\nEvery action matters, and there's a place for everyone in this movement.\n\nFollow us, get involved, and help build what's next.\n\n#NorthwestOregonPAC #NorthwestOregon #GetInvolved #Grassroots #Leadership #Election2026 #CommunityFirst #PoliticalAction",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'THIS MOVEMENT BELONGS TO NORTHWEST OREGON.',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          paragraphs: [
            "Whether you volunteer, donate, attend events, or simply share our message, you're helping strengthen communities across our region.",
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          paragraphs: [
            'Real change happens when neighbours work together with a shared purpose and a long-term commitment to their communities.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'Help write the next chapter for Northwest Oregon.',
          items: ['Volunteer', 'Donate', 'Stay Connected', 'Get Involved'],
          footer: 'northwestoregon.com',
        },
      },
    ],
  },
]

// App-card captions come from the PDF "Caption" column directly on each
// post above — the generator reads them off `post.caption`.
export const feedCaptions = Object.fromEntries(
  feed.filter((p) => p.caption).map((p) => [p.id, p.caption]),
)
