import { revalidatePath } from "next/cache";

export default async function Home() {
  //server actionsを利用してTODOを追加
  const addPost = async (formData: FormData) => {
    "use server";
    const text: FormDataEntryValue | null = formData.get("text");
    if (!text) return;

    const res = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: text,
      }),
    });
    revalidatePath("/");
  };
  return (
    <form action={addPost}>
      <input type="text" name="text" placeholder="New task..." />
      <button>Add Task</button>
    </form>
  );
}
