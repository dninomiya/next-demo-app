import { getMyLikes, getMyPosts } from '@/app/actions/post';
import { currentUser } from '@/app/actions/user';
import Empty from '@/app/components/empty';
import PostCard from '@/app/components/post-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  const posts = await getMyPosts();
  const likes = await getMyLikes();
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-black text-gray-100 mb-6 px-6 py-10 -mx-6">
        <h1 className="font-bold text-xl">{user.name}</h1>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Link href="/profile">
            <Edit size={20} />
            <span className="sr-only">プロフィール編集</span>
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="post">
        <TabsList className="mb-4">
          <TabsTrigger value="post">ポスト</TabsTrigger>
          <TabsTrigger value="like">お気に入り</TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <ul className="divide-y">
            {posts?.length > 0 ? (
              posts.map((post) => {
                return (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                );
              })
            ) : (
              <Empty>ポストはありません</Empty>
            )}
          </ul>
        </TabsContent>
        <TabsContent value="like">
          <ul className="divide-y">
            {likes.length > 0 ? (
              likes?.map((post) => {
                return (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                );
              })
            ) : (
              <Empty>お気に入りはありません</Empty>
            )}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
