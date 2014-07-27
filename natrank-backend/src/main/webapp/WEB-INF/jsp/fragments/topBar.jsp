<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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

<div class="top-bar">
  <div class="container">
    <header>
      <a class="navbar-brand" href="#">natrank-admin</a>
    </header>
    <nav class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <c:choose>
          <c:when test="${fn:contains(requestScope['javax.servlet.forward.servlet_path'], 'dataimport')}">
            <li class="active">
          </c:when>
          <c:otherwise>
            <li>
          </c:otherwise>
        </c:choose>
          <a href="<c:url value="/admin/import-data" />">Import match data</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="<c:url value='/admin/logout' />">Log out</a>
        </li>
      </ul>
    </nav>
  </div>
</div>
