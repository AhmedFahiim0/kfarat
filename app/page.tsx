import HomePageCategories from "./(home-sections)/@categories/page";
import HomePageLastChance from "./(home-sections)/@last-chance/page";
import HomePageBestOffers from "./(home-sections)/@best-offers/page";
import HomePageFindBestTire from "./(home-sections)/@find-best-tire/page";
import HomePageTiresCollection from "./(home-sections)/@tire-sub-category/page";
import HomePageWeekhighlights from "./(home-sections)/@week-highlights/page";

export default function Home() {
  return (
    <section>
      <HomePageLastChance />
      <HomePageCategories />
      <HomePageBestOffers />
      <HomePageFindBestTire />
      <HomePageTiresCollection />
      <HomePageWeekhighlights />
    </section>
  );
}
