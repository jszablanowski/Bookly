package pw.react.backend.dto;

import pw.react.backend.items.FlatItem;
import pw.react.backend.items.ItemBase;

import java.util.List;

public class FlatItemsResponse {
    public int page;
    public List<FlatItem> items;
    public int totalPages;
    public int totalItems;
}
