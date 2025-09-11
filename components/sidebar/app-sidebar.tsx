"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Command,
  LayoutDashboard,
  SquareChartGantt,
  Settings,
  CircleQuestionMark,
  Database,
  ClipboardPlus,
  Users,
} from "lucide-react";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavDocuments } from "./nav-documents";
import Link from "next/link";

const data = {
  user: {
    name: "Angus Williamson",
    email: "angus@spotfake.ai",
    avatar: "/profile.png",
  },
  navMain: [
    {
      title: "Homepage",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    // {
    //   title: "Gallery",
    //   url: "/gallery",
    //   icon: Images,
    // },
    // {
    //   title: "Queue",
    //   url: "/queue",
    //   icon: SquareChartGantt,
    // },
    // {
    //   title: "Profile",
    //   url: "/profile",
    //   icon: UserPen,
    // },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: CircleQuestionMark,
    },
  ],
  navDocuments: [
    {
      name: "Data Library",
      url: "/data-library",
      icon: Database,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: ClipboardPlus,
    },
  ],
  navManager: [
    {
      name: "Cases",
      url: "/cases",
      icon: SquareChartGantt,
    },
    {
      name: "Investigators",
      url: "/investigators",
      icon: Users,
    },
  ],
};

export function AppSidebar({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">SpotFake.AI</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments projects={data.navManager} label="Manager" />
        <NavDocuments projects={data.navDocuments} label="Projects" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
