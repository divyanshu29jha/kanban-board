import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { setGrouping, setOrdering } from '../redux/groupingOrderingSlice'; // Import Redux actions
import '../css/navbar.css';
import DisplayIcon from '../assets/images/Display.svg';
import DownArrowIcon from '../assets/images/down.svg';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const grouping = useSelector((state) => state.groupingOrdering.grouping);
    const ordering = useSelector((state) => state.groupingOrdering.ordering);

    const handleGroupingChange = (e) => {
        const selectedGrouping = e.target.value;
        dispatch(setGrouping(selectedGrouping));  
        if (selectedGrouping === 'Priority') {
            dispatch(setOrdering('Title')); 
        }

        if (selectedGrouping === 'Status') {
            navigate('/status');
        } else if (selectedGrouping === 'User') {
            navigate('/user');
        } else if (selectedGrouping === 'Priority') {
            navigate('/priority');
        }
    };

    const handleOrderingChange = (e) => {
        dispatch(setOrdering(e.target.value)); 
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            const dropdown = document.querySelector('.dropdown');
            const navbarDisplay = document.querySelector('.navbar-display');

            if (dropdown && !dropdown.contains(e.target) && !navbarDisplay.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <div className="navbar">
            <div className="navbar-display" onClick={toggleDropdown}>
                <img src={DisplayIcon} alt="Display Icon" className="navbar-icon" />
                <span>Display</span>
                <img src={DownArrowIcon} alt="Down Arrow" className="navbar-icon right" />
            </div>

            {dropdownOpen && (
                <div className="dropdown">
                    <div className="dropdown-section">
                        <label className="dropdown-name">Grouping</label>
                        <select
                            className="dropdown-values"
                            value={grouping}
                            onChange={handleGroupingChange}
                        >
                            <option value="Status">Status</option>
                            <option value="User">User</option>
                            <option value="Priority">Priority</option>
                        </select>
                    </div>

                    <div className="dropdown-section">
                        <label className="dropdown-name">Ordering</label>
                        <select
                            className="dropdown-values"
                            value={ordering}
                            onChange={handleOrderingChange}
                            disabled={grouping === 'Priority'}
                        >
                            <option value="Title">Title</option>
                            <option value="Priority" disabled={grouping === 'Priority'}>Priority</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;



