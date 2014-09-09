<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page pageEncoding="utf-8" %>

<c:if test="${message != null}">
  <div class="bg-success">
    <c:out value="${message}" />
  </div>
</c:if>
