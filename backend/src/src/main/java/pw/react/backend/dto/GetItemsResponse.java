package pw.react.backend.dto;

import pw.react.backend.items.ItemBase;

import java.util.List;

public class GetItemsResponse {
    public int page;
    public List<ItemBase> items;
    public int totalPages;
    public int totalItems;
}
