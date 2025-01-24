export interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string | null;
  price: string;
  currency: string;
  restaurant: string;
  image: string;
  spicinessLevel: number;
  sweetnessLevel: number;
  dietaryPreference: string[];
  healthinessScore: number;
  popularity: number;
  cheaper: boolean;
  servingSize: string;
  preparationTime: number;
  caffeineLevel: string;
  sufficientFor: number;
  recommendedPairing: number[];
  similarItems: number[];
}
