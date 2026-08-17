import type {
  Thought, Reflection, Observation, Principle,
} from "@/types";

// ---------------------------------------------------------------------------
// Seed content — mirrors supabase/seed.sql. Used as a graceful fallback when
// no Supabase credentials are configured, so the site works on first deploy.
// The writing is intentionally introspective, not motivational filler.
// ---------------------------------------------------------------------------

export const THOUGHTS: Thought[] = [
  {
    slug: "ilmu-itu-mahal", title: "Ilmu Itu Mahal", category: "Growth",
    mood: "Reflective", date: "2026-08-14", featured: true,
    tags: ["knowledge", "value", "patience"], views: 412,
    body: [
      "Ilmu tidak selalu dibayar dengan uang.",
      "Kadang dengan waktu.\nKadang dengan pengalaman.\nKadang dengan kegagalan.",
      "Dan kadang dengan menjadi seseorang\nyang cukup bernilai sehingga orang lain\nbersedia membagikan sesuatu yang bernilai\nkepadamu.",
    ],
    evolution: [
      { year: "2024", text: "Ilmu itu tentang seberapa banyak yang kamu tahu." },
      { year: "2026", text: "Ilmu itu tentang seberapa mahal harga yang kamu bayar untuk paham.", now: true },
    ],
  },
  {
    slug: "outgrowing-people", title: "On Outgrowing People", category: "Relationships",
    mood: "Nostalgic", date: "2026-08-09", featured: false,
    tags: ["people", "growth", "letting go"], views: 288,
    body: [
      "Sometimes we don't outgrow people.",
      "We simply outgrow the version of ourselves that needed them.",
    ],
  },
  {
    slug: "cost-of-silence", title: "The Cost of Silence", category: "Self",
    mood: "Bitter", date: "2026-08-06", featured: false,
    tags: ["boundaries", "voice"], views: 174,
    body: [
      "Staying quiet felt like peace for years.",
      "Then I realised it was just the interest I kept paying on words I never said.",
    ],
  },
  {
    slug: "discipline-over-motivation", title: "Discipline Over Motivation", category: "Discipline",
    mood: "Rational", date: "2026-07-28", featured: false,
    tags: ["discipline", "habits"], views: 356,
    body: [
      "Motivation asks how you feel.",
      "Discipline never asks. It just shows up and does the work\nwhile motivation is still deciding.",
    ],
  },
  {
    slug: "time-is-the-real-currency", title: "Time Is the Real Currency", category: "Time",
    mood: "Reflective", date: "2026-07-19", featured: false,
    tags: ["time", "money", "freedom"], views: 301,
    body: [
      "Money can be recovered.",
      "Time cannot.",
      "We just find it easier to protect the thing we can replace.",
    ],
    evolution: [
      { year: "2025", text: "I thought success was about money." },
      { year: "2026", text: "Money is useful when it buys freedom." },
      { year: "2028", text: "Success was never about money. It was about control over my time.", now: true },
    ],
  },
  {
    slug: "ambition-in-silence", title: "Ambition Grows in Silence", category: "Ambition",
    mood: "Restless", date: "2026-07-11", featured: false,
    tags: ["ambition", "work"], views: 229,
    body: [
      "The loudest ambitions rarely finish anything.",
      "Real ambition is quiet. It works when no one is watching,\nand it never asks for an audience to keep going.",
    ],
  },
  {
    slug: "failure-is-tuition", title: "Failure Is Tuition", category: "Failure",
    mood: "Hopeful", date: "2026-06-30", featured: false,
    tags: ["failure", "learning"], views: 198,
    body: [
      "Failure feels like loss because we count what it took.",
      "We forget it is tuition — and the lesson is only wasted\nif you refuse to attend the class.",
    ],
  },
  {
    slug: "who-you-become", title: "You Are the Sum of Your Repetitions", category: "Self",
    mood: "Rational", date: "2026-06-22", featured: false,
    tags: ["habits", "identity"], views: 167,
    body: [
      "You are not who you say you are.",
      "You are what you repeat when no decision is required.",
    ],
  },
  {
    slug: "loneliness-and-solitude", title: "Loneliness and Solitude", category: "Life",
    mood: "Calm", date: "2026-06-14", featured: false,
    tags: ["solitude", "peace"], views: 143,
    body: [
      "Loneliness is the absence of others.",
      "Solitude is the presence of yourself.",
      "Same room. Completely different tenant.",
    ],
  },
  {
    slug: "comparison-tax", title: "The Comparison Tax", category: "People",
    mood: "Cynical", date: "2026-06-03", featured: false,
    tags: ["comparison", "envy"], views: 255,
    body: [
      "Comparison is the tax you pay for living inside\nsomeone else's highlight reel.",
      "Nobody sends you the invoice. You just quietly become poorer.",
    ],
  },
];

export const REFLECTIONS: Reflection[] = [
  {
    slug: "why-failure-feels-expensive", title: "Why Failure Feels Expensive",
    subtitle: "On the difference between price and value", category: "Failure",
    mood: "Reflective", date: "2026-08-11", readingTime: "6 min",
    tags: ["failure", "psychology", "growth"],
    body: [
      { type: "lead", text: "We treat failure like a bill that arrives at the worst possible time. But the discomfort we feel isn't really about the failure itself — it's about how we account for it." },
      { type: "p", text: "When something fails, we instinctively count the visible costs: the money, the months, the reputation. What we rarely count is the return. Every failure quietly deposits something into an account we don't check — judgment, resilience, a sharper instinct for what not to do again." },
      { type: "h", text: "The accounting error" },
      { type: "p", text: "Most people record failure as pure expense. The mind is loss-averse; it weighs what it lost roughly twice as heavily as what it gained. So a failure that taught you three lessons still feels like debt, because the ledger only shows the withdrawal." },
      { type: "quote", text: "You don't outgrow failure by avoiding it. You outgrow it by learning to read the full statement." },
      { type: "p", text: "The people who seem unbothered by failure aren't braver. They've simply repriced it. They know the tuition is non-refundable, so they make sure they actually attend the class." },
      { type: "p", text: "That reframe changes everything downstream. If failure is tuition, then avoiding it isn't safety — it's dropping out. And nobody grows by dropping out." },
    ],
  },
  {
    slug: "the-quiet-architecture-of-discipline", title: "The Quiet Architecture of Discipline",
    subtitle: "Why systems outlast willpower", category: "Discipline",
    mood: "Rational", date: "2026-07-25", readingTime: "7 min",
    tags: ["discipline", "systems", "habits"],
    body: [
      { type: "lead", text: "Willpower is a bad building material. It's strong on the day you pour it and brittle by the end of the week." },
      { type: "p", text: "We keep trying to build lives out of motivation — a substance that evaporates the moment conditions get hard. Then we blame ourselves when the structure collapses, as if the failure were moral rather than architectural." },
      { type: "h", text: "Design, don't decide" },
      { type: "p", text: "Discipline isn't a personality trait. It's a design decision. When you reduce the number of choices a task requires, you stop relying on the version of you that has to feel like it. The system carries the weight the mood cannot." },
      { type: "quote", text: "Motivation is the spark. Discipline is the wiring. You only notice the wiring when the lights stay on without you thinking about it." },
      { type: "p", text: "The most disciplined people I know are not the most driven. They are the best architects. They've quietly removed the friction, the temptation, and the debate — so that doing the right thing requires almost no decision at all." },
    ],
  },
  {
    slug: "money-and-the-illusion-of-arrival", title: "Money and the Illusion of Arrival",
    subtitle: "On the number that keeps moving", category: "Money",
    mood: "Cynical", date: "2026-07-08", readingTime: "5 min",
    tags: ["money", "freedom", "desire"],
    body: [
      { type: "lead", text: "There is always a number. And the number always moves the moment you reach it." },
      { type: "p", text: "We tell ourselves that a certain amount will finally feel like enough. But 'enough' is not a number — it's a relationship with wanting. And no bank balance has ever changed a relationship." },
      { type: "quote", text: "Money is useful when it buys freedom, and dangerous when it buys a new definition of 'not yet'." },
      { type: "p", text: "The trap isn't wealth. It's the quiet promise that arrival is one milestone away. Chase the number and you'll always be one step behind yourself. Define enough first, and money finally starts working for you instead of against you." },
    ],
  },
  {
    slug: "becoming-is-not-a-destination", title: "Becoming Is Not a Destination",
    subtitle: "On living as a draft", category: "Growth",
    mood: "Hopeful", date: "2026-06-26", readingTime: "5 min",
    tags: ["growth", "identity", "change"],
    body: [
      { type: "lead", text: "I used to think there was a finished version of me waiting somewhere ahead. I've stopped believing in him." },
      { type: "p", text: "The self isn't a statue we're carving toward. It's a draft we keep rewriting. Every strong opinion I've held eventually got edited by someone I hadn't become yet." },
      { type: "quote", text: "I am not documenting what I know. I am documenting what I am becoming." },
      { type: "p", text: "This archive contradicts itself on purpose. An old thought challenged by a newer one isn't a mistake — it's evidence that the mind is still moving. The day it stops contradicting itself is the day it stops growing." },
    ],
  },
  {
    slug: "the-people-we-let-go", title: "The People We Let Go",
    subtitle: "On endings that aren't betrayals", category: "Relationships",
    mood: "Nostalgic", date: "2026-06-09", readingTime: "6 min",
    tags: ["relationships", "distance", "seasons"],
    body: [
      { type: "lead", text: "Not every relationship that ends was a mistake. Some people are chapters, not the whole book." },
      { type: "p", text: "We're taught that loyalty means permanence — that letting someone drift away is a small failure of the heart. But some bonds are built for a season, and forcing them past their season is its own kind of dishonesty." },
      { type: "quote", text: "We don't outgrow people. We outgrow the version of ourselves that needed them." },
      { type: "p", text: "You can be grateful for who someone was to you and still admit you've both changed. Holding on isn't love when it becomes a museum. Sometimes the most respectful thing is to let the chapter close cleanly." },
    ],
  },
];

export const OBSERVATIONS: Observation[] = [
  { slug: "obs-people-masks", category: "People", mood: "Cynical", date: "2026-08-02", text: "People rarely tell you who they are. They tell you who they want you to think they are — and then get quietly offended when you believe them." },
  { slug: "obs-money-seen", category: "Money", mood: "Rational", date: "2026-07-24", text: "Most people don't want to be rich. They want to be seen as rich. The two goals require completely different lives." },
  { slug: "obs-work-meetings", category: "Work", mood: "Reflective", date: "2026-07-16", text: "The hardest part of any job is rarely the work. It's the meetings about the work, the politics around the work, and the pretending that the work matters more than it does." },
  { slug: "obs-ambition-anxiety", category: "Ambition", mood: "Restless", date: "2026-07-05", text: "Ambition without patience becomes anxiety. It's the same fuel — one just forgot that engines need to cool." },
  { slug: "obs-society-attention", category: "Society", mood: "Dark", date: "2026-06-28", text: "A society optimised for attention will slowly forget how to reward things that take a long time to be good." },
  { slug: "obs-tech-time", category: "Technology", mood: "Uncertain", date: "2026-06-20", text: "Every tool promises to save you time and then quietly invents new ways to spend it. The clock never actually stops." },
  { slug: "obs-relationships-absence", category: "Relationships", mood: "Nostalgic", date: "2026-06-12", text: "You can tell how someone truly feels about you by how they speak about you when you add nothing to the conversation." },
  { slug: "obs-self-hidden", category: "Self", mood: "Bitter", date: "2026-06-04", text: "The version of yourself you're most afraid to show people is usually the only one they'd actually respect." },
];

export const PRINCIPLES: Principle[] = [
  { number: 1, slug: "permanent-decisions", title: "Permanent decisions, temporary emotions", statement: "Never let temporary emotions make permanent decisions.", category: "Self", date: "2026-05-02", tags: ["emotion", "decisions"], explanation: "The feeling that demands an immediate, irreversible choice is almost always the feeling you should distrust the most. Give it 24 hours; most storms are gone by morning." },
  { number: 2, slug: "protect-the-mornings", title: "Protect the mornings", statement: "Guard the first hour of your day like it decides the other twenty-three.", category: "Discipline", date: "2026-05-10", tags: ["habits", "time"], explanation: "How you begin sets the tone you'll spend the rest of the day either riding or fighting." },
  { number: 3, slug: "value-follows-scarcity", title: "Value follows scarcity", statement: "Become rare before you ask to be valued.", category: "Career", date: "2026-05-18", tags: ["value", "work"], explanation: "The market pays for what is hard to replace, not for what is hard to do." },
  { number: 4, slug: "quiet-ambition", title: "Quiet ambition", statement: "Let the work be loud so you don't have to be.", category: "Ambition", date: "2026-05-27", tags: ["ambition", "ego"], explanation: "Announcing a goal spends the same dopamine you'd get from achieving it. Stay quiet and stay hungry." },
  { number: 5, slug: "distance-is-data", title: "Distance is data", statement: "When someone shows you distance, believe it before you explain it away.", category: "Relationships", date: "2026-06-05", tags: ["people", "boundaries"], explanation: "We invent generous excuses for people who've already made their answer clear through absence." },
  { number: 6, slug: "time-before-money", title: "Time before money", statement: "Never trade time for money at a rate your future self would refuse.", category: "Time", date: "2026-06-14", tags: ["time", "money"], explanation: "Every hour sold cheap is an hour you can't buy back at any price." },
  { number: 7, slug: "compound-the-boring", title: "Compound the boring", statement: "Do the boring thing repeatedly; the boring thing compounds.", category: "Growth", date: "2026-06-23", tags: ["consistency", "growth"], explanation: "Excitement is a bad predictor of results. Boredom, endured on purpose, is a good one." },
  { number: 8, slug: "own-the-failure-fast", title: "Own the failure fast", statement: "Take responsibility before you're forced to. It's cheaper that way.", category: "Failure", date: "2026-07-02", tags: ["failure", "integrity"], explanation: "A fault admitted early is a lesson. A fault exposed late is a scandal." },
  { number: 9, slug: "edit-your-inputs", title: "Edit your inputs", statement: "You cannot think clearly on a diet of other people's noise.", category: "Self", date: "2026-07-11", tags: ["focus", "attention"], explanation: "Curate what enters your mind as carefully as you'd curate what enters your body." },
  { number: 10, slug: "stay-a-draft", title: "Stay a draft", statement: "Hold your beliefs firmly enough to act, loosely enough to grow.", category: "Philosophy", date: "2026-07-20", tags: ["growth", "humility"], explanation: "The goal isn't to be right forever. It's to be less wrong than you were last year." },
];
