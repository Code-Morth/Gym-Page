"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import userLocalStoras from "../../hook/userLocalStoras";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const { obtenerLocal } = userLocalStoras();

  useEffect(() => {
    const type = obtenerLocal("typeUser");
    type !== "admin" ?  router.push("/dashboard/admin") : router.push("/dashboard/user")
    
    // type !== "user" ? router.push("/dashboard/user") : ""
    
    
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
