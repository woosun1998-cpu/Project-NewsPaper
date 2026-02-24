<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%
    // 1. 세션 확인
    String userId = (String) session.getAttribute("userEmail");
    if(userId == null) {
        out.println("<script>alert('로그인이 필요합니다.'); location.href='/NewsPaper/login/loginhtml.html';</script>");
        return;
    }

    // 2. 보여줄 변수 초기화
    String viewName = userId; // 기본값은 아이디
    String viewImg = "/NewsPaper/image/profileimage.png"; // 기본 이미지
    String viewBio = "자기소개가 없습니다.";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/projectnews", "root", "12345");
        
        // ★ 중요: 이메일로 정보 조회
        String sql = "SELECT name, nickname, profile_img FROM members WHERE email = ?";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, userId);
        rs = pstmt.executeQuery();
        
        if(rs.next()) {
            String dbName = rs.getString("name");
            String dbNick = rs.getString("nickname");
            String dbImg = rs.getString("profile_img");
            
            // ★ 표시 우선순위: 닉네임 > 이름 > 이메일
            if(dbNick != null && !dbNick.equals("")) {
                viewName = dbNick;
            } else if(dbName != null && !dbName.equals("")) {
                viewName = dbName;
            }
            
            // 이미지 설정
            if(dbImg != null && !dbImg.equals("")) {
                viewImg = dbImg;
            }
        }
    } catch(Exception e) {
        e.printStackTrace();
    } finally {
        if(rs != null) rs.close();
        if(pstmt != null) pstmt.close();
        if(conn != null) conn.close();
    }
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>MY ARCHIVE</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="mypage.css">
</head>
<body>

    <header id="fixed-header">
        <div class="header-logo">
            <a href="/NewsPaper/firstpage/main.jsp" class="logo-text">MY ARCHIVE</a>
        </div>
        <nav class="header-menu">
            <a href="/NewsPaper/todaynews/TodayNews.html">오늘의 뉴스</a>
            <a href="/NewsPaper/search/search.html">옛기사 검색</a>
            <a href="/NewsPaper/historyman/Historyman.html">그때 그 인물</a>
            <a href="#" class="active-user" style="color:#00ff9d;"><%= viewName %> 님</a>
        </nav>
    </header>

    <main class="mypage-container">
        <section id="user-profile">
            <div class="profile-frame">
                <div class="profile-img">
                    <img src="<%= viewImg %>" alt="프로필">
                </div>
                
                <div class="profile-info">
                    <span class="user-rank">ELITE ARCHIVIST</span>
                    <h2><%= viewName %></h2>
                    <p class="user-status">"<%= viewBio %>"</p>
                </div>

                <div class="profile-actions">
                    <a href="updatemypage.jsp" class="edit-btn">정보 수정</a>
                    <a href="/NewsPaper/login/logout.jsp" class="logout-btn">로그아웃</a>
                </div>
            </div>
        </section>
        
        <section id="scrapped-records">
             <div class="section-title-box">
                <h3 class="section-title">MY SCRAPPED NEWS</h3>
             </div>
             <div class="records-grid">
                <div class="empty-card">
                    <p>저장된 기사가 없습니다.</p>
                </div>
             </div>
        </section>
    </main>
    
    <script>
        localStorage.setItem("userNickName", "<%= viewName %>");
    </script>
</body>
</html>