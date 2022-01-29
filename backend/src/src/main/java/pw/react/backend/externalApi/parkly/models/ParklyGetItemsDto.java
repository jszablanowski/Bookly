package pw.react.backend.externalApi.parkly.models;

import pw.react.backend.externalApi.GetItemsBaseDto;

public class ParklyGetItemsDto extends GetItemsBaseDto {
    public String city;
    public String street;
    public String parkingName;
    public boolean booked;
}
