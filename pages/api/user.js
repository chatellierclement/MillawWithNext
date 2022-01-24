// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function user(req, res) {
  switch (req.method) {
    case "GET":
      let userFind = null
      if (req.query.email && req.query.password) {
        userFind = await prisma.user.findFirst({
          where: {
            AND: [{email: req.query.email},{password: req.query.password}]
          }
         })       
      } else {
        userFind = await prisma.user.findMany({
          include: { role: true, bar: true }
        })
      }
      res.status(200).json(userFind)
      break;
    case "POST":
      let userCreate = await prisma.user.create({ 
        data: req.body,
        include: { role: true, bar: true }             
      })
      res.status(200).json(userCreate)
      break;    
    case "PUT": 
      let userPatch = await prisma.user.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body ,
        include: { role: true, bar: true }       
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
