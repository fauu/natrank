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

<c:forEach var="city" items="${matchData.cities}">
  <c:out value="${city.name}" /><br />
  <c:forEach var="cityCountryAssoc" items="${city.cityCountryAssocs}">
    <c:out value="${cityCountryAssoc.country.name}" /><br />
    <c:out value="${cityCountryAssoc.fromDate}" /><br />
  </c:forEach>
</c:forEach>

