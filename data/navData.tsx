import Home from "../public/home.svg";
import Payment from "../public/payments.svg";
import Chart from "../public/insert_chart.svg";
import Group from "../public/group.svg";

export interface NavData {
  title: string;
  href: string;
  img: any;
  bgColor?: string;
  color?: string;
  hover?: string;
}

export const navData: NavData[] = [
  {
    title: "Home",
    href: "/",
    img: Home,
  },
  {
    title: "Analytics",
    href: "/",
    img: Chart,
  },
  {
    title: "Revenue",
    href: "/",
    img: Payment,
    bgColor: "#131316",
    color: "#fff",
  },
  {
    title: "CRM",
    href: "/",
    img: Group,
  },
];
