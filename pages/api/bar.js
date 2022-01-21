// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function bar(req, res) {
  switch (req.method) {
    case "GET":
      let barreauFind = await prisma.bar.findMany()
      res.status(200).json(barreauFind)
      break;
    case "POST":
      let barreauCreate = await prisma.bar.create({ 
        data: req.body         
      })
      res.status(200).json(barreauCreate)
      break; 
    case "PUT": 
      let barreauPatch = await prisma.bar.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body      
      })
      res.status(200).json(barreauPatch)    
      break;
    case "DELETE": 
      let barreauDelete = await prisma.bar.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(barreauDelete)    
      break;
  }  
}
