"use client";
import {
  ClipboardType,
  Contact,
  DoorOpen,
  LucideIcon,
  Send,
} from "lucide-react";
import { ChevronDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const helpItems = [
  {
    title: "Feedback",
    url: "/feedback",
    icon: Send,
    type: ["admin", "faculty", "student"],
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Contact,
    type: ["admin", "faculty", "student"],
  },
];
const applicationItems = [
  {
    title: "Create Room",
    url: "/faculty",
    icon: DoorOpen,
    type: ["admin", "faculty"],
  },
  {
    title: "Attendance",
    url: "/student",
    icon: ClipboardType,
    type: ["student", "admin"],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [open, setOpen] = useState(true);

  const userRole = user?.publicMetadata?.role as string;

  if (pathname.includes("sign-in") || pathname.includes("sign-up")) {
    return <> </>;
  }

  return (
    <>
      <Sidebar variant="sidebar" side="left">
        <SidebarHeader className="ml-auto" onClick={() => setOpen(false)}>
          <SidebarTrigger></SidebarTrigger>
        </SidebarHeader>
        <SidebarContent>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel>
                <CollapsibleTrigger className="w-full flex justify-between items-center">
                  Application
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {applicationItems.map(
                      (item: {
                        type: string[];
                        icon: LucideIcon;
                        title: string;
                        url: string;
                      }) => {
                        if (item.type.includes(userRole))
                          return (
                            <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton asChild>
                                <a href={item.url}>
                                  <item.icon />
                                  <span>{item.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                      },
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="w-full flex justify-between items-center">
                  Help
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {helpItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
      </Sidebar>
      {!open && (
        <SidebarHeader
          onClick={() => setOpen(true)}
          className="transition-all duration-700"
        >
          <SidebarTrigger></SidebarTrigger>
        </SidebarHeader>
      )}
    </>
  );
}
