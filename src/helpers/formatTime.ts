const formatTime = (time: string): string => {

    const timeOnly = time?.split('T')[1]?.split('.')[0];
    const timeOnlyWithoutSeconds = timeOnly?.split(':')[0] + ':' + timeOnly?.split(':')[1];

    const  splitTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        let formattedTime = "";
    
        if (hours >= 12) {
            formattedTime += `${hours === 12 ? 12 : hours - 12}`.padStart(2, "0");
            formattedTime += `:${minutes.toString().padStart(2, "0")} PM`;
        } else {
            formattedTime += `${hours === 0 ? 12 : hours}`.padStart(2, "0");
            formattedTime += `:${minutes.toString().padStart(2, "0")} AM`;
        }
    
        return formattedTime;
    
    }

    const formattedTime = splitTime(timeOnlyWithoutSeconds);

    return formattedTime;
};




export default formatTime;
