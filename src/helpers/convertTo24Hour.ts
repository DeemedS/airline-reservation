const convertTo24Hour = (time12h: string): string => {

    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
  
    if (modifier === 'PM' && hours !== '12') {
      hours = String(parseInt(hours, 10) + 12);
    }
    
    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');
  
    return `${hours}:${minutes}`;
  };

  export default convertTo24Hour;