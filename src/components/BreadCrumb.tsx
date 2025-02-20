"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();
  const breadCrumbList = pathname.split("/");

  const createLink = (list: string[], index: number) => {
    return list.splice(0, index).join("/");
  };

  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList>
        {breadCrumbList?.map((s: string, index: number) => {
          return (
            <div key={index} className="flex gap-2 items-center">
              <BreadcrumbItem>
                <BreadcrumbLink href={createLink(breadCrumbList, index)}>
                  {!s.length ? "Home" : s}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== breadCrumbList.length && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BreadCrumb;
