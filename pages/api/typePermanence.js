// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function typePermanence(req, res) {
  switch (req.method) {
    case "GET":
      let typePermanenceFind = null
      if (req.query.id) {
        typePermanenceFind = await prisma.typePermanence.findFirst({
          where: { id: +req.query.id }
        })
      } else {
        typePermanenceFind = await prisma.typePermanence.findMany()
      }
      res.status(200).json(typePermanenceFind)
      break;
    case "POST":
      let typePermanenceCreate = await prisma.typePermanence.create({ 
        data: req.body         
      })
      res.status(200).json(typePermanenceCreate)
      break;    
    case "PUT": 
      let typePermanencePatch = await prisma.typePermanence.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body,      
      })
      res.status(200).json(typePermanencePatch)    
      break;
    case "DELETE": 
      let typePermanenceDelete = await prisma.typePermanence.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(typePermanenceDelete)    
      break;
  }  
}
