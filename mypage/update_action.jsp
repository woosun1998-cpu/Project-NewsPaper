<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%
    request.setCharacterEncoding("UTF-8");
    
    // 세션에서 이메일 가져오기
    String userId = (String) session.getAttribute("userEmail");
    if(userId == null) {
        out.println("<script>alert('로그인이 필요합니다.'); location.href='/NewsPaper/login/loginhtml.html';</script>");
        return;
    }

    String nickname = request.getParameter("nickname");
    String phone = request.getParameter("phone");
    String newPw = request.getParameter("newPw");
    String imgData = request.getParameter("imgData");

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        // ★ DB 이름: projectnews
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/projectnews", "root", "12345");

        String sql = "";
        
        // ★★★ [핵심 수정] WHERE id=? -> WHERE email=? ★★★
        // 각하의 DB에는 'id' 컬럼이 없고 'email' 컬럼이 식별자입니다.
        
        if(newPw != null && !newPw.trim().equals("")) {
            // 비밀번호 포함 수정
            sql = "UPDATE members SET nickname=?, phone=?, profile_img=?, password=? WHERE email=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, nickname);
            pstmt.setString(2, phone);
            pstmt.setString(3, imgData);
            pstmt.setString(4, newPw);
            pstmt.setString(5, userId); // email 값
        } else {
            // 비밀번호 제외 수정
            sql = "UPDATE members SET nickname=?, phone=?, profile_img=? WHERE email=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, nickname);
            pstmt.setString(2, phone);
            pstmt.setString(3, imgData);
            pstmt.setString(4, userId); // email 값
        }

        int result = pstmt.executeUpdate();

        if(result > 0) {
            session.setAttribute("userName", nickname);
%>
            <script>
                localStorage.setItem("userNickName", "<%= nickname %>");
                alert("회원 정보가 성공적으로 수정되었습니다.");
                location.href = "mypage.jsp";
            </script>
<%
        } else {
%>
            <script>
                // email이 일치하는 회원이 없을 때
                alert("수정 실패: 회원 정보를 찾을 수 없습니다. (ID: <%= userId %>)");
                history.back();
            </script>
<%
        }
    } catch(Exception e) {
        e.printStackTrace();
%>
        <script>
            alert("에러 발생: <%= e.getMessage() %>");
            history.back();
        </script>
<%
    } finally {
        if(pstmt!=null) pstmt.close();
        if(conn!=null) conn.close();
    }
%>