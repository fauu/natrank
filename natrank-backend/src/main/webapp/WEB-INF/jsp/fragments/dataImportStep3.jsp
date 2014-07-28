<%--
  ~ Copyright (C) 2014 natrank Developers (http://github.com/fauu/natrank)
  ~
  ~ This software is licensed under the GNU General Public License
  ~ (version 3 or later). See the COPYING file in this distribution.
  ~
  ~ You should have received a copy of the GNU Library General Public License
  ~ along with this software. If not, see <http://www.gnu.org/licenses/>.
  ~
  ~ Authored by: Piotr Grabowski <fau999@gmail.com>
  --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://www.joda.org/joda/time/tags" prefix="joda" %>

<c:choose>
  <c:when test="${not empty matchData.cities}">
    <h4>New cities found:</h4>
    <form:form action="/admin/import-data/steps/${step}" commandName="matchData" method="POST">
      <table class="table">
        <thead>
          <tr>
            <th>City</th>
            <th>Country to assign</th>
            <th>From date</th>
          </tr>
        </thead>
        <tbody>
        <c:forEach var="city" items="${matchData.cities}" varStatus="cStatus">
          <tr>
            <td>
              <c:out value="${city.name}" />
            </td>
            <td>
              <form:select path="cities[${cStatus.index}].cityCountryAssocs[0].country">
                <form:options items="${allCountries}" itemLabel="name" itemValue="id" />
              </form:select>
            </td>
            <td>
              <joda:format value="${city.cityCountryAssocs[0].fromDate}" style="S-" />
            </td>
          </tr>
        </c:forEach>
        </tbody>
      </table>
      <form:button class="btn btn-default">Continue</form:button>
    </form:form>
  </c:when>
  <c:otherwise>
    <h4>No new cities found</h4>
    <a href="<c:url value="/admin/import-data/steps/${step + 1}" />" class="btn btn-default">Continue</a>
  </c:otherwise>
</c:choose>

<!-- On a second thought, I could have done this without js, but whatever -->
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    var citiesInferredCountryNames = [
      <c:forEach var="countryName" items="${matchData.citiesInferredCountryNames}">
        '<c:out value="${countryName}" />',
      </c:forEach>
    ];

    $('select').each(function(i) {
      $(this).children(':contains(' + citiesInferredCountryNames[i] + ')').attr('selected', true);
    });
  })
</script>
