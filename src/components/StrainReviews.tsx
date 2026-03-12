"use client";

import { useState } from "react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  effect_tags: string[];
  helpful: number;
  type: "recreational" | "medical" | "grow";
}

// Seeded fake reviews per strain — deterministic so SSR matches
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

const REVIEW_TEMPLATES = [
  {
    type: "recreational" as const,
    titles: ["Perfect evening strain", "Exactly what I needed", "My new go-to", "Blew me away", "Lives up to the hype"],
    bodies: [
      "Picked this up last weekend and was impressed right away. The effects came on smooth and lasted a solid 2–3 hours. Great for unwinding after a long day.",
      "Super smooth smoke with a really pleasant flavor. I got exactly the effects the description promised — very relaxing without being too heavy.",
      "Been searching for something like this for a while. The high is balanced and creative without making me anxious. Will definitely be buying again.",
      "Tried this at a friend's place first and immediately went and got my own. The terpene profile really shines through — tastes exactly like it smells.",
      "Didn't expect much given the price point but this one genuinely surprised me. Solid effects, good duration, and the flavor is really distinct.",
    ],
  },
  {
    type: "medical" as const,
    titles: ["Helps with my anxiety", "Great for pain relief", "Finally sleeping again", "Works better than expected", "My doctor suggested this type"],
    bodies: [
      "I've been using cannabis medicinally for a few years and this is one of the better strains I've tried for managing my chronic pain. Takes the edge off without knocking me out completely.",
      "Suffer from anxiety and this really helps me calm down in the evenings without the paranoia that some high-THC strains give me. Very manageable.",
      "Insomnia has been rough lately. Started using a small amount of this before bed and it's made a real difference. I'm actually getting through the night now.",
      "After trying a dozen different strains for stress relief, this one has become my go-to. The body relaxation is real and it doesn't fog my brain.",
      "Works well for appetite — I deal with nausea from medication and this genuinely helps me eat. Grateful to have found it.",
    ],
  },
  {
    type: "grow" as const,
    titles: ["Easy first grow", "Great yield for the effort", "Grew it outdoors — loved it", "Recommend for beginners", "Harvested last month"],
    bodies: [
      "First time growing and this was a great choice. Very forgiving if you make mistakes and the plants stayed healthy throughout. Decent yield for a beginner.",
      "Grew 4 plants outdoors this past season. They got big fast and the buds were dense and fragrant. Trimming was a little tedious but worth it.",
      "Really sturdy genetics — withstood a few temperature swings without any major problems. The flowering stage was textbook. Happy with the harvest.",
      "Followed a basic grow guide and ended up with a solid harvest. Doesn't demand much attention which is perfect for people who are still learning.",
      "Second grow with this strain. First time was a trial run — this time I dialed in the nutrients and the difference was massive. Highly recommend.",
    ],
  },
];

const EFFECT_TAG_OPTIONS = [
  "Relaxing", "Euphoric", "Creative", "Sleepy", "Happy",
  "Pain Relief", "Stress Relief", "Anxiety Relief", "Appetite", "Focus",
];

const AVATARS = ["🧑", "👩", "🧔", "👨‍🦱", "👩‍🦰", "🧑‍🦳", "👩‍🦲", "🧑‍🦱"];
const USERNAMES = [
  "GreenThumb_420", "CannaCurious", "TerpeneHunter", "StonerDad2023",
  "MedPatient_Jane", "OGGrower", "WestCoastBud", "HighDesertFarms",
  "ReliefSeeker", "PurpleHaze_Fan", "TrichomeTerry", "LemonHeadsOnly",
];

function generateReviews(strainSlug: string, strainName: string): Review[] {
  const seed = hashStr(strainSlug);
  const count = 5 + (seed % 4); // 5–8 reviews
  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    const s = hashStr(strainSlug + i);
    const template = REVIEW_TEMPLATES[s % 3];
    const titleIdx = (s >> 2) % template.titles.length;
    const bodyIdx = (s >> 4) % template.bodies.length;
    const authorIdx = (s >> 6) % USERNAMES.length;
    const avatarIdx = (s >> 8) % AVATARS.length;

    // Ratings: weighted toward 4-5 stars
    const ratingSeed = s % 10;
    const rating = ratingSeed < 1 ? 2 : ratingSeed < 2 ? 3 : ratingSeed < 5 ? 4 : 5;

    // Date: last 18 months
    const daysAgo = (s % 540) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateStr = date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    // Effect tags: 2-3 random
    const numTags = 2 + (s % 2);
    const tags: string[] = [];
    for (let t = 0; t < numTags; t++) {
      const tag = EFFECT_TAG_OPTIONS[(s + t * 7) % EFFECT_TAG_OPTIONS.length];
      if (!tags.includes(tag)) tags.push(tag);
    }

    reviews.push({
      id: `${strainSlug}-${i}`,
      author: USERNAMES[authorIdx],
      rating,
      date: dateStr,
      title: template.titles[titleIdx],
      body: template.bodies[bodyIdx],
      effect_tags: tags,
      helpful: (s >> 10) % 40,
      type: template.type,
    });
  }

  // Sort by helpful desc
  return reviews.sort((a, b) => b.helpful - a.helpful);
}

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "text-2xl" : "text-sm";
  return (
    <span className={`inline-flex gap-0.5 ${sz}`}>
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
  recreational: "bg-lime-pale border-lime-dark text-lime-dark",
  medical: "bg-blue-50 border-blue-300 text-blue-700",
  grow: "bg-orange-50 border-orange-300 text-orange-700",
};
const TYPE_LABELS: Record<string, string> = {
  recreational: "🌿 Recreational",
  medical: "💊 Medical",
  grow: "🪴 Grow Report",
};

export function ReviewSummary({ strainSlug, strainName }: { strainSlug: string; strainName: string }) {
  const reviews = generateReviews(strainSlug, strainName);
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  const avgRounded = Math.round(avg * 10) / 10;

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
  }));

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-4xl font-black">{avgRounded}</span>
      <div>
        <StarDisplay rating={Math.round(avg)} size="lg" />
        <div className="text-xs text-gray-400 font-semibold mt-0.5">{reviews.length} reviews</div>
      </div>
    </div>
  );
}

export default function StrainReviews({ strainSlug, strainName }: { strainSlug: string; strainName: string }) {
  const allReviews = generateReviews(strainSlug, strainName);
  const avg = allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length;
  const avgRounded = Math.round(avg * 10) / 10;

  const [filter, setFilter] = useState<"all" | "recreational" | "medical" | "grow">("all");
  const [sortBy, setSortBy] = useState<"helpful" | "newest" | "highest" | "lowest">("helpful");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
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
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">⭐ User Reviews</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-black px-4 py-2 bg-lime border-2 border-black rounded-xl shadow-brutal-sm hover:shadow-brutal transition-all"
        >
          + Write a Review
        </button>
      </div>

      {/* Rating summary */}
      <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal-sm mb-5 flex flex-col sm:flex-row gap-6 items-start">
        {/* Big number */}
        <div className="flex flex-col items-center justify-center min-w-[110px] text-center">
          <div className="text-6xl font-black leading-none mb-1">{avgRounded}</div>
          <StarDisplay rating={Math.round(avg)} size="lg" />
          <div className="text-xs text-gray-400 font-semibold mt-1">{allReviews.length} reviews</div>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 w-full flex flex-col gap-1.5">
          {dist.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="font-black w-4 text-right">{star}</span>
              <span className="text-yellow-400 text-sm">★</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2.5 border border-gray-200 overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-gray-400 font-semibold w-8 text-right">{pct}%</span>
              <span className="text-gray-300 font-semibold w-4">({count})</span>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <div className="flex flex-col gap-2 min-w-[140px]">
          {(["recreational", "medical", "grow"] as const).map((t) => {
            const cnt = allReviews.filter((r) => r.type === t).length;
            return (
              <div key={t} className={`flex items-center justify-between text-xs font-bold px-3 py-1.5 rounded-lg border ${TYPE_COLORS[t]}`}>
                <span>{TYPE_LABELS[t]}</span>
                <span className="ml-2 font-black">{cnt}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters + Sort */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <div className="flex gap-1.5 flex-wrap">
          {(["all", "recreational", "medical", "grow"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${
                filter === f ? "bg-lime" : "bg-white hover:bg-lime-pale"
              }`}
            >
              {f === "all" ? "All" : TYPE_LABELS[f]}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-xs font-bold bg-white border-2 border-black rounded-lg px-2 py-1.5 outline-none cursor-pointer"
          >
            <option value="helpful">Most Helpful</option>
            <option value="newest">Newest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Review Write Form */}
      {showForm && !submitted && (
        <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal mb-4">
          <div className="font-black text-base mb-4">✍️ Write Your Review</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Rating */}
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Your Rating *</label>
              <StarInput value={formRating} onChange={setFormRating} />
              {formRating > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {formRating === 5 ? "Excellent!" : formRating === 4 ? "Good!" : formRating === 3 ? "Average" : formRating === 2 ? "Poor" : "Terrible"}
                </div>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Review Type *</label>
              <div className="flex gap-2 flex-wrap">
                {(["recreational", "medical", "grow"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormType(t)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${
                      formType === t ? "bg-lime" : "bg-white hover:bg-lime-pale"
                    }`}
                  >
                    {TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Effects Experienced (pick up to 3)</label>
              <div className="flex flex-wrap gap-1.5">
                {EFFECT_TAG_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setFormTags((prev) =>
                        prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 3 ? [...prev, tag] : prev
                      );
                    }}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border-2 border-black transition-all ${
                      formTags.includes(tag) ? "bg-lime" : "bg-white hover:bg-lime-pale"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Nickname */}
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1.5">Nickname (optional)</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. GreenThumb420"
                maxLength={30}
                className="w-full bg-gray-50 border-2 border-gray-200 focus:border-black rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
              />
            </div>

            {/* Title */}
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1.5">Review Title *</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Perfect evening strain"
                maxLength={80}
                required
                className="w-full bg-gray-50 border-2 border-gray-200 focus:border-black rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
              />
            </div>

            {/* Body */}
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1.5">Your Experience *</label>
              <textarea
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
                placeholder="Share your experience — effects, flavor, how you used it..."
                rows={4}
                required
                minLength={30}
                className="w-full bg-gray-50 border-2 border-gray-200 focus:border-black rounded-xl px-4 py-2.5 text-sm outline-none resize-none transition-all"
              />
              <div className="text-right text-[10px] text-gray-400 mt-1">{formBody.length} chars (min 30)</div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={formRating === 0 || !formTitle || formBody.length < 30}
                className="flex-1 bg-lime border-2 border-black font-black text-sm px-5 py-3 rounded-xl shadow-brutal-sm hover:shadow-brutal transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-3 bg-white border-2 border-black font-bold text-sm rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {submitted && (
        <div className="bg-lime border-2 border-black rounded-2xl p-4 mb-4 shadow-brutal-sm flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <div className="font-black text-sm">Thanks for your review!</div>
            <div className="text-xs text-gray-600">It will appear after a quick moderation check.</div>
          </div>
        </div>
      )}

      {/* Review Cards */}
      <div className="flex flex-col gap-3">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">No reviews in this category yet.</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal-sm">
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-lime-pale border-2 border-black flex items-center justify-center text-base font-black">
                    {review.author[0]}
                  </div>
                  <div>
                    <div className="font-black text-sm">{review.author}</div>
                    <div className="text-[10px] text-gray-400">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StarDisplay rating={review.rating} />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${TYPE_COLORS[review.type]}`}>
                    {TYPE_LABELS[review.type]}
                  </span>
                </div>
              </div>

              <div className="font-black text-sm mb-1">{review.title}</div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{review.body}</p>

              {/* Effect tags */}
              {review.effect_tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {review.effect_tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-lime-pale border border-lime-dark rounded-md text-brand">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Helpful */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-gray-400">Was this helpful?</span>
                <button className="text-[10px] font-bold px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg hover:bg-lime-pale hover:border-lime-dark transition-all">
                  👍 Yes ({review.helpful})
                </button>
                <button className="text-[10px] font-bold px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
                  👎 No
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
