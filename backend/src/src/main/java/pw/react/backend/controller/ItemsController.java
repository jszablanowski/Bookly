package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.dto.GetItemsResponse;
import pw.react.backend.enums.ItemType;
import pw.react.backend.enums.SortType;
import pw.react.backend.externalApi.carly.models.CarlyGetItemsDto;
import pw.react.backend.externalApi.flatly.models.FlatlyGetItemsDto;
import pw.react.backend.externalApi.parkly.models.ParklyGetItemsDto;
import pw.react.backend.items.ItemBase;
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
    public ResponseEntity<GetItemsResponse> getFlatItems(@RequestParam(name = "page") int pageParam,
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
        return ResponseEntity.ok(flats);
    }

    @GetMapping(path = "/car")
    public ResponseEntity<GetItemsResponse> getCarItems(@RequestParam(name = "model", required=false) String modelParam,
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
        return ResponseEntity.ok(cars);
    }

    @GetMapping(path = "/parking")
    public ResponseEntity<GetItemsResponse> getParkingItems(@RequestParam(name = "active", required=false) Boolean activeParam,
                                                            @RequestParam(name = "page") int pageParam,
                                                            @RequestParam(name = "pageSize") int pageSizeParam)
    {
        var parkings = itemService.getItems(new ParklyGetItemsDto(){{
            itemType = ItemType.PARKING;
            active = activeParam;
            page = pageParam;
            pageSize = pageSizeParam;
        }});
        return ResponseEntity.ok(parkings);
    }
}
