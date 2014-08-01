package com.github.fauu.natrank.web.jsonview;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

/**
 * Modified Spring 3.1's internal Return value handlers, and wires up a
 * decorator to add support for @JsonView
 *
 * @author martypitt
 *
 */
public class JsonViewSupportFactoryBean implements InitializingBean {

  private final Logger log = LoggerFactory.getLogger(JsonViewSupportFactoryBean.class);

  @Autowired
  private RequestMappingHandlerAdapter adapter;

  @Override
  public void afterPropertiesSet() throws Exception {
    List myHandlers = new ArrayList();

    for (HandlerMethodReturnValueHandler handler : adapter.getReturnValueHandlers()) {
      if (handler instanceof RequestResponseBodyMethodProcessor) {
        ViewInjectingReturnValueHandler decorator = new ViewInjectingReturnValueHandler(handler);

        myHandlers.add(decorator);
      } else {
        myHandlers.add(handler);
      }
    }

    adapter.setReturnValueHandlers(myHandlers);
  }

  private void decorateHandlers(List<HandlerMethodReturnValueHandler> handlers) {
    List customList = new ArrayList();

    for (HandlerMethodReturnValueHandler handler : handlers) {
      if (handler instanceof RequestResponseBodyMethodProcessor) {
        handler = new ViewInjectingReturnValueHandler(handler);
        log.info("JsonView decorator support wired up");
      }

      customList.add(handler);
    }

    adapter.setReturnValueHandlers(customList);
  }

}