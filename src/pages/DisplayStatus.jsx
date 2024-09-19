import React from 'react';
import Ticket from '../components/Ticket';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import useFetchTicketsAndUsers from '../hooks/useFetchTicketsAndUsers';
import { useSelector } from 'react-redux'; 
import '../css/display-status.css';
import BacklogIcon from '../assets/images/Backlog.svg';
import TodoIcon from '../assets/images/To-do.svg';
import InProgressIcon from '../assets/images/in-progress.svg';
import DoneIcon from '../assets/images/Done.svg';
import CancelledIcon from '../assets/images/Cancelled.svg';
import AddIcon from '../assets/images/add.svg';
import ThreeDotsIcon from '../assets/images/3 dot menu.svg';

const DisplayStatus = () => {
    const { tickets, users, loading, error } = useFetchTicketsAndUsers();
    
    const ordering = useSelector((state) => state.groupingOrdering.ordering); 

    const sortTickets = (tickets) => {
        if (ordering === 'Priority') {
            return tickets.sort((a, b) => b.priority - a.priority);
        } else if (ordering === 'Title') {
            return tickets.sort((a, b) => a.title.localeCompare(b.title)); 
        }
        return tickets;
    };

    const ticketsByStatus = (status) => {
        return sortTickets(tickets.filter(ticket => ticket.status === status));
    };

    if (loading) return <Loader />;
    if (error) return <p>Error loading data</p>;

    return (
        <div className="display-status">
            <Navbar />

            <div className="status-columns">
                {[
                    { status: 'Backlog', icon: BacklogIcon },
                    { status: 'Todo', icon: TodoIcon },
                    { status: 'In progress', icon: InProgressIcon },
                    { status: 'Done', icon: DoneIcon },
                    { status: 'Cancelled', icon: CancelledIcon }
                ].map(({ status, icon }) => (
                    <div key={status} className="status-column">
                        <div className="status-header">
                            <div className="status-header-left">
                                <img src={icon} alt={`${status} Icon`} className="status-icon" />
                                <div className="status-name"> {status} </div>
                                <div className="ticket-count"> {ticketsByStatus(status).length} </div>
                            </div>
                            <div className="status-header-right">
                                {status !== 'Cancelled' && (
                                    <>
                                        <img src={AddIcon} alt="Add Icon" className="footer-icon icon1" />
                                        <img src={ThreeDotsIcon} alt="Three Dots Icon" className="footer-icon" />
                                    </>
                                )}
                            </div>
                        </div>
                        {ticketsByStatus(status).map(ticket => {
                            const user = users.find(u => u.id === ticket.userId);
                            return <Ticket key={ticket.id} ticket={ticket} user={user} />;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayStatus;
