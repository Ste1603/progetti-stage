"use client";
import cn from "clsx";
import Like from "@assets/like.svg";
import Home from "@assets/home.svg"
import Verified from "@assets/verified.svg"
const Stat = () => {
  return (
    <div className={cn(
      "hidden w-auto h-full flex items-center flex-col text-blue-100 font-bold text-md px-4", "md:block"
    )}>
       
      <div className="h-1/3 w-auto  flex items-center gap-2 relative">
        <Like className="h-[60%] w-auto" />
        <p>Più di 100.000 clienti soddisfatti</p>
      </div>
      <div className="h-1/3 w-auto flex items-center gap-2 relative">
        <Home className="h-[60%] w-auto" />
        <p>Servizio direttamente a casa</p>
      </div>
      <div className="h-1/3 w-auto flex items-center gap-2 relative">
        <Verified className="h-[60%] w-auto" />
        <p>Prodotti professionali e di qualità</p>
      </div>


   </div>
  )
}

export default Stat