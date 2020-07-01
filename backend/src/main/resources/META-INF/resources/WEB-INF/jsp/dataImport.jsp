<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page pageEncoding="utf-8" %>

<!DOCTYPE html>
<html lang="en">
<jsp:include page="fragments/headTag.jsp" />
<body>
<jsp:include page="fragments/topBar.jsp" />
<div class="container">
  <h3>
    Match data import
    <small>
      <c:choose>
        <c:when test="${step < 6}">
          Step <c:out value="${step}" />/5
        </c:when>
        <c:otherwise>
          Finish
        </c:otherwise>
      </c:choose>
    </small>
  </h3>
  <div class="content">
    <jsp:include page="fragments/dataImport/step${step}.jsp" />
  </div>
</div>
</body>
</html>
