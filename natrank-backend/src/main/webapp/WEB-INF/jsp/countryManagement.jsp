<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<jsp:include page="fragments/headTag.jsp" />
<body>
<jsp:include page="fragments/topBar.jsp" />
<div class="container">
  <h3>Country management</h3>

  <jsp:include page="fragments/successMessage.jsp" />

  <p>
    <h4>Merge teams</h4>
    <form:form action="/admin/manage-countries/merge" commandName="merge" method="POST">
      Merge the team of
      <form:select path="subject">
        <form:options items="${countries}" itemLabel="name" itemValue="id" />
      </form:select>
      into the team of
      <form:select path="target">
        <form:options items="${countries}" itemLabel="name" itemValue="id" />
      </form:select>
      <form:button class="btn btn-default">Merge</form:button>
    </form:form>
  </p>
  <p>
    <h4>Rename</h4>
    <form:form action="/admin/manage-countries/rename" commandName="countryRenameForm" method="POST">
      Rename
      <form:select path="country">
        <form:option value="" />
        <form:options items="${countries}" itemLabel="name" itemValue="id" />
      </form:select>
      for the period of
      <form:input path="periodStr" size="60" placeholder="'' or '-YYYY-MM-DD' or 'YYYY-MM-DD-' or 'YYYY-MM-DD-YYYY-MM-DD'"/>
      as
      <form:input path="newName" />
      with code
      <form:input size="3" path="newCode" />
      <form:button class="btn btn-default">Rename</form:button>
    </form:form>
  </p>
</div>
</body>
</html>
