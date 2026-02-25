<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<%
    request.setCharacterEncoding("UTF-8");

    String type = request.getParameter("type");
    String keyword = request.getParameter("q");
    if (keyword == null) keyword = "";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    StringBuilder json = new StringBuilder();
    json.append("[");

    try {
        // ----------------------------------------------------------------
        // 1. DB 연결 (드라이버 로딩 확인을 위해 로그 추가)
        // ----------------------------------------------------------------
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new Exception("MySQL 드라이버(jar 파일)가 lib 폴더에 없습니다!");
        }

        // DB 연결 정보
        String dbURL = "jdbc:mysql://localhost:3306/projectnews?serverTimezone=Asia/Seoul&useUnicode=true&characterEncoding=utf8";
        String dbUser = "root";
        String dbPass = "12345"; // ★비밀번호 확인 필수★

        conn = DriverManager.getConnection(dbURL, dbUser, dbPass);

        // ----------------------------------------------------------------
        // 2. 쿼리 실행
        // ----------------------------------------------------------------
        String sql = "";
        if ("date".equals(type)) {
            sql = "SELECT * FROM news WHERE news_date BETWEEN ? AND ? ORDER BY news_date ASC";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, request.getParameter("start"));
            pstmt.setString(2, request.getParameter("end"));
        } else {
            // ★테이블명 앞에 스키마(projectnews) 명시
            sql = "SELECT * FROM projectnews.news WHERE title LIKE ? OR description LIKE ? ORDER BY news_date ASC";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, "%" + keyword + "%");
            pstmt.setString(2, "%" + keyword + "%");
        }

        rs = pstmt.executeQuery();

        // 3. 결과 JSON 생성
        boolean isFirst = true;
        while (rs.next()) {
            if (!isFirst) json.append(",");
            
            // 데이터 가져오기 (에러 방지용 null 체크)
            String title = rs.getString("title");
            if (title == null) title = "";
            title = title.replace("\"", "\\\"").replace("\n", " ").replace("\r", " "); // 줄바꿈 문자 제거

            String desc = rs.getString("description");
            if (desc == null) desc = "";
            desc = desc.replace("\"", "\\\"").replace("\n", " ").replace("\r", " ");

            String img = rs.getString("img_url");
            if (img == null) img = "";

            String date = rs.getString("news_date");
            
            json.append("{");
            json.append("\"title\": \"" + title + "\",");
            json.append("\"date\": \"" + date + "\",");
            json.append("\"desc\": \"" + desc + "\",");
            json.append("\"img\": \"" + img + "\"");
            json.append("}");
            isFirst = false;
        }

    } catch (Exception e) {
        // ★★★ [진단 핵심] 에러가 나면 JSON 대신 에러 메시지를 보냅니다 ★★★
        e.printStackTrace(); // 서버 콘솔에도 출력
        json.setLength(0); // 기존 내용 삭제
        // JSON 파싱 에러를 내서 화면에 텍스트가 보이게 유도하거나, 에러 객체 반환
        json.append("[{\"error\": \"[DB_ERROR] " + e.getMessage().replace("\"", "'") + "\"}]");
    } finally {
        if (rs != null) try { rs.close(); } catch (Exception e) {}
        if (pstmt != null) try { pstmt.close(); } catch (Exception e) {}
        if (conn != null) try { conn.close(); } catch (Exception e) {}
    }

    json.append("]");
    out.print(json.toString());
%>