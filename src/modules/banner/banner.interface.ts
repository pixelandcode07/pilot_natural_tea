export interface IBanner {
  title?: string;
  link?: string;
  image: string;
  position: "Hero" | "Promo"; // Hero (ওপরের স্লাইডার) বা Promo (মাঝখানের ব্যানার)
  status: "Active" | "Inactive";
}