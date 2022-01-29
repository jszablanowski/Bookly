package pw.react.backend.externalApi.flatly.models;

import pw.react.backend.enums.SortType;
import pw.react.backend.externalApi.GetItemsBaseDto;

public class FlatlyGetItemsDto extends GetItemsBaseDto {
    public Boolean sorted;
    public String searchText;
    public String city;
    public String street;
}
