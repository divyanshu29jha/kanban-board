import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTicketsAndUsers = () => {
    const [tickets, setTickets] = useState(() => JSON.parse(localStorage.getItem('tickets')) || []);
    const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedTickets = localStorage.getItem('tickets');
        const storedUsers = localStorage.getItem('users');

        if (storedTickets && storedUsers) {
            setLoading(false);
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                    const { tickets, users } = response.data;
                    
                    setTickets(tickets);
                    setUsers(users);
                    
                    localStorage.setItem('tickets', JSON.stringify(tickets));
                    localStorage.setItem('users', JSON.stringify(users));

                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching data", err);
                    setError(err);
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, []); 

    return { tickets, users, loading, error };
};

export default useFetchTicketsAndUsers;
