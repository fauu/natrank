package com.github.fauu.natrank.web.json.view.support;

import com.github.fauu.natrank.web.json.view.BaseView;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface ResponseView {

  public Class<? extends BaseView> value();

}
