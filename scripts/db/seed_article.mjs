export async function seedArticles(client) {
    for (let artc of articles) {
      await client.query(`
      INSERT INTO articles (title, board, code, content, author_ip_addr, author_nickname, author_password, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [artc.title, artc.board, artc.code, artc.content, artc.author_ip_addr, artc.author_nickname, artc.author_password, new Date()])
    }
  }