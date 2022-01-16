package pw.react.backend.services;


import pw.react.backend.enums.ItemType;
import pw.react.backend.items.ItemBase;

public interface ItemService {
    ItemBase getItem(String itemId, ItemType type);
}
