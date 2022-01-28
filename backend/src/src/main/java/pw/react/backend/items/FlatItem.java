package pw.react.backend.items;

import java.util.List;

public class FlatItem extends ItemBase{
    public int rooms;
    public int numberOfGuests;
    public int area;
    public String description;
    public FlatAddress address;
    public List<FlatFacility> facilities;
    public List<FlatImage> images;
}

class FlatAddress
{
    public int id;
    public String streetName;
    public String houseNumber;
    public String localNumber;
    public String postalCode;
    public String city;
}

class FlatFacility{
    public int id;
    public String name;
}

class FlatImage{
    public int id;
    public String path;
}
