package pw.react.backend.externalApi;

import pw.react.backend.dto.GetItemsResponse;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.User;

import java.util.Date;
import java.util.List;

public interface ExternalApiHandler {
    GetItemsResponse getItems(GetItemsBaseDto getItemsBaseDto);
    ItemBase getItem(String itemId);
    int bookItem(User user, Date startDateTime, int itemId);
    boolean releaseBooking(int itemId, int externalBookingId);
    void updateAuthorization();
}
