// app/actions/editWaterTypes.ts
'use server'
import { createServerActionClient} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"

export async function editWaterType(formData: FormData) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })
    const {data: {user}} = await supabase.auth.getUser();
    console.log(formData, "formData")
    const name = formData.get('name')
    const price = formData.get('price')
    const idValue = formData.get('id');
    console.log('ID value:', idValue);
    const {data, error} = await supabase.from('water_type').upsert({name: name, price: price, user_id: user?.id}).eq('id', idValue).select('*')
    console.log(data, "data water")
    console.log(error, "error water type")

    // await supabase.from('water_type').upsert({name: name, price: price}).eq('id', idValue)
    revalidatePath('/waterTypes')
    return { message: `You have successfully edited ${name}` }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}