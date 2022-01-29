package pw.react.backend.externalApi.carly.models;

import pw.react.backend.enums.SortType;
import pw.react.backend.externalApi.GetItemsBaseDto;

public class CarlyGetItemsDto extends GetItemsBaseDto {
    public String model;
    public String location;
    public String searchText;
    public SortType dateSort;
    public SortType priceSort;
}
