const handleDateChange = (text: string) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned?.length > 2) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned?.length > 5) {
        cleaned = cleaned.slice(0, 5) + '/' + cleaned.slice(5);
    }
    if (cleaned?.length > 10) {
        cleaned = cleaned.slice(0, 10);
    }

    return cleaned;
};

export default handleDateChange;