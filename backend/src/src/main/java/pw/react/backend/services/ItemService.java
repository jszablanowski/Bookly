package pw.react.backend.services;


import pw.react.backend.enums.ItemType;
import pw.react.backend.externalApi.GetItemsBaseDto;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.User;

import java.util.Date;
import java.util.List;

public interface ItemService {
    List<ItemBase> getItems(GetItemsBaseDto getItemsBaseDto);
    ItemBase getItem(String itemId, ItemType type);
    int bookItem(User user, Date startDate, int itemId, ItemType type);
    boolean releaseItem(int itemId, ItemType type, int externalBookingId);
}
