<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://www.joda.org/joda/time/tags" prefix="joda" %>
<%@ page pageEncoding="utf-8" %>

<!DOCTYPE html>
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

<html lang="en">
  <jsp:include page="fragments/headTag.jsp" />
  <body>
    <jsp:include page="fragments/topBar.jsp" />
    <div class="container">
      <h3>Match data import <small>Step <c:out value="${step}" /></small></h3>
      <jsp:include page="fragments/dataImportStep${step}.jsp" />
    </div>
  </body>
</html>
