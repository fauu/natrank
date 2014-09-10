<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page pageEncoding="utf-8" %>

<c:choose>
  <c:when test="${not empty matchData.types}">
    <h4>New match types found:</h4>
    <form:form action="/admin/import-data/steps/${step}" commandName="matchData" method="POST">
      <table class="table">
        <thead>
        <tr>
          <th>FIFA Name</th>
          <th>Name to assign</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="type" items="${matchData.types}" varStatus="tStatus">
          <tr>
            <td>
              <c:out value="${type.fifaName}" />
            </td>
            <td>
              <form:input path="types[${tStatus.index}].name" />
            </td>
          </tr>
        </c:forEach>
        </tbody>
      </table>
      <form:button class="btn btn-default">Continue</form:button>
    </form:form>
  </c:when>
  <c:otherwise>
    <h4>No new match types found</h4>
    <a href="<c:url value="/admin/import-data/steps/${step + 1}" />" class="btn btn-default">Continue</a>
  </c:otherwise>
</c:choose>

<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
<script type="text/javascript">
  // FIXME: DRY (see step 2)

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

    if (input.val() == "") {
      input.addClass('invalid');
    } else {
      input.removeClass('invalid');
    }
  }
</script>
