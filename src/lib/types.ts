export type StrainType = "Indica" | "Sativa" | "Hybrid";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Strain {
  id: string;
  name: string;
  slug: string;
  type: StrainType;
  thc_min: number;
  thc_max: number;
  cbd_min: number;
  cbd_max: number;
  effects: string[];
  flavors: string[];
  terpenes: string[];
  helps_with: string[];
  description: string;
  grow_difficulty: "Easy" | "Moderate" | "Difficult";
  grow_yield: "Low" | "Medium" | "High";
  grow_height: "Short" | "Average" | "Tall";
  flowering_weeks_min: number;
  flowering_weeks_max: number;
  parents: string[];
  image_url: string;
  rank_popularity: number;
  breeder?: string;
  origin_region?: string;
  created_at?: string;
  // Enriched columns
  faq?: FaqItem[];
  negative_effects?: string[];
  indica_pct?: number;
  sativa_pct?: number;
  ruderalis_pct?: number;
  cbg_min?: number;
  cbg_max?: number;
  cbc_min?: number;
  cbc_max?: number;
  thcv_min?: number;
  thcv_max?: number;
  cbn_min?: number;
  cbn_max?: number;
  cannabinoid_data_source?: string;
}
