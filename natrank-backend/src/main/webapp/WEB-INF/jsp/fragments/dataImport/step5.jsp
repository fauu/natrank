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
<%@ page pageEncoding="utf-8" %>

<h4>Matches to be added:</h4>
<table class="table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Type</th>
      <th>Venue</th>
      <th>Team 1</th>
      <th>Team 2</th>
      <th class="text-center">Result</th>
      <th>Home advantage</th>
      <th>Winner</th>
      <th class="text-center">Penalty shootout</th>
    </tr>
  </thead>
  <tbody>
<c:forEach var="match" items="${newMatches}">
  <tr>
    <td><joda:format value="${match.date}" style="M-" /></td>
    <td>${match.type.name}</td>
    <td>${match.city.name}, ${match.city.getCountryByDate(match.date).name}</td>
    <td>${match.team1.getCountryByDate(match.date).name}</td>
    <td>${match.team2.getCountryByDate(match.date).name}</td>
    <td class="text-center">
      ${match.team1Goals}:${match.team2Goals}
      <c:if test="${match.resultExtra != ''}">
        <small>${match.resultExtra}</small>
      </c:if>
    </td>
    <td><c:out value="${match.homeTeam.getCountryByDate(match.date).name}" default="Neither" /></td>
    <td><c:out value="${match.winnerTeam.getCountryByDate(match.date).name}" default="Tie"/></td>
    <td class="text-center">
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
<a href="<c:url value="/admin/import-data/steps/${step + 1}" />" class="btn btn-default btn-lg">Finish</a>
<a href="<c:url value="/admin/import-data" />" class="btn btn-default">Cancel</a>
