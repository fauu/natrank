<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page pageEncoding="utf-8" %>

<form:form action="/admin/import-data/steps/${step}" commandName="rawMatchDataForm" method="POST">
  <div class="form-group">
    <form:label path="rawData">Enter raw match data:</form:label>
    <form:textarea class="form-control" path="rawData" rows="5"
                   placeholder="dd/MM/yyyy;type;city;team1;team2;result" />
  </div>
  <form:button class="btn btn-default">Process</form:button>
</form:form>
<c:if test="${not empty matchData.errors}">
  <div class="bg-danger">
    <strong class="error-header">The following errors have occured: </strong>
    <ul>
      <c:forEach var="error" items="${matchData.errors}">
        <li>
          <c:choose>
            <c:when test="${error.getType() == 'ERROR_INCORRECT_LINE_FORMAT'}">
              Incorrect line format
            </c:when>
            <c:when test="${error.getType() == 'ERROR_MISSING_FIELD'}">
              Missing field
            </c:when>
            <c:when test="${error.getType() == 'ERROR_INCORRECT_DATE_FORMAT'}">
              Incorrect date format
            </c:when>
          </c:choose>
          on line <c:out value="${error.getLineNo()}" />:
          <code>
            <c:out value="${error.getLine()}" />
          </code>
        </li>
      </c:forEach>
    </ul>
  </div>
</c:if>
<c:if test="${empty matchData.errors && noMatches}">
  <div class="bg-info">
    No new matches found
  </div>
</c:if>
