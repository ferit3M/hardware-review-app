export interface Review {
    userId: number,
    componentId: string,
    review: string
    star: number
  }

  export interface getReview {
    createdAt: string,
    review: string,
    star: number,
    user: string
    date: Date
  }
  
  