export interface RestaurantHours {
  id: number;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  closed: boolean;
  sortOrder?: number;
}

export interface SiteSettings {
  id?: number;
  heroImageUrl: string | null;
}
