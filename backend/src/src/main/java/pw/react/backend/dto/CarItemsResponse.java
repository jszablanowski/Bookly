package pw.react.backend.dto;

import pw.react.backend.items.CarItem;
import pw.react.backend.items.ItemBase;

import java.util.List;

public class CarItemsResponse {
    public int page;
    public List<CarItem> items;
    public int totalPages;
    public int totalItems;
}
