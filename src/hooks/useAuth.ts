import { login } from "@/services/User";
import { setUserAccessToken } from "@/util/authToken";
import { auth } from "@/util/firebaseClient";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [sessionid, setSessionid] = useState<string>("");
  const [historyTab, setHistoryTab] = useState<number>(0);
  const [candidateCount, setCandidateCount] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [credit, setCredit] = useState<number>(200);
  const [demoDone, setDemoDone] = useState(false);
  const [isfetching, setIsFetching] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Listen for authentication state changes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        // Set the username (if available) or email as fallback
        setUserName(user.displayName || user.email);
        setUserPhoto(user.photoURL);

        setUserAccessToken(await user.getIdToken());

        const res = await login(await user.getIdToken());
        setIsFetching(false);
        setCredit(res.credit);
        setDemoDone(res.status);
      } else {
        console.log("No user is signed in");
        setIsFetching(false);
        setUserName(null);
        setUserPhoto(null);
        setUserAccessToken(null);
        // Redirect to '/auth' when no user is logged in
        router.push("/auth");
      }
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setUserName(null); // Clear the user state
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const resetChat = () => {
    setSessionid("");
    setHistoryTab(0);
    setCandidateCount(0);
  };

  return {
    demoDone,
    userName,
    setUserName,
    userPhoto,
    setUserPhoto,
    handleSignOut,
    sessionid,
    setSessionid,
    historyTab,
    setHistoryTab,
    candidateCount,
    setCandidateCount,
    refreshKey,
    setRefreshKey,
    credit,
    setCredit,
    resetChat,
    isfetching,
  };
};
