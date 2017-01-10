<%--

  ADOBE CONFIDENTIAL
  __________________

   Copyright 2011 Adobe Systems Incorporated
   All Rights Reserved.

  NOTICE:  All information contained herein is, and remains
  the property of Adobe Systems Incorporated and its suppliers,
  if any.  The intellectual and technical concepts contained
  herein are proprietary to Adobe Systems Incorporated and its
  suppliers and are protected by trade secret or copyright law.
  Dissemination of this information or reproduction of this material
  is strictly forbidden unless prior written permission is obtained
  from Adobe Systems Incorporated.

  ==============================================================================

  

  ==============================================================================

--%><%@page session="false" import="
    com.adobe.cq.commerce.api.CommerceService,
    com.adobe.cq.commerce.api.CommerceSession,
    org.apache.sling.auth.core.AuthUtil" %><%
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><%
%><sling:defineObjects /><%

    int entryNumber = Integer.parseInt(request.getParameter("entryNumber"));
    String redirect = request.getParameter("redirect");

    CommerceService commerceService = resource.adaptTo(CommerceService.class);
    CommerceSession session = commerceService.login(slingRequest, slingResponse);
    
    session.deleteCartEntry(entryNumber);

    if (AuthUtil.isRedirectValid(request, redirect)) {
        response.sendRedirect(redirect);
    } else {
        response.sendError(403);
    }

%>
