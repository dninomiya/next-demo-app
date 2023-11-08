import { getPostCount, getPosts } from '@/app/actions/post';
import PostCard from '@/app/components/post-card';

export default async function Page() {
  const posts = await getPosts();
  const count = await getPostCount();

  return (
    <div>
      <h1 className="font-bold text-2xl mb-2">最新の10件</h1>
      <p className="mb-6 text-muted-foreground">全{count}件</p>
      {posts.length > 0 ? (
        <ul className="divide-y">
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="border rounded-md px-4 py-2 bg-muted text-muted-foreground">
          記事はありません
        </p>
      )}
    </div>
  );
}
