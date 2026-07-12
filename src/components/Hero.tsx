import React from "react";
import Link from "next/link";
import HeroBanner from "./HeroBanner";
import CategoryCards from "./CategoryCards";
import ProductSlider from "./ProductSlider";
import ComboDeals from "./ComboDeals";
import OrganicTeaSlider from "./OrganicTeaSlider";
import JustForYou from "./JustForYou";

export default function Hero() {
  return (
    <div>
        <HeroBanner />
        <CategoryCards/>
        <ProductSlider />
        <ComboDeals/>
        <OrganicTeaSlider/>
        <JustForYou/>
    </div>
  );
}