import React, { useEffect, useState } from 'react';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbzqMHR-meW0bv1WLljzdnn0oLfZ--wZAWfh5kpH2WvG_zPggv29Yxir9cLd195zxkIK/exec")
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error("取得失敗:", err));
  }, []);

  const handleRegister = (article) => {
    fetch("https://script.google.com/macros/s/AKfycbzqMHR-meW0bv1WLljzdnn0oLfZ--wZAWfh5kpH2WvG_zPggv29Yxir9cLd195zxkIK/exec", {
      method: "POST",
      body: JSON.stringify({
        title: article.title,
        image: article.image,
        url: article.url,
        content: article.content || "",
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      alert("スプレッドシートに登録しました！");
    }).catch(err => {
      console.error("登録エラー:", err);
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>記事候補一覧</h1>
      {articles.map((a, i) => (
        <div key={i} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <img src={a.image} alt="" style={{ width: 100 }} />
          <h2>{a.title}</h2>
          <p><a href={a.url} target="_blank" rel="noopener noreferrer">記事を開く</a></p>
          <button onClick={() => handleRegister(a)}>この記事を登録</button>
        </div>
      ))}
    </div>
  );
}

export default App;
