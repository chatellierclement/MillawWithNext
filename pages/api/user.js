// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function user(req, res) {
  switch (req.method) {
    case "GET":
      let userFind = await prisma.user.findMany()
      res.status(200).json(userFind)
      break;
    case "POST":
      let userCreate = await prisma.user.create({ 
        data: req.body         
      })
      res.status(200).json(userCreate)
      break;    
    case "PUT": 
      let userPatch = await prisma.user.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body         
      })
      res.status(200).json(userPatch)    
      break;
    case "DELETE": 
      let userDelete = await prisma.user.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(userDelete)    
      break;
  }  
}
