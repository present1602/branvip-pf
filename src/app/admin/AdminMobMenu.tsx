import React, { FC } from "react";
import { Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";
import { data } from "@/app/admin/AdminNavMenuData";

const AdminMobMenu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="xl:hidden"/>
      </NavbarContent>
      <NavbarMenu className="max-w-[300px] ml-auto">
        {data.map((item, index) => (
          <NavbarMenuItem key={index} className='border-b pb-2'>
            <Link href={item.href}>
              {item.title}
            </Link>
            {item.lower?.map((childItem, childIndex) =>(
              <NavbarMenuItem key={childIndex} className="mt-2">
                <Link href={childItem.href}>
                  <span className="ml-2 text-[#828282]">{childItem.title}</span>
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default AdminMobMenu;