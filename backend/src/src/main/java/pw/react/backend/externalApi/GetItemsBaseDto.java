package pw.react.backend.externalApi;

import pw.react.backend.enums.ItemType;

public class GetItemsBaseDto {
    public ItemType itemType;
    public int page;
    public int pageSize;
}
