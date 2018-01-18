package com.react.portlet;

import javax.portlet.*;
import java.io.IOException;

/**
 * @author <a href="mailto:obouras@exoplatform.com">Omar Bouras</a>
 * @version ${Revision}
 * @date 04/09/15
 */
public class ReactPortlet extends GenericPortlet {
    @RenderMode(name = "view")
    public void renderHome(RenderRequest request, RenderResponse response) throws IOException, PortletException {
        PortletRequestDispatcher prDispatcher = getPortletContext().getRequestDispatcher("/jsp/index.html");
        prDispatcher.include(request, response);
    }
}
