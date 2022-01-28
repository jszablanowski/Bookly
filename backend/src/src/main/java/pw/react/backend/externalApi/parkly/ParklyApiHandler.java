package pw.react.backend.externalApi.parkly;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pw.react.backend.enums.SortType;
import pw.react.backend.externalApi.ExternalApiHandler;
import pw.react.backend.externalApi.GetItemsBaseDto;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.User;

import java.util.Date;
import java.util.List;

@Service
public class ParklyApiHandler implements ExternalApiHandler {

    private String baseUri = "https://example.com";
    private String authenticationHeader = "Authentication";
    private String authenticationHeaderValue;
    private RestTemplate restTemplate;
    private String DateFormat = "yyyy-MM-dd'T'HH:mm:ss";
    private ObjectMapper mapper;

    @Autowired
    public ParklyApiHandler(RestTemplate restTemplate)
    {
        this.restTemplate = restTemplate;
        mapper = new ObjectMapper();
        updateAuthorization();
    }
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
    public void updateAuthorization(){

    }
}
