// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function apply(req, res) {
  switch (req.method) {
    case "GET":
      let applyFind = await prisma.apply.findMany()
      res.status(200).json(applyFind)
      break;
    case "POST":
      let applyCreate = await prisma.apply.create({ 
        data: req.body         
      })
      res.status(200).json(applyCreate)
      break;    
    case "PUT": 
      let applyPatch = await prisma.apply.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body,      
      })
      res.status(200).json(applyPatch)    
      break;
    case "DELETE": 
      let applyDelete = await prisma.apply.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(applyDelete)    
      break;
  }  
}
