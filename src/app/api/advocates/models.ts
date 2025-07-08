export interface Advocate {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: number;
}

export interface AdvocatesResponse {
    data: Advocate[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    }
}