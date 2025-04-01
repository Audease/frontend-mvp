"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function PersonaNavLinks() {
  const pathname = usePathname();
  const [permissions, setPermissions] = useState([]); 

  // const permissions = [
  //   "Add student",
  //   "Audit",
  //   "Induction",
  //   "Certificate",
  //   "Learning Platform",
  //   "Approve/reject application",
  //   "Send Application",
  // ];

  useEffect (() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('/api/getCookiesPermission');
        const data = await response.json();
        setPermissions(data.permissions)
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  const availableLinks = {
    "Add student": { name: "Recruiter", href: "/recruiter-dashboard" },
    // "Audit": { name: "Audit", href: "/auditor-dashboard" },
    Induction: { name: "Induction", href: "/induction-dashboard" },
    Certificate: { name: "Certificate", href: "/certificate-dashboard" },
    "Learning Platform": { name: "Lazer", href: "/lazer-dashboard" },
    "Approve/reject application": {
      name: "Accessor",
      href: "/accessor-dashboard",
    },
    "Send Application": { name: "BKSD", href: "/bksd-dashboard" },
  };

  const links = permissions
    .filter((permission) => availableLinks[permission])
    .map((permission) => availableLinks[permission]);

  // Messenger Link
  // links.push({ name: "Messenger", href: "/admin/messenger" });

  return (
    <div className="flex flex-col md:flex-row p-0 md:space-x-8">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "font-inter font-medium flex flex-row text-h2 text-tgrey3 space-x-2 rounded pt-1 pb-1 px-2",
              {
                "bg-tgrey4": pathname === link.href,
              }
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
