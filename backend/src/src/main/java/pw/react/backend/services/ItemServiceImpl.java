package pw.react.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.react.backend.enums.ItemType;
import pw.react.backend.items.ItemBase;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    public ItemServiceImpl(){}


    @Override
    public ItemBase getItem(String itemId, ItemType type) {
        return new ItemBase();
    }
}
