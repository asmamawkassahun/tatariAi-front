"use client";
import { ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";
import { useAuth } from "@/hooks/useAuth";


const Projects = () => {

  const { user, isAuthenticated } = useAuth();

  return (
    <section className="bg-background container mx-auto rounded-[1.25rem]">
      <div className="flex flex-col space-y-5 py-5 px-2 md:px-20">
        <div className="space-y-3 md:space-y-4">
          {/* Workspace Section - Only visible when authenticated */}
          {isAuthenticated && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                  <h2 className="text-primary text-[1.375rem] font-medium leading-9">
                    {user?.displayName || "User"}'s Lovable's Workspace
                  </h2>
                  {/* Search and Filter Bar */}
                  <div className="flex items-center gap-4 mb-6">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" />
                      <Input
                        placeholder="Search projects..."
                        className="pl-10 bg-[#FFFFFF01] border-footer-border rounded-lg"
                      />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 px-3 py-2 bg-[#FFFFFF01] border border-footer-border rounded-lg text-13 text-primary hover:bg-accent/10 transition-colors">
                            <span>Last edited</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem>Last edited</DropdownMenuItem>
                          <DropdownMenuItem>Recently created</DropdownMenuItem>
                          <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 px-3 py-2 bg-[#FFFFFF01] border border-footer-border rounded-lg text-13 text-primary hover:bg-accent/10 transition-colors">
                            <span>Newest first</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem>Newest first</DropdownMenuItem>
                          <DropdownMenuItem>Oldest first</DropdownMenuItem>
                          <DropdownMenuItem>Most popular</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 px-3 py-2 bg-[#FFFFFF01] border border-footer-border rounded-lg text-13 text-primary hover:bg-accent/10 transition-colors">
                            <span>All creators</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem>All creators</DropdownMenuItem>
                          <DropdownMenuItem>My projects</DropdownMenuItem>
                          <DropdownMenuItem>Shared with me</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                <button className="text-primary text-13 font-medium leading-5 border border-accent rounded-lg px-2 py-1 transition-colors hover:bg-accent/10">
                  View All
                </button>
              </div>

              {/* Workspace Project Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
              </div>
            </div>
          )}
          <div className="space-y-4">
            <h2 className="text-primary text-[1.375rem] font-medium leading-9">
              From the Community
            </h2>

            {/* Filter Controls */}
            <div className="flex flex-row items-center justify-between gap-4">
              {/* Left side - Dropdowns and Category Tags */}
              <div className="flex flex-row items-center gap-3 flex-wrap">
                {/* Dropdowns - Always visible */}
                <div className="flex gap-2  md:space-x-[14.5rem] flex-1">
                  {/* Popular Dropdown */}
                  <div className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex w-[7.375rem] justify-between items-center gap-2 px-2 py-1 bg-[#FFFFFF01] border border-footer-border rounded-lg text-13 text-primary">
                          <span> Popular</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="absolute top-full left-0 mt-1 z-50 min-w-[120px]"
                      >
                        <DropdownMenuItem>Popular</DropdownMenuItem>
                        <DropdownMenuItem>Newest</DropdownMenuItem>
                        <DropdownMenuItem>Trending</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Discover Dropdown (visible on mobile) */}
                  {/* <div className="relative lg:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex w-[7.375rem] justify-between items-center gap-2 px-2 py-1 bg-[#FFFFFF01] border border-footer-border rounded-lg text-13 text-primary">
                          Discover
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="absolute top-full left-0 mt-1 z-50 min-w-[140px]"
                      >
                        <DropdownMenuItem>Discover</DropdownMenuItem>
                        <DropdownMenuItem>Internal Tools</DropdownMenuItem>
                        <DropdownMenuItem>Website</DropdownMenuItem>
                        <DropdownMenuItem>Personal</DropdownMenuItem>
                        <DropdownMenuItem>Consumer App</DropdownMenuItem>
                        <DropdownMenuItem>B2B</DropdownMenuItem>
                        <DropdownMenuItem>Prototype</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div> */}
                </div>

                {/* Category Tags - Hidden on small screens, visible on large screens */}
                {/* <div className="hidden lg:flex flex-wrap gap-2">
                  <button className="bg-accent rounded-lg px-2 py-1 text-primary text-13 font-medium leading-5 border border-accent transition-colors">
                    Discover
                  </button>
                  <button className="rounded-lg px-2 py-1 text-primary text-13 font-medium leading-5 border border-accent transition-colors">
                    Internal Tools
                  </button>
                  <button className="rounded-lg px-2 py-1 text-primary text-13 font-medium leading-5 border border-accent transition-colors">
                    Website
                  </button>
                  <button className="rounded-lg px-2 py-1 text-primary text-13 font-medium leading-5 border border-accent transition-colors">
                    Personal
                  </button>
                  <button className="rounded-lg px-2 py-1 text-primary text-13 font-medium leading-5 border border-accent transition-colors">
                    Consumer App
                  </button>
                  <button className="rounded-lg px-2 py-1 text-primary text-13 font-medium leading-5 border border-accent transition-colors">
                    B2B
                  </button>
                  <button className="rounded-lg px-2 py-1 text-primary text-13 font-medium leading-5 border border-accent transition-colors">
                    Prototype
                  </button>
                </div> */}
              </div>

              {/* Right side - View All Link */}
              <div className="flex justify-end">
                <button className="rounded-lg px-2 py-1 text-primary text-13 font-medium leading-5 border border-accent transition-colors">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </section>
  );
};

export default Projects;
