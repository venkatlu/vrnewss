const searchButton = document.getElementById('search-button');
const newsHeadlines = document.getElementById('news-headlines');
let articleIndex = 0;

async function fetchConfig() {
    const response = await fetch('config.json');
    return response.json();
}

searchButton.addEventListener('click', async() => {
    try {
        const config = await fetchConfig();
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${config.country}&apiKey=${config.apiKey}`);
        const data = await response.json();
        const articles = data.articles;
        newsHeadlines.innerHTML = '';

        const article = articles[articleIndex];
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.alt = article.title;

        const newsInfo = document.createElement('div');
        newsInfo.className = 'news-info';
        const title = document.createElement('h2');
        title.textContent = article.title;
        const author = document.createElement('p');
        author.className = 'author';
        author.textContent = `By ${article.author}`;

        newsInfo.appendChild(title);
        newsInfo.appendChild(author);
        li.appendChild(img);
        li.appendChild(newsInfo);
        newsHeadlines.appendChild(li);

        articleIndex = (articleIndex + 1) % articles.length;
    } catch (error) {
        console.error(error);
    }
});