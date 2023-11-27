import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/mainstack-logo.svg";
import Menu from "../../public/menu.svg";
import Chat from "../../public/chat.svg";
import Notification from "../../public/notifications.svg";
import { navData } from "@/data/navData";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-xl z-[100] w-full h-16 rounded-full">
      <div className="container px-4 py-2 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} alt="logo" width={25} height={25} />
          </Link>

          {/* mid nav items */}
          {navData.map((item, index) => (
            <div className="rounded-full mx-4" style={{ backgroundColor: `${item.bgColor}`, color: `${item.color}`, padding: "8px 18px 8px 14px" }} key={index}>
              <Link
                className="hidden md:flex md:items-center md:justify-center h-full"
                href={item.href}
              >
                <Image src={item.img} alt="logo" width={25} height={25} />
                <p className="ml-2">{item.title}</p>
              </Link>
            </div>
          ))}

          {/* Mobile hambugger */}
          <div className="md:flex items-center justify-center h-full gap-8">
            <Link href="/">
                <Image src={Notification} alt="logo" width={25} height={25} />
            </Link>
            <Link href="/">
                <Image src={Chat} alt="logo" width={25} height={25} />
            </Link>
            
            <button className="focus:outline-none flex justify-center items-center bg-gray-400 px-2 rounded-full py-2 gap-4">
            <p className="bg-gray-600 w-8 h-8 flex justify-center items-center text-color text-center text-sm font-semibold rounded-full">OJ</p>
              <Image src={Menu} alt="logo" width={25} height={25} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
