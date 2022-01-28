package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<List<ItemBase>> getFlatItems(@RequestParam(name = "active", required=false) boolean activeParam,
                                                       @RequestParam(name = "page", required=false) int pageParam,
                                                       @RequestParam(name = "sort", required=false) SortType sortTypeParam)
    {
        var flats = itemService.getItems(new FlatlyGetItemsDto(){{
            itemType = ItemType.ROOM;
            active = activeParam;
            page = pageParam;
            sortType = sortTypeParam;
        }});
        return ResponseEntity.ok(flats);
    }

    @GetMapping(path = "/car")
    public ResponseEntity<List<ItemBase>> getCarItems(@RequestParam(required=false) boolean active,
                                                      @RequestParam(required=false) int page,
                                                      @RequestParam(required=false) SortType sortType)
    {
        var cars = itemService.getItems(new CarlyGetItemsDto(){{
            itemType = ItemType.CAR;
        }});
        return ResponseEntity.ok(cars);
    }

    @GetMapping(path = "/parking")
    public ResponseEntity<List<ItemBase>> getParkingItems(@RequestParam(name = "city", required=false) String cityParam,
                                                          @RequestParam(name = "street", required=false) String streetParam,
                                                          @RequestParam(name = "parking-name", required=false) String parkingNameParam,
                                                          @RequestParam(name = "active", required=false) boolean activeParam,
                                                          @RequestParam(name = "page") int pageParam,
                                                          @RequestParam(name = "page-size") int pageSizeParam)
    {
        var parkings = itemService.getItems(new ParklyGetItemsDto(){{
            itemType = ItemType.PARKING;
            city = cityParam;
            street = streetParam;
            parkingName = parkingNameParam;
            booked = !activeParam;
            pageNumber = pageParam;
            pageSize = pageSizeParam;
        }});
        return ResponseEntity.ok(parkings);
    }
}
