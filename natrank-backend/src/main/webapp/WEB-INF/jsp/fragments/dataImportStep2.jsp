<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
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

<c:choose>
  <c:when test="${not empty matchData.countries}">
    <h4>New countries found:</h4>
    <form:form action="/admin/import-data/steps/3" commandName="matchData">
      <table class="table">
        <thead>
        <th>Country</th>
        <th>From date</th>
        <th>Team to inherit</th>
        </thead>
        <tbody>
        <c:forEach var="country" items="${matchData.countries}" varStatus="cStatus">
          <tr>
            <td>
              <c:out value="${country.name}" />
            </td>
            <td>
              <joda:format value="${country.fromDate}" style="S-" />
            </td>
            <td>
              <form:select path="countries[${cStatus.index}].team">
                <form:option value="0" label="New Team"/>
                <form:options items="${namedTeams}" itemLabel="currentName" itemValue="id" />
              </form:select>
            </td>
          </tr>
        </c:forEach>
        </tbody>
      </table>
    </form:form>
  </c:when>
  <c:otherwise>
    <h4>No new countries found.</h4>
  </c:otherwise>
</c:choose>
