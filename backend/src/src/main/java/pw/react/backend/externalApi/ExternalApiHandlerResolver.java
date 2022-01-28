package pw.react.backend.externalApi;

import pw.react.backend.enums.ItemType;

public interface ExternalApiHandlerResolver {
    ExternalApiHandler resolveApiHandler(ItemType itemType);
}
