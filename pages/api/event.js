// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function event(req, res) {
  switch (req.method) {
    case "GET":
      let eventFind = await prisma.event.findMany()
      res.status(200).json(eventFind)
      break;
    case "POST":
      let eventCreate = await prisma.event.create({ 
        data: req.body         
      })
      res.status(200).json(eventCreate)
      break;    
    case "PUT": 
      let eventPatch = await prisma.event.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body         
      })
      res.status(200).json(eventPatch)    
      break;
    case "DELETE": 
      let eventDelete = await prisma.event.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(eventDelete)    
      break;
  }  
}
