// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function permanence(req, res) {
  switch (req.method) {
    case "GET":
      let permanenceFind = await prisma.permanence.findMany({
        include: { role: true }
      })
      res.status(200).json(permanenceFind)
      break;
    case "POST":
      let permanenceCreate = await prisma.permanence.create({ 
        data: req.body         
      })
      res.status(200).json(permanenceCreate)
      break;    
    case "PUT": 
      let permanencePatch = await prisma.permanence.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body ,
        include: { role: true }       
      })
      res.status(200).json(permanencePatch)    
      break;
    case "DELETE": 
      let permanenceDelete = await prisma.permanence.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(permanenceDelete)    
      break;
  }  
}