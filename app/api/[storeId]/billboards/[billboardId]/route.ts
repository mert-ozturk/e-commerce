import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET( req:Request,
    {params} : {params:{ billboardId:string}}
){

    try{
       
        if(!params.billboardId){
            return new NextResponse("Billboard id required",{status:400})
        }

         
              
        const billboard = await prismadb.billboard.findUnique({
            where:{
                storeId: params.billboardId,
            },
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_GET]',error)
        return new NextResponse("Interal error",{status:500})
    }
}


export async function PATCH( req:Request,
    {params} : {params:{storeId:string, billboardId:string}}
){

    try{
            const {userId} = auth();
            const body = await req.json()

        const {label , imageUrl} = body;

         if(!userId){
        return new NextResponse("Unauthenticated",{status:401})
            }
         if(!label) {
            return new NextResponse("Label is required",{status:400})
             }
          
        if(!imageUrl) {
          return new NextResponse("Image URL is required",{status:400})
              }
         
        if(!params.billboardId){
            return new NextResponse("Billboard id required",{status:400})
        }
         
        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.billboardId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthenticated",{status:403})
        }

        const billboard = await prismadb.billboard.create({
            where:{
                id:params.billboardId,
            },
            data:{
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_PATCH]',error)
        return new NextResponse("Interal error",{status:500})
    }
}


export async function DELETE( req:Request,
    {params} : {params:{storeId:string , billboardId:string}}
){

    try{
        const {userId} = auth();
                   
        if(!params.storeId){
            return new NextResponse("Store id required",{status:400})
        }
        if(!params.billboardId){
            return new NextResponse("Billboard id required",{status:400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.billboardId,
               
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthenticated",{status:403})
        }


       
        const billboard = await prismadb.billboard.findMany({
            where:{
                storeId: params.billboardId,
            },
        })

        return NextResponse.json(billboard)
     
    }catch(error){
        console.log('[BILLBOARDS_DELETE]',error)
        return new NextResponse("Interal error",{status:500})
    }
}