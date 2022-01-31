package pw.react.backend.externalApi.parkly;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import pw.react.backend.dto.GetItemsResponse;
import pw.react.backend.enums.SortType;
import pw.react.backend.externalApi.ExternalApiHandler;
import pw.react.backend.externalApi.GetItemsBaseDto;
import pw.react.backend.externalApi.carly.models.CarlyBookRequest;
import pw.react.backend.externalApi.carly.models.CarlyGetItemsDto;
import pw.react.backend.externalApi.flatly.models.LoginRequest;
import pw.react.backend.externalApi.parkly.models.ParklyBookRequest;
import pw.react.backend.externalApi.parkly.models.ParklyGetItemsDto;
import pw.react.backend.externalApi.parkly.models.ParklyLoginRequest;
import pw.react.backend.items.CarItem;
import pw.react.backend.items.ItemBase;
import pw.react.backend.items.ParkingItem;
import pw.react.backend.models.User;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Integer.parseInt;

@Service
public class ParklyApiHandler implements ExternalApiHandler {

    private String baseUri = "https://parkly-backend.azurewebsites.net";
    private String authenticationHeader = "Authorization";
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
    public GetItemsResponse getItems(GetItemsBaseDto getItemsBaseDto) {
        var parklyGetItemsDto = (ParklyGetItemsDto) getItemsBaseDto;
        try {
            var uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUri + "/parking-spots")
                    .queryParam("page-number", parklyGetItemsDto.page - 1)
                    .queryParam("page-size", parklyGetItemsDto.pageSize);
            if (parklyGetItemsDto.active != null)
                uriBuilder = uriBuilder
                        .queryParam("booked", !parklyGetItemsDto.active);

            var uri = uriBuilder
                    .encode()
                    .toUriString();

            var request = new HttpEntity(buildHeaders());
            var response = restTemplate.exchange(uri, HttpMethod.GET, request, String.class);

            var objJsonObject = new JSONObject(response.getBody());

            var responseData = objJsonObject.getJSONArray("parkingSpots");
            var responseItems = new ArrayList<ItemBase>();
            responseData.forEach(item -> {
                try {
                    responseItems.add(mapper.readValue(item.toString(), ParkingItem.class));
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            });
            return new GetItemsResponse() {
                {
                    items = responseItems;
                    page = objJsonObject.getInt("currentPage") + 1;
                    totalPages = objJsonObject.getInt("totalPages");
                    totalItems = responseItems.size();
                }
            };
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public ItemBase getItem(String itemId) {
        try {
            var uri = UriComponentsBuilder.fromHttpUrl(baseUri + "/parking-spots/" + itemId)
                    .encode()
                    .toUriString();

            var request = new HttpEntity(buildHeaders());
            var response = restTemplate.exchange(uri, HttpMethod.GET, request, ParkingItem.class);

            return response.getBody();
        }

        catch (Exception e) {
            return null;
        }
    }

    @Override
    public int bookItem(User user, Date startDateTime, int itemId) {
        int booking;

        var dto = new ParklyBookRequest(){{
            ownerName = user.getFirstName() + user.getLastName();
            ownerId = user.getId().intValue();
        }};

        try {
            var json = mapper.writeValueAsString(dto);

            var request = new HttpEntity<>(json, buildHeaders());

            var response = restTemplate.postForEntity(baseUri + "/parking-spots/" + itemId + "/book",
                    request, String.class);

            booking = parseInt(response.getBody());
        }

        catch (Exception e) {
            return -1;
        }
        return booking;
    }

    @Override
    public boolean releaseBooking(int itemId, int externalBookingId) {
        try {
            var request = new HttpEntity<>(buildHeaders());

            var response = restTemplate.exchange(baseUri + "/parking-spots/" + itemId +
                            "/release", HttpMethod.POST, request, String.class);
        }

        catch (Exception e) {
            return false;
        }

        return true;
    }

    @Override
    public void updateAuthorization() {
        var dto = new ParklyLoginRequest(){{
            username = "bookly";
            password = "bookly";
        }};
        try {
            var json = mapper.writeValueAsString(dto);

            var request = new HttpEntity<>(json, buildHeaders());

            var response = restTemplate.postForEntity(baseUri + "/authenticate", request,
                    String.class);

            var objJsonObject = new JSONObject(response.getBody());

            authenticationHeaderValue = "Bearer " + objJsonObject.getString("jwttoken");
        }

        catch (Exception e) {

        }

    }

    private HttpHeaders buildHeaders() {
        var headers = new HttpHeaders();
        headers.add(authenticationHeader, authenticationHeaderValue);
        headers.add("Content-Type", "application/json");
        return headers;
    }
}
