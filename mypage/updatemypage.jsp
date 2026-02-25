<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%
    String userId = (String) session.getAttribute("userEmail");
    if(userId == null) { 
        out.println("<script>alert('로그인이 필요합니다.'); location.href='/NewsPaper/login/loginhtml.html';</script>");
        return; 
    }

    String dbName="", dbNick="", dbPhone="", dbImg="";
    
    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/projectnews", "root", "12345");
        
        // ★★★ [핵심 수정] WHERE email = ? 로 변경 ★★★
        String sql = "SELECT name, nickname, phone, profile_img FROM members WHERE email = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, userId);
        ResultSet rs = pstmt.executeQuery();
        
        if(rs.next()) {
            dbName = rs.getString("name");
            dbNick = rs.getString("nickname");
            dbPhone = rs.getString("phone");
            dbImg = rs.getString("profile_img");
        }
        rs.close(); pstmt.close(); conn.close();
    } catch(Exception e) { e.printStackTrace(); }
%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>정보 수정 - 근현대 신문사</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="updatemypage.css" />

  <script>
    function previewImage(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('avatarPreview').src = e.target.result;
                document.getElementById('hiddenImgData').value = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
  </script>
</head>
<body>
  
  <header class="topbar">
    <div class="wrap topbar__inner">
      <div class="brand">MY ARCHIVE</div>
      <a href="mypage.jsp" class="btn btn--ghost">돌아가기</a>
    </div>
  </header>

  <main class="wrap">
    <section class="edit-container">
      <h1 class="page-title">EDIT PROFILE</h1>
      <p class="page-desc">회원님의 소중한 정보를 안전하게 관리하세요.</p>

      <form action="update_action.jsp" method="post" class="edit-form">
        <input type="hidden" name="imgData" id="hiddenImgData" value="<%= (dbImg!=null)?dbImg:"" %>">

        <div class="edit-table">
            <div class="table-row">
                <div class="th">아이디</div>
                <div class="td"><input type="text" value="<%= userId %>" class="input-readonly" readonly></div>
            </div>

            <div class="table-row">
                <div class="th">이름</div>
                <div class="td"><input type="text" value="<%= dbName %>" class="input-readonly" readonly></div>
            </div>

            <div class="table-row">
                <div class="th">닉네임</div>
                <div class="td"><input type="text" name="nickname" value="<%= (dbNick!=null)?dbNick:"" %>" class="input-std" placeholder="닉네임 입력"></div>
            </div>

            <div class="table-row">
                <div class="th">전화번호</div>
                <div class="td"><input type="text" name="phone" value="<%= (dbPhone!=null)?dbPhone:"" %>" class="input-std"></div>
            </div>
            
            <div class="table-row">
                <div class="th">새 비밀번호</div>
                <div class="td">
                    <input type="password" name="newPw" class="input-std" placeholder="변경할 경우에만 입력">
                </div>
            </div>

            <div class="table-row">
                <div class="th">프로필 사진</div>
                <div class="td">
                    <div class="profile-upload-box">
                        <img id="avatarPreview" src="<%= (dbImg!=null && !dbImg.equals("")) ? dbImg : "https://via.placeholder.com/150/000000/00ff9d?text=PROFILE" %>" class="avatar-img">
                        <div class="file-input-wrapper">
                            <input type="file" accept="image/*" onchange="previewImage(this)" class="input-file">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn--primary">수정 완료</button>
            <a href="mypage.jsp" class="btn btn--ghost">취소</a>
        </div>
      </form>
    </section>
  </main>
</body>
</html>