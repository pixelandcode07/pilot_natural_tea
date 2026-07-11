import React from "react";
import Link from "next/link";
import HeroBanner from "./HeroBanner";
import CategoryCards from "./CategoryCards";

export default function Hero() {
  return (
    <div>
        <HeroBanner />
        <CategoryCards/>
    </div>
  );
}