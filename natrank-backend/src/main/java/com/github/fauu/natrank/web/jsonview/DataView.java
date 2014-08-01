package com.github.fauu.natrank.web.jsonview;

public interface DataView {

  boolean hasView();

  Object getData();

  Class<? extends BaseView> getView();

}
