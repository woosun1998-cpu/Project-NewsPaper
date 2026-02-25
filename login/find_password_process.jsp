<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*, java.util.Random" %>
<%
    request.setCharacterEncoding("UTF-8");
    
    // 모드 확인 (find_id 또는 find_pw)
    String mode = request.getParameter("mode");
    
    String dbUrl = "jdbc:mysql://localhost:3306/joseon_news";
    String dbUser = "root";
    String dbPass = "12345"; // ★비밀번호 확인 필수★

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection(dbUrl, dbUser, dbPass);

        if ("find_id".equals(mode)) {
            // [1] 아이디 찾기 로직
            String name = request.getParameter("name");
            String phone = request.getParameter("phone");
            
            // 이름과 전화번호로 이메일 검색
            String sql = "SELECT email FROM members WHERE name = ? AND phone = ?"; 
            // (주의: DB에 name, phone 컬럼이 있어야 합니다. 없으면 에러 납니다!)
            
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, name);
            pstmt.setString(2, phone);
            rs = pstmt.executeQuery();
            
            if (rs.next()) {
                String foundEmail = rs.getString("email");
                out.print(foundEmail); // 찾은 이메일을 JS로 전달
            } else {
                out.print("not_found");
            }
            
        } else {
            // [2] 비밀번호 찾기 (인증 코드 발송) 로직
            String email = request.getParameter("email");
            
            String sql = "SELECT email FROM members WHERE email = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, email);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                Random rd = new Random();
                int code = rd.nextInt(900000) + 100000; 
                session.setAttribute("resetEmail", email);
                out.print(code); // 6자리 코드 반환
            } else {
                out.print("not_found");
            }
        }
        
    } catch (Exception e) {
        out.print("error: " + e.getMessage());
    } finally {
        if (rs != null) rs.close();
        if (pstmt != null) pstmt.close();
        if (conn != null) conn.close();
    }
%>