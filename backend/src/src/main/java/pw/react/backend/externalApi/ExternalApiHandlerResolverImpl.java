package pw.react.backend.externalApi;

import org.springframework.stereotype.Service;
import pw.react.backend.enums.ItemType;
import pw.react.backend.externalApi.flatly.FlatlyApiHandler;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExternalApiHandlerResolverImpl implements ExternalApiHandlerResolver{

    private final List<ExternalApiHandler> apiHandlers;

    public ExternalApiHandlerResolverImpl(FlatlyApiHandler flatlyApiHandler)
    {
        apiHandlers = new ArrayList<ExternalApiHandler>();
        apiHandlers.add(flatlyApiHandler);

    }
    @Override
    public ExternalApiHandler resolveApiHandler(ItemType itemType) {
        return apiHandlers.get(0);

    }
}
