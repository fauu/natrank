<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page pageEncoding="utf-8" %>

<h4>It's done!</h4>
<form>
  <div class="form-group">
    <label for="flagMarkup">
      <a href="https://en.wikipedia.org/wiki/Special:MyPage/sandbox?action=edit&redlink=1&editintro=Template%3AUser_sandbox&preload=Template%3AUser_sandbox%2Fpreload">
        Wikipedia
      </a>
    </label>
    sandbox markup for new country flags:
    <textarea id="flagMarkup" class="form-control" rows="5">${flagMarkup}</textarea>
  </div>
</form>
<a href="<c:url value="/admin/import-data" />" class="btn btn-default">Add more matches</a>
