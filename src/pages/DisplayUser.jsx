import React from 'react';
import Ticket from '../components/Ticket';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import useFetchTicketsAndUsers from '../hooks/useFetchTicketsAndUsers';
import { useSelector } from 'react-redux'; 
import '../css/display-user.css';
import AddIcon from '../assets/images/add.svg';
import ThreeDotsIcon from '../assets/images/3 dot menu.svg';

const DisplayUser = () => {
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

    const ticketsByUser = (userId) => {
        return sortTickets(tickets.filter(ticket => ticket.userId === userId));
    };

    const getUserInitials = (name) => {
        const nameParts = name.split(" ");
        if (nameParts.length > 1) {
          return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    };

    if (loading) return <Loader />;
    if (error) return <p>Error loading data</p>;

    return (
      <div className="display-user">
        <Navbar /> 

        <div className="user-columns">
          {users.map((user) => (
            <div key={user.id} className="user-column">
              <div className="user-header">
                <div className="user-header-left">
                    <div className="profile">
                      <div className="profile-picture">{getUserInitials(user.name)}</div>
                      <div className={`status-dot ${user.available ? "online" : ""}`}></div>
                    </div>
                    <div className="user-name"> {user.name} </div>
                    <div className="ticket-count">{ticketsByUser(user.id).length}</div>
                </div>

                <div className="user-header-right">
                  <img
                    src={AddIcon}
                    alt="Add Icon"
                    className="footer-icon icon1"
                  />
                  <img
                    src={ThreeDotsIcon}
                    alt="Three Dots Icon"
                    className="footer-icon"
                  />
                </div>
              </div>
            
              {ticketsByUser(user.id).map((ticket) => (
                <Ticket key={ticket.id} ticket={ticket} user={user} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
};

export default DisplayUser;
