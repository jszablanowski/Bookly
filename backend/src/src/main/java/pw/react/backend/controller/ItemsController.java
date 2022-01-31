package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.dto.CarItemsResponse;
import pw.react.backend.dto.FlatItemsResponse;
import pw.react.backend.dto.ParkingItemsResponse;
import pw.react.backend.enums.ItemType;
import pw.react.backend.enums.SortType;
import pw.react.backend.externalApi.carly.models.CarlyGetItemsDto;
import pw.react.backend.externalApi.flatly.models.FlatlyGetItemsDto;
import pw.react.backend.externalApi.parkly.models.ParklyGetItemsDto;
import pw.react.backend.items.CarItem;
import pw.react.backend.items.FlatItem;
import pw.react.backend.items.ParkingItem;
import pw.react.backend.services.ItemService;

import java.util.List;

@RestController
@RequestMapping(path = "/items")
@Profile({"jwt"})
public class ItemsController {
    private final Logger logger = LoggerFactory.getLogger(ItemsController.class);

    private final ItemService itemService;

    @Autowired
    public ItemsController(ItemService itemService)
    {
        this.itemService = itemService;
    }

    @GetMapping(path = "/flat")
    public ResponseEntity<FlatItemsResponse> getFlatItems(@RequestParam(name = "page") int pageParam,
                                                          @RequestParam(name = "sorted", required=false) Boolean sortedParam,
                                                          @RequestParam(name = "text", required=false) String searchTextParam,
                                                          @RequestParam(name = "city", required = false) String cityParam,
                                                          @RequestParam(name = "street", required = false) String streetParam)
    {
        var flats = itemService.getItems(new FlatlyGetItemsDto(){{
            itemType = ItemType.ROOM;
            sorted = sortedParam;
            page = pageParam;
            searchText = searchTextParam;
            city = cityParam;
            street = streetParam;
        }});

        var response = new FlatItemsResponse(){{
            page = flats.page;
            totalPages = flats.totalPages;
            items = (List<FlatItem>)(Object)flats.items;
            totalItems = flats.totalPages;
        }};
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/car")
    public ResponseEntity<CarItemsResponse> getCarItems(@RequestParam(name = "model", required=false) String modelParam,
                                                        @RequestParam(name = "location", required=false) String locationParam,
                                                        @RequestParam(name = "text", required=false) String searchTextParam,
                                                        @RequestParam(name = "dateSort", required=false) SortType dateSortParam,
                                                        @RequestParam(name = "priceSort", required=false) SortType priceSortParam,
                                                        @RequestParam(name = "page") int pageParam,
                                                        @RequestParam(name = "pageSize") int pageSizeParam)
    {
        var cars = itemService.getItems(new CarlyGetItemsDto(){{
            itemType = ItemType.CAR;
            model = modelParam;
            location = locationParam;
            searchText = searchTextParam;
            dateSort = dateSortParam;
            priceSort = priceSortParam;
            page = pageParam;
            pageSize = pageSizeParam;
        }});

        var response = new CarItemsResponse(){{
            page = cars.page;
            totalPages = cars.totalPages;
            items = (List<CarItem>)(Object)cars.items;
            totalItems = cars.totalPages;
        }};
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/parking")
    public ResponseEntity<ParkingItemsResponse> getParkingItems(@RequestParam(name = "active", required=false) Boolean activeParam,
                                                                @RequestParam(name = "page") int pageParam,
                                                                @RequestParam(name = "pageSize") int pageSizeParam)
    {
        var parkings = itemService.getItems(new ParklyGetItemsDto(){{
            itemType = ItemType.PARKING;
            active = activeParam;
            page = pageParam;
            pageSize = pageSizeParam;
        }});

        var response = new ParkingItemsResponse(){{
            page = parkings.page;
            totalPages = parkings.totalPages;
            items = (List<ParkingItem>)(Object)parkings.items;
            totalItems = parkings.totalPages;
        }};
        return ResponseEntity.ok(response);
    }
}
