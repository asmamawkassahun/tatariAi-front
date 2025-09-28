"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, X,  } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CommunityIcon, DocIcon, SupportIcon,ArrowRight, UploadSearchIcon, SearchIcon } from "./icons";

export function HelpCenter() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Search query:", searchQuery);
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="p-6 bg-background text-foreground space-y-16 sm:space-y-20 md:space-y-24 my-8 sm:my-10 md:my-14  min-h-screen">
            <h2 className=" text-3xl sm:text-4xl md:text-[3.5375rem] font-medium text-primary text-center dark:text-white">Help & Support</h2>

            <form onSubmit={handleSearch} className="mb-6 w-full max-w-md mx-auto">
                <div className="relative mb-8 sm:mb-12 md:mb-16">
                    <Input
                        type="text"
                        placeholder="Ask anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full !py-6 px-10  dark:bg-accent   border-footer-border shadow-none rounded-md"
                    />
                    <SearchIcon className="absolute left-3 top-1/2  transform -translate-y-1/2 h-5 w-5" />
                    <UploadSearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary cursor-pointer" />
                </div>
            </form>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
                <Card className=" bg-background w-full max-w-[24rem] border-footer-border shadow-none rounded-lg">
                    <CardHeader className=" gap-4">
                        {/* <Users className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" /> */}
                        <CommunityIcon className=" dark:[#FFFFFF] #1C1C1C"/>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ask the Community</CardTitle>
                        <CardDescription className="text-secondary dark:text-muted">
                            Get instant help from Lovable users on Discord.
                        </CardDescription>
                    </CardHeader>

                </Card>
                <Card className="bg-background w-full max-w-[24rem] border-footer-border shadow-none rounded-lg">
                    <CardHeader className=" gap-4">
                        {/* <Book className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" /> */}
                        <DocIcon/>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Lovable Documentation</CardTitle>
                        <CardDescription className="text-secondary dark:text-muted">
                            Learn how to use Lovable with our documentation, expert tips, and tutorials.
                        </CardDescription>
                    </CardHeader>

                </Card>
                <Card className="bg-background w-full max-w-[24rem] border-footer-border shadow-none rounded-lg">
                    <CardHeader className=" gap-4">
                        {/* <Headphones className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" /> */}
                        <SupportIcon/>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Lovable Support</CardTitle>
                        <CardDescription className="text-secondary dark:text-muted">
                            Direct support channel, for paying users.
                        </CardDescription>
                    </CardHeader>

                </Card>
            </div>
            <div className="mt-24 ">
                <h3 className="text-3xl font-medium text-primary text-center dark:text-white mb-8 sm:mb-11 md:mb-16">Get Involved</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 max-w-[48rem] mx-auto">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-medium text-primary dark:text-white">Product Changelog</h3>
                            <p className=" text-sm text-secondary dark:text-muted">
                                News from the Lovable engineering team.
                            </p>
                        </div>
                        <Link href={""} className=" text-sm text-primary dark:text-accent hover:underline" >View Changelog <ArrowRight className=" inline" /> </Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-medium text-primary dark:text-white">Feature requests</h3>
                            <p className=" text-sm text-secondary dark:text-muted">
                                Have an idea? Share it and let the community vote!
                            </p>
                        </div>
                        <Link href={""} className=" text-sm text-primary dark:text-accent hover:underline">Lovable Feedback <ArrowRight className=" inline"/></Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-medium text-primary dark:text-white">Partner program</h3>
                            <p className=" text-sm text-secondary dark:text-muted">
                                Join as an expert, or get help from our network of
                                experts.
                            </p>
                        </div>
                        <Link href={""} className=" text-sm text-primary dark:text-accent hover:underline">Lovable Partners <ArrowRight className=" inline"/></Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-medium text-primary dark:text-white">Affiliate program</h3>
                            <p className=" text-sm text-secondary dark:text-muted">
                                Earn rewards while helping shape the future of
                                development.
                            </p>
                        </div>
                        <Link href={""} className=" text-sm text-primary dark:text-accent hover:underline">Lovable Affiliates <ArrowRight className=" inline"/> </Link>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-center">
                <h3 className="text-[1.75rem] font-medium  text-primary dark:text-white mb-4">Follow for updates</h3>
                <p className="text-secondary text-lg dark:text-muted mb-4">Compiled notes from the Lovable team.</p>
                <div className="flex justify-center gap-4">
                    <Button  size="icon" className="text-primary bg-background hover:bg-accent dark:hover:bg-gray-700">
                        <Mail className="h-5 w-5 dark:text-accent" />
                    </Button>
                    <Button size="icon" className=" bg-background text-primary hover:bg-accent dark:hover:bg-gray-700">
                        <X className="h-5 w-5 dark:text-accent" />
                    </Button>
                    <Button size="icon" className=" bg-background text-primary hover:bg-accent dark:hover:bg-gray-700">
                        <svg className="h-5 w-5 dark:text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22.23 5.924c-.736.326-1.527.547-2.357.646.847-.508 1.498-1.312 1.804-2.27-.793.47-1.67.812-2.6 1-.748-.797-1.812-1.294-2.993-1.294-2.265 0-4.103 1.837-4.103 4.103 0 .322.036.635.107.935-3.41-.17-6.433-1.804-8.457-4.287-.353.607-.556 1.312-.556 2.064 0 1.425.725 2.685 1.826 3.422-.673-.022-1.305-.206-1.86-.514v.052c0 1.988 1.415 3.647 3.293 4.023-.344.094-.707.145-1.08.145-.264 0-.521-.026-.772-.073.522 1.63 2.038 2.817 3.833 2.85-1.404 1.1-3.174 1.756-5.1 1.756-.331 0-.658-.019-.98-.057 1.816 1.164 3.973 1.843 6.29 1.843 7.547 0 11.675-6.254 11.675-11.675 0-.178-.004-.355-.012-.53.802-.578 1.497-1.3 2.047-2.124z" />
                        </svg>
                    </Button>
                    <Button size="icon" className=" bg-background text-primary hover:bg-accent dark:hover:bg-gray-700">
                        <svg className="h-5 w-5 dark:text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.325 3.608 1.3.975.975 1.238 2.242 1.3 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.325 2.633-1.3 3.608-.975.975-2.242 1.238-3.608 1.3-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.325-3.608-1.3-.975-.975-1.238-2.242-1.3-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.325-2.633 1.3-3.608.975-.975 2.242-1.238 3.608-1.3 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.665.013-4.947.072-1.31.059-2.621.324-3.648 1.351-.975.975-1.292 2.338-1.351 3.648-.059 1.282-.072 1.688-.072 4.947s.013 3.665.072 4.947c.059 1.31.324 2.621 1.351 3.648.975.975 2.338 1.292 3.648 1.351 1.282.059 1.688.072 4.947.072s3.665-.013 4.947-.072c1.31-.059 2.621-.324 3.648-1.351.975-.975 1.292-2.338 1.351-3.648.059-1.282.072-1.688.072-4.947s-.013-3.665-.072-4.947c-.059-1.31-.324-2.621-1.351-3.648-.975-.975-2.338-1.292-3.648-1.351-1.282-.059-1.688-.072-4.947-.072z" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}