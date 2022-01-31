package pw.react.backend.externalApi.flatly;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import pw.react.backend.dto.GetItemsResponse;
import pw.react.backend.enums.SortType;
import pw.react.backend.externalApi.ExternalApiHandler;
import pw.react.backend.externalApi.GetItemsBaseDto;
import pw.react.backend.externalApi.flatly.models.*;
import pw.react.backend.items.FlatItem;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.User;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static java.lang.Integer.parseInt;

@Service
public class FlatlyApiHandler implements ExternalApiHandler {

    private String baseUri = "https://backend.flatly.online/api/v1";
    private String authenticationHeader = "Authentication";
    private String authenticationHeaderValue;
    private RestTemplate restTemplate;
    private String DateFormat = "yyyy-MM-dd'T'HH:mm:ss";
    private ObjectMapper mapper;

    @Autowired
    public FlatlyApiHandler(RestTemplate restTemplate)
    {
        this.restTemplate = restTemplate;
        mapper = new ObjectMapper();
        updateAuthorization();
    }

    @Override
    public GetItemsResponse getItems(GetItemsBaseDto baseDto)
    {
        var flatlyDto = (FlatlyGetItemsDto)baseDto;
        try {
            var uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUri + "/flats")
                    .queryParam("page", flatlyDto.page);
            if (flatlyDto.sorted != null)
                uriBuilder = uriBuilder
                        .queryParam("sorted", flatlyDto.sorted);
            if (flatlyDto.searchText != null)
                uriBuilder = uriBuilder
                        .queryParam("search", flatlyDto.searchText);
            if (flatlyDto.city != null)
                uriBuilder = uriBuilder
                        .queryParam("city", flatlyDto.city);
            if (flatlyDto.street != null)
                uriBuilder = uriBuilder
                        .queryParam("street", flatlyDto.street);
            var uri = uriBuilder
                    .encode()
                    .toUriString();

            var request = new HttpEntity(buildHeaders());
            var response = restTemplate.exchange(uri, HttpMethod.GET, request, String.class);

            var objJsonObject = new JSONObject(response.getBody());

            var responseData = objJsonObject.getJSONArray("data");
            var responseItems = new ArrayList<ItemBase>();
             responseData.forEach(item -> {
                try {
                    var readItem = mapper.readValue(item.toString(), FlatItem.class);
                    if (readItem.active == true)
                        responseItems.add(readItem);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            });

             var pagination = objJsonObject.getJSONObject("pagination");
             return new GetItemsResponse(){{
                 items = responseItems;
                 page = parseInt(pagination.get("page").toString());
                 totalPages = parseInt(pagination.get("totalPages").toString());
                 totalItems = responseItems.size();
             }};
        }

        catch (Exception e) {
            return null;
        }
    }

    @Override
    public ItemBase getItem(String itemId) {
        try {

            var request = new HttpEntity<>(buildHeaders());

            var response = restTemplate.exchange(baseUri + "/flats/" + itemId, HttpMethod.GET, request,
                    FlatItem.class);

            return response.getBody();
        }

        catch (Exception e)
        {
            return null;
        }
    }

    @Override
    public int bookItem(User user, Date startDate, int itemId){
        var df = new SimpleDateFormat(DateFormat);
        var date = df.format(startDate);
        BookResponse booking;

        var dto = new BookRequest(){{
            userData = user.getFirstName() + user.getLastName();
            startDateTime = date;
            flat = new Flat(){{
                id = itemId;
            }};
        }};

        try {
            var json = mapper.writeValueAsString(dto);

            var request = new HttpEntity<>(json, buildHeaders());

            var response = restTemplate.postForEntity(baseUri + "/bookings", request,
                    BookResponse.class);

            booking = response.getBody();
        }

        catch (Exception e)
        {
            return -1;
        }
        return booking.id;
    }

    @Override
    public boolean releaseBooking(int itemId, int externalBookingId) {
        try {
            var request = new HttpEntity<>(buildHeaders());

            var response = restTemplate.exchange(baseUri + "/bookings/" + externalBookingId, HttpMethod.DELETE, request,
                    String.class);
        }

        catch (Exception e)
        {
            return false;
        }

        return true;
    }

    @Override
    public void updateAuthorization(){

        var dto = new LoginRequest(){{
        login = "external@admin.com";
        password = "password";
        }};
        try {
            var json = mapper.writeValueAsString(dto);

            var request = new HttpEntity<>(json, buildHeaders());

            var response = restTemplate.postForEntity(baseUri + "/auth/login", request,
                    String.class);

            var objJsonObject = new JSONObject(response.getBody());

            authenticationHeaderValue = objJsonObject.getString("value");
        }

        catch(Exception e) {

        }
    }

    private HttpHeaders buildHeaders()
    {
        var headers = new HttpHeaders();
        headers.add(authenticationHeader, authenticationHeaderValue);
        headers.add("Content-Type", "application/json");
        return headers;
    }
}
