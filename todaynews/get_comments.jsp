<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%
    request.setCharacterEncoding("UTF-8");
    String newsId = request.getParameter("news_id");

    StringBuilder json = new StringBuilder();
    json.append("[");

    String url = "jdbc:mysql://localhost:3306/projectnews?serverTimezone=Asia/Seoul";
    String id = "root";
    String pw = "12345";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection(url, id, pw);
        
        // 최신순으로 가져오기
        String sql = "SELECT user_id, content, reg_date FROM news_comments WHERE news_id = ? ORDER BY reg_date DESC";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, newsId);
        
        rs = pstmt.executeQuery();
        
        boolean isFirst = true;
        while(rs.next()) {
            if(!isFirst) json.append(",");
            
            String userId = rs.getString("user_id");
            String content = rs.getString("content").replace("\"", "\\\""); // 따옴표 처리
            String date = rs.getString("reg_date").substring(0, 16); // 년-월-일 시:분 까지만
            
            json.append("{");
            json.append("\"user\": \"" + userId + "\",");
            json.append("\"content\": \"" + content + "\",");
            json.append("\"date\": \"" + date + "\"");
            json.append("}");
            isFirst = false;
        }

    } catch(Exception e) {
        e.printStackTrace();
    } finally {
        if(rs!=null) rs.close();
        if(pstmt!=null) pstmt.close();
        if(conn!=null) conn.close();
    }

    json.append("]");
    out.print(json.toString());
%>