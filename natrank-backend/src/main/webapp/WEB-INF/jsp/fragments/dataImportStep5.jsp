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
<%@ taglib uri="http://www.joda.org/joda/time/tags" prefix="joda" %>

<h4>List of matches to be added:</h4>
<table class="table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Type</th>
      <th>City</th>
      <th>Team 1</th>
      <th>Team 2</th>
      <th>Team 1 goals</th>
      <th>Team 2 goals</th>
      <th>Result extra</th>
      <th>Home team</th>
      <th>Winner</th>
      <th>Penalty shootout</th>
    </tr>
  </thead>
  <tbody>
<c:forEach var="match" items="${newMatches}">
    <tr>
      <td><joda:format value="${match.date}" style="S-" /></td>
      <td>${match.type.name}</td>
      <td>${match.city.name}</td>
      <td>${match.team1.id}</td>
      <td>${match.team2.id}</td>
      <td>${match.team1Goals}</td>
      <td>${match.team2Goals}</td>
      <td>${match.resultExtra}</td>
      <td>${match.homeTeam.id}</td>
      <td>${match.winnerTeam.id}</td>
      <td>
        <c:choose>
          <c:when test="${match.penaltyShootout}">
            Yes
          </c:when>
          <c:otherwise>
            No
          </c:otherwise>
        </c:choose>
      </td>
    </tr>
</c:forEach>
  </tbody>
</table>
<a href="<c:url value="/admin/import-data/steps/${step + 1}" />" class="btn btn-default">Continue</a>
