<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%
    request.setCharacterEncoding("UTF-8");

    String userId = (String) session.getAttribute("userEmail");
    if(userId == null) { response.sendRedirect("loginhtml.html"); return; }

    // 폼에서 넘어온 데이터 받기
    String newNick = request.getParameter("nickname");
    String newPhone = request.getParameter("phone");
    String newPw = request.getParameter("newPw");
    String imgData = request.getParameter("imgData"); // Base64 이미지 문자열

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/projectnews", "root", "12345");

        // 비밀번호를 입력했으면 비밀번호까지 수정, 안했으면 나머지만 수정
        String sql = "";
        
        if(newPw != null && !newPw.trim().equals("")) {
            // 비번 포함 업데이트
            sql = "UPDATE members SET nickname=?, phone=?, profile_img=?, pw=? WHERE id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, newNick);
            pstmt.setString(2, newPhone);
            pstmt.setString(3, imgData);
            pstmt.setString(4, newPw);
            pstmt.setString(5, userId);
        } else {
            // 비번 제외 업데이트
            sql = "UPDATE members SET nickname=?, phone=?, profile_img=? WHERE id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, newNick);
            pstmt.setString(2, newPhone);
            pstmt.setString(3, imgData);
            pstmt.setString(4, userId);
        }

        int result = pstmt.executeUpdate();

        if(result > 0) {
            // 성공 시 마이페이지로 이동
            out.println("<script>alert('회원정보가 수정되었습니다.'); location.href='mypage.jsp';</script>");
        } else {
            out.println("<script>alert('수정 실패. 다시 시도해주세요.'); history.back();</script>");
        }

    } catch(Exception e) {
        e.printStackTrace();
        out.println("<script>alert('오류 발생: " + e.getMessage() + "'); history.back();</script>");
    } finally {
        if(pstmt != null) pstmt.close();
        if(conn != null) conn.close();
    }
%>