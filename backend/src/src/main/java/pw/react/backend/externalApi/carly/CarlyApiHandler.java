package pw.react.backend.externalApi.carly;

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
import pw.react.backend.externalApi.ExternalApiHandler;
import pw.react.backend.externalApi.GetItemsBaseDto;
import pw.react.backend.externalApi.carly.models.CarlyBookRequest;
import pw.react.backend.externalApi.carly.models.CarlyGetItemsDto;
import pw.react.backend.externalApi.carly.models.CarlyLoginRequest;
import pw.react.backend.externalApi.flatly.models.*;
import pw.react.backend.items.CarItem;
import pw.react.backend.items.FlatItem;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.User;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Integer.parseInt;

@Service
public class CarlyApiHandler implements ExternalApiHandler {

    private String baseUri = "https://pw2021-react-carly-backend.azurewebsites.net";
    private String authenticationHeader = "Authorization";
    private String authenticationHeaderValue;
    private RestTemplate restTemplate;
    private String DateFormat = "yyyy-MM-dd'T'HH:mm:ss";
    private ObjectMapper mapper;

    @Autowired
    public CarlyApiHandler(RestTemplate restTemplate)
    {
        this.restTemplate = restTemplate;
        mapper = new ObjectMapper();
        updateAuthorization();
    }
    @Override
    public List<ItemBase> getItems(GetItemsBaseDto getItemsBaseDto) {

        var flatlyDto = (CarlyGetItemsDto)getItemsBaseDto;
        try {
            var uri = UriComponentsBuilder.fromHttpUrl(baseUri + "/cars")
                    .queryParam("date_sort", "asc")
                    .encode()
                    .toUriString();

            var request = new HttpEntity(buildHeaders());
            var response = restTemplate.exchange(uri, HttpMethod.GET, request, String.class);

            var objJsonObject = new JSONObject(response.getBody());

            var responseData = objJsonObject.getJSONArray("data");
            var items = new ArrayList<ItemBase>();
            responseData.forEach(item -> {
                try {
                    items.add(mapper.readValue(item.toString(), CarItem.class));
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            });
            return items;
        }

        catch (Exception e) {
            return null;
        }
    }

    @Override
    public ItemBase getItem(String itemId) {

        try {
            var uri = UriComponentsBuilder.fromHttpUrl(baseUri + "/cars/" + itemId)
                    .encode()
                    .toUriString();

            var request = new HttpEntity(buildHeaders());
            var response = restTemplate.exchange(uri, HttpMethod.GET, request, CarItem.class);

            return response.getBody();
        }

        catch (Exception e) {
            return null;
        }
    }

    @Override
    public int bookItem(User user, Date startDateTime, int itemId) {
        var df = new SimpleDateFormat(DateFormat);
        var date = df.format(startDateTime);
        int booking;

        var dto = new CarlyBookRequest(){{
            customerFirstName = user.getFirstName();
            customerLastName = user.getLastName();
            endDate = date;
        }};

        try {
            var json = mapper.writeValueAsString(dto);

            var request = new HttpEntity<>(json, buildHeaders());

            var response = restTemplate.postForEntity(baseUri + "/bookings/" + itemId, request,
                    String.class);

            booking = parseInt(response.getBody());
        }

        catch (Exception e)
        {
            return -1;
        }
        return booking;
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
    public void updateAuthorization() {
        var dto = new CarlyLoginRequest(){{
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
