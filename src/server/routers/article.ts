import { router } from '../procedures';
import { getArticle } from '../routes/articles/getArticle';
import { getArticles } from '../routes/articles/getArticles';
import { post } from '../routes/articles/postArticle';

export const articleRouter = router({
  post: post,
  getArticles: getArticles,
  getArticle: getArticle,
});
