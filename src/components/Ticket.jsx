import React from "react";
import { useSelector } from "react-redux";
import '../css/ticket.css'; 
import UrgentPriority from '../assets/images/SVG - Urgent Priority grey.svg';
import HighPriority from '../assets/images/Img - High Priority.svg';
import MediumPriority from '../assets/images/Img - Medium Priority.svg';
import LowPriority from '../assets/images/Img - Low Priority.svg';
import NoPriority from '../assets/images/No-priority.svg';

import BacklogIcon from '../assets/images/Backlog.svg';
import TodoIcon from '../assets/images/To-do.svg';
import InProgressIcon from '../assets/images/in-progress.svg';
import DoneIcon from '../assets/images/Done.svg';
import CancelledIcon from '../assets/images/Cancelled.svg';

const Ticket = ({ ticket, user }) => {
  const grouping = useSelector((state) => state.groupingOrdering.grouping);

  const getUserInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };  

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 0:
        return NoPriority;
      case 1:
        return LowPriority;
      case 2:
        return MediumPriority;
      case 3:
        return HighPriority;
      case 4:
        return UrgentPriority;
      default:
        return LowPriority; 
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return BacklogIcon;
      case 'To-do':
        return TodoIcon;
      case 'In-progress':
        return InProgressIcon;
      case 'Done':
        return DoneIcon;
      case 'Cancelled':
        return CancelledIcon;
      default:
        return TodoIcon;
    }
  };

  return (
    <div className="ticket">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="profile">
          <div className="profile-picture">{getUserInitials(user.name)}</div>
          <div className={`status-dot ${user.available ? "online" : ""}`}></div>
        </div>
      </div>

      <div className="title-container">
        {grouping !== "Status" && (
          <span className="status-icon-box">
            <img
              src={getStatusIcon(ticket.status)}
              alt={ticket.status}
            />
          </span>
        )}
        <div className="ticket-title">
          <span>{truncateText(ticket.title, 7)}</span>
        </div>
      </div>

      <div className="ticket-tag">
        {grouping !== "Priority" && (
          <span className="priority-box">
            <img
              src={getPriorityIcon(ticket.priority)}
              alt="priority-icon"
              className="priority-icon"
            />
          </span>
        )}
        <div className="tag-container">
          <span className="ticket-tag-icon"></span>
          <span className="ticket-tag-text">{ticket.tag[0]}</span>
        </div>
      </div>

    </div>
  );
};

export default Ticket;
