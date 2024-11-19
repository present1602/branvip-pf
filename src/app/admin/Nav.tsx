import Link from "next/link";
import { data } from "@/app/admin/AdminNavMenuData";

const Nav = () => {
  return (
    <div
      className="mt-[37px] w-48 p-5  flex flex-col rounded-[10px] border border-gray_scale-70 bg-white h-fit">
      {data.map((item, index) => (
        <div key={index} className={`flex flex-col`}>
          <Link href={item.href}>
            <div className="py-[6px] px-[10px]">
              <span className="text-[16px] font-semibold">{item.title}</span>
            </div>
          </Link>
          {item.lower?.map((lowerItem, index) => (
            <Link href={lowerItem.href} key={index}>
              <div className="py-[6px] px-[10px]">
                <span className="text-[14px] text-gray_scale-400">{lowerItem.title} </span>
              </div>
            </Link>
          ))}
          {index !== data.length - 1 && <div className="border-b mt-3 mb-3"></div>  }
        </div>
      ))}
    </div>
  );
};

export default Nav;