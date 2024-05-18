const formatDate = (dateString: string | null): string => {
    if (dateString === null) {
      return "Invalid Date";
    }
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  
    return formattedDate;
  };

export default formatDate;