import LineChart from "../Chart";
import Balance from "./Balance";
import SideNav from "./SideNav";

export const HeroLayout = () => {
  return (
    <section className="pt-8 md:pt-12 px-6 md:px-10 lg:px-16 md:flex flex-col md:flex-row md:justify-between md:gap-2 lg:gap-4">
      <div>
        <SideNav />
      </div>

      <div>
        <LineChart />
      </div>

      <div>
        <Balance />
      </div>
    </section>
  )
};
