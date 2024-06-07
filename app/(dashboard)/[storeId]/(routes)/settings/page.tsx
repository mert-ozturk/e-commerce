import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


interface SettingsPageProps{
    params:{
        storeId:string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {
    const {userId} = auth()

    if(!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userId
        }
    })

    if(!store){
        redirect("/")
    }

  return (
    <div>
      Setting well come cehenneme
    </div>
  )
}

export default SettingsPage
