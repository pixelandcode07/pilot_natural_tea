export interface ICategory {
  name: string;
  slug: string;
  icon?: string; // ক্যাটাগরির ছবির জন্য
  isFeatured: boolean; // হোমপেজে দেখানোর জন্য
  status: "Active" | "Inactive";
}