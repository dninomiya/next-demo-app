import { getMyLikes, getMyPosts } from '@/app/actions/post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/app/components/post-card';

export default async function Page() {
  const posts = await getMyPosts();

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">マイページ</h1>

      <Tabs defaultValue="post">
        <TabsList className="mb-4">
          <TabsTrigger value="post">ポスト</TabsTrigger>
          <TabsTrigger value="like">お気に入り</TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <ul className="divide-y">
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              );
            })}
          </ul>
        </TabsContent>
        <TabsContent value="like">
          <ul className="divide-y">
            {(await getMyLikes())?.map((post) => {
              return (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              );
            })}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
