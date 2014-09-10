<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://www.joda.org/joda/time/tags" prefix="joda" %>
<%@ page pageEncoding="utf-8" %>

<c:choose>
  <c:when test="${not empty matchData.countries}">
    <h4>New countries found:</h4>
    <form:form action="/admin/import-data/steps/${step}" commandName="matchData" method="POST">
      <table class="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Code</th>
            <th>From date</th>
            <th>Team to inherit</th>
          </tr>
        </thead>
        <tbody>
        <c:forEach var="country" items="${matchData.countries}" varStatus="cStatus">
          <tr>
            <td>
              <c:out value="${country.name}" />
            </td>
            <td>
              <form:input path="countries[${cStatus.index}].code" size="3" />
            </td>
            <td>
              <joda:format value="${country.period.fromDate}" style="M-" />
            </td>
            <td>
              <form:select path="countries[${cStatus.index}].team">
                <form:option label="- Create new team -" value="0" />
                <form:options items="${teams}" itemLabel="currentName" itemValue="id" />
              </form:select>
              or the new team of
              <form:select path="countries[${cStatus.index}].predecessorName">
                <form:option label="" value="" />
                <form:options items="${matchData.countries}" itemLabel="name" itemValue="name" />
              </form:select>
            </td>
          </tr>
        </c:forEach>
        </tbody>
      </table>
      <form:button class="btn btn-default">Continue</form:button>
    </form:form>
  </c:when>
  <c:otherwise>
    <h4>No new countries found</h4>
    <a href="<c:url value="/admin/import-data/steps/${step + 1}" />" class="btn btn-default">Continue</a>
  </c:otherwise>
</c:choose>

<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    $("form input").each(function () {
      highlightInvalidInputs($(this));
      $(this).keyup(function() {
        highlightInvalidInputs($(this));
      });
    })
  });

  var highlightInvalidInputs = function(el) {
    var input = el;

    if (input.val().length !== 3) {
      input.addClass('invalid');
    } else {
      input.removeClass('invalid');
    }
  }
</script>
