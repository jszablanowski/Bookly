package pw.react.backend.externalApi.flatly.models;

import pw.react.backend.enums.SortType;
import pw.react.backend.externalApi.GetItemsBaseDto;

public class FlatlyGetItemsDto extends GetItemsBaseDto {
    public boolean active;
    public SortType sortType;
}
