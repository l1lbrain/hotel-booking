import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUser, useAuth} from '@clerk/clerk-react';
import {toast} from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // const [loading, setLoading] = useState(false);

    const currency = import.meta.env.VITE_CURRENCY || '₫';
    const navigate = useNavigate();
    const {user, isLoaded} = useUser();
    const { getToken } = useAuth();

    const [isAdmin, setIsAdmin] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [rooms, setRooms] = useState([]);

    const fetchRoomsData = async (query="") => {
        try {
            // setLoading(true);
            
            const url = query ? `/api/rooms?${query}` : '/api/rooms';

            const {data} = await axios.get(url);
            if (data.success) {
                setRooms(data.rooms);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            // setLoading(false);
        }
    }

    const fetchUserRole = async () => {
        try {
            const {data} = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })
            if (data.success) {
                setIsAdmin(data.role === 'admin');
            } else {
                setTimeout(() => {
                    fetchUserRole();
                }, 5000)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserRole();
        }
    }, [user]);

    useEffect(() => {
        fetchRoomsData();
    }, []);

    const value = {
        axios,
        currency,
        navigate,
        user,
        isLoaded,
        getToken,
        isAdmin,
        setIsAdmin,
        showDashboard,
        setShowDashboard,
        rooms,
        setRooms,
        fetchRoomsData,
    };

    // if (loading) {
    //     return <LoadingSpinner fullScreen={true} />
    // }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
