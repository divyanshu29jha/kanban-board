export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('groupingOrderingState');
        if (serializedState === null) {  // Fallback default state
            return {
                grouping: 'Status',
                ordering: 'Title',
            }; 
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state from localStorage', err);
        return {   // Fallback default state
            grouping: 'Status',
            ordering: 'Title',
        }; 
    }
};

export const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('groupingOrderingState', serializedState);
    } catch (err) {
        console.error('Error saving state to localStorage', err);
    }
};
