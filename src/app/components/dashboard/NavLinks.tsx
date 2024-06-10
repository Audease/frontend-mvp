"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Apps/Roles", href: "/dashboard" },
  { name: "Resources", href: "/dashboard/resources" },
  { name: "Messenger", href: "/dashboard/messenger" },
  { name: "Learners", href: "/dashboard/learners" },
  { name: "Staff", href: "/dashboard/staff" },
  { name: "Worflows", href: "/dashboard/workflows" },
];



export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row p-0 space-x-8">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("font-inter font-medium flex flex-row text-h2 text-tgrey3 space-x-2 rounded pt-1 pb-1 px-2", {
              "bg-tgrey4": pathname === link.href,
            })}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
