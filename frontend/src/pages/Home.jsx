import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";
import { AddItemModal } from "../components/AddItemModal";
import { MyItemModal } from "../components/MyItemModal";
import { OtherItemModal } from "../components/OtherItemModal";
import getDecodedToken from "../lib/auth";
import api from "../middleware/interceptor";

const Home = () => {
    const [userItems, setUserItems] = useState([]);
    var [otherItems, setOtherItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isItemDetailsModalOpen, setIsItemDetailsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const decodedUser = getDecodedToken();
        if (decodedUser) {
            setCurrentUser({
                userId: decodedUser.userId,
                name: decodedUser.fullName,
                profilePic: decodedUser.profilePhoto || "/placeholder.svg?height=32&width=32",
                college: decodedUser.college,
            });
        }
    }, []);

    useEffect(() => {
        if (!currentUser?.userId) return;

        const fetchUserItems = async () => {
            try {
                const response = await api.get(
                    `/user/get-my-items?userId=${currentUser.userId}`,
                    { withCredentials: true }
                );
                if (response.data.success) {
                    setUserItems(response.data.items);
                }
            } catch (error) {
                console.error("Error fetching user items:", error.response?.data?.message || error.message);
            }
        };

        const fetchOtherItems = async () => {
            try {
                const response = await api.get(
                    `/user/get-other-items?collegeId=${currentUser.college}&userId=${currentUser.userId}`,
                );
                if (response.data.success) {
                    setOtherItems(response.data.items);
                }
            } catch (error) {
                console.error("Error fetching other users' items:", error.response?.data?.message || error.message);
            }
        };

        fetchUserItems();
        fetchOtherItems();
    }, [currentUser?.userId]);

    const handleAddItem = (newItem) => {
        
        setUserItems((prevItems) => [...prevItems, newItem]); // Append new item
    };

    const handleUpdateItem = (updatedItem) => {
        setUserItems(userItems.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
    };

    const handleDeleteItem = (itemId) => {
        setUserItems((prevItems) => prevItems.filter(item => item._id !== itemId));
    };

    const handleSelectItem = (item, isUserItem) => {
        setSelectedItem(item);
        setIsItemDetailsModalOpen(true);
    };

    const handleCloseItemDetails = () => {
        setIsItemDetailsModalOpen(false);
    };

    const isCurrentUserItem = selectedItem && userItems.some((item) => item._id === selectedItem._id);

    return (
        <div>
            <Navbar userName={currentUser?.name} userProfilePic={currentUser?.profilePic} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    items={userItems}
                    onSelectItem={(item) => handleSelectItem(item, true)}
                    selectedItemId={selectedItem?._id}
                    onAddItem={() => setIsAddItemModalOpen(true)}
                    currentUserId={currentUser?.userId}
                />
                <MainContent
                    currentUserId={currentUser?.userId}
                    allItems={otherItems}
                    // userItems={userItems}
                    onSelectItem={(item) => handleSelectItem(item, false)}
                />
            </div>
            <AddItemModal
                isOpen={isAddItemModalOpen}
                onClose={() => setIsAddItemModalOpen(false)}
                onAddItem={handleAddItem}
            />
            {isCurrentUserItem ? (
                <MyItemModal
                    isOpen={isItemDetailsModalOpen}
                    onClose={handleCloseItemDetails}
                    item={selectedItem}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                />
            ) : (
                <OtherItemModal isOpen={isItemDetailsModalOpen} onClose={handleCloseItemDetails} item={selectedItem} />
            )}
        </div>
    );
};

export default Home;
