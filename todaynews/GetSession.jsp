<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // ★ 주의: 세션 이름이 "id"인지 "memberId"인지 확인 후 맞춰주세요!
    String userId = (String) session.getAttribute("userEmail");
    
if (userId != null) {
    out.print(userId); 
} else {
    out.print("");     
}
%>