<%-- comment_process.jsp --%>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ page import="java.sql.*" %>
<%
    request.setCharacterEncoding("UTF-8");
    
    // 1. 파라미터 받기
    String userId = request.getParameter("user_id"); // JS에서 보낸 ID
    String newsId = request.getParameter("news_id");
    String content = request.getParameter("content");

    // 2. 검증
    if(userId == null || userId.equals("") || userId.equals("null")) {
        out.print("not_login");
        return;
    }

    // 3. DB 저장
    String url = "jdbc:mysql://localhost:3306/projectnews?serverTimezone=Asia/Seoul";
    String id = "root";
    String pw = "12345"; // ★비밀번호 확인!

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection(url, id, pw);
        
        // 테이블 이름(news_comments)과 컬럼 이름 확인 필수!
        String sql = "INSERT INTO news_comments (news_id, user_id, content, reg_date) VALUES (?, ?, ?, NOW())";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, newsId);
        pstmt.setString(2, userId);
        pstmt.setString(3, content);
        
        pstmt.executeUpdate();
        out.print("success"); // 성공 메시지 전송
        
    } catch(Exception e) {
        e.printStackTrace();
        out.print("fail: " + e.getMessage());
    } finally {
        if(pstmt != null) try{pstmt.close();}catch(Exception e){}
        if(conn != null) try{conn.close();}catch(Exception e){}
    }
%>