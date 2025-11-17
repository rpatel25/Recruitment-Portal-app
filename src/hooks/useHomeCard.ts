/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { deleteSearchApi, saveSearchApi } from "@/services/Chatbot";
import { getRecentSearch, getSavedSearch } from "@/services/ChatSearch";
import { getUserAccessToken } from "@/util/authToken";
import { getTimeDifference } from "@/util/handleDateTime";
import { CardData } from "@/util/Types";
import { useEffect, useState } from "react";

export const useHomeCard = (tab: number) => {
  const [selectedTab, setSelectedTab] = useState(-1);
  const [snackbar, setSnackbar] = useState({ show: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(false);
  const [menuSelected, setMenuSelected] = useState(false);
  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    console.log("Function running on page load! With tab number:", tab);

    const interval = setInterval(() => {
      if (getUserAccessToken() != null && !menuSelected) {
        menuSelect(tab);
        setMenuSelected(true); // Mark menu as selected to stop the loop
      }
    }, 500); // Runs every 500ms until menuSelect is called

    return () => clearInterval(interval); // Cleanup on unmount
  }, [menuSelected]);

  const menuSelect = async (index: number) => {
    if (selectedTab === index) return;
    setSelectedTab(index);
    try {
      if (index == 0) {
        // Call API to get recent searches
        setCardData([]);
        const data = await getRecentSearch();
        if (data["data"]) {
          const updatedData = data["data"].map((card: CardData) => ({
            ...card,
            time: getTimeDifference(card.creeated_at),
          }));
          setCardData(updatedData);
        }
        setIsLoading(false);
      } else if (index == 1) {
        // Call API to get recent searches
        setCardData([]);
        const data = await getSavedSearch();
        if (data["data"]) {
          const updatedData = data["data"].map((card: CardData) => ({
            ...card,
            time: getTimeDifference(card.creeated_at),
          }));
          setCardData(updatedData);
        }
        setIsLoading(false);
      } else {
        setCardData([]);
      }
    } catch (error) {
      console.error("Error fetching searches:", error);
      // alert('Error fetching searches');
      setSnackbar({ show: true, message: "Error fetching searches" });
    }
  };

  const onSort = () => {
    setCardData((prevData) =>
      [...prevData].sort((a, b) =>
        sortAscending
          ? new Date(a.creeated_at).getTime() -
            new Date(b.creeated_at).getTime()
          : new Date(b.creeated_at).getTime() -
            new Date(a.creeated_at).getTime()
      )
    );
    setSortAscending(!sortAscending); // Toggle sorting order
  };

  const allSelected =
    cardData.length > 0 && cardData.every((card) => card.select);

  async function saveSearch(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    try {
      const selectedCards = cardData.filter((card) => card.select);
      const chatbox_ids = selectedCards.map((card) => card.chatbox_id);
      if (chatbox_ids.length === 0) {
        // alert("No searches selected to save.");
        setSnackbar({ show: true, message: "No searches selected to save." });
        return;
      }

      const response = await saveSearchApi(chatbox_ids);

      setSnackbar({ show: true, message: "Searches saved successfully" });
    } catch (error) {
      console.error("Error saving searches:", error);
      // alert('Error saving searches');
      setSnackbar({ show: true, message: "Error saving searches" });
    }
  }

  async function deleteSearch(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    try {
      const selectedCards = cardData.filter((card) => card.select);
      const chatbox_ids = selectedCards.map((card) => card.chatbox_id);
      if (chatbox_ids.length === 0) {
        // alert("No searches selected to delete.");
        setSnackbar({ show: true, message: "No searches selected to delete." });
        return;
      }

      const response = await deleteSearchApi(chatbox_ids);

      // alert('Searches deleted successfully');
      setSnackbar({ show: true, message: "Searches deleted successfully" });

      const temp = selectedTab;
      // await menuSelect(-1);
      // await menuSelect(temp);
      setCardData((prevData) =>
        prevData.filter((card) => !chatbox_ids.includes(card.chatbox_id))
      );
    } catch (error) {
      console.error("Error deleting searches:", error);
      // alert('Error deleting searches');
      setSnackbar({ show: true, message: "Error deleting searches" });
    }
  }

  return {
    allSelected,
    cardData,
    deleteSearch,
    isLoading,
    menuSelect,
    onSort,
    saveSearch,
    selectedTab,
    setCardData,
    setSnackbar,
    snackbar,
  };
};
