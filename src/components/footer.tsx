import { footerData } from "@/data/footerData";
import { Globe } from "lucide-react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="w-full bg-accent dark:bg-footer-background container mx-auto border border-footer-border rounded-2xl">
      <div className="px-6 lg:px-[8.5625rem] py-4 md:py-14">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-[4.8125rem] xl:space-x-[12.8125rem]">
          {/* Logo */}
          <div className="md:col-span-1 space-y-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-red-500 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12">
            {footerData.map((section, index) => (
              <div key={index} className="md:col-span-1 space-y-4">
                <h3 className="text-secondary dark:text-muted text-13 font-normal leading-5">
                  {section.heading}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary dark:text-footer-muted text-13 font-normal leading-5"
                        >
                          {link.text}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-primary dark:text-footer-muted text-13 font-normal leading-5"
                        >
                          {link.text}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Language selector */}
        <div className="mt-12 pt-8">
          <div className="flex items-center gap-2 text-secondary dark:text-muted">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}