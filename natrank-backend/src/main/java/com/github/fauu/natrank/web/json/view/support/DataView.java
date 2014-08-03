package com.github.fauu.natrank.web.json.view.support;

import com.github.fauu.natrank.web.json.view.BaseView;

public interface DataView {

  boolean hasView();

  Object getData();

  Class<? extends BaseView> getView();

}
