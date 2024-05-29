"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userLocalStoras from "../../hook/userLocalStoras";
import Snipet from "../loader/Snipet";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const { obtenerLocal } = userLocalStoras();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const type = obtenerLocal("fk_typeuser");

    if (type === "1") {
      router.push("/dashboard/admin");
    } else if (type === "2") {
      router.push("/dashboard/user");
    } else {
      // Manejar otros casos, por ejemplo redirigir al login o mostrar un error
      router.push("/");
    }

    setLoading(false);
  }, [router, obtenerLocal]);

  return <>{loading ? <Snipet /> : <> {children} </>}</>;
};

export default ProtectedRoute;
