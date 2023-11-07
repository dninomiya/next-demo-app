import { getPostCount, getPosts } from '@/app/actions/post';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function Page() {
  const posts = await getPosts();
  const count = await getPostCount();

  return (
    <div>
      <h1 className="font-bold text-2xl mb-2">記事一覧</h1>
      <p className="mb-8 text-muted-foreground">全{count}件</p>
      {posts.length > 0 ? (
        <ul className="divide-y">
          {posts.map((post) => {
            return (
              <li key={post.id} className="py-4">
                <h2 className="font-bold mb-1">
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground text-sm">
                  <time>{format(post.createdAt, 'yyyy年M月d日 HH:mm:ss')}</time>
                </p>

                <p className="truncate">{post.body}</p>
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
