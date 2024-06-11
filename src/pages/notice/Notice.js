import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notice.scss";

function Notice({ posts = [] }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("title");

  const handleRowClick = postId => {
    navigate(`/notice/post/${postId}`);
  };

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearch = () => {
    let filtered = posts;

    if (searchTerm) {
      filtered = posts.filter(post => {
        const searchFields = {
          title: post.title.toLowerCase(),
          titleContent: `${post.title.toLowerCase()} ${post.content.toLowerCase()}`,
          author: post.author.toLowerCase(),
        };
        return searchFields[searchOption].includes(searchTerm.toLowerCase());
      });
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = event => {
    setSearchOption(event.target.value);
  };

  return (
    <div className="inner">
      <article className="notice">
        <h2>게시판</h2>
        <div className="notice__top">
          <button className="best-post btn">추천글</button>
          <div className="notice__top__icon">
            <Link to="/notice/write" className="btn">
              글쓰기
            </Link>
          </div>
        </div>
        <table className="notice__center">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(post => (
              <tr key={post.postId} onClick={() => handleRowClick(post.postId)}>
                <td>{post.postId}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
                <td>{post.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="notice__bottom">
          <Link to="/notice/write" className="btn">
            글쓰기
          </Link>
        </div>
        <div className="notice__pagination">
          {pageNumbers.map(number => (
            <button key={number} onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          ))}
        </div>
        <div className="search-container">
          <select value={searchOption} onChange={handleSearchOptionChange}>
            <option value="title">제목</option>
            <option value="titleContent">제목+내용</option>
            <option value="author">글쓴이</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
      </article>
    </div>
  );
}

export default Notice;
