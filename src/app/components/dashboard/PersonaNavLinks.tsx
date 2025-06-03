"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function PersonaNavLinks({ mobile, onItemClick }) {
  const pathname = usePathname();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('/api/getCookiesPermission');
        const data = await response.json();
        setPermissions(data.permissions);
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
      name: "Application Review",
      href: "/accessor-dashboard",
    },
    "Send Application": { name: "BKSD", href: "/bksd-dashboard" },
  };

  const links = permissions
    .filter((permission) => availableLinks[permission])
    .map((permission) => availableLinks[permission]);

  // Messenger Link
  // links.push({ name: "Messenger", href: "/admin/messenger" });

  if (mobile) {
    return (
      <div className="flex flex-col space-y-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "font-inter font-medium text-gray-700 hover:bg-gray-50 rounded-lg py-2 px-3 transition-colors duration-200",
              {
                "bg-gray-100 text-blue-600": pathname === link.href,
              }
            )}
            onClick={onItemClick}
          >
            {link.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-6">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "font-inter font-medium text-h2 text-tgrey3 hover:text-gray-900 relative transition-colors duration-200 px-1",
            {
              "text-blue-600": pathname === link.href,
            }
          )}
        >
          {link.name}
          {pathname === link.href && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
          )}
        </Link>
      ))}
    </div>
  );
}