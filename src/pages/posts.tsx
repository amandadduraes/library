import { trpc } from "@/app/utils/trpc";
import { useState } from 'react';
import  Button  from "../../components/ui/Button";



interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Posts() {
  const utils = trpc.useContext();
  const { data: posts, isLoading } = trpc.post.getAll.useQuery<Post[]>();
  const createPost = trpc.post.create.useMutation({
    onSuccess: () => utils.post.getAll.invalidate(),
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = () => {
    createPost.mutate({ title, content, userId: 1 });
    setTitle("");
    setContent("");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Posts</h1>
      <div className="mb-6">
        {posts?.map((post: Post) => ( // Tipando `post` como `Post`
          <div key={post.id} className="mb-4 p-4 border rounded-md shadow-sm">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <Button onClick={handleCreatePost}>Create Post</Button>
      </div>
    </div>
  );
}
