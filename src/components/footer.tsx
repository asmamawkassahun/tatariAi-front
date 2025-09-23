import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-accent container mx-auto border border-footer-border rounded-2xl">
      <div className="px-6 md:px-[8.5625rem]  py-4 md:py-14">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-[12.8125rem]">
          {/* Logo */}
          <div className="md:col-span-1 space-y-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-red-500 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12">
            {/* Company */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-secondary text-13 font-normal leading-5">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/careers"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Press & media
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enterprise"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trust-center"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Trust center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partnerships"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Partnerships
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-secondary text-13 font-normal leading-5">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/pricing"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/student-discount"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Student discount
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/connections"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/import-figma"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Import from Figma
                  </Link>
                </li>
                <li>
                  <Link
                    href="/changelog"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/status"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-secondary text-13 font-normal leading-5">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/learn"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Learn
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    How-to guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/videos"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Videos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/launched"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Launched
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-secondary text-13 font-normal leading-5">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Cookie settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/platform-rules"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Platform rules
                  </Link>
                </li>
                <li>
                  <Link
                    href="/report-abuse"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Report abuse
                  </Link>
                </li>
                <li>
                  <Link
                    href="/report-security"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Report security concerns
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-secondary text-13 font-normal leading-5">
                Community
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/become-partner"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Become a partner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hire-partner"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Hire a partner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/affiliates"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Affiliates
                  </Link>
                </li>
                <li>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://reddit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    Reddit
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    X / Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-13 font-normal leading-5"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Language selector */}
        <div className="mt-12 pt-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
