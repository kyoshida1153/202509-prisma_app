import { revalidatePath } from "next/cache";

type todo = {
  id: number;
  title: string;
  created_at: Date;
};

const getTodoList = async () => {
  const res = await fetch("http://localhost:3000/api/todo");
  const json = await res.json();
  return json.todos;
};

const deletePost = async (formData: FormData) => {
  "use server";
  const id: FormDataEntryValue | null = formData.get("id");
  if (!id) return;
  await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  revalidatePath("/");
};

export default async function Home() {
  const todoList = await getTodoList();

  return (
    <main>
      <h1>Next.js + TypeScript + Prisma + supabase</h1>

      <ul className="space-y-4">
        {todoList.map((todo: todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <form>
              <input type="hidden" name="id" value={todo.id} />
              <button formAction={deletePost}>削除</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
