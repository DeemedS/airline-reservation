const calculateDuration = (departure: string, arrival: string): string => {
    const departureTime = new Date(departure);
    const arrivalTime = new Date(arrival);
  
    const durationInMinutes = Math.abs(arrivalTime.getTime() - departureTime.getTime()) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);
  
    if (hours === 1 && minutes === 0) {
      return '60 mins';
    }
  
    if (hours === 1) {
      return `${hours} hour ${minutes > 0 ? `${minutes} mins` : ''}`;
    }
  
    if (hours > 1) {
      return `${hours} hours ${minutes > 0 ? `${minutes} mins` : ''}`;
    }
  
    if (minutes > 1) {
      return `${minutes} mins`;
    }
  
    return 'Unknown duration';
  };

export default calculateDuration;