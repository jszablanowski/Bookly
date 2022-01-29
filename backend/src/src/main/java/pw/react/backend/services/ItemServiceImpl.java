package pw.react.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.react.backend.dto.GetItemsResponse;
import pw.react.backend.enums.ItemType;
import pw.react.backend.externalApi.ExternalApiHandlerResolver;
import pw.react.backend.externalApi.GetItemsBaseDto;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.User;

import java.util.Date;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    private final ExternalApiHandlerResolver apiResolver;
    @Autowired
    public ItemServiceImpl(ExternalApiHandlerResolver apiResolver){
        this.apiResolver = apiResolver;
    }

    @Override
    public GetItemsResponse getItems(GetItemsBaseDto dto) {
        var apiHandler = apiResolver.resolveApiHandler(dto.itemType);
        return apiHandler.getItems(dto);
    }

    @Override
    public ItemBase getItem(String itemId, ItemType type) {
        var apiHandler = apiResolver.resolveApiHandler(type);
        return apiHandler.getItem(itemId);
    }

    @Override
    public int bookItem(User user, Date startDate, int itemId, ItemType type) {
        var apiHandler = apiResolver.resolveApiHandler(type);
        return apiHandler.bookItem(user, startDate, itemId);
    }

    @Override
    public boolean releaseItem(int itemId, ItemType type, int externalBookingId) {
        var apiHandler = apiResolver.resolveApiHandler(type);
        return apiHandler.releaseBooking(itemId, externalBookingId);
    }
}
