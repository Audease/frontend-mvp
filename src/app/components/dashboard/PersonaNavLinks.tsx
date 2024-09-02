"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function PersonaNavLinks() {
  const pathname = usePathname();
  const permissions = [
    "Add student",
    "Audit",
    "Induction",
    "Certificate",
    "Learning Platform",
    "Approve/reject application",
    "Send Application",
  ];

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
  links.push({ name: "Messenger", href: "#" });

  return (
    <div className="flex flex-row p-0 space-x-8">
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
