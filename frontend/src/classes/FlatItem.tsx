interface Address {
    id?: number;
    street?: string;
    houseNumber?: string;
    localNumber?: string;
    postalCode?: string;
    city?: string;
}

export interface Facility {
    id?: number;
    name?: string;
}

interface Image {
    id?: number;
    path?: string;
}

export interface FlatItem {
    id: string;
    name?: string;
    rooms?: number;
    numberOfGuests?: number;
    area?: number;
    description?: string;
    address?: Address;
    facilities?: Array<Facility>;
    images?: Array<Image>
}