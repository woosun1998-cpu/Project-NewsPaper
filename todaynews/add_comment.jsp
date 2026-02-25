<%-- comment_process.jsp --%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ page import="java.sql.*" %>
<%
    request.setCharacterEncoding("UTF-8");
    
    // JS(localStorage)에서 보낸 email 파라미터를 최우선으로 사용합니다.
    String userId = request.getParameter("email");
    if(userId == null || userId.isEmpty() || userId.equals("null")) {
        userId = (String) session.getAttribute("userEmail");
    }
    
    String newsId = request.getParameter("news_id");
    String content = request.getParameter("content");

    // 최종적으로 사용자 식별이 안 되면 차단
    if(userId == null || userId.isEmpty() || userId.equals("null")) {
        out.print("not_login");
        return;
    }

    String url = "jdbc:mysql://localhost:3306/projectnews";
    String id = "root";
    String pw = "12345";

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection(url, id, pw);
        
        // NOW()를 사용하여 등록 시간을 자동 저장합니다.
        String sql = "INSERT INTO news_comments (news_id, user_id, content, reg_date) VALUES (?, ?, ?, NOW())";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, newsId);
        pstmt.setString(2, userId);
        pstmt.setString(3, content);
        
        pstmt.executeUpdate();
        out.print("success");
        
        pstmt.close(); conn.close();
    } catch(Exception e) {
        out.print("fail: " + e.getMessage());
    }
    
    
%>