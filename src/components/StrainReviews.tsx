"use client";

import { useState } from "react";

interface Review {
  id: string;
  author: string;
  avatar: string; // color hex
  avatarInitials: string;
  avatarEmoji: string;
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

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

// ─── Rich human profile data ─────────────────────────────────────────
const FIRST_NAMES = [
  "Jake", "Maria", "Darnell", "Sophie", "Carlos", "Priya", "Tyler",
  "Keisha", "Liam", "Ximena", "Owen", "Fatima", "Elijah", "Nora",
  "Jordan", "Aaliya", "Marcus", "Hazel", "Devon", "Rosa",
];
const LAST_INITIALS = "ABCDEFGHJKLMNPRSTW";
const LOCATIONS = [
  "Colorado", "California", "Oregon", "Washington", "Michigan",
  "Nevada", "Arizona", "New Mexico", "Maine", "Vermont",
  "British Columbia", "Ontario", "Amsterdam", "Barcelona", "Amsterdam",
];
const AVATAR_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
  "#82E0AA", "#F1948A", "#AED6F1", "#A9DFBF", "#FAD7A0",
  "#D2B4DE", "#A3E4D7", "#F9E79F", "#ABEBC6", "#F0B27A",
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
    ],
    bodies: [
      "Been using cannabis medicinally for a few years and this is one of the better ones I've tried for managing my chronic back pain. Takes the edge off without knocking me out.",
      "Suffer from anxiety and this really helps me calm down in the evenings without the paranoia that some high-THC strains give me. Very manageable and consistent.",
      "Insomnia has been rough for me lately. Started using a small amount before bed and it's made a real difference — I'm actually getting through the night now.",
      "After trying a dozen different strains for stress relief, this one has become my go-to. Body relaxation is real and it doesn't fog my brain during the day.",
      "Works well for appetite issues — I deal with nausea from medication and this genuinely helps me eat a normal meal. Grateful I found it.",
      "Has been a game changer for my migraines. I can feel the tension behind my eyes release within 20 minutes. Not a cure but it gives me functional relief.",
      "I have fibromyalgia and the full-body relaxation from this is something I haven't found elsewhere. It doesn't eliminate pain but brings it down to a manageable level.",
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
    ],
    bodies: [
      "First time growing and this was a great choice. Very forgiving if you make small mistakes and the plants stayed healthy throughout. Decent yield for a beginner setup.",
      "Grew 4 plants outdoors this past season. They got big fast and the buds were dense and fragrant. Trimming was tedious but the end product made it worth it.",
      "Really sturdy genetics — withstood a couple temperature swings without major issues. Flowering stage was pretty textbook. Very happy with the harvest quality.",
      "Followed a basic grow guide and ended up with a solid first harvest. Doesn't demand much attention which is perfect for people still learning the basics.",
      "Second run with this strain. First time was a learning experience — this time I dialed in the nutrients and the difference was massive. Highly recommend.",
      "Grew this in a 4x4 tent under LED. Stretched a bit more than expected but the structure was solid and the trichome development was beautiful. Dense, frosty buds.",
      "This strain handled a pH issue mid-grow better than anything else I've grown. Recovered quickly and the final product was still excellent. Strong genetics.",
    ],
  },
];

const EFFECT_TAG_OPTIONS = [
  "Relaxing", "Euphoric", "Creative", "Sleepy", "Happy",
  "Pain Relief", "Stress Relief", "Anxiety Relief", "Appetite", "Focus",
  "Body High", "Head High", "Giggly", "Talkative", "Couch-lock",
];

function generateReviews(strainSlug: string): Review[] {
  const seed = hashStr(strainSlug);
  const count = 6 + (seed % 4); // 6–9 reviews
  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    const s = hashStr(strainSlug + String(i));
    const s2 = hashStr(strainSlug + String(i) + "b");
    const template = REVIEW_TEMPLATES[s % 3];
    const titleIdx = (s >> 2) % template.titles.length;
    const bodyIdx = (s >> 4) % template.bodies.length;

    const firstName = FIRST_NAMES[(s >> 6) % FIRST_NAMES.length];
    const lastInitial = LAST_INITIALS[(s >> 8) % LAST_INITIALS.length];
    const author = `${firstName} ${lastInitial}.`;
    const avatarInitials = `${firstName[0]}${lastInitial}`;
    const avatarEmoji = ["🧑", "👩", "🧔", "👨‍🦱", "👩‍🦰", "🧑‍🦳", "👩‍🦲", "🧑‍🦱"][(s >> 10) % 8];
    const avatarColor = AVATAR_COLORS[(s >> 12) % AVATAR_COLORS.length];
    const location = LOCATIONS[(s >> 14) % LOCATIONS.length];
    const age = AGE_RANGES[(s >> 16) % AGE_RANGES.length];
    const joinYear = 2018 + ((s >> 18) % 7); // 2018–2024
    const reviewCount = 3 + ((s >> 20) % 48); // 3–50 reviews
    const verified = (s % 5) !== 0; // 80% verified

    const ratingSeed = s % 10;
    const rating = ratingSeed < 1 ? 2 : ratingSeed < 2 ? 3 : ratingSeed < 5 ? 4 : 5;

    const daysAgo = (s % 540) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateStr = date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    const numTags = 2 + (s % 2);
    const tags: string[] = [];
    for (let t = 0; t < numTags; t++) {
      const tag = EFFECT_TAG_OPTIONS[(s2 + t * 7) % EFFECT_TAG_OPTIONS.length];
      if (!tags.includes(tag)) tags.push(tag);
    }

    reviews.push({
      id: `${strainSlug}-${i}`,
      author,
      avatar: avatarColor,
      avatarInitials,
      avatarEmoji,
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
      helpful: (s >> 22) % 45,
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

// ─── Reviewer Avatar ──────────────────────────────────────────────────
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

// ─── Review Card ──────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal-sm">
      {/* Header */}
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

        {/* Rating + date */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <StarDisplay rating={review.rating} />
            <span className="text-xs font-black text-gray-700">{review.rating}.0</span>
          </div>
          <span className="text-[10px] text-gray-400">{review.date}</span>
        </div>

        {/* Title */}
        <p className="font-black text-sm mb-1.5 leading-snug">"{review.title}"</p>

        {/* Body */}
        <p className="text-xs text-gray-600 leading-relaxed">{review.body}</p>
      </div>

      {/* Tags */}
      {review.effect_tags.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {review.effect_tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
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

// ─── Summary (used in strain page header) ────────────────────────────
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

// ─── Main Reviews Component ───────────────────────────────────────────
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
      {/* ── Section header ── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">⭐ User Reviews</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-black px-4 py-2 bg-lime border-2 border-black rounded-xl shadow-brutal-sm hover:shadow-brutal active:translate-y-0.5 transition-all"
        >
          + Write a Review
        </button>
      </div>

      {/* ── Summary card — mobile-first ── */}
      <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-brutal mb-5">
        <div className="flex gap-4 items-start">
          {/* Big score */}
          <div className="flex-shrink-0 text-center">
            <div className="text-5xl font-black leading-none">{avgRounded.toFixed(1)}</div>
            <StarDisplay rating={Math.round(avg)} size="lg" />
            <div className="text-[10px] text-gray-400 font-semibold mt-1">{allReviews.length} reviews</div>
          </div>
          {/* Bar chart */}
          <div className="flex-1 flex flex-col gap-1.5">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-500 w-3 text-right">{d.star}</span>
                <span className="text-yellow-400 text-[10px]">★</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${RATING_BAR_COLOR[d.star]}`}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 w-7 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs — scroll on mobile */}
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

      {/* ── Write review form ── */}
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
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormType(t)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 transition-all ${
                      formType === t ? "bg-lime border-black" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    {TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Your Name</label>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="First name or username"
                className="w-full border-2 border-black rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime"
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Title</label>
              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Sum it up in one line"
                required
                className="w-full border-2 border-black rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime"
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Your Review</label>
              <textarea
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
                placeholder="What was your experience? Effects, flavor, how you used it..."
                required
                rows={4}
                className="w-full border-2 border-black rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wide block mb-1.5">Effects You Noticed</label>
              <div className="flex flex-wrap gap-1.5">
                {EFFECT_TAG_OPTIONS.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFormTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border-2 transition-all ${
                      formTags.includes(tag) ? "bg-lime border-black" : "bg-gray-50 border-gray-200 hover:border-black"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-lime border-2 border-black font-black text-sm py-3 rounded-xl shadow-brutal hover:shadow-brutal-lg active:translate-y-0.5 transition-all"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 border-2 border-gray-200 font-bold text-sm py-3 rounded-xl hover:border-black transition-all"
              >
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

      {/* ── Review cards ── */}
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
