import { useActionState } from "react";

export default function UseActionStateForm() {
  async function handleSubmit(prevData, formData) {
    const name = formData.get('name');
    const email = formData.get('email');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const res = await fetch('api', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json();

    if (data) {
      return {
        message: 'Updated to backend'
      }
    }

    if (name && email) {
      return {
        message: 'Data submitted successfully',
        name,
        email
      }
    }
    else {
      return {
        message: 'Failed to submit data'
      }
    }
  }

  const [data, actionPayload, isPending] = useActionState(handleSubmit, undefined);

  return (
    <div>
      <form action={actionPayload}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" defaultValue={data?.name} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" defaultValue={data?.email} />
        </div>
        <div>
          <button>{isPending ? 'Submitting...' : 'Submit'}</button>
        </div>
      </form>
      {
        data && (
          <div>
            {data?.message}
          </div>
        )
      }

      <div>
        Name: {data?.name}
        Email: {data?.email}
      </div>
    </div>
  )
}