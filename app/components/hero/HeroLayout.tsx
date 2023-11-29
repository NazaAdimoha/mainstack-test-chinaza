import LineChart from "../Chart";
import Balance from "./Balance";

export const HeroLayout = () => {
  return (
    <section className="pt-4 md:pt-8 sm:px-10 md:px-16 md:flex flex-col md:flex-row md:justify-evenly md:gap-2 lg:gap-4">
      <div>hello</div>
      <div>
        <LineChart />
      </div>

      <div>
        <Balance />
      </div>
    </section>
  );
};
