package pw.react.backend.dto;

import pw.react.backend.items.ItemBase;
import pw.react.backend.items.ParkingItem;

import java.util.List;

public class ParkingItemsResponse {
    public int page;
    public List<ParkingItem> items;
    public int totalPages;
    public int totalItems;
}
