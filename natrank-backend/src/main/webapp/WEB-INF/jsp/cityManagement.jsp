<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html lang="en">
<jsp:include page="fragments/headTag.jsp" />
<body>
<jsp:include page="fragments/topBar.jsp" />
<div class="container">
  <h3>
    City management
    <small>
      <c:if test="${subPage == \"cityReassignment\"}">
        Reassign cities
      </c:if>
    </small>
  </h3>

  <jsp:include page="fragments/successMessage.jsp" />

  <c:choose>
    <c:when test="${subPage == \"cityReassignment\"}">
      <h4>${subjectCountry.name}</h4>

      <form:form action="/admin/manage-cities/country/${subjectCountry.id}" commandName="cityReassignmentForm" method="POST">
        <table class="table narrow">
          <thead>
          <tr>
            <th>City</th>
            <th>Reassign to</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="cityWithNewCountry" items="${cityReassignmentForm.citiesWithNewCountries}" varStatus="cStatus">
            <tr>
              <td>
                <c:out value="${cityWithNewCountry.city.name}" />
              </td>
              <td>
                <form:select path="citiesWithNewCountries[${cStatus.index}].newCountry">
                  <form:option value="" label="" />
                  <form:options items="${countries}" itemLabel="name" itemValue="id" />
                </form:select>
              </td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
        <form:button class="btn btn-default">Reassign</form:button>
      </form:form>
    </c:when>
    <c:otherwise>
      <p>
        <h4>Reassign</h4>
        Select subject country:
        <select id="subject-country">
          <option value="" selected="true"></option>
          <c:forEach var="country" items="${countries}">
            <option value="${country.id}">${country.name}</option>
          </c:forEach>
        </select>
      </p>
    </c:otherwise>
  </c:choose>
</div>
</body>
</html>

<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    $('select#subject-country').change(function() {
      window.location.href += '/country/' + $(this).val();
    });
  });
</script>
