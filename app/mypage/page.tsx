import { getMyPosts } from '@/app/actions/post';
import PostCard from '@/app/components/post-card';

export default async function Page() {
  const posts = await getMyPosts();

  return (
    <div>
      <h1>マイページ</h1>

      <h2>自分の記事一覧</h2>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
