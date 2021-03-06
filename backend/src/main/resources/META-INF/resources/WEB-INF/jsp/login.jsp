<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page pageEncoding="utf-8" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="<c:url value="/css/login.css" />">
    <title>natrank admin - log in</title>
  </head>
  <body>
    <div class="container">
      <c:if test="${not empty param.error}">
        <p class="bg-danger">
          <strong>Error:</strong> <c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}" />.
        </p>
      </c:if>
      <c:if test="${not empty param.out}">
        <p class="bg-success">
          You have logged out successfully.
        </p>
      </c:if>

      <form class="login-form" action="<c:url value="/admin/login/process" />" method="POST">
        <input id="username" type="text" name="username" autofocus />
        <input id="password" type="password" name="password" />
        <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
      </form>
    </div>
  </body>
</html>
