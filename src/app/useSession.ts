import  { useEffect, useState } from "react";
import { getSession } from "@/lib/actions";
import { usePathname } from "next/navigation";
import { SessionData } from "./types";
const useSession = () => {
  const pathName = usePathname();
  const [session, setSession] = useState<SessionData | null>();
  useEffect(() => {
    async function fetchSession() {
      const sessions = await getSession();
      setSession(sessions);
    }
    fetchSession();
  }, [pathName]);
  return session;
};

export default useSession;
