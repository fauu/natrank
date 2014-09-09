<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page pageEncoding="utf-8" %>

<div class="top-bar">
  <div class="container">
    <header>
      <a class="navbar-brand" href="#">natrank-admin</a>
    </header>
    <nav class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <c:choose>
          <c:when test="${fn:contains(requestScope['javax.servlet.forward.servlet_path'], 'import-data')}">
            <li class="active">
          </c:when>
          <c:otherwise>
            <li>
          </c:otherwise>
        </c:choose>
          <a href="<c:url value="/admin/import-data" />">Import match data</a>
        </li>
        <c:choose>
        <c:when test="${fn:contains(requestScope['javax.servlet.forward.servlet_path'], 'calculate-ranking')}">
        <li class="active">
          </c:when>
          <c:otherwise>
        <li>
          </c:otherwise>
          </c:choose>
          <a href="<c:url value="/admin/calculate-rankings" />">Calculate rankings</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="<c:url value='/admin/logout' />" class="logout">Log out</a>
        </li>
      </ul>
    </nav>
  </div>
</div>
