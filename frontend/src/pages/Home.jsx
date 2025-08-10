import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";
import { AddItemModal } from "../components/AddItemModal";
import { MyItemModal } from "../components/MyItemModal";
import { OtherItemModal } from "../components/OtherItemModal";
import { LoginPromptModal } from "../components/LoginPromptModal";
import getDecodedToken from "../lib/auth";
import api from "../middleware/interceptor";
import { jwtDecode } from "jwt-decode";

const getTokenFromCookies = () => {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const tokenCookie = cookies.find((row) => row.startsWith("jwt="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

const isAuthenticated = () => {
  const token = getTokenFromCookies();
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

const Home = () => {
  const [userItems, setUserItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isItemDetailsModalOpen, setIsItemDetailsModalOpen] = useState(false);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const isAuth = isAuthenticated();

  // decode token into currentUser on mount
  useEffect(() => {
    const decoded = getDecodedToken();
    if (decoded) {
      setCurrentUser({
        userId: decoded.userId,
        name: decoded.fullName,
        college: decoded.college,
        phoneNumber: decoded.phoneNumber,
      });
    } else {
      setCurrentUser(null);
    }
  }, []);

  // fetch items depending on auth state
  useEffect(() => {
    let mounted = true;

    const fetchItems = async () => {
      try {
        if (isAuth) {
          const decoded = currentUser ?? getDecodedToken();
          if (!decoded?.userId) {
            setUserItems([]);
            setOtherItems([]);
            return;
          }

          const [myRes, otherRes] = await Promise.all([
            api.get(`/user/get-my-items?userId=${decoded.userId}`, { withCredentials: true }),
            api.get(`/user/get-other-items?collegeId=${decoded.college}&userId=${decoded.userId}`, { withCredentials: true }),
          ]);

          if (!mounted) return;
          setUserItems(myRes?.data?.success ? myRes.data.items : []);
          setOtherItems(otherRes?.data?.success ? otherRes.data.items : []);
        } else {
          const res = await api.get(`/user/get-all-items`);
          if (!mounted) return;
          setOtherItems(res?.data?.success ? res.data.items : []);
          setUserItems([]);
        }
      } catch (err) {
        console.error("Error fetching items:", err.response?.data?.message || err.message || err);
        if (!isAuth) {
          setOtherItems([]);
          setUserItems([]);
        }
      }
    };

    fetchItems();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.userId]);

  const handleSelectItem = (item, isUserItem) => {
    if (!isAuthenticated()) {
      setIsLoginPromptOpen(true);
      return;
    }
    setSelectedItem(item);
    setIsItemDetailsModalOpen(true);
  };

  const isCurrentUserItem =
    selectedItem && userItems.some((item) => item._id === selectedItem._id);

  return (
    <div>
      <Navbar userName={currentUser?.name} userPhone={currentUser?.phoneNumber} />
      <div className="flex flex-1 overflow-hidden">
        {isAuth && (
          <Sidebar
            items={userItems}
            onSelectItem={(item) => handleSelectItem(item, true)}
            selectedItemId={selectedItem?._id}
            onAddItem={() => {
              if (!isAuthenticated()) {
                setIsLoginPromptOpen(true);
                return;
              }
              setIsAddItemModalOpen(true);
            }}
            currentUserId={currentUser?.userId}
          />
        )}

        <MainContent
          currentUserId={currentUser?.userId}
          allItems={otherItems}
          onSelectItem={(item) => handleSelectItem(item, false)}
        />
      </div>

      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onItemAdded={(newItem) => setUserItems((prev) => [...prev, newItem])}
      />

      {isCurrentUserItem ? (
        <MyItemModal
          isOpen={isItemDetailsModalOpen}
          onClose={() => setIsItemDetailsModalOpen(false)}
          item={selectedItem}
          onUpdateItem={(updated) =>
            setUserItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)))
          }
          onDeleteItem={(id) => setUserItems((prev) => prev.filter((i) => i._id !== id))}
        />
      ) : (
        <OtherItemModal
          isOpen={isItemDetailsModalOpen}
          onClose={() => setIsItemDetailsModalOpen(false)}
          item={selectedItem}
        />
      )}

      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />
    </div>
  );
};

export default Home;
