<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.joda.org/joda/time/tags" prefix="joda" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<jsp:include page="fragments/headTag.jsp" />
<body>
<jsp:include page="fragments/topBar.jsp" />
<div class="container">
  <h3>Flag management</h3>

  <jsp:include page="fragments/successMessage.jsp" />

  <p>
    <h4>Add entries</h4>
    <form:form action="/admin/manage-flags" commandName="flagManagementForm" method="POST">
      <table class="table narrow">
        <thead>
          <tr>
            <th>Country</th>
            <th>Last flag entry start date</th>
            <th>New flag entry start years</th>
          </tr>
        </thead>
        <tbody>
        <c:forEach var="countryWithFlagEntryYears" items="${flagManagementForm.countriesWithFlagEntryYears}" varStatus="cStatus">
          <tr>
            <td>
              <c:out value="${countryWithFlagEntryYears.country.name}" />
            </td>
            <td>
              <joda:format value="${countryWithFlagEntryYears.country.currentFlag.period.fromDate}" style="M-" />
            </td>
            <td>
              <form:input path="countriesWithFlagEntryYears[${cStatus.index}].flagEntryYears"
                          placeholder="YYYY;YYYY;..."/>
            </td>
          </tr>
        </c:forEach>
        </tbody>
      </table>
      <form:button class="btn btn-default">Add</form:button>
    </form:form>
  </p>
</div>
</body>
</html>
