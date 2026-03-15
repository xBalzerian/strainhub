export type StrainType = "Indica" | "Sativa" | "Hybrid";

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
}
