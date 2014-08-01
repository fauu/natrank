package com.github.fauu.natrank.web.jsonview;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface ResponseView {

  public Class<? extends BaseView> value();

}
