type Difficulty = "easy" | "medium" | "hard"
export interface Tour {
    id: string;
    name: string;
    imageCover: string;
    difficulty: Difficulty;
    duration: number;
    summary: string;
    startLocation: {
      description: string;
      address: string;
    };
    startDates: Date[] ;
    locations: any[];
    maxGroupSize: number;
    price: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    description: string;
    images: string[];
    reviews:
    {
      id: string;
      userId: string;
      toursId: string;
      review: string | null;
      rating: number;
      users: {
        id: string;
        name: string;
        toursId: string | null;
        email: string;
        photo: string | null;
        role: string | null;
        password: string;
        active: boolean;
      };
    }[]
  }