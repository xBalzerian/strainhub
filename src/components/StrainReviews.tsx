"use client";

import { useState } from "react";

interface Review {
  id: string;
  author: string;
  avatar: string;
  avatarInitials: string;
  age: string;
  location: string;
  joinYear: number;
  reviewCount: number;
  verified: boolean;
  rating: number;
  date: string;
  title: string;
  body: string;
  effect_tags: string[];
  helpful: number;
  type: "recreational" | "medical" | "grow";
}

// ── Multiple independent hash functions so each profile field varies independently ──
function hash1(n: number): number {
  let h = n ^ 0xdeadbeef;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  return Math.abs(h ^ (h >>> 16));
}
function hash2(n: number): number {
  let h = n ^ 0x12345678;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h = Math.imul(h ^ (h >>> 15), 0x27d4eb2f);
  return Math.abs(h ^ (h >>> 16));
}
function hash3(n: number): number {
  let h = n ^ 0xabcdef01;
  h = Math.imul(h ^ (h >>> 11), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return Math.abs(h ^ (h >>> 16));
}
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
  }
  return Math.abs(h >>> 0);
}

// Large diverse name pool — 40 first names, varied backgrounds
const FIRST_NAMES = [
  "Jake", "Maria", "Darnell", "Sophie", "Carlos", "Priya", "Tyler", "Keisha",
  "Liam", "Ximena", "Owen", "Fatima", "Elijah", "Nora", "Jordan", "Aaliya",
  "Marcus", "Hazel", "Devon", "Rosa", "Brandon", "Chloe", "Isaiah", "Tanya",
  "Ryan", "Amara", "Sean", "Luna", "Kevin", "Jade", "Austin", "Simone",
  "Noah", "Brianna", "Caleb", "Yara", "Ethan", "Mila", "Zack", "Destiny",
  "Cole", "Naomi", "Alex", "Samira", "Drew", "Leah", "Finn", "Amani",
  "Reed", "Dahlia",
];

// 26 last initials spread across alphabet
const LAST_INITIALS = "ABCDEFGHJKLMNPQRSTVWXYZ";

const LOCATIONS = [
  "Colorado", "California", "Oregon", "Washington", "Michigan",
  "Nevada", "Arizona", "New Mexico", "Maine", "Vermont",
  "British Columbia", "Ontario", "Massachusetts", "Illinois", "Florida",
  "Montana", "New York", "Texas", "Alaska", "Hawaii",
  "Amsterdam", "Barcelona", "Toronto", "Vancouver", "Denver",
];

const AVATAR_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
  "#82E0AA", "#F1948A", "#AED6F1", "#A9DFBF", "#FAD7A0",
  "#D2B4DE", "#A3E4D7", "#F9E79F", "#ABEBC6", "#F0B27A",
  "#C39BD3", "#76D7C4", "#F8C471", "#7FB3D3", "#A9CCE3",
];

const AGE_RANGES = ["21–25", "26–30", "31–35", "36–42", "43–50", "50+"];

const REVIEW_TEMPLATES = [
  {
    type: "recreational" as const,
    titles: [
      "Perfect evening strain",
      "Exactly what I needed",
      "My new go-to",
      "Blew me away honestly",
      "Lives up to the hype",
      "Surprised me big time",
      "Smooth and balanced",
      "Great for the weekend",
      "Don't sleep on this one",
      "Better than expected",
    ],
    bodies: [
      "Picked this up last weekend and was blown away right away. The effects came on smooth and lasted a solid 2–3 hours. Really great for unwinding after a long stressful week.",
      "Super smooth smoke with a really pleasant flavor. Got exactly the effects the description promised — very relaxing without being too heavy. Will definitely grab again.",
      "Been searching for something like this for a while. The high is balanced and creative without making me anxious. Nice one. Buying again for sure.",
      "Tried this at a friend's place first and immediately went and grabbed my own. The terpene profile really shines through — smells incredible and tastes just like it.",
      "Didn't expect much given the price point but this one genuinely surprised me. Solid effects, good duration, the flavor is distinct and really pleasant.",
      "Three sessions in and I'm a convert. First hit you feel the body relax, then the head clears out nicely. Not too heavy, not too light — right in the sweet spot.",
      "Shared this with a few friends on a camping trip and everyone loved it. Social, uplifting, zero anxiety. This is the kind of strain you keep coming back to.",
      "Used to be a sativa-only person but this changed my mind. The balance here is genuinely impressive — energetic enough to stay active but relaxing when you sit down.",
      "Flavor is something else — really distinct and hits clean every time. Effects are consistent too. Not a one-hit wonder, it delivers every session.",
      "Grabbed this on a recommendation and I get it now. Doesn't knock you out, doesn't wire you up — just settles you right into a good headspace.",
    ],
  },
  {
    type: "medical" as const,
    titles: [
      "Helps a lot with my anxiety",
      "Real pain relief, no joke",
      "Finally getting good sleep",
      "Works better than expected",
      "Recommend for chronic pain",
      "Helps me get through the day",
      "Better than anything else I've tried",
      "My go-to for stress",
    ],
    bodies: [
      "Been using cannabis medicinally for a few years and this is one of the better ones I've tried for managing my chronic back pain. Takes the edge off without knocking me out.",
      "Suffer from anxiety and this really helps me calm down in the evenings without the paranoia that some high-THC strains give me. Very manageable and consistent.",
      "Insomnia has been rough for me lately. Started using a small amount before bed and it's made a real difference — I'm actually getting through the night now.",
      "After trying a dozen different strains for stress relief, this one has become my go-to. Body relaxation is real and it doesn't fog my brain during the day.",
      "Works well for appetite issues — I deal with nausea from medication and this genuinely helps me eat a normal meal. Grateful I found it.",
      "Has been a game changer for my migraines. I can feel the tension release within about 20 minutes. Not a cure but gives me functional relief when I really need it.",
      "I have fibromyalgia and the full-body relaxation from this is something I haven't found elsewhere. Doesn't eliminate pain but brings it to a manageable level.",
      "PTSD nights have been rough. This helps quiet the noise and actually lets me rest. Wouldn't say it fixes anything but it genuinely helps me cope.",
    ],
  },
  {
    type: "grow" as const,
    titles: [
      "Easy first grow, great result",
      "Great yield for the effort",
      "Grew it outdoors — loved it",
      "Perfect for beginners",
      "Just harvested, super happy",
      "Dense buds, strong genetics",
      "Third run with this strain",
      "Consistent performer",
    ],
    bodies: [
      "First time growing and this was a great choice. Very forgiving if you make small mistakes and the plants stayed healthy throughout. Decent yield for a beginner setup.",
      "Grew 4 plants outdoors this past season. They got big fast and the buds were dense and fragrant. Trimming was tedious but the end product made it worth it.",
      "Really sturdy genetics — withstood a couple temperature swings without major issues. Flowering stage was pretty textbook. Very happy with the harvest quality.",
      "Followed a basic grow guide and ended up with a solid first harvest. Doesn't demand much attention which is perfect for people still learning the basics.",
      "Second run with this strain. First time was a learning experience — this time I dialed in the nutrients and the difference was massive. Highly recommend.",
      "Grew this in a 4x4 tent under LED. Stretched more than expected but structure was solid and trichome development was beautiful. Dense frosty buds at the end.",
      "This strain handled a pH issue mid-grow better than anything else I've grown. Recovered quickly and the final product was still excellent. Strong genetics.",
      "Outdoor run in full sun. She got massive — had to stake the main branches. The cure took 3 weeks and the smell is absolutely incredible. Worth every minute.",
    ],
  },
];

const EFFECT_TAG_OPTIONS = [
  "Relaxing", "Euphoric", "Creative", "Sleepy", "Happy",
  "Pain Relief", "Stress Relief", "Anxiety Relief", "Appetite", "Focus",
  "Body High", "Head High", "Giggly", "Talkative", "Couch-lock",
];

// Generate a date string between Jan 2024 and today (March 2026)
function generateDate(seed: number): string {
  // Range: Jan 1 2024 → Mar 13 2026 = ~807 days
  const start = new Date("2024-01-01").getTime();
  const end = new Date("2026-03-13").getTime();
  const range = end - start;
  const offset = (seed % 100000) / 100000; // 0..1
  const ts = start + Math.floor(offset * range);
  return new Date(ts).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function generateReviews(strainSlug: string): Review[] {
  const baseSeed = hashStr(strainSlug);
  const count = 6 + (baseSeed % 4); // 6–9 reviews
  const reviews: Review[] = [];

  // Track used names to guarantee uniqueness
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    // Use completely independent seeds per reviewer per field
    // Each field gets a different hash function AND a different salt
    const seedBase = baseSeed + i * 999983; // large prime offset per reviewer

    const s1 = hash1(seedBase);
    const s2 = hash2(seedBase + 1111);
    const s3 = hash3(seedBase + 2222);
    const s4 = hash1(seedBase + 3333);
    const s5 = hash2(seedBase + 4444);
    const s6 = hash3(seedBase + 5555);
    const s7 = hash1(seedBase + 6666);
    const s8 = hash2(seedBase + 7777);
    const s9 = hash3(seedBase + 8888);
    const s10 = hash1(seedBase + 9999);

    // Name — ensure uniqueness by trying next index if collision
    let firstName = "";
    let lastInitial = "";
    let nameAttempt = 0;
    do {
      const ns = hash1(seedBase + nameAttempt * 77777);
      firstName = FIRST_NAMES[ns % FIRST_NAMES.length];
      lastInitial = LAST_INITIALS[hash2(seedBase + nameAttempt * 33333) % LAST_INITIALS.length];
      nameAttempt++;
    } while (usedNames.has(`${firstName} ${lastInitial}`) && nameAttempt < 50);
    usedNames.add(`${firstName} ${lastInitial}`);

    const author = `${firstName} ${lastInitial}.`;
    const avatarInitials = `${firstName[0]}${lastInitial}`;
    const avatarColor = AVATAR_COLORS[s2 % AVATAR_COLORS.length];
    const location = LOCATIONS[s3 % LOCATIONS.length];
    const age = AGE_RANGES[s4 % AGE_RANGES.length];
    const joinYear = 2017 + (s5 % 8); // 2017–2024
    const reviewCount = 2 + (s6 % 64); // 2–65 reviews
    const verified = (s7 % 5) !== 0;

    const ratingSeed = s8 % 10;
    const rating = ratingSeed < 1 ? 2 : ratingSeed < 2 ? 3 : ratingSeed < 5 ? 4 : 5;

    const dateStr = generateDate(s9);

    const template = REVIEW_TEMPLATES[s10 % 3];
    const titleIdx = hash1(seedBase + 11111) % template.titles.length;
    const bodyIdx = hash2(seedBase + 22222) % template.bodies.length;

    const numTags = 2 + (hash3(seedBase + 33333) % 2);
    const tags: string[] = [];
    for (let t = 0; t < numTags; t++) {
      const tag = EFFECT_TAG_OPTIONS[hash1(seedBase + 44444 + t * 55555) % EFFECT_TAG_OPTIONS.length];
      if (!tags.includes(tag)) tags.push(tag);
    }

    const helpful = hash2(seedBase + 66666) % 48;

    reviews.push({
      id: `${strainSlug}-${i}`,
      author,
      avatar: avatarColor,
      avatarInitials,
      age,
      location,
      joinYear,
      reviewCount,
      verified,
      rating,
      date: dateStr,
      title: template.titles[titleIdx],
      body: template.bodies[bodyIdx],
      effect_tags: tags,
      helpful,
      type: template.type,
    });
  }

  return reviews.sort((a, b) => b.helpful - a.helpful);
}

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "text-xl" : "text-sm";
  return (
    <span className={`inline-flex gap-px ${sz}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-yellow-400" : "text-gray-200"}>★</span>
      ))}
    </span>
  );
}

function StarInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="text-3xl transition-transform hover:scale-110"
        >
          <span className={(hovered || value) >= s ? "text-yellow-400" : "text-gray-200"}>★</span>
        </button>
      ))}
    </div>
  );
}

const TYPE_COLORS: Record<string, string> = {
  recreational: "bg-lime-pale border-lime-dark text-brand",
  medical: "bg-blue-50 border-blue-200 text-blue-700",
  grow: "bg-orange-50 border-orange-200 text-orange-700",
};
const TYPE_LABELS: Record<string, string> = {
  recreational: "🌿 Recreational",
  medical: "💊 Medical",
  grow: "🪴 Grow",
};
const RATING_BAR_COLOR = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-lime", "bg-lime"];

function ReviewerAvatar({ review, size = "md" }: { review: Review; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  return (
    <div
      className={`${sz} rounded-full border-2 border-black flex items-center justify-center font-black flex-shrink-0 shadow-brutal-sm`}
      style={{ backgroundColor: review.avatar }}
    >
      {review.avatarInitials}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal-sm">
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3 mb-3">
          <ReviewerAvatar review={review} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-sm">{review.author}</span>
              {review.verified && (
                <span className="text-[9px] font-black bg-green-100 text-green-700 border border-green-300 px-1.5 py-0.5 rounded-full">
                  ✓ Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="text-[10px] text-gray-400">📍 {review.location}</span>
              <span className="text-gray-200">·</span>
              <span className="text-[10px] text-gray-400">{review.reviewCount} reviews</span>
              <span className="text-gray-200">·</span>
              <span className="text-[10px] text-gray-400">Since {review.joinYear}</span>
            </div>
          </div>
          <span className={`flex-shrink-0 text-[9px] font-bold px-2 py-1 rounded-lg border ${TYPE_COLORS[review.type]}`}>
            {TYPE_LABELS[review.type]}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <StarDisplay rating={review.rating} />
            <span className="text-xs font-black text-gray-700">{review.rating}.0</span>
          </div>
          <span className="text-[10px] text-gray-400">{review.date}</span>
        </div>

        <p className="font-black text-sm mb-1.5 leading-snug">"{review.title}"</p>
        <p className="text-xs text-gray-600 leading-relaxed">{review.body}</p>
      </div>

      {review.effect_tags.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {review.effect_tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="px-4 py-2.5 bg-gray-50 border-t-2 border-black flex items-center justify-between">
        <span className="text-[10px] text-gray-400">Helpful?</span>
        <button
          onClick={() => { if (!voted) { setHelpful(h => h + 1); setVoted(true); } }}
          className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-lg border-2 transition-all ${
            voted
              ? "bg-lime border-black text-brand"
              : "bg-white border-gray-200 text-gray-500 hover:border-black hover:bg-lime-pale"
          }`}
        >
          👍 {helpful}
        </button>
      </div>
    </div>
  );
}

export function ReviewSummary({ strainSlug, strainName }: { strainSlug: string; strainName: string }) {
  const reviews = generateReviews(strainSlug);
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  return (
    <div className="flex items-center gap-3">
      <span className="text-4xl font-black">{(Math.round(avg * 10) / 10).toFixed(1)}</span>
      <div>
        <StarDisplay rating={Math.round(avg)} size="lg" />
        <div className="text-xs text-gray-400 font-semibold mt-0.5">{reviews.length} reviews</div>
      </div>
    </div>
  );
}

export default function StrainReviews({ strainSlug, strainName }: { strainSlug: string; strainName: string }) {
  const allReviews = generateReviews(strainSlug);
  const avg = allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length;
  const avgRounded = Math.round(avg * 10) / 10;

  const [filter, setFilter] = useState<"all" | "recreational" | "medical" | "grow">("all");
  const [sortBy, setSortBy] = useState<"helpful" | "newest" | "highest" | "lowest">("helpful");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formRating, setFormRating] = useState(0);
  const [formType, setFormType] = useState<"recreational" | "medical" | "grow">("recreational");
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formName, setFormName] = useState("");
  const [formTags, setFormTags] = useState<string[]>([]);

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allReviews.filter((r) => r.rating === star).length,
    pct: Math.round((allReviews.filter((r) => r.rating === star).length / allReviews.length) * 100),
  }));

  let reviews = filter === "all" ? allReviews : allReviews.filter((r) => r.type === filter);
  if (sortBy === "newest") reviews = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  else if (sortBy === "highest") reviews = [...reviews].sort((a, b) => b.rating - a.rating);
  else if (sortBy === "lowest") reviews = [...reviews].sort((a, b) => a.rating - b.rating);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRating === 0 || !formTitle || !formBody) return;
    setSubmitted(true);
    setShowForm(false);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">⭐ User Reviews</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-black px-4 py-2 bg-lime border-2 border-black rounded-xl shadow-brutal-sm hover:shadow-brutal active:translate-y-0.5 transition-all"
        >
          + Write a Review
        </button>
      </div>

      {/* Summary card */}
      <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-brutal mb-5">
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 text-center">
            <div className="text-5xl font-black leading-none">{avgRounded.toFixed(1)}</div>
            <StarDisplay rating={Math.round(avg)} size="lg" />
            <div className="text-[10px] text-gray-400 font-semibold mt-1">{allReviews.length} reviews</div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-500 w-3 text-right">{d.star}</span>
                <span className="text-yellow-400 text-[10px]">★</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${RATING_BAR_COLOR[d.star]}`} style={{ width: `${d.pct}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 w-7 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter + sort tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {(["all", "recreational", "medical", "grow"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-lg border-2 transition-all ${
                filter === f ? "bg-lime border-black" : "bg-gray-50 border-gray-200 hover:border-black"
              }`}
            >
              {f === "all" ? "All" : TYPE_LABELS[f]}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0 flex gap-1.5">
            {(["helpful", "newest", "highest"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border-2 transition-all ${
                  sortBy === s ? "bg-black text-white border-black" : "bg-white border-gray-200 hover:border-black"
                }`}
              >
                {s === "helpful" ? "Top" : s === "newest" ? "New" : "Best"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Write review form */}
      {showForm && !submitted && (
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-brutal mb-5">
          <h3 className="font-black text-sm mb-4">Share your experience with {strainName}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Your Rating</label>
              <StarInput value={formRating} onChange={setFormRating} />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Review Type</label>
              <div className="flex gap-2 flex-wrap">
                {(["recreational", "medical", "grow"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setFormType(t)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 transition-all ${formType === t ? "bg-lime border-black" : "bg-gray-50 border-gray-200"}`}>
                    {TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Your Name</label>
              <input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="First name or username"
                className="w-full border-2 border-black rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime" />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Title</label>
              <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Sum it up in one line" required
                className="w-full border-2 border-black rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime" />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Your Review</label>
              <textarea value={formBody} onChange={(e) => setFormBody(e.target.value)} placeholder="What was your experience? Effects, flavor, how you used it..." required rows={4}
                className="w-full border-2 border-black rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime resize-none" />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Effects You Noticed</label>
              <div className="flex flex-wrap gap-1.5">
                {EFFECT_TAG_OPTIONS.slice(0, 10).map((tag) => (
                  <button key={tag} type="button"
                    onClick={() => setFormTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border-2 transition-all ${formTags.includes(tag) ? "bg-lime border-black" : "bg-gray-50 border-gray-200 hover:border-black"}`}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-lime border-2 border-black font-black text-sm py-3 rounded-xl shadow-brutal hover:shadow-brutal-lg active:translate-y-0.5 transition-all">
                Submit Review
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 border-2 border-gray-200 font-bold text-sm py-3 rounded-xl hover:border-black transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {submitted && (
        <div className="bg-lime border-2 border-black rounded-2xl p-4 shadow-brutal mb-5 text-center">
          <div className="text-2xl mb-1">🎉</div>
          <div className="font-black text-sm">Thanks for your review!</div>
          <div className="text-xs text-gray-600 mt-1">It'll show up after moderation.</div>
        </div>
      )}

      {/* Review cards */}
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
