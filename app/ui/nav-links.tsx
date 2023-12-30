"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent } from "react";

const links: Link[] = [
  {
    name: "Lotto6/45",
    href: "/lotto645",
    icon: Lotto645Icon,
    sublinks: [
      {
        name: "번호 생성",
        href: "/lotto645/generate",
        icon: LottoGenerateIcon,
      },
    ],
  },
];

type Link = {
  name: string;
  href: string;
  icon: any;
  sublinks: SubLink[];
};

type SubLink = {
  name: string;
  href: string;
  icon: any;
};

export default function NavLinks() {
  const pathname = usePathname();
  const currentLink = links.find(({ href }) => pathname.startsWith(href));
  const mobileOneLinkWidth = Math.floor(100 / links.length);
  return (
    <div className="w-full">
      <div className="flex md:flex-col">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <div key={link.name} className={`mt-2 mx-1 md:mx-0 flex-1`}>
              <Link
                href={link.href}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3",
                  { "bg-gray-100": pathname !== link.href },
                  {
                    "bg-yellow-200 text-yellow-600": pathname.startsWith(
                      link.href
                    ),
                  }
                )}
              >
                {LinkIcon && <LinkIcon className="w-6" />}
                <p className="hidden md:block">{link.name}</p>
              </Link>
              {pathname.startsWith(link.href) &&
                link.sublinks.map((sublink) => {
                  const SubLinkIcon = sublink.icon;
                  return (
                    <div
                      className="hidden md:flex md:flex-row md:items-center md:t-2 mt-2"
                      key={sublink.name}
                    >
                      <div className="bg-gray-100 mx-1 rounded-full w-4 h-4"></div>
                      <Link
                        href={sublink.href}
                        className={clsx(
                          "flex h-[42px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:justify-start md:p-2 md:px-3",
                          { "bg-gray-100": pathname !== sublink.href },
                          {
                            "bg-yellow-100 text-yellow-600":
                              pathname === sublink.href,
                          }
                        )}
                      >
                        {SubLinkIcon && <SubLinkIcon className="w-6" />}
                        {sublink.name}
                      </Link>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      {!!currentLink &&
        currentLink.sublinks.map((sl) => {
          return (
            <div
              className="flex flex-row items-center mt-2 md:hidden"
              key={sl.name}
            >
              <div className="bg-gray-100 mx-1 rounded-full w-4 h-4"></div>
              <Link
                href={sl.href}
                className={clsx(
                  "flex h-[42px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:justify-start md:p-2 md:px-3",
                  { "bg-gray-100": pathname !== sl.href },
                  {
                    "bg-yellow-100 text-yellow-600": pathname === sl.href,
                  }
                )}
              >
                {sl.icon && <sl.icon className="w-6" />}
                {sl.name}
              </Link>
            </div>
          );
        })}
    </div>
  );
}

function Lotto645Icon() {
  return <p>🥎</p>;
}

function LottoGenerateIcon() {
  return <p>🎲</p>;
}
