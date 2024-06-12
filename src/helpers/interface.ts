interface Flight {
    _id: string;
    from: string;
    to: string;
    date: string;
    arrival: string;
    departure: string;
    code: string;
    fare: string;
  }
  
  interface User {
    firstname: string;
    lastname: string;
    middlename: string;
    nationality: string;
    gender: string;
    birthday: string;
    username: string;
    email: string;
    role: string;
  }
  
  interface Reservation {
    _id: string;
    departureFlightId: string;
    returnFlightId: string;
    seatCode: string;
    bookedDate: Date;
    userID: string;
    guestInfo: {
        firstName: string,
        lastName: string,
        middleName: string,
        birthday: string,
        age: string,
        nationality: string,
        gender: string,
        email: string,
        phone: string, 
        secondaryPhone: string,
        addressline1: string,
        addressline2: string,
        city: string,
        region: string,
        zip: string,},
    bookingData: {
        selectedPackage: string,
        packageCost: number,
        referenceNumber: string,
    },
    paymentStatus: string,
  }
  
  interface DepartureFlight {
    from: string;
    to: string;
    date: Date;
    arrival: Date;
    departure: Date;
    code: string;
    fare: number;
  }
  
  interface ReturnFlight {
    from: string;
    to: string;
    date: Date;
    arrival: Date;
    departure: Date;
    code: string;
    fare: number;
  }
  
  interface Booking {
    departureFlight: DepartureFlight
    returnFlight: ReturnFlight
    reservation: Reservation
  }

 export type { Flight, User, Reservation, DepartureFlight, ReturnFlight, Booking };