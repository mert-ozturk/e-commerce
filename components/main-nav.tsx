"use client"

import { cn } from "@/lib/utils"
import { useParams, usePathname } from "next/navigation"

export function MainNav({
    className,
    ...props
}:React.HtmlHTMLAttributes<HTMLElement>){
    const pathname = usePathname();
    const params = useParams()

    const routes = [
        {
            href:`/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        },
    ]
return (
   <nav
   className={cn("flex items-center space-x-4 lg:space-x-6")}
   >

   </nav>
)

}