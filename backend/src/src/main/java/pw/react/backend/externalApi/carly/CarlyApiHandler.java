package pw.react.backend.externalApi.carly;

import org.springframework.stereotype.Service;
import pw.react.backend.externalApi.ExternalApiHandler;
import pw.react.backend.externalApi.GetItemsBaseDto;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.User;

import java.util.Date;
import java.util.List;

@Service
public class CarlyApiHandler implements ExternalApiHandler {
    @Override
    public List<ItemBase> getItems(GetItemsBaseDto getItemsBaseDto) {
        return null;
    }

    @Override
    public ItemBase getItem(String itemId) {
        return null;
    }

    @Override
    public int bookItem(User user, Date startDateTime, int itemId) {
        return 0;
    }

    @Override
    public boolean releaseBooking(int itemId, int externalBookingId) {
        return false;
    }

    @Override
    public void updateAuthorization() {

    }
}
