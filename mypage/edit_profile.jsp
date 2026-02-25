<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%
    // 1. 로그인 확인
    String userId = (String) session.getAttribute("userEmail");
    if (userId == null) {
        out.println("<script>alert('로그인이 필요합니다.'); location.href='/NewsPaper/login/loginhtml.html';</script>");
        return;
    }

    // 2. DB 연결 및 정보 가져오기
    String dbUrl = "jdbc:mysql://localhost:3306/joseon_news"; // ★DB이름 확인
    String dbUser = "root";
    String dbPass = "12345"; // ★비밀번호 확인

    String currentName = "";
    String currentPhone = "";
    String currentNickname = ""; // 닉네임 변수 추가

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPass);
        
        // 닉네임(nickname)까지 조회
        String sql = "SELECT name, phone, nickname FROM members WHERE email = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, userId);
        
        ResultSet rs = pstmt.executeQuery();
        if (rs.next()) {
            currentName = rs.getString("name");
            currentPhone = rs.getString("phone");
            currentNickname = rs.getString("nickname");
            
            // null 방지 (닉네임이 없으면 빈칸으로)
            if(currentName == null) currentName = "";
            if(currentPhone == null) currentPhone = "";
            if(currentNickname == null) currentNickname = "";
        }
        rs.close(); pstmt.close(); conn.close();
    } catch(Exception e) { e.printStackTrace(); }
%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>정보 수정 - 근현대 신문사</title>
    <link rel="stylesheet" href="/NewsPaper/login/signupcss.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
</head>
<body>
    <header>
        <div class="header-container">
            <div class="logo">
                <a href="/NewsPaper/firstpage/main.html"><img src="/NewsPaper/images/로고2.png" alt="로고"></a>
            </div>
            <nav>
                <a href="mypage.jsp" class="login-btn">마이페이지로 돌아가기</a>
            </nav>
        </div>
    </header>

    <div class="main-container">
        <div class="signup-wrapper">
            <h1>EDIT PROFILE</h1>
            <p style="color: #888; margin-bottom: 30px;">
                회원 정보를 수정합니다.<br>
                비밀번호 칸을 비워두면 변경되지 않습니다.
            </p>

            <form action="update_profile_process.jsp" method="post">
                <div class="floating-group">
                    <input type="email" value="<%= userId %>" disabled style="color: #666; border-color: #444; cursor: not-allowed;">
                    <label>아이디 (ID) - 변경 불가</label>
                </div>

                <div class="floating-group">
                    <input type="text" name="name" value="<%= currentName %>" required placeholder=" ">
                    <label>이름 (NAME)</label>
                </div>

                <div class="floating-group">
                    <input type="text" name="nickname" value="<%= currentNickname %>" placeholder=" ">
                    <label>닉네임 (NICKNAME)</label>
                </div>

                <div class="floating-group">
                    <input type="tel" name="phone" value="<%= currentPhone %>" required placeholder=" ">
                    <label>전화번호 (PHONE)</label>
                </div>

                <div class="floating-group">
                    <input type="password" name="password" placeholder=" ">
                    <label>새 비밀번호 (변경 시에만 입력)</label>
                </div>

                <button type="submit" class="btn-main-signup">정보 수정 완료</button>
                <a href="mypage.jsp" style="display:block; text-align:center; margin-top:15px; color:#ff4444; text-decoration:none;">취소하고 돌아가기</a>
            </form>
        </div>
    </div>
</body>
</html>