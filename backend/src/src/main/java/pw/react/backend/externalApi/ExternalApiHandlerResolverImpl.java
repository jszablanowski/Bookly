package pw.react.backend.externalApi;

import org.springframework.stereotype.Service;
import pw.react.backend.enums.ItemType;
import pw.react.backend.externalApi.carly.CarlyApiHandler;
import pw.react.backend.externalApi.flatly.FlatlyApiHandler;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExternalApiHandlerResolverImpl implements ExternalApiHandlerResolver{

    private final List<ExternalApiHandler> apiHandlers;

    public ExternalApiHandlerResolverImpl(FlatlyApiHandler flatlyApiHandler, CarlyApiHandler carlyApiHandler)
    {
        apiHandlers = new ArrayList<ExternalApiHandler>();
        apiHandlers.add(flatlyApiHandler);
        apiHandlers.add(carlyApiHandler);

    }
    @Override
    public ExternalApiHandler resolveApiHandler(ItemType itemType) {
        if (itemType == ItemType.ROOM)
            return apiHandlers.get(0);
        else if (itemType == ItemType.CAR)
            return apiHandlers.get(1);
        else return null;
    }
}
