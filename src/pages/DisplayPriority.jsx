import React from 'react';
import Ticket from '../components/Ticket';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import useFetchTicketsAndUsers from '../hooks/useFetchTicketsAndUsers';
import { useSelector } from 'react-redux'; // Import useSelector from Redux
import '../css/display-priority.css';
import UrgentIcon from '../assets/images/SVG - Urgent Priority grey.svg';
import HighIcon from '../assets/images/Img - High Priority.svg';
import MediumIcon from '../assets/images/Img - Medium Priority.svg';
import LowIcon from '../assets/images/Img - Low Priority.svg';
import NoPriorityIcon from '../assets/images/No-priority.svg';
import AddIcon from '../assets/images/add.svg';
import ThreeDotsIcon from '../assets/images/3 dot menu.svg';

const DisplayPriority = () => {
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

    const ticketsByPriority = (priority) => {
        return sortTickets(tickets.filter(ticket => {
            switch (priority) {
                case 'Urgent':
                    return ticket.priority === 4;
                case 'High':
                    return ticket.priority === 3;
                case 'Medium':
                    return ticket.priority === 2;
                case 'Low':
                    return ticket.priority === 1;
                case 'No priority':
                    return ticket.priority === 0;
                default:
                    return false;
            }
        }));
    };

    if (loading) return <Loader />;
    if (error) return <p>Error loading data!</p>;

    return (
        <div className="display-priority">
            <Navbar /> 

            <div className="priority-columns">
                {[  
                    { priority: 'No priority', icon: NoPriorityIcon },
                    { priority: 'Urgent', icon: UrgentIcon },
                    { priority: 'High', icon: HighIcon },
                    { priority: 'Medium', icon: MediumIcon },
                    { priority: 'Low', icon: LowIcon },
                ].map(({ priority, icon }) => (
                    <div key={priority} className="priority-column">
                        <div className="priority-header">
                            <div className="priority-header-left"> 
                                <img src={icon} alt={`${priority} Icon`} className="priority-icon" />
                                <div className="priority-name"> {priority} </div>
                                <div className="ticket-count"> {ticketsByPriority(priority).length} </div>
                            </div>
                            <div className="priority-header-right">
                                {priority !== 'No priority' && (
                                    <>
                                        <img src={AddIcon} alt="Add Icon" className="footer-icon icon1" />
                                        <img src={ThreeDotsIcon} alt="Three Dots Icon" className="footer-icon" />
                                    </>
                                )}
                            </div>
                        </div>
                        {ticketsByPriority(priority).map(ticket => {
                            const user = users.find(u => u.id === ticket.userId);
                            return <Ticket key={ticket.id} ticket={ticket} user={user} />;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayPriority;

