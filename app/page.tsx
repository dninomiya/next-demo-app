import { getPosts } from '@/app/actions/post';
import PostCard from '@/app/components/post-card';

export default async function Page() {
  const posts = await getPosts();

  return (
    <div>
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
